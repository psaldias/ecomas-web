

<template>
  <main class="page">
    <div class="wrapper">

      <BannerSeccion
        :titulo="datosPagina.titulo"
        :imagen="datosPagina.imagenBanner"
      />


      <div class="columns is-centered">
        <div class="column is-9">
          <div class="content mt-6" v-if="datosPagina.descripcion" v-html="datosPagina.descripcion"></div>

          <acordeon class="mt-6" v-if="datosPagina.acordeon" :listado="datosPagina.acordeon"></acordeon>
        </div>
      </div>

      <!-- <marcas titulo="Nuestras Marcas" /> -->
    </div>
  </main>
</template>



<script>
import {useRoute} from 'vue-router'
import Marcas from "../components/general/Marcas.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import Acordeon from '../components/general/Acordeon.vue';
import BD_JSON from '../assets/helpers/ContenidoPaginas.json';


export default {
    components:{
      BannerSeccion,
      Marcas,
      Acordeon
    },
    data() {
        return {
          datosPagina:{
            titulo:'',
            imagenBanner:'',
            descripcion:'',
            acordeon:[],
          }
        };
    },
    mounted() {
      this.obtenerDatosPagina();

    },
    computed: {
        idPagina(){
            return  useRoute().path.replace(/^(\/+)/, '');
        }
    },
    methods: {
      async obtenerDatosPagina(){
        let id = this.idPagina;
        // console.log(BD_JSON)
        let data = BD_JSON.find( (element,index) => {
          let key = Object.keys(element)[0];
          return (key == id)
        });
        if(!data){
          this.$router.replace({ name: '404' })
        }
        this.datosPagina = Object.values(data)[0]
        document.title = this.datosPagina.titulo || VUE_APP_DEFAULT_TITLE;
      }
    },
}
</script>