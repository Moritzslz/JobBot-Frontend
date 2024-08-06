<script setup>
import { ref } from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["formSubmitted", "formClosed"]);

const selectedLanguage = ref("German");

const languages = [t("languageSelector.german"), t("languageSelector.english")];

const selectLanguage = () => {
  let message = t("resumePrompts.selectLanguage").replace("{}", selectedLanguage.value);

  // Emit the form data to the parent component
  emit("formSubmitted", message, message);

  // Hide and close the form
  emit("formClosed");
  emit("hideForm")
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="language-selector">
    <button class="close-button" @click="closeForm">X</button>
    <h2>{{ t("languageSelector.name") }}</h2>
    <form @submit.prevent="selectLanguage">
      <div class="form-group">
        <label for="language">{{ t("languageSelector.language") }}</label>
        <select id="language" v-model="selectedLanguage">
          <option v-for="language in languages" :key="language" :value="language">
            {{ language }}
          </option>
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
