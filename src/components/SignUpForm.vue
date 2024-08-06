<script setup>
import Message from "@/components/Message.vue";
import SourceSelect from "@/components/SourceSelect.vue";
import '@/assets/css/main.css';
import '@/assets/css/variables.css';
import {getCurrentInstance, ref, watch} from "vue";
import {useRouter} from "vue-router";
import Navbar from "@/components/Navbar.vue";
import JobBotLogo from "@/components/icons/JobBotLogo.vue";

const { appContext } = getCurrentInstance();
const apiUrl = appContext.config.globalProperties.$apiUrl;

const props = defineProps({
  hrefHome: String,
  hrefLogin: String,
  hrefPP: String,
  hrefTC: String,
  minPwdLength: Number,
  svgColor: String,
  svg: JobBotLogo
});

const router = useRouter();

const serverMessage = ref("");

const step = ref(1);

const formData = ref({
  name: "",
  surname: "",
  username: "",
  password: "",
  confirmPassword: "",
  legalAccepted: false,
  newsletterAccepted: false
});

const passwordValidations = ref({
  length: false,
  digit: false,
  specialCharacter: false,
  case: false,
  pwdMismatch: false,
});

function nextStep() {
  if (step.value === 1) {
    // Step 1: Validate name, surname and email
    const nameValid = validateField("name");
    const surnameValid = validateField("surname");
    const emailValid = validateEmail();
    if (nameValid && surnameValid && emailValid) {
      step.value = 2;
    }
  } else if (step.value === 2) {
    // Step 2: Password
    const passwordValid = validateField("password");
    const confirmPasswordValid = validateField("confirmPassword");
    if (passwordValid && confirmPasswordValid) {
      if (passwordValidations.value.length && passwordValidations.value.digit && passwordValidations.value.specialCharacter && passwordValidations.value.case) {
        if (validatePassword()) {
          step.value = 3;
        }
      }
    }
  }
}

function validateField(fieldName) {
  let field = document.getElementById(fieldName);
  if (field.value.trim() !== "") {
    field.classList.remove("red")
    return true;
  } else {
    field.classList.add("red")
    return false;
  }
}

function validateEmail() {
  const field = document.getElementById("username");
  const parts = formData.value.username.split("@");

  if (parts.length !== 2) {
    field.classList.add("red")
    return false;
  }

  const domain = parts[1];

  if (!domain.includes(".")) {
    field.classList.add("red")
    return false;
  }

  const domainParts = domain.split(".");
  const secondLevelDomain = domainParts[0];
  const topLevelDomain = domainParts[1];

  if (secondLevelDomain.trim() === "" || topLevelDomain.trim() === "") {
    field.classList.add("red")
    return false;
  }

  if (topLevelDomain.trim().length < 2) {
    field.classList.add("red");
    return false;
  }

  field.classList.remove("red")
  return true;
}

function validatePassword() {
  if (formData.value.password === formData.value.confirmPassword) {
    return true;
  } else {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    password.classList.add("red")
    confirmPassword.classList.add("red")
    passwordValidations.value.pwdMismatch = true;
    return false;
  }
}

// Watch for password input to validate criteria
watch(() => formData.value.password, (newPassword) => {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  password.classList.remove("red")
  confirmPassword.classList.remove("red")
  passwordValidations.value.pwdMismatch = false;
  passwordValidations.value.length = newPassword.length >= props.minPwdLength;
  passwordValidations.value.digit = /[0-9]/.test(newPassword);
  passwordValidations.value.specialCharacter = /[^a-zA-Z0-9]/.test(newPassword);
  passwordValidations.value.case = /[A-Z]/.test(newPassword);

  const pwdLengthMsg = document.getElementById("pwdLengthMsg");
  if (passwordValidations.value.length) {
    pwdLengthMsg.classList.add("green");
  } else {
    pwdLengthMsg.classList.remove("green");
  }

  const pwdDigitMsg = document.getElementById("pwdDigitMsg");
  if (passwordValidations.value.digit) {
    pwdDigitMsg.classList.add("green");
  } else {
    pwdDigitMsg.classList.remove("green");
  }

  const pwdSpecialCharacterMsg = document.getElementById("pwdSpecialCharacterMsg");
  if (passwordValidations.value.specialCharacter) {
    pwdSpecialCharacterMsg.classList.add("green");
  } else {
    pwdSpecialCharacterMsg.classList.remove("green");
  }

  const pwdCaseMsg = document.getElementById("pwdCaseMsg");
  if (passwordValidations.value.case) {
    pwdCaseMsg.classList.add("green");
  } else {
    pwdCaseMsg.classList.remove("green");
  }
});

