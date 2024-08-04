<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const certification = ref({
  certificateName: "",
  issuer: "",
  issueDate: "",
  url: "",
  bulletList: []
});

const details = ref("");

const submitForm = () => {
  // Split details into a bullet list
  certification.value.bulletList = details.value.split("\n").filter(line => line.trim() !== "");

  // Log the certification JSON to the console
  console.log(JSON.stringify(certification.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", certification.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  certification.value = {
    certificateName: "",
    issuer: "",
    issueDate: "",
    url: "",
    bulletList: []
  };
  details.value = "";
};

// Define the maximum length for the description
const MAX_TEXTAREA_LENGTH = 1000;

// Computed property for remaining characters
const remainingChars = computed(() => {
  return MAX_TEXTAREA_LENGTH - details.value.length;
});

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="certifications-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Certification</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="certificateName">Certificate Name</label>
        <input type="text" id="certificateName" v-model="certification.certificateName" required />
      </div>
      <div class="form-group">
        <label for="issuer">Issuer</label>
        <input type="text" id="issuer" v-model="certification.issuer" required />
      </div>
      <div class="form-group">
        <label for="issueDate">Issue Date (YYYY-MM)</label>
        <input type="month" id="issueDate" v-model="certification.issueDate" required />
      </div>
      <div class="form-group">
        <label for="url">URL (Optional)</label>
        <input type="url" id="url" v-model="certification.url" />
      </div>
      <div class="form-group">
        <label for="details">Details (Optional)</label>
        <textarea id="details" v-model="details" :maxlength="MAX_TEXTAREA_LENGTH" placeholder="Enter details, separated by new lines"></textarea>
        <div class="char-counter">
          {{ remainingChars }} characters left
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
