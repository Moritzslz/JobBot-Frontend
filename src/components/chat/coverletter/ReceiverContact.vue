<script setup>
import { ref } from 'vue';
import Send from "@/components/icons/Send.vue";

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

// Define the reactive object for receiver contact information
const receiverContact = ref({
  company: '',
  street: '',
  houseNumber: '',
  postalCode: '',
  city: '',
  formOfAddress: '',
  receiverSurname: ''
});

// Submit form function
const submitForm = () => {
  // Log the receiver contact JSON to the console
  console.log(JSON.stringify(receiverContact.value, null, 2));

  // Emit the form data to the parent component
  emit("formSubmitted", receiverContact.value);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

// Reset form function
const resetForm = () => {
  receiverContact.value = {
    company: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    formOfAddress: '',
    receiverSurname: ''
  };
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="receiver-contact-form">
    <h2>Receiver Contact Information</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="company">Company</label>
        <input type="text" id="company" v-model="receiverContact.company" required />
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input type="text" id="street" v-model="receiverContact.street" required />
      </div>
      <div class="form-group">
        <label for="houseNumber">House Number</label>
        <input type="text" id="houseNumber" v-model="receiverContact.houseNumber" required />
      </div>
      <div class="form-group">
        <label for="postalCode">Postal Code</label>
        <input type="text" id="postalCode" v-model="receiverContact.postalCode" required />
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input type="text" id="city" v-model="receiverContact.city" required />
      </div>
      <div class="form-group">
        <label for="formOfAddress">Form of Address</label>
        <input type="text" id="formOfAddress" v-model="receiverContact.formOfAddress" required />
      </div>
      <div class="form-group">
        <label for="receiverSurname">Receiver's Surname</label>
        <input type="text" id="receiverSurname" v-model="receiverContact.receiverSurname" required />
      </div>
      <button type="submit" class="submit-icon-btn">
        <Send></Send>
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
