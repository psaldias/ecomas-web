

<template>
  <main class="page">
    <div class="wrapper" v-if="!cargando">

      <BannerSeccion
        :titulo="data.title.rendered"
        :imagen="data.acf.imagen_banner.sizes['2048x2048']"
      />


      <div class="columns is-centered">
        <div class="column is-9">
          <div class="content mt-6" v-if="data.content.rendered" v-html="data.content.rendered"></div>

          <acordeon class="mt-6" v-if="data.acf.items" :listado="data.acf.items"></acordeon>
        </div>
      </div>

    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>

  <Seo  v-if="!cargando && data.hasOwnProperty('yoast_head_json')" :data_api="data.yoast_head_json"></Seo>
</template>



<script>
import Marcas from "../components/general/Marcas.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import Acordeon from '../components/general/Acordeon.vue';
import CargandoSeccion from '/src/components/general/CargandoSeccion.vue';

import Seo from "../components/general/Seo.vue";

export default {
    components:{
    BannerSeccion,
    Marcas,
    Acordeon,
    CargandoSeccion,
    Seo,
},
    data() {
        return {
          data:{},
          cargando:true,
          datosPagina:{
            titulo:'',
            imagenBanner:'',
            descripcion:'',
            acordeon:[],
          }
        };
    },
    // mounted() {
    //   this.obtenerDatosPagina();

    // },
    async mounted (){
      const slug = this.$route.params.slug ?? this.$route.path;
      const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_DEFAULT+slug);
      if(respuesta){

        if(respuesta.data.length == 0){
            this.$router.replace({ name: '404' });
            return false;
        }

        this.data = respuesta.data[0];
        this.cargando = false;

        document.title = this.data.title.rendered || VUE_APP_DEFAULT_TITLE;
      }
    },

}
</script>