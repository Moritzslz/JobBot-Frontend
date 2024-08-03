<script setup>
import { ref, onMounted } from 'vue';
import Chat from "@/components/chat/Chat.vue";
import '@/assets/css/main.css';
import '@/assets/css/variables.css';

// The message received from the server
const serverMessage = `Hi thanks for sending me your work experience. Here are some suggested bullet points: ["Some bullet point", "Another bullet point"]. Feel free to alter and select the ones you like. How else might I assist you?`;

// Reactive variable to store initial bullet points
const initialBulletPoints = ref([]);

// Function to extract and parse the bullet points from the server message
const extractBulletPoints = (message) => {
const match = message.match(/\[.*\]/);
if (match) {
  try {
    return JSON.parse(match[0]);
  } catch (error) {
    console.error('Failed to parse bullet points:', error);
    return [];
  }
}
  return [];
};

// On component mount, extract the bullet points from the server message
onMounted(() => {
  initialBulletPoints.value = extractBulletPoints(serverMessage);
});

// Method to handle the updated bullet points
const handleUpdateBulletPoints = (updatedPoints) => {
  initialBulletPoints.value = updatedPoints;
  console.log('Updated Bullet Points:', updatedPoints);
};

// Simulating initial skills from the server
const skills = ref([
  "JavaScript",
  "Vue.js",
  "CSS"
]);

// Method to handle the updated skills
const handleUpdateSkills = (updatedSkills) => {
  skills.value = updatedSkills;
  console.log("Updated Skills:", updatedSkills);
};
</script>

<template>
  <router-view />
</template>

<style scoped>

</style>
