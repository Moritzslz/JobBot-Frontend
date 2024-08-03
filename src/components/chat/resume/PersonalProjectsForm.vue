<script setup>
import {computed, ref} from "vue";

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
  // Split activities into a bullet list
  personalProject.value.bulletList = activities.value.split("\n").filter(line => line.trim() !== "");

  // Split technologiesUsed into an array
  personalProject.value.technologiesUsed = personalProject.value.technologiesUsed.split(",").map(tech => tech.trim());

  // Log the personal project JSON to the console
  console.log(JSON.stringify(personalProject.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", personalProject.value);

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
    <h2>Personal Project</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="projectTitle">Project Title</label>
        <input type="text" id="projectTitle" v-model="personalProject.projectTitle" required />
      </div>
      <div class="form-group">
        <label for="description">Description (Optional)</label>
        <textarea id="description" v-model="personalProject.description" placeholder="Brief description of the personal project"></textarea>
      </div>
      <div class="form-group">
        <label for="technologiesUsed">Technologies Used (comma separated) (Optional)</label>
        <input type="text" id="technologiesUsed" v-model="personalProject.technologiesUsed" />
      </div>
      <div class="form-group">
        <label for="role">Role</label>
        <input type="text" id="role" v-model="personalProject.role" required />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date (YYYY-MM)</label>
        <input type="month" id="startDate" v-model="personalProject.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date (YYYY-MM)</label>
        <input type="month" id="endDate" v-model="personalProject.endDate" />
      </div>
      <div class="form-group">
        <label for="activities">Activities / Responsibilities</label>
        <textarea id="activities" v-model="activities" :maxlength="MAX_TEXTAREA_LENGTH" placeholder="Enter activities or responsibilities, separated by new lines"></textarea>
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
