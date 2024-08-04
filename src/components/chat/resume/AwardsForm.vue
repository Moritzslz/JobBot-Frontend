<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const award = ref({
  awardName: "",
  issuer: "",
  issueDate: "",
  url: "",
  bulletList: []
});

const details = ref("");

const submitForm = () => {
  // Split details into a bullet list
  award.value.bulletList = details.value.split("\n").filter(line => line.trim() !== "");

  // Log the award JSON to the console
  console.log(JSON.stringify(award.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", award.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  award.value = {
    awardName: "",
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
  <div class="chat-form" id="awards-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Award</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="awardName">Award Name</label>
        <input type="text" id="awardName" v-model="award.awardName" required />
      </div>
      <div class="form-group">
        <label for="issuer">Issuer</label>
        <input type="text" id="issuer" v-model="award.issuer" required />
      </div>
      <div class="form-group">
        <label for="issueDate">Issue Date (YYYY-MM)</label>
        <input type="month" id="issueDate" v-model="award.issueDate" required />
      </div>
      <div class="form-group">
        <label for="url">URL (Optional)</label>
        <input type="url" id="url" v-model="award.url" />
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
