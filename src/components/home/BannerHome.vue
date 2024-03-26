<template>
  <section class="banner-principal mt-4">

    <div class="slider slider-desktop" v-if="!esMovil()">
      <!-- <div class="imagen" v-for="imagen in imagnes_cargadas">
        <div v-if="imagen.link">
          <a :href="imagen.link" v-if="verificarUrlExterna(imagen.link)" target="_blank">
            <span v-html="imagen.imagen"></span>
          </a>
          <router-link :to="imagen.link" v-else>
            <span v-html="imagen.imagen"></span>
          </router-link>
        </div>
        <div v-else>
          <span v-html="imagen.imagen"></span>
        </div>
      </div> -->
    </div>

    <!-- <div class="slider slider-movil" v-if="esMovil()">
      <div class="imagen" v-for="imagen in imagenes">
        <div v-if="imagen.link">
          <a :href="imagen.link" v-if="verificarUrlExterna(imagen.link)" target="_blank">
            <span v-html="imagen.imagen_responsiva"></span>
          </a>
          <router-link :to="imagen.link" v-else>
            <span v-html="imagen.imagen_responsiva"></span>
          </router-link>
        </div>

        <div v-else>
          <span v-if="imagen.imagen_responsiva" v-html="imagen.imagen_responsiva"></span>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
// import "/src/assets/libs/slick/slick.min.css";
// import "/src/assets/libs/slick/slick-theme.min.css";

export default {
  props: ["imagenes"],
  data() {
    return {
      slider: false,
      slider_movil: false,
      timeout: false,
      imagnes_cargadas: [],
    };
  },
  mounted() {

  },
  updated() {

    document.addEventListener('readystatechange', this.cargarSlider());

  },
  computed: {},
  methods: {
    cargarSlider() {
      if (this.imagenes.length > 0) {
        const vue = this;


        /** CREAR INSTANCIA DE CARRUSEL */
        this.slider = $(".banner-principal .slider-desktop").slick({
          lazyLoad: 'ondemand',

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
        this.imagenes.forEach(imagen => {
          let html = '<div class="imagen">';
          if (imagen.link) {
            const target = (vue.verificarUrlExterna(imagen.link) ? 'target="_blank"' : '');
            html += '<a href="' + imagen.link + '" ' + target + '>';
            html += imagen.imagen;
            html += '</a>';

          } else {
            html += imagen.imagen;
          }
          html += '</div>';
          vue.slider.slick('slickAdd', html);

        });
        // this.slider.slick('slickAdd', '<div><h3>asdasdasd</h3></div>');
        // this.slider.slick('slickAdd', '<div><h3>asdasdasd</h3></div>');


        /** VALIDAR EN CADA CAMBIO EL TIEMPO DE TRANSISIÓN O SI SE DEBE QUEADAR FIJO */
        $(".banner-principal .slider-desktop").on(
          "afterChange",
          function (event, slick, currentSlide, nextSlide) {
            /** DESPUES DE CADA CAMBIO DE SLIDE SE VALIDA EL AUTOPLAY */
            vue.autoplaySlider(currentSlide);
          }
        );
        /** VALIDA PRIMER SLIDE */

        this.autoplaySlider(0);


        // this.slider_movil = $(".banner-principal .slider-movil").slick({
        //   slidesToShow: 1,
        //   dots: true,
        //   arrows: false,
        //   infinite: true,
        //   pauseOnHover: false,
        //   pauseOnFocus: false,
        //   autoplay: false,
        //   autoplaySpeed: 5000,
        //   prevArrow:
        //     '<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
        //   nextArrow:
        //     '<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
        // });
      }
    },
    verificarUrlExterna(url) {
      var pattern = /^((http|https|ftp):\/\/)/;
      return pattern.test(url);
    },
    /** ELIMINAR EL TIMEOUT */
    clearTimeout() {
      if (this.timeout) clearTimeout(this.timeout);
    },
    esMovil() {
      // Create a media condition that targets viewports at least 768px wide
      const mediaQuery = window.matchMedia('(max-width: 768px)')
      // Check if the media query is true
      if (mediaQuery.matches) {
        return true;
      }
      return false;
    },
    /** FUNCIÓN PERSONALIZADA PARA AUTOPLAY DE SLIDER SEGÚN PARAMETROS INDICADOS EN ADMIN */
    autoplaySlider(currentSlide) {
      /** ELIMINAR TIMEOUT SI EXISTE */
      this.clearTimeout();
      if (!this.imagenes)
        return;

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
