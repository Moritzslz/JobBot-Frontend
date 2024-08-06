<script setup>
import { ref, watch } from 'vue';
import DeleteRight from "@/components/icons/DeleteRight.vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

// Define props
const props = defineProps({
  initialSkills: {
    type: Array,
    default: () => []
  }
});

// Reactive skills array
const skills = ref([...props.initialSkills]);

// Watch for changes in props.initialSkills and update skills
watch(() => props.initialSkills, (newVal) => {
  skills.value = [...newVal];
});

// Method to add a new skill
const addSkill = () => {
  skills.value.push('');
};

// Method to remove a skill
const removeSkill = (index) => {
  skills.value.splice(index, 1);
};

// Emit the updated skills to the parent component
const emitSkills = () => {
  let json = JSON.stringify(skills.value, null, 2);
  let prompt = t("resumePrompts.addToResume").replace("{}", t("skillsForm.prompt")) + json;

  // Create a prettified message
  let message = t("resumePrompts.addToResume").replace("{}", t("skillsForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const bulletPoint of Object.entries(skills.value)) {
    message += `- ${bulletPoint[1]}<br>`;
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  skills.value = [];
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="skills-form">
    <button class="close-button" @click="closeForm">X</button>
    <h3>{{ t("skillsForm.name") }}</h3>
    <div v-for="(skill, index) in skills" :key="index" class="skill-item">
      <button type="button" class="icon-btn" @click="removeSkill(index)">
        <DeleteRight></DeleteRight>
      </button>
      <input type="text" v-model="skills[index]" :placeholder='t("skillsForm.skillPlaceholder")' />
    </div>
    <button type="button" @click="addSkill">{{ t("skillsForm.addButton") }}</button>
    <button type="button" class="submit-icon-btn" @click="emitSkills">
      <Send></Send>
    </button>
  </div>
</template>

<style scoped>

</style>