<script setup>
import { ref } from "vue";
import Send from "@/components/icons/Send.vue";

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const hobby = ref({
  name: ""
});

const submitForm = () => {
  // Log the hobby JSON to the console
  console.log(JSON.stringify(hobby.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", hobby.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  hobby.value = {
    name: ""
  };
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="hobbies-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>Hobby</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Hobby Name</label>
        <input type="text" id="name" v-model="hobby.name" required />
      </div>
      <button type="submit" class="submit-icon-btn">
        <Send></Send>
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
