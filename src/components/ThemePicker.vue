<script setup>
import {computed, onMounted, ref} from "vue";
import Sun from "@/components/icons/Sun.vue";
import Moon from "@/components/icons/Moon.vue";
import ToggleButton from "@/components/ToggleButton.vue";

const selectedTheme = ref(localStorage.getItem("theme"));
const svg = computed(() => selectedTheme.value === "light" ? Sun : Moon);
const side = computed(() => selectedTheme.value === "light" ? "left" : "right");

const toggleTheme = () => {
  if (selectedTheme.value === "dark") {
    selectedTheme.value = "light";
    changeTheme();
  } else {
    selectedTheme.value = "dark";
    changeTheme();
  }
}

const changeTheme = () => {
  if (selectedTheme.value === "dark") {
    document.documentElement.classList.add("dark-theme");
    document.documentElement.classList.remove("light-theme");
  }
  if (selectedTheme.value === "light") {
    document.documentElement.classList.remove("dark-theme");
    document.documentElement.classList.add("light-theme");
  }
  localStorage.setItem("theme", selectedTheme.value);
};

onMounted(() => {
  changeTheme();
})
</script>

<template>
    <ToggleButton @click="toggleTheme" :svg="svg" :side="side"></ToggleButton>
</template>

<style scoped>

</style>