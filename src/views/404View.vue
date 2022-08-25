

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
        <h1>Error 404</h1>
        <h4>Página no encontrada</h4>
      <marcas titulo="Nuestras Marcas" />
    </div>
  </main>
</template>



<script>
import {useRoute} from 'vue-router'
import Marcas from "../components/general/Marcas.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";

export default {
    components:{
      BannerSeccion,Marcas
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
    },
}
</script>