<script setup>
import {computed, onMounted, ref} from "vue";
import { i18n } from '../main';
import ToggleButton from "@/components/ToggleButton.vue";

const selectedLocale = ref(localStorage.getItem("locale") || "de");
const flag = computed(() => selectedLocale.value === "de" ? "🇩🇪" : "🇬🇧");
const side = computed(() => selectedLocale.value === "de" ? "left" : "right");

const toggleLocale = () => {
  if (selectedLocale.value === "en") {
    selectedLocale.value = "de";
    changeLocale();
  } else {
    selectedLocale.value = "en";
    changeLocale();
  }
}

const changeLocale = () => {
  if (selectedLocale.value === "de" || selectedLocale.value === "en") {
    i18n.global.locale = selectedLocale.value;
    localStorage.setItem("locale", selectedLocale.value);
  }
};

onMounted(() => {
  changeLocale();
})
</script>

<template>
    <ToggleButton @click="toggleLocale" :text="flag" :side="side"></ToggleButton>
</template>

<style scoped>

</style>