<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  videoId: String
});

const playerId = "youtube-player";
const player = ref(null);
const playerContainer = ref(null);
const cookiesAccepted = ref(false);

onMounted(() => {
  // Check if cookies have been accepted
  if (localStorage.getItem("cookieConsent") === "all") {
    cookiesAccepted.value = true;
    loadYouTubePlayer();
  }
});

function loadYouTubePlayer() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.onYouTubeIframeAPIReady = () => {
    new YT.Player(player.value, {
      height: "100%",
      width: "100%",
      videoId: props.videoId
    });
  };
}
</script>

<template>
  <div class="video-player" v-if="cookiesAccepted" ref="playerContainer">
    <div ref="player" :id="playerId"></div>
  </div>
  <p v-else>{{ $t("video.cookies") }}</p>
</template>

<style src="../css/main.css"></style>
<style src="../css/variables.css"></style>