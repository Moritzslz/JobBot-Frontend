<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const additionalExperience = ref({
  experienceTitle: "",
  organization: "",
  city: "",
  country: "",
  startDate: "",
  endDate: "",
  bulletList: []
});

const responsibilities = ref("");

const submitForm = () => {
  // Split responsibilities into a bullet list
  additionalExperience.value.bulletList = responsibilities.value.split("\n").filter(line => line.trim() !== "");

  let json = JSON.stringify(additionalExperience.value, null, 2);
  let prompt = t("resumePrompts.addToResume").replace("{}", t("additionalExperienceForm.prompt")) + json + " " + t("resumePrompts.addPrompt");

  // Create a prettified message
  let message = t("resumePrompts.addToResume").replace("{}", t("additionalExperienceForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const [key, value] of Object.entries(additionalExperience.value)) {
    if (key === "bulletList") {
      message += `Details:<br>`;
      value.forEach(bullet => {
        message += `  - ${bullet}<br>`;
      });
    } else {
      message += `${t(`additionalExperienceForm.${key}`)}: ${value}<br>`;
    }
  }

  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  additionalExperience.value = {
    experienceTitle: "",
    organization: "",
    city: "",
    country: "",
    startDate: "",
    endDate: "",
    bulletList: []
  };
  responsibilities.value = "";
};

// Define the maximum length for the description
const MAX_TEXTAREA_LENGTH = 1000;

// Computed property for remaining characters
const remainingChars = computed(() => {
  return MAX_TEXTAREA_LENGTH - responsibilities.value.length;
});

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="additional-experience-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("additionalExperienceForm.name") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="experienceTitle">{{ t("additionalExperienceForm.experienceTitle") }}</label>
        <input type="text" id="experienceTitle" v-model="additionalExperience.experienceTitle" required />
      </div>
      <div class="form-group">
        <label for="organization">{{ t("additionalExperienceForm.organization") }}</label>
        <input type="text" id="organization" v-model="additionalExperience.organization" required />
      </div>
      <div class="form-group">
        <label for="city">{{ t("additionalExperienceForm.city") }}</label>
        <input type="text" id="city" v-model="additionalExperience.city" />
      </div>
      <div class="form-group">
        <label for="country">{{ t("additionalExperienceForm.country") }}</label>
        <input type="text" id="country" v-model="additionalExperience.country" />
      </div>
      <div class="form-group">
        <label for="startDate">{{ t("additionalExperienceForm.startDate") }}</label>
        <input type="month" id="startDate" v-model="additionalExperience.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">{{ t("additionalExperienceForm.endDate") }}</label>
        <input type="month" id="endDate" v-model="additionalExperience.endDate" />
      </div>
      <div class="form-group">
        <label for="responsibilities">{{ t("additionalExperienceForm.bulletListName") }}</label>
        <textarea id="responsibilities" v-model="responsibilities" :maxlength="MAX_TEXTAREA_LENGTH" :placeholder='t("additionalExperienceForm.bulletListPlaceholder")'></textarea>
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