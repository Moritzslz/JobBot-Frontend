<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["formSubmitted", "formClosed"]);

const jobDescription = ref({
  jobTitle: "",
  companyName: "",
  jobDescription: ""
});

const MAX_DESCRIPTION_LENGTH = 5000;

const submitForm = () => {
  let json = JSON.stringify(jobDescription.value, null, 2);
  let prompt = t("resumePrompts.tailorToJobPosting") + json;

  // Create a prettified message
  let message = t("resumePrompts.tailorToJobPosting") + "<br>";

  // Loop through all keys and values
  for (const [key, value] of Object.entries(jobDescription.value)) {
    message += `${t(`jobDescriptionForm.resume.${key}`)}: ${value}<br>`;
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Hide and close the form
  emit("formClosed");
  emit("hideForm")
};

// Define the maximum length for the description
const MAX_TEXTAREA_LENGTH = 4000;

// Computed property for remaining characters
const remainingChars = computed(() => {
  return MAX_TEXTAREA_LENGTH - jobDescription.value.jobDescription.length;
});

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="job-description-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("jobDescriptionForm.resume.name") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="jobTitle">{{ t("jobDescriptionForm.resume.jobTitle") }}</label>
        <input type="text" id="jobTitle" v-model="jobDescription.jobTitle" required />
      </div>
      <div class="form-group">
        <label for="companyName">{{ t("jobDescriptionForm.resume.companyName") }}</label>
        <input type="text" id="companyName" v-model="jobDescription.companyName" required />
      </div>
      <div class="form-group">
        <label for="description">{{ t("jobDescriptionForm.resume.jobDescription") }}</label>
        <textarea
            id="description"
            v-model="jobDescription.jobDescription"
            :placeholder='t("jobDescriptionForm.resume.jobDescriptionPlaceholder")'
            :maxlength="MAX_TEXTAREA_LENGTH"
            rows="10"
            required
        ></textarea>
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
