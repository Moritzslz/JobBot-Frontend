<script setup>
import { ref, watch } from "vue";
import Send from "@/components/icons/Send.vue";
import { useI18n } from "vue-i18n";
import DeleteRight from "@/components/icons/DeleteRight.vue";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

// Define props
const props = defineProps({
  initialLanguages: {
    type: Array,
    default: () => []
  }
});

// Reactive languages array
const languages = ref([...props.initialLanguages]);

// Watch for changes in props.initialLanguages and update languages
watch(() => props.initialLanguages, (newVal) => {
  languages.value = [...newVal];
});

// Method to add a new language
const addLanguage = () => {
  languages.value.push({
    language: "",
    proficiencyCEFR: ""
  });
};

// Method to remove a language
const removeLanguage = (index) => {
  languages.value.splice(index, 1);
};

const emitLanguages = () => {
  let json = JSON.stringify(languages.value, null, 2);
  let prompt = t("resumePrompts.addToResume").replace("{}", t("languagesForm.prompt")) + json;

  // Create a prettified message
  let message = t("resumePrompts.addToResume").replace("{}", t("languagesForm.prompt")) + "<br>";

  // Loop through all keys and values
  languages.value.forEach((language, index) => {
    message += `${t("languagesForm.language")}: ${language.language}<br>`;
    message += `${t("languagesForm.proficiencyCEFR")}: ${language.proficiencyCEFR}<br>`;
  });

  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  languages.value = [];
};

const closeForm = () => {
  emit("formClosed");
};

const proficiencyLevels = [
  "A1", "A2", "B1", "B2", "C1", "C2"
];
</script>

<template>
  <div class="chat-form" id="languages-form">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("languagesForm.name") }}</h2>
    <div v-for="(language, index) in languages" :key="index" class="language-item">
      <button type="button" class="icon-btn" @click="removeLanguage(index)">
        <DeleteRight></DeleteRight>
      </button>
      <div class="form-group">
        <label for="language">{{ t("languagesForm.language") }}</label>
        <input type="text" v-model="language.language" required />
      </div>
      <div class="form-group">
        <label for="proficiencyCEFR">{{ t("languagesForm.proficiencyCEFR") }}</label>
        <select v-model="language.proficiencyCEFR" required>
          <option value="" disabled>{{ t("languagesForm.proficiencyPlaceholder") }}</option>
          <option v-for="level in proficiencyLevels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>
    </div>
    <button type="button" @click="addLanguage">{{ t("languagesForm.addButton") }}</button>
    <button type="button" class="submit-icon-btn" @click="emitLanguages">
      <Send></Send>
    </button>
  </div>
</template>

<style scoped>

</style>
