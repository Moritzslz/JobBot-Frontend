<script setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import HorizontalScrollMenu from "@/components/HorizontalScrollMenu.vue";
import Navbar from "@/components/Navbar.vue";
import JobDescriptionForm from "@/components/chat/resume/JobDescriptionForm.vue";
import JobBotLogo from "@/components/icons/JobBotLogo.vue";
import { useI18n } from "vue-i18n";
import LanguageSelector from "@/components/chat/resume/LanguageSelector.vue";
import SubmitCoverLetter from "@/components/chat/coverletter/SubmitCoverLetter.vue";

const { t } = useI18n();
const { appContext } = getCurrentInstance();
const webSocketUrl = appContext.config.globalProperties.$webSocketUrl;

// Define a reactive property to track the active form
const activeForm = ref(null);
const activeFormProps = ref(null);
const messages = ref([]);
const showBulletPointEditor = ref(false);
const bulletPoints = ref([]);
let websocket;

const forms = {
  "languageSelector": LanguageSelector,
  "jobDescriptionForm": JobDescriptionForm,
  "submitCoverLetter": SubmitCoverLetter
}

// Define a function to set the active form
const setActiveForm = (form) => {
  activeForm.value = form;
};

const handleFormSubmitted = (message, prompt) => {
  console.log(message)
  console.log(prompt);
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(prompt);
    addUserMessage(message)
  } else {
    addServerMessage(t("messages.webSocketSendMessageFailed"), true);
    // TODO For testing
    addServerMessage('Test with some bullet points: ["Some bullet point", "Another bullet point"]');
  }
};

const handleFormClosed = () => {
  activeForm.value = null; // Close the currently active form
};

const handleFormHidden = () => {
  // TODO
}

const addServerMessage = (text, isError = false, isButton = false, html = "") => {
  messages.value.push({text, isUser: false, isError, isButton, html});
};

const addUserMessage = (text) => {
  messages.value.push({text, isUser: true, isError: false, isButton: false, html:""});
};

const initializeWebSocket = () => {
  websocket = new WebSocket(webSocketUrl + "/v1/create/cover-letter");

  websocket.onopen = () => {
    setTimeout(() => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        let message = t("resumePrompts.startChat");
        websocket.send(message);
      }
    }, 1000);
  };

  websocket.onmessage = (event) => {
    addServerMessage(event.data);
  };

  websocket.onerror = (event) => {
    console.log(event)
  };

  websocket.onclose = (event) => {
    const statusCode = event.code;
    const reason = event.reason || t("messages.defaultCloseReason");
    if (statusCode === 1000 && reason === "Function call successful.") {
      addServerMessage(t("chat.successResume"))
      showProfileButton()
      addServerMessage(t("chat.feedback"))
      showFeedbackButton()
      addServerMessage(t("chat.donation"))
      showDonationButton()
    } else if (event.code === 1003) {
      addServerMessage(t("messages.webSocketAuthFailed"), true);
    } else if (event.code === 1008 && reason === "Insufficient token balance.") {
      addServerMessage(t("messages.tokenBalanceInsufficient"), true);
    } else if (event.code === 1008 && reason === "Resume required but not found.") {
      addServerMessage(t("messages.resumeRequired"), true);
    } else {
      addServerMessage(t("messages.webSocketConnectionClosed"));
    }
  };
};

const showProfileButton = () => {
  const buttonHtml = `
    <button onclick="window.location.href='/profile'">
      ${t("chat.profileButton")}
    </button>
  `;
  addServerMessage('', false, true, buttonHtml);
};

const showFeedbackButton = () => {
  const buttonHtml = `
    <button onclick="window.location.href='/feedback-survey'">
      ${t("chat.feedbackButton")}
    </button>
  `;
  addServerMessage('', false, true, buttonHtml);
};

const showDonationButton = () => {
  const buttonHtml = `
    <button onclick="window.location.href='https://paypal.me/JobBotDonation'">
      ${t("chat.donationButton")}
    </button>
  `;
  addServerMessage('', false, true, buttonHtml);
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
  <Navbar :svg="JobBotLogo" nav-item1="Link" nav-item2="Link" nav-item3="Link" nav-item4="Link" nav-item5="Link"
          nav-item6="Link"></Navbar>
  <div class="chat-ui">
    <div class="chat-message-wrapper">
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class='["chat-message", message.isUser ? "user-message" : "server-message"]'
      >
        <div v-if="!message.isUser" class="chat-message-icon" :class='[message.isError ? "error-message" : ""]'>
          <JobBotLogo></JobBotLogo>
        </div>
        <div class="message-body" :class='[message.isError ? "error-message" : ""]'>
          <div v-if="!message.isButton" v-html="message.text"></div>
          <div v-if="message.isButton" v-html="message.html"></div>
        </div>
      </div>
      <!-- Display the active form as a message -->
      <component :is="forms[activeForm]"
                 v-if="activeForm"
                 v-bind="activeFormProps"
                 class="message-body user-message"
                 @formSubmitted="handleFormSubmitted"
                 @formClosed="handleFormClosed"
                 @hideForm="handleFormHidden" />
    </div>
  </div>
  <HorizontalScrollMenu @formSelected="setActiveForm" :forms="forms"></HorizontalScrollMenu>
</template>

<style scoped>

</style>
