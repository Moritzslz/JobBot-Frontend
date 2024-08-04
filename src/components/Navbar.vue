<script setup>
import Menu from "@/components/icons/Menu.vue";
import LocalePicker from "@/components/LocalePicker.vue";
import ThemePicker from "@/components/ThemePicker.vue";
import ToggleButton from "@/components/ToggleButton.vue";

defineProps({
  svg: String,
  svgColor: String,
  hrefHome: String,
  hrefLogin: String,
  hrefSignup: String,
  navItem1: String,
  navItem2: String,
  navItem3: String,
  navItem4: String,
  navItem5: String,
  navItem6: String,
  href1: String,
  href2: String,
  href3: String,
  href4: String,
  href5: String,
  href6: String,
})
</script>

<template>
  <div class="nav-wrapper">
    <nav class="navbar">
      <a>
        <component class="logo-mark" :class="svgColor" :is="svg"></component>
      </a>
      <a v-if="navItem1" :href="href1">{{ navItem1 }}</a>
      <a v-if="navItem2" :href="href2">{{ navItem2 }}</a>
      <a v-if="navItem3" :href="href3">{{ navItem3 }}</a>
      <a v-if="navItem4" :href="href4">{{ navItem4 }}</a>
      <a v-if="navItem5" :href="href5">{{ navItem5 }}</a>
      <a v-if="navItem6" :href="href6">{{ navItem6 }}</a>
    </nav>
    <div>
      <LocalePicker></LocalePicker>
      <ThemePicker></ThemePicker>
    </div>
    <div>
      <a class="button button-secondary" :href="hrefLogin">{{ $t("textLogin") }}</a>
      <a class="button" :href="hrefSignup">{{ $t("textSignUp") }}</a>
    </div>
    <Menu class="menu-icon" :class="svgColor"></Menu>
  </div>
</template>

<style scoped>

</style>