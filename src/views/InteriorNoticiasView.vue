<template>
  <main class="noticias" >
    <div class="wrapper" v-if="!cargando">
      <BannerSeccionNoticia
        :titulo="noticia.title.rendered ?? ''"
        imagen="/img/banner-interior-noticia.jpg"
      />
      <div class="columns is-centered is-gapless">
        <div class="column is-8">
          <div  class="imagen mt-4 has-text-centered" v-if=" (typeof noticia._embedded['wp:featuredmedia'] !== 'undefined')">
            <img
              :src="noticia._embedded['wp:featuredmedia']['0'].source_url"
              :alt="noticia.title.rendered"
            />
          </div>
          <div class="content mt-4" v-html="noticia.content.rendered"></div>
        </div>
      </div>
      <NoticiasDestacadas titulo="Noticias Relacionadas" />
    </div>

    <CargandoSeccion v-if="cargando"></CargandoSeccion>

  </main>
</template>

<script>
import Noticia from "../components/general/Noticia.vue";
import BannerSeccionNoticia from "../components/general/BannerSeccionNoticia.vue";
import NoticiasDestacadas from "../components/general/NoticiasDestacadas.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";

export default {
  components: {
    Noticia,
    BannerSeccionNoticia,
    NoticiasDestacadas,
    CargandoSeccion
},
  data() {
    return {
      cargando:true,
      noticia:{
      },
      contenidoInicial: {},
    };
  },

  async mounted (){
    const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_INTERIOR_NOTICIA + this.$route.params.slug);
    if(respuesta){
      this.noticia = respuesta.data[0];
      this.cargando = false;
    }

    if(!this.noticia)
      this.$router.replace({ name: '404' })

    document.title = this.noticia.title.rendered || VUE_APP_DEFAULT_TITLE;
  },
  computed: {
  },
  methods: {},
};
</script>
