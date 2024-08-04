<script setup>
import {computed, ref} from "vue";

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

  // Log the additional experience JSON to the console
  console.log(JSON.stringify(additionalExperience.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", additionalExperience.value);

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
    <h2>Additional Experience</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="experienceTitle">Experience Title</label>
        <input type="text" id="experienceTitle" v-model="additionalExperience.experienceTitle" required />
      </div>
      <div class="form-group">
        <label for="organization">Organization</label>
        <input type="text" id="organization" v-model="additionalExperience.organization" required />
      </div>
      <div class="form-group">
        <label for="city">City (Optional)</label>
        <input type="text" id="city" v-model="additionalExperience.city" />
      </div>
      <div class="form-group">
        <label for="country">Country (Optional)</label>
        <input type="text" id="country" v-model="additionalExperience.country" />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date (YYYY-MM)</label>
        <input type="month" id="startDate" v-model="additionalExperience.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date (YYYY-MM)</label>
        <input type="month" id="endDate" v-model="additionalExperience.endDate" />
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

</style>