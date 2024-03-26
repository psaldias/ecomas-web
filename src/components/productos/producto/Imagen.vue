<template>
  <div class="imagen">
    <router-link :to="url" v-html="imagen" :aria-label="alt"> </router-link>
  </div>
</template>
<script>
export default {
  props: {
    imagen: "",
    alt: "",
    url: "",
  },
  date() {
    return {};
  },
};
</script>
