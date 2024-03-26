<template>
  <div class="galeria-producto" v-if="imagenes.length > 1" ref="galeria-producto">
    <div class="" v-for="imagen in imagenes">
      <a data-fancybox="galeria" :href="imagen.src">
        <figure class="image is-1by1">
          <img :src="imagen.src" alt="" />
        </figure>
      </a>
    </div>
  </div>
</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
// import "/src/assets/libs/slick/slick.min.css";
import "/src/assets/libs/slick/slick-theme.min.css";
export default {
  props: {
    imagenes: false,
  },
  data() {
    return {};
  },
  mounted() {
    this.cargarSlider();
  },
  updated() {
    this.cargarSlider();
  },
  computed: {},
  methods: {
    cargarSlider() {
      /** CREAR INSTANCIA DE CARRUSEL */
      $(".galeria-producto").slick({
        slidesToShow: 4,
        dots: false,
        arrows: true,
        infinite: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplay: false,
        autoplaySpeed: 5000,
        prevArrow:
          '<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
        nextArrow:
          '<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
      });
    },
  },
};
</script>
