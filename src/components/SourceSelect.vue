<script setup>
import '@/assets/css/main.css';
import '@/assets/css/variables.css';
defineProps({
  selected: String
})
</script>

<template>
    <select id="source-select" name="source" required>
      <option value="" disabled selected>{{ $t("sourceSelect.placeholder") }}</option>
      <option value="referral">{{ $t("sourceSelect.referral") }}</option>
      <option value="flyer">{{ $t("sourceSelect.flyer") }}</option>
      <option value="university">{{ $t("sourceSelect.university") }}</option>
      <option value="online_search">{{ $t("sourceSelect.onlineSearch") }}</option>
      <option value="whatsapp_group">{{ $t("sourceSelect.whatsappGroup") }}</option>
      <option value="instagram">{{ $t("sourceSelect.instagram") }}</option>
      <option value="youtube">{{ $t("sourceSelect.youtube") }}</option>
      <option value="linkedin">{{ $t("sourceSelect.linkedin") }}</option>
      <option value="tiktok">{{ $t("sourceSelect.tiktok") }}</option>
      <option value="event">{{ $t("sourceSelect.event") }}</option>
      <option value="digital_display">{{ $t("sourceSelect.digitalDisplay") }}</option>
      <option value="print_ad">{{ $t("sourceSelect.printAd") }}</option>
      <option value="online_ad">{{ $t("sourceSelect.onlineAd") }}</option>
      <option value="website_blog">{{ $t("sourceSelect.websiteBlog") }}</option>
      <option value="other">{{ $t("sourceSelect.other") }}</option>
    </select>
</template>

<style scoped>

</style>