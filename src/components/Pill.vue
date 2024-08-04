<script setup>
defineProps({
  text: String,
  color: String
});
</script>

<template>
  <div :class="color" class="pill">{{ text }}</div>
</template>

<style scoped>

</style>