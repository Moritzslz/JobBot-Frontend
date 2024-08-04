<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import HorizontalScrollMenu from "@/components/HorizontalScrollMenu.vue";
import Navbar from "@/components/Navbar.vue";
import WorkExperienceForm from "@/components/chat/resume/WorkExperienceForm.vue";
import EducationForm from "@/components/chat/resume/EducationForm.vue";
import PersonalProjectsForm from "@/components/chat/resume/PersonalProjectsForm.vue";
import CertificationsForm from "@/components/chat/resume/CertificationsForm.vue";
import LanguagesForm from "@/components/chat/resume/LanguagesForm.vue";
import HobbiesForm from "@/components/chat/resume/HobbiesForm.vue";
import AdditionalExperienceForm from "@/components/chat/resume/AdditionalExperienceForm.vue";
import AwardsForm from "@/components/chat/resume/AwardsForm.vue";
import BulletPointEditor from "@/components/chat/resume/BulletPointEditor.vue";
import SkillsForm from "@/components/chat/resume/SkillsForm.vue";
import JobDescriptionForm from "@/components/chat/JobDescriptionForm.vue";
import JobBotLogo from "@/components/icons/JobBotLogo.vue";

const router = useRouter();
const serverMessage = ref('');

// Define a reactive property to track the active form
const activeForm = ref(null);
const messages = ref([
  { text: 'This is a very long example message for testing. This is a very long example message for testing. This is a very long example message for testing. This is a very long example message for testing. This is a very long example message for testing', isUser: false, isError: true }
]);
let websocket;

const forms = {
  "jobDescriptionForm": JobDescriptionForm,
  "workExperienceForm": WorkExperienceForm,
  "educationForm": EducationForm,
  "skillsForm": SkillsForm,
  "personalProjectsForm": PersonalProjectsForm,
  "additionalExperienceForm": AdditionalExperienceForm,
  "awardsForm": AwardsForm,
  "certificationsForm": CertificationsForm,
  "languagesForm": LanguagesForm,
  "hobbiesForm": HobbiesForm,
  "bulletPointEditor": BulletPointEditor
}

// Define a function to set the active form
const setActiveForm = (form) => {
  activeForm.value = form;
};

const handleFormSubmitted = (data) => {
  // Handle form data (display it in the chat or elsewhere)
  messages.value.push({ text: JSON.stringify(data, null, 2), isUser: true });


  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify(data));
  } else {
    messages.value.push({ text: 'Failed to send message: WebSocket connection is not open.', isUser: false, isError: true });
    addServerMessage('Test with some bullet points: ["Some bullet point", "Another bullet point"]')
  }

  // Simulate server response
  // setTimeout(() => {
  //  messages.value.push({ text: 'Thank you for your submission. We have received your data.', isUser: false });
  //}, 1000);
};

const extractBulletPoints = (message) => {
  const match = message.match(/\[.*\]/);
  if (match) {
    try {
      console.log(JSON.parse(match[0]));
      return JSON.parse(match[0]);
    } catch (error) {
      console.error('Failed to parse bullet points:', error);
      return [];
    }
  }
  return [];
};

const handleFormClosed = () => {
  activeForm.value = null; // Close the currently active form
};

const addServerMessage = (text, isError = false) => {
  messages.value.push({ text, isUser: false, isError });
  if(extractBulletPoints(text).length > 0) {
    setActiveForm("bulletPointEditor") // TODO
  }
};

const initializeWebSocket = () => {
  websocket = new WebSocket('ws://localhost:8080/v1/create/resume');

  websocket.onopen = () => {
    addServerMessage('WebSocket connection established.');
  };

  websocket.onmessage = (event) => {
    addServerMessage(event.data);
  };

  websocket.onerror = (event) => {
    addServerMessage(`WebSocket connection error. Code: ${event.code}, Reason: ${event.reason}`, true);
  };

  websocket.onclose = () => {
    addServerMessage('WebSocket connection closed.', true);
  };
};

onMounted(() => {
  initializeWebSocket();
});

onUnmounted(() => {
  if (websocket) {
    websocket.close();
  }
});
</script>

<template>
  <Navbar :svg=JobBotLogo nav-item1="Link" nav-item2="Link" nav-item3="Link" nav-item4="Link" nav-item5="Link" nav-item6="Link"></Navbar>
  <div class="chat-ui">
    <div class="chat-message-wrapper">
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['chat-message', message.isUser ? 'user-message' : 'server-message']"
      >
        <div v-if=!message.isUser class="chat-message-icon" :class="[message.isError ? 'error-message' : '']">
          <JobBotLogo></JobBotLogo>
        </div>
        <div class="message-body" :class="[message.isError ? 'error-message' : '']">
          {{ message.text }}
        </div>
      </div>
      <!-- Display the active form as a message -->
      <component :is="forms[activeForm]"
                 v-if="activeForm"
                 class="message-body user-message"
                 @formSubmitted="handleFormSubmitted"
                 @formClosed="handleFormClosed" />
    </div>
  </div>
  <HorizontalScrollMenu @formSelected="setActiveForm" :forms=forms></HorizontalScrollMenu>
</template>

<style scoped>

</style>
