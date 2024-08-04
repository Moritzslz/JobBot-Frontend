<script setup>
import {computed, ref} from "vue";

const emit = defineEmits(["formSubmitted", "formClosed"]);

const jobDescription = ref({
  jobTitle: "",
  companyName: "",
  description: ""
});

const MAX_DESCRIPTION_LENGTH = 5000;

const submitForm = () => {
  // Log the job description JSON to the console
  console.log(JSON.stringify(jobDescription.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", jobDescription.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  jobDescription.value = {
    jobTitle: "",
    companyName: "",
    description: ""
  };
};

// Define the maximum length for the description
const MAX_TEXTAREA_LENGTH = 4000;

// Computed property for remaining characters
const remainingChars = computed(() => {
  return MAX_TEXTAREA_LENGTH - jobDescription.value.description.length;
});

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="job-description-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Job Description</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" id="jobTitle" v-model="jobDescription.jobTitle" required />
      </div>
      <div class="form-group">
        <label for="companyName">Company Name</label>
        <input type="text" id="companyName" v-model="jobDescription.companyName" required />
      </div>
      <div class="form-group">
        <label for="description">Job Description</label>
        <textarea
            id="description"
            v-model="jobDescription.description"
            placeholder="Paste job description here (max 500 characters)"
            :maxlength="MAX_TEXTAREA_LENGTH"
            rows="10"
            required
        ></textarea>
        <div class="char-counter">
          {{ remainingChars }} characters left
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>

</style>
