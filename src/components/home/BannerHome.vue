<template>
  <section class="banner-principal mt-4">
    <div class="slider">
      <div class="imagen" v-for="imagen in imagenes">
        <div v-if="imagen.link">
          <a :href="imagen.link" v-if="verificarUrlExterna(imagen.link)" target="_blank">
            <img
              :src="imagen.imagen.sizes['2048x2048']"
              :width="imagen.imagen.sizes['2048x2048-width']"
              :height="imagen.imagen.sizes['2048x2048-height']"
              class="is-hidden-mobile is-block"
            />
            <img
              :src="imagen.imagen_responsiva.sizes.large"
              :width="imagen.imagen_responsiva.sizes['large-width']"
              :height="imagen.imagen_responsiva.sizes['large-height']"
              v-if="imagen.imagen_responsiva"
              class="is-hidden-tablet is-block"
            />
          </a>
          <router-link :to="imagen.link" v-else>
            <img
              :src="imagen.imagen.sizes['2048x2048']"
              :width="imagen.imagen.sizes['2048x2048-width']"
              :height="imagen.imagen.sizes['2048x2048-height']"
              class="is-hidden-mobile is-block"
            />
            <img
              :src="imagen.imagen_responsiva.sizes.large"
              :width="imagen.imagen_responsiva.sizes['large-width']"
              :height="imagen.imagen_responsiva.sizes['large-height']"
              v-if="imagen.imagen_responsiva"
              class="is-hidden-tablet is-block"
            />
          </router-link>
        </div>

        <div v-else>
          <img
            :src="imagen.imagen.sizes['2048x2048']"
            :width="imagen.imagen.sizes['2048x2048-width']"
            :height="imagen.imagen.sizes['2048x2048-height']"
            class="is-hidden-mobile is-block"
          />
          <img
            :src="imagen.imagen_responsiva.sizes.large"
            :width="imagen.imagen_responsiva.sizes['large-width']"
            :height="imagen.imagen_responsiva.sizes['large-height']"
            v-if="imagen.imagen_responsiva"
            class="is-hidden-tablet is-block"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
import "/src/assets/libs/slick/slick.min.css";
import "/src/assets/libs/slick/slick-theme.min.css";

export default {
  props: ["imagenes"],
  data() {
    return {
      slider: false,
      timeout: false,
    };
  },
  mounted() {
    const vue = this;
    /** CREAR INSTANCIA DE CARRUSEL */
    this.slider = $(".banner-principal .slider").slick({
      slidesToShow: 1,
      dots: true,
      arrows: false,
      infinite: true,
      pauseOnHover: false,
      pauseOnFocus: false,
      autoplay: false,
      autoplaySpeed: 5000,
      prevArrow:
        '<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
      nextArrow:
        '<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
    });
    /** VALIDAR EN CADA CAMBIO EL TIEMPO DE TRANSISIÓN O SI SE DEBE QUEADAR FIJO */
    $(".banner-principal .slider").on(
      "afterChange",
      function (event, slick, currentSlide, nextSlide) {
        /** DESPUES DE CADA CAMBIO DE SLIDE SE VALIDA EL AUTOPLAY */
        vue.autoplaySlider(currentSlide);
      }
    );
    /** VALIDA PRIMER SLIDE */
    this.autoplaySlider(0);
  },
  computed: {},
  methods: {
    verificarUrlExterna(url) {
      var pattern = /^((http|https|ftp):\/\/)/;
      return pattern.test(url);
    },
    /** ELIMINAR EL TIMEOUT */
    clearTimeout() {
      if (this.timeout) clearTimeout(this.timeout);
    },
    /** FUNCIÓN PERSONALIZADA PARA AUTOPLAY DE SLIDER SEGÚN PARAMETROS INDICADOS EN ADMIN */
    autoplaySlider(currentSlide) {
      /** ELIMINAR TIMEOUT SI EXISTE */
      this.clearTimeout();
      const vue = this;
      /** IDENTIFICAR IMAGEN PARA OBTENER PARAMETROS, SI ES FIJO Y EL TIEMPO VISIBLE */
      const imagen = this.imagenes[currentSlide];
      /** SI NO ES FIJO SE CREA TIMEOUT PARA CAMBIAR A SIGUIENTE SLIDE */
      if (!this.imagenes[currentSlide].fijo) {
        this.timeout = setTimeout(() => {
          vue.slider.slick("slickNext");
        }, imagen.tiempo * 1000);
      }
    },
  },
};
</script>
