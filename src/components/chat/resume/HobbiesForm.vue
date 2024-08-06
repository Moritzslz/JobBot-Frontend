<script setup>
import {ref, watch} from "vue";
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";
import DeleteRight from "@/components/icons/DeleteRight.vue";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

// Define props
const props = defineProps({
  initialHobbies: {
    type: Array,
    default: () => []
  }
});

// Reactive hobbies array
const hobbies = ref([...props.initialHobbies]);

// Watch for changes in props.initialSkills and update skills
watch(() => props.initialHobbies, (newVal) => {
  hobbies.value = [...newVal];
});

// Method to add a new skill
const addHobby = () => {
  hobbies.value.push('');
};

// Method to remove a skill
const removeHobby = (index) => {
  hobbies.value.splice(index, 1);
};

const emitHobbies = () => {
  let json = JSON.stringify(hobbies.value, null, 2);
  let prompt = t("resumePrompts.addToResume").replace("{}", t("hobbiesForm.prompt")) + json;

  // Create a prettified message
  let message = t("resumePrompts.addToResume").replace("{}", t("hobbiesForm.prompt")) + "<br>";

  // Loop through all keys and values
  for (const bulletPoint of Object.entries(hobbies.value)) {
    message += `- ${bulletPoint[1]}<br>`;
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  hobbies.value = [];
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="hobbies-form">
    <button class="close-button" @click="closeForm">X</button>
    <h3>{{ t("hobbiesForm.name") }}</h3>
    <div v-for="(skill, index) in hobbies" :key="index" class="hobby-item">
      <button type="button" class="icon-btn" @click="removeHobby(index)">
        <DeleteRight></DeleteRight>
      </button>
      <input type="text" v-model="hobbies[index]" :placeholder='t("hobbiesForm.hobbyPlaceholder")' />
    </div>
    <button type="button" @click="addHobby">{{ t("hobbiesForm.addButton") }}</button>
    <button type="button" class="submit-icon-btn" @click="emitHobbies">
      <Send></Send>
    </button>
  </div>
</template>

<style scoped>

</style>
