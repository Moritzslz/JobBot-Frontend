<script setup>
import { ref, watch } from 'vue';

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
  // Emit the form data to the parent component
  emit("formSubmitted", skills.value);

  emit("formClosed");
};

const closeForm = () => {
  emit("formClosed");
};
</script>

<template>
  <div class="chat-form" id="skills-form">
    <button class="close-button" @click="closeForm">X</button>
    <h3>Skills</h3>
    <div v-for="(skill, index) in skills" :key="index" class="skill-item">
      <input type="text" v-model="skills[index]" placeholder="Enter a skill" />
      <button type="button" @click="removeSkill(index)">Remove</button>
    </div>
    <button type="button" @click="addSkill">Add Skill</button>
    <button type="button" @click="emitSkills">Save Skills</button>
  </div>
</template>

<style scoped>
.chat-form {
  max-width: 600px;
  background-color: gray;
}
.skill-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.skill-item input {
  flex: 1;
}
.skill-item button {
  margin-left: 10px;
}
button {
  display: block;
  margin-top: 10px;
}
</style>