<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const education = ref({
  school: "",
  degree: "",
  fieldOfStudy: "",
  city: "",
  country: "",
  expectedGraduation: false,
  startDate: "",
  endDate: "",
  gpa: "",
  bulletList: []
});

const achievements = ref("");

const submitForm = () => {
  // Split achievements into a bullet list
  education.value.bulletList = achievements.value.split("\n").filter(line => line.trim() !== "");

  let json = JSON.stringify(education.value, null, 2);
  let prompt = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("educationForm.prompt")) + json;

  // Create a prettified message
  let message = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("educationForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const [key, value] of Object.entries(education.value)) {
    if (key === "bulletList") {
      message += `Details:<br>`;
      value.forEach(bullet => {
        message += `  - ${bullet}<br>`;
      });
    } else {
      message += `${t(`educationForm.${key}`)}: ${value}<br>`;
    }
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  education.value = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    city: "",
    country: "",
    expectedGraduation: false,
    startDate: "",
    endDate: "",
    gpa: "",
    bulletList: []
  };
  achievements.value = "";
};

// Define the maximum length for the description
const MAX_TEXTAREA_LENGTH = 1000;

// Computed property for remaining characters
const remainingChars = computed(() => {
  return MAX_TEXTAREA_LENGTH - achievements.value.length;
});

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="education-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("educationForm.name") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="school">{{ t("educationForm.school") }}</label>
        <input type="text" id="school" v-model="education.school" required />
      </div>
      <div class="form-group">
        <label for="degree">{{ t("educationForm.degree") }}</label>
        <input type="text" id="degree" v-model="education.degree" required />
      </div>
      <div class="form-group">
        <label for="fieldOfStudy">{{ t("educationForm.fieldOfStudy") }}</label>
        <input type="text" id="fieldOfStudy" v-model="education.fieldOfStudy" required />
      </div>
      <div class="form-group">
        <label for="city">{{ t("educationForm.city") }}</label>
        <input type="text" id="city" v-model="education.city" />
      </div>
      <div class="form-group">
        <label for="country">{{ t("educationForm.country") }}</label>
        <input type="text" id="country" v-model="education.country" />
      </div>
      <div class="form-group">
        <label for="startDate">{{ t("educationForm.startDate") }}</label>
        <input type="month" id="startDate" v-model="education.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">{{ t("educationForm.endDate") }}</label>
        <input type="month" id="endDate" v-model="education.endDate" :disabled="education.expectedGraduation" />
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="education.expectedGraduation" />
          {{ t("educationForm.expectedGraduation") }}
        </label>
      </div>
      <div class="form-group">
        <label for="gpa">{{ t("educationForm.gpa") }}</label>
        <input type="text" id="gpa" v-model="education.gpa" />
      </div>
      <div class="form-group">
        <label for="achievements">{{ t("educationForm.bulletListName") }}</label>
        <textarea id="achievements" v-model="achievements" :maxlength="MAX_TEXTAREA_LENGTH" :placeholder='t("educationForm.bulletListPlaceholder")'></textarea>
      </div>
      <div class="char-counter">
        {{ remainingChars }} {{ t("chat.remainingChars") }}
      </div>
      <button type="submit" class="submit-icon-btn">
        <Send></Send>
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>