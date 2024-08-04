<script setup>
import { ref } from "vue";

const emit = defineEmits(["formSubmitted", "formClosed"]);

const selectedLanguage = ref("English");

const languages = ["English", "German"];

const selectLanguage = () => {
  console.log("Selected Language:", selectedLanguage.value);

  // Emit the form data to the parent component
  emit("formSubmitted", selectedLanguage.value);

  // Reset and close the form
  emit("formClosed");
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="language-selector">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Select Language</h2>
    <form @submit.prevent="selectLanguage">
      <div class="form-group">
        <label for="language">Language</label>
        <select id="language" v-model="selectedLanguage">
          <option v-for="language in languages" :key="language" :value="language">
            {{ language }}
          </option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>

</style>
