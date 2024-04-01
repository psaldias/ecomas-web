<template>
  <main>
    <div>
      <div class="wrapper wrapper-fullm content-compra-rapida" v-if="contenidoInicial.acf.compra_rapida.visible">
        <section class="columns compra-rapida is-vcentered is-gapless is-mobile">
          <div class="column is-narrow-desktop is-3-tablet is-5-mobile titulo">
            <h2 class="pr-4" v-if="cargando">
              <p>¡Compra más<br>y <strong>paga menos</strong>!</p>
            </h2>
            <div class="imagen" v-if="contenidoInicial.acf.calculadora?.estado">
              <router-link to="/calculadora">
                <img src="/img/calculadora.webp" alt="Calculadora" width="186" height="159" />
              </router-link>
            </div>
            <h2 class="pr-4" v-else v-html="contenidoInicial.acf.compra_rapida.titulo_home"></h2>
          </div>
          <div class="column is-narrow is-hidden-mobile" style="width: 20px"></div>
          <CompraRapida />
        </section>
      </div>
      <div class="wrapper">
        <section class="banner-principal mt-4">
          <BannerHome :imagenes="contenidoInicial.acf.banner"></BannerHome>
        </section>
      </div>
      <div class="wrapper productos-destacados-home">
        <SliderProductos :titulo="this.contenidoInicial.acf.productos_home.titulo" :categoria="'equipos'"
          :productos="this.contenidoInicial.acf.productos_home.productos"></SliderProductos>
      </div>
      <div class="wrapper marcas-home">
        <marcas v-once></marcas>
      </div>
      <div class="wrapper wrapper-fullm">
        <section class="quienes-somos-home my-6" v-if="contenidoInicial.acf.quienes_somos.activo">
          <div class="wrapper" v-if="!cargando">
            <div class="columns p-0 contenedor is-vcentered">
              <div class="column p-0 is-4 is-offset-2 contenido">
                <div class="wrap">
                  <div class="mb-4" v-html="contenidoInicial.acf.quienes_somos.imagen"></div>


                  <h3 class="mb-4">
                    <b>{{ contenidoInicial.acf.quienes_somos.titulo }}</b>
                  </h3>
                  <div class="content is-fullwidth" v-html="contenidoInicial.acf.quienes_somos.descripcion"></div>
                  <div class="block">
                    <router-link :to="contenidoInicial.acf.quienes_somos.boton.url"
                      class="button button-2 bg-primero is-rounded" v-if="contenidoInicial.acf.quienes_somos.boton.url">
                      {{ contenidoInicial.acf.quienes_somos.boton.texto }}
                      <i class="has-text-white ml-2 fa-solid fa-arrow-pointer"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column p-0 is-6 is-align-self-flex-end imagen"
                v-if="this.contenidoInicial.acf.quienes_somos.imagen_fondo">
                <span class="mt-6 is-block" v-html="this.contenidoInicial.acf.quienes_somos.imagen_fondo"></span>
              </div>
            </div>
          </div>
        </section>
        <NoticiasDestacada titulo="Noticias" v-once />
      </div>
      <ToplayerHome :toplayer="toplayer"></ToplayerHome>
    </div>
    <ErrorSeccion v-if="errorData"></ErrorSeccion>
  </main>
  <Seo v-if="!cargando && contenidoInicial.hasOwnProperty('yoast_head_json')"
    :data_api="contenidoInicial.yoast_head_json" v-once></Seo>
</template>

<script>

import { defineAsyncComponent } from 'vue'

const CompraRapida = defineAsyncComponent(() => import('/src/components/home/CompraRapida.vue'))
import BannerHome from "/src/components/home/BannerHome.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import ErrorSeccion from "/src/components/general/ErrorSeccion.vue";
import Seo from "/src/components/general/Seo.vue";
// const BannerHome = defineAsyncComponent(() => import('/src/components/home/BannerHome.vue'))
const SliderProductos = defineAsyncComponent(() => import('../components/productos/SliderProductos.vue'))
const NoticiasDestacada = defineAsyncComponent(() => import('/src/components/general/NoticiasDestacadas.vue'))
const Marcas = defineAsyncComponent(() => import('/src/components/general/Marcas.vue'))
const ToplayerHome = defineAsyncComponent(() => import('../components/general/ToplayerHome.vue'))
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import helpers from "/src/utils/helpers.js";
export default {
  components: {
    CompraRapida,
    NoticiasDestacada,
    Marcas,
    // BannerHome,
    CargandoSeccion,
    ErrorSeccion,
    Seo,
    SliderProductos,
    ToplayerHome,
    BannerHome: defineAsyncComponent({
      // the loader function
      loader: () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(import('/src/components/home/BannerHome.vue'))
          }, 2000)
        }),

      // A component to use while the async component is loading
      loadingComponent: CargandoSeccion,
      // Delay before showing the loading component. Default: 200ms.
      delay: 500,
    }),
  },
  async mounted() {



  },
  data() {
    return {
      cargando: true,
      contenidoInicial: {
        acf: {
          banner: [],
          compra_rapida: { visible: true },
          productos_home: { visible: false },
          quienes_somos: { activo: false, activo: true },
        }
      },
      store_opciones_generales: useOpcionesGeneralesStore(),
      toplayer: false,
    };
  },
  computed: {
    titulo() {
      return import.meta.env.VITE_DEFAULT_TITLE;
    },
  },
  async beforeMount() {
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_HOME +
      "?sucursal=" +
      this.store_opciones_generales.sucursalSeleccionada?.ID
    );

    if (respuesta) {
      this.contenidoInicial = respuesta.data;
      this.toplayer = this.contenidoInicial.acf.toplayer;
      this.cargando = false;

      /** PRECARGAR IMAGENES EN EL VIEWPORT PARA GOOGLE */
      // this.preloadImagenes();
    }
  },
  methods: {

    preloadImagenes() {
      if (this.contenidoInicial.imagen_preload && !helpers.esMovil()) {
        console.log('preload')
        this.contenidoInicial.imagen_preload.forEach(imagen => {
          helpers.preloadImagen(imagen);
        });
      }
    },
  },
};
</script>
