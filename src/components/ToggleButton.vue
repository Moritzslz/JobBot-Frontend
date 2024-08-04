<script setup>
defineProps({
  side: String,
  svgColor: String,
  svg: String,
  text: String
})
</script>

<template>
  <div class="toggle-btn" :class="side">
    <div class="toggle-btn-circle">
      <component v-if="svg" class="toggle-btn-icon dynamic-svg" :class="svgColor" :is="svg"></component>
      <div  v-if="text" class="toggle-btn-text">{{ text }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>