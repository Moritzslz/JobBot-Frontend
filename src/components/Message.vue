<script setup>
defineProps({
  message: String,
  color: String
});
</script>

<template>
  <div v-if="message" class="message" :class="color">
    {{ message }}
  </div>
</template>

<style scoped>

</style>