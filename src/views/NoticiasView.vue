

<template>
  <main class="noticias">
    <div class="wrapper" v-if="!cargando" >
        <BannerNoticias></BannerNoticias>


        <div class="columns is-multiline mt-4 is-variable is-2-desktop" >

            <div class="column is-6" v-for="noticia in contenidoInicial" :key="noticia.id">
                <Noticia :noticia="noticia"/>
            </div>
        </div>


    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>

</template>



<script>
import Noticia from "../components/general/Noticia.vue";
import ErrorSeccion from "/src/components/general/ErrorSeccion.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import BannerNoticias from "/src/components/noticias/BannerNoticias.vue";
export default {
  components: {
    Noticia,
    ErrorSeccion,
    CargandoSeccion,
    BannerNoticias,
},
  async mounted (){
   const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_NOTICIAS_LISTADO);
   if(respuesta){
    this.contenidoInicial = respuesta.data;
    this.cargando = false;


   }
  },
  data() {
    return {
      cargando:true,
      contenidoInicial:{
      },

    };
  },
  computed: {
  },
  methods: {
  },
};
</script>