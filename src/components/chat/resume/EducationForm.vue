<script setup>
import {computed, ref} from 'vue';

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const education = ref({
  school: '',
  degree: '',
  fieldOfStudy: '',
  city: '',
  country: '',
  expectedGraduation: false,
  startDate: '',
  endDate: '',
  gpa: '',
  bulletList: []
});

const achievements = ref('');

const submitForm = () => {
  // Split achievements into a bullet list
  education.value.bulletList = achievements.value.split('\n').filter(line => line.trim() !== '');

  // Log the education JSON to the console
  console.log(JSON.stringify(education.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", education.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  education.value = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    city: '',
    country: '',
    expectedGraduation: false,
    startDate: '',
    endDate: '',
    gpa: '',
    bulletList: []
  };
  achievements.value = '';
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
    <h2>Education</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="school">School</label>
        <input type="text" id="school" v-model="education.school" required />
      </div>
      <div class="form-group">
        <label for="degree">Degree</label>
        <input type="text" id="degree" v-model="education.degree" required />
      </div>
      <div class="form-group">
        <label for="fieldOfStudy">Field of Study</label>
        <input type="text" id="fieldOfStudy" v-model="education.fieldOfStudy" required />
      </div>
      <div class="form-group">
        <label for="city">City (Optional)</label>
        <input type="text" id="city" v-model="education.city" />
      </div>
      <div class="form-group">
        <label for="country">Country (Optional)</label>
        <input type="text" id="country" v-model="education.country" />
      </div>
      <div class="form-group">
        <label for="startDate">Start Date (YYYY-MM)</label>
        <input type="month" id="startDate" v-model="education.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date (YYYY-MM)</label>
        <input type="month" id="endDate" v-model="education.endDate" :disabled="education.expectedGraduation" />
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="education.expectedGraduation" />
          Expected Graduation
        </label>
      </div>
      <div class="form-group">
        <label for="gpa">GPA (Optional)</label>
        <input type="text" id="gpa" v-model="education.gpa" />
      </div>
      <div class="form-group">
        <label for="achievements">Achievements / Activities (Optional)</label>
        <textarea id="achievements" v-model="achievements" :maxlength="MAX_TEXTAREA_LENGTH" placeholder="Enter achievements or activities, separated by new lines"></textarea>
      </div>
      <div class="char-counter">
        {{ remainingChars }} characters left
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