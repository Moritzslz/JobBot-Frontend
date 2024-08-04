<script setup>
import { ref, watch } from 'vue';
import Send from "@/components/icons/Send.vue";

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
  bulletPoints.value.push('');
};

// Method to remove a bullet point
const removeBulletPoint = (index) => {
  bulletPoints.value.splice(index, 1);
};

// Emit the updated bullet points to the parent component
const emitBulletPoints = () => {
  // Emit the form data to the parent component
  emit("formSubmitted", bulletPoints.value);

  emit("formClosed");
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="bullet-point-editor">
    <button class="close-button" @click="closeForm">X</button>
    <h3>Bullet Points</h3>
    <div v-for="(point, index) in bulletPoints" :key="index" class="bullet-point">
      <input type="text" v-model="bulletPoints[index]" />
      <button type="button" @click="removeBulletPoint(index)">Remove</button>
    </div>
    <button type="button" @click="addBulletPoint">Add Bullet Point</button>
    <button type="button" @click="emitBulletPoints" class="submit-icon-btn">
      <Send></Send>
    </button>
  </div>
</template>

<style scoped>

</style>