<script setup>
import { ref } from "vue";
import Send from "@/components/icons/Send.vue";

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const language = ref({
  language: "",
  proficiencyCEFR: ""
});

const proficiencyLevels = [
  "A1", "A2", "B1", "B2", "C1", "C2"
];

const submitForm = () => {
  // Log the language JSON to the console
  console.log(JSON.stringify(language.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", language.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  language.value = {
    language: "",
    proficiencyCEFR: ""
  };
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form"  id="languages-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Language</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="language">Language</label>
        <input type="text" id="language" v-model="language.language" required />
      </div>
      <div class="form-group">
        <label for="proficiencyCEFR">Proficiency (CEFR)</label>
        <select id="proficiencyCEFR" v-model="language.proficiencyCEFR" required>
          <option value="" disabled>Select proficiency level</option>
          <option v-for="level in proficiencyLevels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>
      <button type="submit" class="submit-icon-btn">
        <Send></Send>
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
