<script setup>
import {onMounted} from "vue";

const props = defineProps({
  hrefPP: String,
  hrefTC: String,
  gtmID: String
})

window.dataLayer = window.dataLayer || [];

// Initialize Google Tag Manager if consent is given
const script = document.createElement("script");
script.src = "https://www.googletagmanager.com/gtm.js?id=" + props.gtmID;
script.async = true;
gtag("js", new Date());
gtag("config", props.gtmID);
document.head.appendChild(script);
function gtag(){dataLayer.push(arguments);}

gtag("consent", "default", {
  "ad_storage": "denied",
  "ad_user_data": "denied",
  "ad_personalization": "denied",
  "analytics_storage": "denied"
});

const acceptCookies = () => {
  gtag("consent", "update", {
    "ad_storage": "granted",
    "ad_user_data": "granted",
    "ad_personalization": "granted",
    "analytics_storage": "granted"
  });
  document.getElementById("cookie-banner").style.display = "none";
  localStorage.setItem("cookieConsent", "all");
};

const declineCookies = () => {
  gtag("consent", "update", {
    "ad_storage": "denied",
    "ad_user_data": "denied",
    "ad_personalization": "denied",
    "analytics_storage": "denied"
  });
  document.getElementById("cookie-banner").style.display = "none";
  localStorage.setItem("cookieConsent", "essential");
};

onMounted(() => {
  const cookieConsent = localStorage.getItem("cookieConsent")
  if (cookieConsent === null) {
    document.getElementById("cookie-banner").style.display = "flex";
  } else if (cookieConsent === "all") {
    acceptCookies();
  } else if (cookieConsent === "essential") {
    declineCookies();
  }
})
</script>

<template>
<div id="cookie-banner">
  <p class="large-text">{{ $t("cookieBanner.heading") }}</p>
  <p>{{ $t("cookieBanner.textPart1") }}
    "<a @click="acceptCookies">{{ $t("cookieBanner.acceptAll") }}</a>"
    {{ $t("cookieBanner.textPart2") }}
    "<a @click="declineCookies">{{ $t("cookieBanner.declineAll") }}</a>"
    {{ $t("cookieBanner.textPart3") }}
  </p>
  <p><a :href="hrefPP">{{ $t("textPP") }}</a> | <a :href="hrefTC">{{ $t("textTC") }}</a></p>
  <div class="grid-2c m0 gap-small">
    <button @click="acceptCookies">{{ $t("cookieBanner.acceptAll") }}</button>
    <button class="button-secondary" @click="declineCookies">{{ $t("cookieBanner.declineAll") }}</button>
  </div>
</div>
</template>

<style scoped>

</style>