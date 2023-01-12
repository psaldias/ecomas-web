<template>
  <main class="main-producto">
    <div class="card producto" :class="formato" v-if="formato == 'vertical'">
      <a class="link-categoria">
        <div class="categoria">
          {{ categoria }}
        </div>
      </a>
      <!-- <router-link :to="url" class="imagen" v-html="producto.imagen"> </router-link> -->
      <Imagen :imagen="producto.imagen" :alt="producto.name" :url="url"></Imagen>

      <div class="nombre">{{ producto.name }}</div>

      <Precio :precios="precios"></Precio>

      <div class="descripcion" v-html="producto.short_description"></div>

      <Acciones
        :stock="producto.stock_quantity"
        :stockStatus="producto.stock_status"
        :idProducto="producto.id"
        :producto="producto"
      ></Acciones>
    </div>

    <div class="card producto" :class="formato" v-if="formato == 'horizontal'">
      <div class="producto horizontal">
        <div class="columns is-vcentered">
          <div class="column is-narrow py-0">
            <div class="imagen-categoria">
              <a class="link-categoria">
                <div class="categoria">
                  {{ categoria }}
                </div>
              </a>
              <div class="imagen" v-html="producto.imagen"></div>
              <Imagen :imagen="imagen" :alt="producto.name" :url="url"></Imagen>
            </div>
          </div>
          <div class="column py-0">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <div class="nombre">{{ producto.name }}</div>
                <Precio :precios="precios"></Precio>
              </div>
              <div class="column is-hidden-mobile is-1"></div>
              <div class="column">
                <div class="descripcion mb-0" v-html="producto.short_description"></div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-hidden-mobile"></div>
              <div class="column is-narrow">
                <Acciones
                  :stock="producto.stock_quantity"
                  :stockStatus="producto.stock_status"
                  :idProducto="producto.id"
                  :producto="producto"
                ></Acciones>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Imagen from "./Imagen.vue";
import Precio from "./Precio.vue";
import Acciones from "./Acciones.vue";

export default {
  props: {
    formato: {
      default: "vertical",
    },
    producto: {},
  },
  components: {
    Imagen,
    Precio,
    Acciones,
  },
  data() {
    return {};
  },
  computed: {
    precios() {
      return {
        normal: this.producto.price,
        oferta: this.producto.regular_price,
        on_sale: this.producto.on_sale,
      };
    },
    url() {
      return "/producto/" + this.producto.slug;
    },
    categoria() {
      return this.producto.categories[0].name;
    },
    imagen() {
      return this.producto.images[0].src;
    },
  },
  methods: {},
};
</script>
