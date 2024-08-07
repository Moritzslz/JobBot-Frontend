<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const personalProject = ref({
  projectTitle: "",
  description: "",
  technologiesUsed: "",
  role: "",
  startDate: "",
  endDate: "",
  bulletList: []
});

const activities = ref("");

const submitForm = () => {
  // Split achievements into a bullet list
  personalProject.value.bulletList = activities.value.split("\n").filter(line => line.trim() !== "");

  let json = JSON.stringify(personalProject.value, null, 2);
  let prompt = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("personalProjectsForm.prompt")) + json + " " + t("resumePrompts.addPrompt");

  // Create a prettified message
  let message = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("personalProjectsForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const [key, value] of Object.entries(personalProject.value)) {
    if (key === "bulletList") {
      message += `Details:<br>`;
      value.forEach(bullet => {
        message += `  - ${bullet}<br>`;
      });
    } else {
      message += `${t(`personalProjectsForm.${key}`)}: ${value}<br>`;
    }
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  personalProject.value = {
    projectTitle: "",
    description: "",
    technologiesUsed: "",
    role: "",
    startDate: "",
    endDate: "",
    bulletList: []
  };
  activities.value = "";
};

// Define the maximum length for the description
const MAX_TEXTAREA_LENGTH = 1000;

// Computed property for remaining characters
const remainingChars = computed(() => {
  return MAX_TEXTAREA_LENGTH - activities.value.length;
});

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="personal-projects-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("personalProjectsForm.name") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="projectTitle">{{ t("personalProjectsForm.projectTitle") }}</label>
        <input type="text" id="projectTitle" v-model="personalProject.projectTitle" required />
      </div>
      <div class="form-group">
        <label for="description">{{ t("personalProjectsForm.description") }}</label>
        <textarea id="description" v-model="personalProject.description" :placeholder='t("personalProjectsForm.descriptionPlaceholder")'></textarea>
      </div>
      <div class="form-group">
        <label for="technologiesUsed">{{ t("personalProjectsForm.technologiesUsed") }}</label>
        <input type="text" id="technologiesUsed" v-model="personalProject.technologiesUsed" :placeholder='t("personalProjectsForm.technologiesUsedPlaceholder")' />
      </div>
      <div class="form-group">
        <label for="role">{{ t("personalProjectsForm.role") }}</label>
        <input type="text" id="role" v-model="personalProject.role" required />
      </div>
      <div class="form-group">
        <label for="startDate">{{ t("personalProjectsForm.startDate") }}</label>
        <input type="month" id="startDate" v-model="personalProject.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">{{ t("personalProjectsForm.endDate") }}</label>
        <input type="month" id="endDate" v-model="personalProject.endDate" />
      </div>
      <div class="form-group">
        <label for="activities">{{ t("personalProjectsForm.bulletListName") }}</label>
        <textarea id="activities" v-model="activities" :maxlength="MAX_TEXTAREA_LENGTH" :placeholder='t("personalProjectsForm.bulletListPlaceholder")'></textarea>
        <div class="char-counter">
          {{ remainingChars }} {{ t("chat.remainingChars") }}
        </div>
      </div>
      <button type="submit" class="submit-icon-btn">
        <Send></Send>
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
