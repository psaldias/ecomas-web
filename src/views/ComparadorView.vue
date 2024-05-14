<template>
  <main class="page comparador">
    <div class="wrapper" v-if="!cargando">
      <BannerSeccion class="v2 no-icon" :titulo="data.title.rendered"
        :imagen="data.acf.imagen_banner.sizes['2048x2048']" v-if="data.acf.imagen_banner" />

      <div class="columns is-centered">
        <div class="column is-9">
          <div class="content has-text-centered">
            <h3 class="primero" v-if="!data.acf.imagen_banner">
              {{ data.title.rendered }}
            </h3>
          </div>
          <div class="content mt-6" v-if="data.content.rendered" v-html="data.content.rendered"></div>

          <comparador></comparador>
        </div>
      </div>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>

  <Seo v-if="!cargando && data.hasOwnProperty('yoast_head_json')" :data_api="data.yoast_head_json"></Seo>
</template>

<script>
import Marcas from "../components/general/Marcas.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import Comparador from "../components/comparador/Comparador.vue";
import Acordeon from "../components/general/Acordeon.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";

import Seo from "../components/general/Seo.vue";

export default {
  components: {
    BannerSeccion,
    Marcas,
    Acordeon,
    CargandoSeccion,
    Comparador,
    Seo,
  },
  data() {
    return {
      data: {
        acf: {
          imagen_banner: false,
        },
      },
      cargando: true,
      datosPagina: {
        titulo: "",
        imagenBanner: "",
        descripcion: "",
        acordeon: [],
      },
    };
  },
  // mounted() {
  //   this.obtenerDatosPagina();

  // },
  async mounted() {
    const slug = this.$route.params.slug ?? this.$route.path;
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_DEFAULT + slug
    );
    if (respuesta) {
      if (respuesta.data.length == 0) {
        this.$router.replace({ name: "404" });
        return false;
      }

      this.data = respuesta.data[0];
      this.cargando = false;

      document.title = this.data.title.rendered || VITE_DEFAULT_TITLE;
    }
  },
};
</script>
