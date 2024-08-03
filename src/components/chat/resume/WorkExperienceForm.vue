<script setup>
import {computed, ref} from "vue";

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const workExperience = ref({
  jobTitle: "",
  employer: "",
  city: "",
  country: "",
  presentlyEmployed: false,
  startDate: "",
  endDate: "",
  bulletList: []
});

const responsibilities = ref("");

const submitForm = () => {
  // Split responsibilities into a bullet list
  workExperience.value.bulletList = responsibilities.value.split("\n").filter(line => line.trim() !== "");

  // Log the work experience JSON to the console
  console.log(JSON.stringify(workExperience.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", workExperience.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  workExperience.value = {
    jobTitle: "",
    employer: "",
    city: "",
    country: "",
    presentlyEmployed: false,
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
  <div class="chat-form" id="work-experience-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Work Experience</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="jobTitle">Job Title</label>
        <input type="text" id="jobTitle" v-model="workExperience.jobTitle" required />
      </div>
      <div class="form-group">
        <label for="employer">Employer</label>
        <input type="text" id="employer" v-model="workExperience.employer" required />
      </div>
      <div class="form-group">
        <label for="city">City (Optional)</label>
        <input type="text" id="city" v-model="workExperience.city" />
      </div>
      <div class="form-group">
        <label for="country">Country (Optional)</label>
        <input type="text" id="country" v-model="workExperience.country" />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date (YYYY-MM)</label>
        <input type="month" id="startDate" v-model="workExperience.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date (YYYY-MM)</label>
        <input type="month" id="endDate" v-model="workExperience.endDate" :disabled="workExperience.presentlyEmployed" />
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="workExperience.presentlyEmployed" />
          Presently Employed
        </label>
      </div>
      <div class="form-group">
        <label for="responsibilities">Responsibilities / Achievements (Optional)</label>
        <textarea id="responsibilities" v-model="responsibilities" :maxlength="MAX_TEXTAREA_LENGTH" placeholder="Enter responsibilities or achievements, separated by new lines"></textarea>
        <div class="char-counter">
          {{ remainingChars }} characters left
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.chat-form {
  max-width: 600px;
  background-color: gray;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, textarea, button {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
textarea {
  height: 100px;
}
button {
  margin-top: 10px;
}
</style>