async function handleSubmit() {
  console.log(formData)

  try {
    const response = await fetch(apiUrl + '/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.value.username,
        password: formData.value.password
      }),
      credentials: 'include' // to include cookies
    });

    if (response.status === 200) {
      serverMessage.value = "Signup successful.";
      router.push('/login'); // Redirect to login page on success
    } else if (response.status === 400) {
      serverMessage.value = "Bad request. Please check your inputs.";
    } else if (response.status === 404) {
      serverMessage.value = "An error occurred. Please try again later.";
    } else {
      serverMessage.value = `Unexpected error: ${response.statusText}`;
    }
  } catch (error) {
    serverMessage.value = `An error occurred: ${error.message}`;
  }
}
</script>

<template>
  <Navbar :svg=JobBotLogo nav-item1="Link" nav-item2="Link" nav-item3="Link" nav-item4="Link" nav-item5="Link" nav-item6="Link"></Navbar>
  <form class="auth-from" @submit.prevent="handleSubmit">
    <a :href="hrefHome">
      <component class="logo-mark" :class="svgColor" :is="svg"></component>
    </a>
    <h1>{{ $t("signup.title") }}</h1>
    <div v-if="step === 1" class="form-step">
      <input type="text" inputmode="text" v-model="formData.name" id="name" :placeholder="$t('signup.namePH')" required>
      <input type="text" inputmode="text" v-model="formData.surname"  id="surname" :placeholder="$t('signup.surnamePH')" required>
      <input type="email" inputmode="email" v-model="formData.username" id="username" :placeholder="$t('signup.emailPH')" required>
      <button type="button" @click="nextStep">{{ $t("signup.continueButtonText") }}</button>
    </div>
    <div v-if="step === 2" class="form-step">
      <input type="password" inputmode="password" v-model="formData.password" id="password" :placeholder="$t('signup.pwdPH')" required>
      <input type="password" inputmode="password" v-model="formData.confirmPassword" id="confirmPassword" :placeholder="$t('signup.confirmPwdPH')" required>
      <div class="message-wrapper">
        <Message id="pwdLengthMsg" :message="$t('signup.pwdLengthReq')"></Message>
        <Message id="pwdDigitMsg" :message="$t('signup.pwdDigitMsg')"></Message>
        <Message id="pwdSpecialCharacterMsg" :message="$t('signup.pwdSpecialCharacterMsg')"></Message>
        <Message id="pwdCaseMsg" :message="$t('signup.pwdCaseReq')"></Message>
        <Message v-if="passwordValidations.pwdMismatch" color="red" :message="$t('signup.pwdMismatch')"></Message>
      </div>
      <button type="button" @click="nextStep">{{ $t("signup.continueButtonText") }}</button>
    </div>
    <div v-if="step === 3" class="form-step">
      <SourceSelect></SourceSelect>
      <label class="checkbox-wrapper" for="legalAccepted">
        <input type="checkbox" class="checkbox" v-model="formData.legalAccepted" id="legalAccepted" required>
        {{ $t("signup.checkboxLegal") }}
      </label>
      <label class="checkbox-wrapper" for="newsletterAccepted">
        <input type="checkbox" class="checkbox" v-model="formData.newsletterAccepted" id="newsletterAccepted">
        {{ $t("signup.checkboxNewsletter") }}
      </label>
      <Message></Message>
      <button type="submit">{{ $t("signup.buttonText") }}</button>
    </div>
    <p>{{ $t("signup.redirectText") }}<a class="link" :href="hrefLogin">{{ $t("signup.textLogin") }}</a></p>
    <div class="divider"></div>
    <p><a :href="hrefPP">{{ $t("textPP") }}</a> | <a :href="hrefTC">{{ $t("textTC") }}</a></p>
  </form>
</template>

<style scoped>

</style>