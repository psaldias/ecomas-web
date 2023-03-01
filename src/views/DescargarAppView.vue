<template>
  <main>
    <div class="quienes-somos" v-if="!cargando">
      <div class="wrapper">
        <BannerSeccion
          v-if="contenidoInicial.acf.imagen_banner"
          :titulo="contenidoInicial.title.rendered"
          :imagen="contenidoInicial.acf.imagen_banner.sizes['2048x2048']"
        />
        <div class="columns is-centered mt-6 is-gapless">
          <div class="column is-8">
            <div class="content mt-4">
              <div class="block" v-html="contenidoInicial.content.rendered"></div>
            </div>

            <div class="columns is-vcentered mt-6">
              <div
                class="column has-text-centered"
                v-for="(boton, index) in contenidoInicial.acf.botones"
                :key="'boton-' + index"
              >
                <a
                  :href="boton.url"
                  target="_blank"
                  class="is-inline-block"
                  @click="dispararEvento(boton.url)"
                >
                  <img :src="boton.imagen.sizes.medium" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
  <Seo
    v-if="!cargando && contenidoInicial.hasOwnProperty('yoast_head_json')"
    :data_api="contenidoInicial.yoast_head_json"
  ></Seo>
</template>

<script>
import Marcas from "../components/general/Marcas.vue";
import BloqueImagenTexto from "../components/quienes-somos/BloqueImagenTexto.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import Cards from "../components/quienes-somos/Cards.vue";
import ErrorSeccion from "/src/components/general/ErrorSeccion.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";
import Seo from "../components/general/Seo.vue";
export default {
  components: {
    BannerSeccion,
    Marcas,
    BloqueImagenTexto,
    Cards,
    ErrorSeccion,
    CargandoSeccion,
    Seo,
  },
  data() {
    return {
      cargando: true,
      contenidoInicial: {},
    };
  },
  async mounted() {
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_DESCARGAR_APP
    );
    if (respuesta) {
      this.contenidoInicial = respuesta.data;
      this.cargando = false;
      if (this.contenidoInicial.title.rendered)
        document.title = this.contenidoInicial.title.rendered;

      if (this.contenidoInicial.acf.redireccion_automatica.activo) {
        this.validarDispositivo();
      }
    }
  },
  computed: {
    titulo() {
      return this.contenidoInicial.title.rendered;
    },
  },
  methods: {
    dispararEvento(evento) {
      gtag("event", "click", { event_category: "boton-app", event_label: evento });
    },
    validarDispositivo() {
      const isAndroid = /Android/i.test(navigator.userAgent);
      const isiPhone = /iPhone/i.test(navigator.userAgent);

      if (isAndroid) {
        gtag("event", "redirect", {
          event_category: "app",
          event_label: this.contenidoInicial.acf.redireccion_automatica.url_android,
        });
        window.location.href = this.contenidoInicial.acf.redireccion_automatica.url_android;
      } else if (isiPhone) {
        gtag("event", "redirect", {
          event_category: "app",
          event_label: this.contenidoInicial.acf.redireccion_automatica.url_iphone,
        });
        window.location.href = this.contenidoInicial.acf.redireccion_automatica.url_iphone;
      }
    },
  },
};
</script>
