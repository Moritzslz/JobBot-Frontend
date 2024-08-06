<script setup>
import {computed, ref} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

const workExperience = ref({
  jobTitle: "",
  employer: "",
  city: "",
  country: "",
  presentlyEmployed: false,
  startDate: "",
  endDate: "",
  bulletList: []
});

const responsibilities = ref("");

const submitForm = () => {
  // Split achievements into a bullet list
  workExperience.value.bulletList = responsibilities.value.split("\n").filter(line => line.trim() !== "");

  let json = JSON.stringify(workExperience.value, null, 2);
  let prompt = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("workExperienceForm.prompt")) + json;

  // Create a prettified message
  let message = t("resumePrompts.addToResumeAndSuggestBulletPoints").replace("{}", t("workExperienceForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const [key, value] of Object.entries(workExperience.value)) {
    if (key === "bulletList") {
      message += `Details:<br>`;
      value.forEach(bullet => {
        message += `  - ${bullet}<br>`;
      });
    } else {
      message += `${t(`workExperienceForm.${key}`)}: ${value}<br>`;
    }
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  workExperience.value = {
    jobTitle: "",
    employer: "",
    city: "",
    country: "",
    presentlyEmployed: false,
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
  <div class="chat-form" id="work-experience-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("workExperienceForm.name") }}</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="jobTitle">{{ t("workExperienceForm.jobTitle") }}</label>
        <input type="text" id="jobTitle" v-model="workExperience.jobTitle" required />
      </div>
      <div class="form-group">
        <label for="employer">{{ t("workExperienceForm.employer") }}</label>
        <input type="text" id="employer" v-model="workExperience.employer" required />
      </div>
      <div class="form-group">
        <label for="city">{{ t("workExperienceForm.city") }}</label>
        <input type="text" id="city" v-model="workExperience.city" />
      </div>
      <div class="form-group">
        <label for="country">{{ t("workExperienceForm.country") }}</label>
        <input type="text" id="country" v-model="workExperience.country" />
      </div>
      <div class="form-group">
        <label for="startDate">{{ t("workExperienceForm.startDate") }}</label>
        <input type="month" id="startDate" v-model="workExperience.startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">{{ t("workExperienceForm.endDate") }}</label>
        <input type="month" id="endDate" v-model="workExperience.endDate" :disabled="workExperience.presentlyEmployed" />
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="workExperience.presentlyEmployed" />
          {{ t("workExperienceForm.presentlyEmployed") }}
        </label>
      </div>
      <div class="form-group">
        <label for="responsibilities">{{ t("workExperienceForm.bulletListName") }}</label>
        <textarea id="responsibilities" v-model="responsibilities" :maxlength="MAX_TEXTAREA_LENGTH" :placeholder='t("workExperienceForm.bulletListPlaceholder")'></textarea>
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