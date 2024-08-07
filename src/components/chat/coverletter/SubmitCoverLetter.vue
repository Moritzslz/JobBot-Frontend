<script setup>
import {useI18n} from "vue-i18n";
import Send from "@/components/icons/Send.vue";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);


const submitForm = () => {
  let message = t("coverLetterPrompts.saveCoverLetter");
  let prompt = t("coverLetterPrompts.saveCoverLetter") + " " + t("coverLetterPrompts.savePrompt");

  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  emit("formClosed");
};

</script>

<template>
  <div class="chat-form">
    <p>{{ t("resumePrompts.saveCoverLetter") }}</p>
    <button type="submit" class="submit-icon-btn">
      <Send></Send>
    </button>
  </div>
</template>

<style scoped>

</style>