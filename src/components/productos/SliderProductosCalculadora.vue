<template>
  <section class="mt-6" v-if="productos && productos.length > 0">
    <div class="slider-productos columns is-centered">
      <div class="item column is-4 is-relative" v-for="(producto, index) in productos">
        <Producto class="h-auto no-compra" :key="'slider_productos_' + producto.id" :producto="producto"
          formato="vertical"></Producto>
      </div>
    </div>
  </section>
</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
// import "/src/assets/libs/slick/slick.min.css";
import "/src/assets/libs/slick/slick-theme.min.css";
import Producto from "./producto/productoCalculadora.vue";
import { useCarroCompraStore } from "/src/stores/carroCompra";
export default {
  props: ["productos", "productos_calculadora"],
  data() {
    return {
      cargado: false,
      storeCarroCompra: useCarroCompraStore(),
      timeout: false,
    };
  },
  mounted() {
    // this.cargarSlider();
    window.addEventListener("resize", this.altoProducos);
    this.altoProducos();
  },
  destroyed() {
    window.removeEventListener("resize", this.altoProducos);
  },
  methods: {
    dataProductoCalculadora(id) {
      return this.productos_calculadora.find((producto) => producto.producto == id);
    },
    altoProducos() {
      /** SI ES UN SOLO PRODUCTO, NO APLICAR */
      if ($(".slider-productos .producto").length == 1) return;
      /** ELIMINAR TIMEOUT SI EXISTE */
      if (this.timeout) clearTimeout(this.timeout);
      /** APLICAR ALTO A TODOS CON UN TIMEOUT PARA QUE PUEDA TOMAR EL ALTO REAL DESPUES DE RENDERIZAR */
      this.timeout = setTimeout(function () {
        let alto = 0;
        $(".slider-productos .main-producto").removeAttr("style");
        $(".slider-productos .main-producto").each(function (i, obj) {
          if ($(obj).outerHeight() > alto) alto = $(obj).outerHeight();
        });
        $(".slider-productos .main-producto").height(alto);
      }, 500);
    },
    cargarSlider() {
      const context = this;
      // On before slide change
      $(".slider-productos").on("init", function (event) {
        context.altoProducos();
      });
      $(".slider-productos").slick({
        slidesToShow: 3,
        dots: false,
        arrows: true,
        infinite: false,
        prevArrow:
          '<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
        nextArrow:
          '<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
        responsive: [
          {
            breakpoint: 1240,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
    },
  },
  components: { Producto },
};
</script>
