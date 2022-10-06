

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
import ErrorSeccion from "@/components/general/ErrorSeccion.vue";
import CargandoSeccion from "@/components/general/CargandoSeccion.vue";
import BannerNoticias from "@/components/noticias/BannerNoticias.vue";

export default {
  components: {
    Noticia,
    ErrorSeccion,
    CargandoSeccion,
    BannerNoticias,
},
  async mounted (){
   const respuesta = await this.enviarGet('posts?_embed');
   if(respuesta){
    this.contenidoInicial = respuesta.data;
    this.cargando = false;

    if(this.contenidoInicial.title.rendered)
      document.title = this.contenidoInicial.title.rendered
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