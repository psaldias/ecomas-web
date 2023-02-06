<template>
  <main>
    <div class="card mb-4 min-h-250">
      <div class="producto horizontal carro">
        <button
          class="delete ecomas is-large"
          @click.prevent="eliminarProductoCarro(producto.id)"
        ></button>

        <div class="columns is-vcentered">
          <div class="column is-narrow py-0">
            <div class="imagen mx-auto">
              <Imagen :imagen="producto.imagen" :alt="producto.name" :url="url"></Imagen>
            </div>
          </div>
          <div class="column py-0">
            <div class="columns is-vcentered">
              <div class="column is-8">
                <div class="nombre">{{ producto.name }}</div>
                <Precio :precios="precios"></Precio>
                <div class="content is-size-7" v-html="producto.short_description"></div>
              </div>
              <div class="column is-narrow">
                <Acciones
                  :stock="producto.stock_quantity"
                  :stockStatus="producto.stock_status"
                  :idProducto="producto.id"
                  :producto="producto"
                  :toplayer="false"
                  :cantidadCarro="producto.quantity"
                  formato="horizontal"
                ></Acciones>
              </div>
            </div>

            <Mensajes :mensajes="mensajes" clases="is-small"></Mensajes>
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
import Mensajes from "/src/components/general/Mensajes.vue";

export default {
  props: {
    formato: {
      type: String,
      default: "vertical",
    },
    producto: {},
  },
  components: {
    Imagen,
    Precio,
    Acciones,
    Mensajes,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    mensajes() {
      if (this.producto.errores) return { error: this.producto.errores };
    },
    precios() {
      return {
        normal: this.producto.regular_price,
        oferta: this.producto.price,
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
};
</script>
