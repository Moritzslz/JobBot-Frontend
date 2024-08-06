<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

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

  let json = JSON.stringify(award.value, null, 2);
  let prompt = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("awardsForm.prompt")) + json;

  // Create a prettified message
  let message = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("awardsForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const [key, value] of Object.entries(award.value)) {
    if (key === "bulletList") {
      message += `Details:<br>`;
      value.forEach(bullet => {
        message += `  - ${bullet}<br>`;
      });
    } else {
      message += `${t(`awardsForm.${key}`)}: ${value}<br>`;
    }
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

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
    <h2>{{ t("awardsForm.name") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="awardName">{{ t("awardsForm.Auszeichnung") }}</label>
        <input type="text" id="awardName" v-model="award.awardName" required />
      </div>
      <div class="form-group">
        <label for="issuer">{{ t("awardsForm.issuer") }}</label>
        <input type="text" id="issuer" v-model="award.issuer" required />
      </div>
      <div class="form-group">
        <label for="issueDate">{{ t("awardsForm.issueDate") }}</label>
        <input type="month" id="issueDate" v-model="award.issueDate" required />
      </div>
      <div class="form-group">
        <label for="url">{{ t("awardsForm.url") }}</label>
        <input type="url" id="url" v-model="award.url" />
      </div>
      <div class="form-group">
        <label for="details">{{ t("awardsForm.bulletListName") }}</label>
        <textarea id="details" v-model="details" :maxlength="MAX_TEXTAREA_LENGTH" :placeholder='t("awardsForm.bulletListPlaceholder")'></textarea>
        <div class="char-counter">
          {{ remainingChars }} {{ t("chat.remainingChars") }}
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
