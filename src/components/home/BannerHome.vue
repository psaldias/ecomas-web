<template>

  <div class="slider slider-desktop" v-if="!esMovil"></div>
  <div class="slider slider-movil" v-if="esMovil"></div>

</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
// import "/src/assets/libs/slick/slick.min.css";
// import "/src/assets/libs/slick/slick-theme.min.css";

export default {
  props: {
    imagenes: {
      default: [],
    }
  },
  data() {
    return {
      slider: false,
      slider_movil: false,
      timeout: false,
      imagnes_cargadas: [],
    };
  },
  mounted() {
    document.addEventListener('readystatechange', this.cargarSlider());
  },
  updated() {
    document.addEventListener('readystatechange', this.cargarSlider());


  },
  computed: {
    esMovil() {
      // Create a media condition that targets viewports at least 768px wide
      const mediaQuery = window.matchMedia('(max-width: 768px)')
      // Check if the media query is true
      if (mediaQuery.matches) {
        return true;
      }
      return false;
    },
  },
  methods: {
    cargarSlider() {
      if (this.imagenes.length > 0) {
        const vue = this;
        if (this.esMovil)
          this.cargarSliderMovil();
        else
          this.cargarSliderDesktop();
      }
    },
    cargarSliderDesktop() {
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
          '<span class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></span>',
        nextArrow:
          '<span class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></span>',
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
    },
    cargarSliderMovil() {
      const vue = this;

      this.slider_movil = $(".banner-principal .slider-movil").slick({
        slidesToShow: 1,
        dots: true,
        arrows: false,
        infinite: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplay: false,
        autoplaySpeed: 5000,
        prevArrow:
          '<span class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></span>',
        nextArrow:
          '<span class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></span>',
      });

      this.imagenes.forEach(imagen => {
        let html = '<div class="imagen">';
        if (!imagen.imagen_responsiva) return;
        if (imagen.link) {
          const target = (vue.verificarUrlExterna(imagen.link) ? 'target="_blank"' : '');
          html += '<a href="' + imagen.link + '" ' + target + '>';
          html += imagen.imagen_responsiva;
          html += '</a>';

        } else {
          html += imagen.imagen_responsiva;
        }
        html += '</div>';
        vue.slider_movil.slick('slickAdd', html);

      });
    },
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
