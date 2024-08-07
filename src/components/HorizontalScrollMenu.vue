<script setup>
import Star from "@/components/icons/Star.vue";


const props = defineProps({
  forms: {
    type: Array,
    default: () => []
  }
});

// Emit an event when a button is clicked
const emit = defineEmits(['formSelected']);

const onFormClick = (formKey) => {
  emit('formSelected', formKey);
};
</script>

<template>
  <div class="scroll-menu">
    <div v-for="(form, key) in props.forms" :key="key" @click="onFormClick(key)" class="button scroll-btn">
      <Star class="scroll-btn-icon"></Star>
      <p>ADD {{ key.replace(/([A-Z])/g, ' $1').toUpperCase() }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>