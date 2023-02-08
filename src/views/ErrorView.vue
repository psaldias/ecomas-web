<template>
  <main class="page">
    <div class="wrapper">
      <!--
      <BannerSeccion
        titulo="Preguntas Frecuentes"
        :imagen="'/img/banner-'+idPagina+'.jpg'"
      /> -->
    </div>

    <div class="wrapper">
      <h1>Sitio en mantención</h1>
      <!-- <h4>Sitio no disponible</h4> -->
    </div>
  </main>
</template>

<script>
import { useRoute } from "vue-router";
import BannerSeccion from "../components/general/BannerSeccion.vue";

export default {
  components: {
    BannerSeccion,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
