<script setup>
import Pill from "@/components/Pill.vue";

defineProps({
  heading: String,
  text: String,
  pillText: String,
  pillColor: String,
  color: String,
  svgColor: String,
  svg: String
});
</script>

<template>
  <a class="icon-item">
    <div class="icon-wrap" :class="color">
      <component class="icon" :class="svgColor" :is="svg"></component>
    </div>
    <div>
      <div class="horizontal">
        <h4>{{heading}}</h4>
        <Pill v-if="pillText" :text="pillText" :color="pillColor"/>
      </div>
      <p>{{text}}</p>
    </div>
  </a>
</template>

<style scoped>

</style>