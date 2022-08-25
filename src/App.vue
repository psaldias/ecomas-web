<script setup>
import { RouterView } from "vue-router";
import HeaderView from "./components/layout/HeaderView.vue";
import FooterView from "./components/layout/FooterView.vue";
</script>

<template>
  <main>
    <HeaderView />
    <router-view :key="$route.path"></router-view>
    <FooterView></FooterView>
  </main>
</template>
