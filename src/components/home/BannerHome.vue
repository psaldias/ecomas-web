
<template>
  <section class="banner-principal mt-4">
    <div class="slider">
      <div class="imagen" v-for="imagen in imagenes">
        <router-link :to="imagen.link" v-if="imagen.link">
          <img :src='imagen.imagen.sizes["2048x2048"]' :width="imagen.imagen.sizes['2048x2048-width']" :height="imagen.imagen.sizes['2048x2048-height']" class="is-hidden-mobile is-block"/>
          <img :src="imagen.imagen_responsiva.sizes.large" :width="imagen.imagen_responsiva.sizes['large-width']" :height="imagen.imagen_responsiva.sizes['large-height']" v-if="imagen.imagen_responsiva" class="is-hidden-tablet is-block"/>
        </router-link>
        <div v-else>
          <img :src='imagen.imagen.sizes["2048x2048"]' :width="imagen.imagen.sizes['2048x2048-width']" :height="imagen.imagen.sizes['2048x2048-height']" class="is-hidden-mobile is-block"/>
          <img :src="imagen.imagen_responsiva.sizes.large" :width="imagen.imagen_responsiva.sizes['large-width']" :height="imagen.imagen_responsiva.sizes['large-height']" v-if="imagen.imagen_responsiva" class="is-hidden-tablet is-block"/>
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