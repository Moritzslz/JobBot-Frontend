<script setup>
import { ref, watch } from 'vue';
import Send from "@/components/icons/Send.vue";
import {useI18n} from "vue-i18n";
import DeleteRight from "@/components/icons/DeleteRight.vue";

const { t } = useI18n();

// Emit function to communicate with the parent component
const emit = defineEmits(["formSubmitted", "formClosed"]);

// Define props
const props = defineProps({
  initialBulletPoints: {
    type: Array,
    default: () => []
  }
});

// Reactive bullet points array
const bulletPoints = ref([...props.initialBulletPoints]);

// Watch for changes in props.initialBulletPoints and update bulletPoints
watch(() => props.initialBulletPoints, (newVal) => {
  bulletPoints.value = [...newVal];
});

// Method to add a new bullet point
const addBulletPoint = () => {
  bulletPoints.value.push("");
};

// Method to remove a bullet point
const removeBulletPoint = (index) => {
  bulletPoints.value.splice(index, 1);
};

// Emit the updated bullet points to the parent component
const emitBulletPoints = () => {
  let json = JSON.stringify(bulletPoints.value, null, 2);
  let prompt = t("resumePrompts.selectBulletPoints") + json;

  // Create a prettified message
  let message = t("resumePrompts.selectBulletPoints") + "<br>";

  // Loop through all keys and values
  for (const bulletPoint of Object.entries(bulletPoints.value)) {
    message += `- ${bulletPoint[1]}<br>`;
  }
  // Emit the form data to the parent component
  emit("formSubmitted", message, prompt);

  // Reset and close the form
  resetForm();
  emit("formClosed");
};

const resetForm = () => {
  bulletPoints.value = [];
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="bullet-point-editor">
    <button class="close-button" @click="closeForm">X</button>
    <h3>{{ t("bulletPointEditor.name") }}</h3>
    <div v-for="(point, index) in bulletPoints" :key="index" class="bullet-point">
      <textarea v-model="bulletPoints[index]" />
      <button type="button" class="icon-btn" @click="removeBulletPoint(index)">
        <DeleteRight></DeleteRight>
      </button>
    </div>
    <button type="button" @click="addBulletPoint">{{ t("bulletPointEditor.addButton") }}</button>
    <button type="button" @click="emitBulletPoints" class="submit-icon-btn">
      <Send></Send>
    </button>
  </div>
</template>

<style scoped>

</style>
