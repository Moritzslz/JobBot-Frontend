<script setup>
import Message from "@/components/Message.vue";
import '@/assets/css/main.css';
import '@/assets/css/variables.css';
import {ref} from "vue";
import {useRouter} from "vue-router";

defineProps({
  hrefHome: String,
  hrefSignUp: String,
  hrefPP: String,
  hrefTC: String,
  svgColor: String,
  svg: String
});

const router = useRouter();

const formData = ref({
  username: "john.doe@example.com",
  password: "StrongPassword123!",
});

const serverMessage = ref("");

function validateFields() {
  validateField("login-username")
  validateField("login-password")
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

async function handleSubmit() {
  try {
    const formDataObject = new FormData();
    formDataObject.append('username', formData.value.username);
    formDataObject.append('password', formData.value.password);

    const response = await fetch('http://localhost:8080/v1/auth/login', {
      method: 'POST',
      body: formDataObject,
      credentials: 'include' // to include cookies
    });

    console.log(response)

    if (response.status === 200) {
      const data = await response.json();
      serverMessage.value = "Login successful.";
      // Perform further actions like redirecting to a different page
      router.push("/chat")
    } else if (response.status === 401) {
      serverMessage.value = "Bad credentials. Please try again.";
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
  <form class="auth-from" @submit.prevent="handleSubmit">
    <a :href="hrefHome">
      <component class="logo-mark" :class="svgColor" :is="svg"></component>
    </a>
    <h1>{{ $t("login.title") }}</h1>
    <input type="email" inputmode="email" v-model="formData.username" id="login-username" :placeholder="$t('login.emailPH')" required>
    <input type="password" inputmode="text" v-model="formData.password" id="login-password" :placeholder="$t('login.pwdPH')" required>
    <div class="server-message"></div>
    <Message></Message>
    <button type="submit" @click="validateFields">{{ $t("login.buttonText") }}</button>
    <p>{{ $t("login.redirectText")  }}<a class="link" :href="hrefSignUp">{{ $t("login.textSignUp") }}</a></p>
    <div class="divider"></div>
    <p><a :href="hrefPP">{{ $t("textPP") }}</a> | <a :href="hrefTC ">{{ $t("textTC") }}</a></p>
  </form>
</template>

<style scoped>

</style>