<template>
  <main>
    <div v-if="!cargando">
      <div
        class="wrapper wrapper-fullm"
        v-if="contenidoInicial.acf.compra_rapida.visible"
      >
        <section class="columns compra-rapida is-vcentered is-gapless is-mobile">
          <div class="column is-narrow titulo">
            <h2 class="pr-4" v-html="contenidoInicial.acf.compra_rapida.titulo_home"></h2>
          </div>
          <div class="column is-1 is-hidden-mobile"></div>

          <CompraRapida />
        </section>
      </div>

      <div class="wrapper">
        <BannerHome :imagenes="contenidoInicial.acf.banner"></BannerHome>
      </div>

      <div class="wrapper">
        <marcas></marcas>
      </div>

      <div class="wrapper wrapper-fullm">
        <section
          class="quienes-somos-home my-6"
          v-if="contenidoInicial.acf.quienes_somos.activo"
        >
          <div class="wrapper">
            <div class="columns p-0 contenedor is-vcentered">
              <div class="column p-0 is-4 is-offset-2 contenido">
                <div class="wrap">
                  <img
                    class="mb-4"
                    :src="contenidoInicial.acf.quienes_somos.imagen.sizes.medium"
                    alt=""
                  />

                  <h1 class="mb-4">
                    <b>{{ contenidoInicial.acf.quienes_somos.titulo }}</b>
                  </h1>
                  <div
                    class="content is-fullwidth"
                    v-html="contenidoInicial.acf.quienes_somos.descripcion"
                  ></div>
                  <div class="block">
                    <router-link
                      :to="contenidoInicial.acf.quienes_somos.boton.url"
                      class="button button-2 bg-verde is-rounded"
                      v-if="contenidoInicial.acf.quienes_somos.boton.url"
                    >
                      {{ contenidoInicial.acf.quienes_somos.boton.texto }}
                      <i class="has-text-white ml-2 fa-solid fa-arrow-pointer"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column p-0 is-6 is-align-self-flex-end imagen">
                <img src="/img/bg-home-quienes-somos-planta.jpg" class="mt-6 is-block" />
              </div>
            </div>
          </div>
        </section>
        <NoticiasDestacada titulo="Noticias" />
      </div>
    </div>

    <CargandoSeccion v-if="cargando"></CargandoSeccion>
    <ErrorSeccion v-if="errorData"></ErrorSeccion>
  </main>
    <Seo  v-if="!cargando && contenidoInicial.hasOwnProperty('yoast_head_json')" :data_api="contenidoInicial.yoast_head_json"></Seo>



</template>

<script>
import CompraRapida from "/src/components/home/CompraRapida.vue";
import NoticiasDestacada from "/src/components/general/NoticiasDestacadas.vue";
import Marcas from "/src/components/general/Marcas.vue";
import BannerHome from "/src/components/home/BannerHome.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import ErrorSeccion from "/src/components/general/ErrorSeccion.vue";
import Seo from "/src/components/general/Seo.vue";

export default {
  components: {
    CompraRapida,
    NoticiasDestacada,
    Marcas,
    BannerHome,
    CargandoSeccion,
    ErrorSeccion,
    Seo,
  },
  async mounted() {
    const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_HOME);


    if (respuesta) {
      this.contenidoInicial = respuesta.data;
      this.cargando = false;
    }
  },
  data() {
    return {
      cargando: true,
      contenidoInicial: {},
    };
  },
  computed: {
    titulo(){
      return import.meta.env.VITE_DEFAULT_TITLE
    }
  },
  methods: {},
};
</script>
