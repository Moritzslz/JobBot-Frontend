<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import SkillsForm from "@/components/chat/resume/SkillsForm.vue";
import WorkExperienceForm from "@/components/chat/resume/WorkExperienceForm.vue";
import EducationForm from "@/components/chat/resume/EducationForm.vue";
import BulletPointEditor from "@/components/chat/resume/BulletPointEditor.vue";
import AdditionalExperienceForm from "@/components/chat/resume/AdditionalExperienceForm.vue";
import PersonalProjectsForm from "@/components/chat/resume/PersonalProjectsForm.vue";
import CertificationsForm from "@/components/chat/resume/CertificationsForm.vue";
import LanguagesForm from "@/components/chat/resume/LanguagesForm.vue";
import HobbiesForm from "@/components/chat/resume/HobbiesForm.vue";
import AwardsForm from "@/components/chat/resume/AwardsForm.vue";
import LanguageSelector from "@/components/chat/LanguageSelector.vue";
import JobDescriptionForm from "@/components/chat/JobDescriptionForm.vue";
import ReceiverContact from "@/components/chat/coverletter/ReceiverContact.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const serverMessage = ref('');

// Define a reactive property to track the active form
const activeForm = ref(null);
const messages = ref([]);
let websocket;

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
  }

  // Simulate server response
  // setTimeout(() => {
  //  messages.value.push({ text: 'Thank you for your submission. We have received your data.', isUser: false });
  //}, 1000);
};

const handleFormClosed = () => {
  activeForm.value = null; // Close the currently active form
};

// Define the forms available
const forms = {
  workExperience: WorkExperienceForm,
  education: EducationForm,
  personalProjects: PersonalProjectsForm,
  certifications: CertificationsForm,
  languages: LanguagesForm,
  hobbies: HobbiesForm,
  additionalExperience: AdditionalExperienceForm,
  awards: AwardsForm,
  documentLanguage: LanguageSelector,
  bulletPointEditor: BulletPointEditor,
  skillsForm: SkillsForm,
  receiverContact: ReceiverContact,
  jobDescription: JobDescriptionForm,
};

const addServerMessage = (text, isError = false) => {
  messages.value.push({ text, isUser: false, isError });
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
  <div class="chat-ui">
    <div class="chat-messages">
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['chat-message', message.isUser ? 'user-message' : 'server-message']"
      >
        <pre>{{ message.text }}</pre>
      </div>
      <!-- Display the active form as a message -->
      <component :is="forms[activeForm]"
                 v-if="activeForm"
                 class="chat-message user-message"
                 @formSubmitted="handleFormSubmitted"
                 @formClosed="handleFormClosed" />
    </div>
    <div class="chat-slider">
      <button v-for="(form, key) in forms" :key="key" @click="setActiveForm(key)">
        {{ key.replace(/([A-Z])/g, ' $1').toUpperCase() }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-ui {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 50vw;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  background: #f1f1f1;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
}

.user-message {
  align-self: flex-end;
  background: #007bff;
  color: white;
}

.server-message {
  align-self: flex-start;
  color: black;
  background: #e0e0e0;
}

.chat-message pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.chat-slider {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #eee;
}

.chat-slider button {
  margin: 0 5px;
  padding: 10px 15px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.chat-slider button:hover {
  background: #0056b3;
}
</style>
