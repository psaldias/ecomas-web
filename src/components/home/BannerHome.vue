
<template>
  <section class="banner-principal mt-4">
    <div class="slider">
      <div class="imagen" v-for="imagen in imagenes">
        <router-link :to="imagen.link" v-if="imagen.link">
          <img :src='imagen.imagen.sizes["2048x2048"]' class="is-hidden-mobile is-block"/>
          <img :src="imagen.imagen_responsiva.sizes.large" v-if="imagen.imagen_responsiva" class="is-hidden-tablet is-block"/>
        </router-link>
        <div v-else>
          <img :src='imagen.imagen.sizes["2048x2048"]' class="is-hidden-mobile is-block"/>
          <img :src="imagen.imagen_responsiva.sizes.large" v-if="imagen.imagen_responsiva" class="is-hidden-tablet is-block"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/libs/jquery.min.js";
import "@/assets/libs/slick/slick.min.js";
import "@/assets/libs/slick/slick.min.css";
import "@/assets/libs/slick/slick-theme.min.css";

export default {
    props:["imagenes"],
    data() {
        return {
        };
    },
    mounted() {
        $(".banner-principal .slider").slick({
            slidesToShow:1,
            dots:true,
            arrows:false,
            infinite:false,
            autoplay: true,
            autoplaySpeed: 4000,
            prevArrow:'<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
            nextArrow:'<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
        });
    },
    computed: {},
    methods: {},
}
</script>