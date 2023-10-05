<template>
  <main>
    <div v-if="!cargando">
      <div
        class="wrapper wrapper-fullm"
        v-if="contenidoInicial.acf.compra_rapida.visible"
      >
        <section class="columns compra-rapida is-vcentered is-gapless is-mobile">
          <div class="column is-narrow-desktop is-3-tablet is-5-mobile titulo">
            <div class="imagen" v-if="contenidoInicial.acf.calculadora?.estado">
              <router-link to="/calculadora">
                <img
                  :src="contenidoInicial.acf.calculadora.imagen_banner_home.sizes.large"
                  :height="
                    contenidoInicial.acf.calculadora.imagen_banner_home.sizes[
                      'large-height'
                    ]
                  "
                  :width="
                    contenidoInicial.acf.calculadora.imagen_banner_home.sizes[
                      'large-width'
                    ]
                  "
                />
              </router-link>
            </div>

            <h2
              class="pr-4"
              v-else
              v-html="contenidoInicial.acf.compra_rapida.titulo_home"
            ></h2>
          </div>
          <div class="column is-narrow is-hidden-mobile" style="width: 20px"></div>

          <CompraRapida />
        </section>
      </div>

      <div class="wrapper">
        <BannerHome :imagenes="contenidoInicial.acf.banner"></BannerHome>
      </div>

      <div class="wrapper" v-if="this.contenidoInicial.acf.productos_home.visible">
        <SliderProductos
          :titulo="this.contenidoInicial.acf.productos_home.titulo"
          :categoria="'equipos'"
          :productos="this.contenidoInicial.acf.productos_home.productos"
        ></SliderProductos>
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
                      class="button button-2 bg-primero is-rounded"
                      v-if="contenidoInicial.acf.quienes_somos.boton.url"
                    >
                      {{ contenidoInicial.acf.quienes_somos.boton.texto }}
                      <i class="has-text-white ml-2 fa-solid fa-arrow-pointer"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div
                class="column p-0 is-6 is-align-self-flex-end imagen"
                v-if="this.contenidoInicial.acf.quienes_somos.imagen_fondo.url"
              >
                <img
                  :src="this.contenidoInicial.acf.quienes_somos.imagen_fondo.url"
                  class="mt-6 is-block"
                />
              </div>
            </div>
          </div>
        </section>
        <NoticiasDestacada titulo="Noticias" />
      </div>

      <ToplayerHome :toplayer="toplayer"></ToplayerHome>
    </div>

    <CargandoSeccion v-if="cargando"></CargandoSeccion>
    <ErrorSeccion v-if="errorData"></ErrorSeccion>
  </main>
  <Seo
    v-if="!cargando && contenidoInicial.hasOwnProperty('yoast_head_json')"
    :data_api="contenidoInicial.yoast_head_json"
  ></Seo>
</template>

<script>
import CompraRapida from "/src/components/home/CompraRapida.vue";
import NoticiasDestacada from "/src/components/general/NoticiasDestacadas.vue";
import Marcas from "/src/components/general/Marcas.vue";
import BannerHome from "/src/components/home/BannerHome.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import ErrorSeccion from "/src/components/general/ErrorSeccion.vue";
import Seo from "/src/components/general/Seo.vue";
import SliderProductos from "../components/productos/SliderProductos.vue";

import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import ToplayerHome from "../components/general/ToplayerHome.vue";
export default {
  components: {
    CompraRapida,
    NoticiasDestacada,
    Marcas,
    BannerHome,
    CargandoSeccion,
    ErrorSeccion,
    Seo,
    SliderProductos,
    ToplayerHome,
  },
  async mounted() {
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_HOME +
        "?sucursal=" +
        this.store_opciones_generales.sucursal_seleccionada.ID
    );

    if (respuesta) {
      this.contenidoInicial = respuesta.data;
      this.toplayer = this.contenidoInicial.acf.toplayer;
      this.cargando = false;
    }
  },
  data() {
    return {
      cargando: true,
      contenidoInicial: {},
      store_opciones_generales: useOpcionesGeneralesStore(),
      toplayer: false,
    };
  },
  computed: {
    titulo() {
      return import.meta.env.VITE_DEFAULT_TITLE;
    },
  },
  methods: {},
};
</script>
