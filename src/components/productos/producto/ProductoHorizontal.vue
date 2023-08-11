<template>
  <main class="main-producto">
    <div class="card producto horizontal">
      <div class="producto horizontal">
        <div class="columns is-vcentered">
          <div class="column is-narrow py-0">
            <div class="imagen-categoria">
              <a class="link-categoria">
                <div class="categoria">
                  {{ producto.categoria.nombre }}
                </div>
              </a>
              <Imagen
                :imagen="producto.imagen"
                :alt="producto.nombre"
                :url="producto.url"
              ></Imagen>
            </div>
          </div>
          <div class="column py-0">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <div class="nombre">{{ producto.nombre }}</div>
                <Precio :precios="producto.precios"></Precio>
              </div>
              <div class="column is-hidden-mobile is-1"></div>
              <div class="column">
                <div class="descripcion mb-0" v-html="producto.descripcion"></div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-hidden-mobile"></div>
              <div class="column is-narrow">
                <Acciones
                  :stock="producto.stock"
                  :idProducto="producto.id"
                  :producto="producto"
                  @agregarProducto="TopLayer"
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
    producto: {},
  },
  components: {
    Imagen,
    Precio,
    Acciones,
  },
  data() {
    return {
      datos_toplayer: {
        cantidad: 1,
        mostrar: false,
      },
    };
  },
  computed: {},
  methods: {
    TopLayer(cantidad) {
      this.datos_toplayer.cantidad = cantidad;
      this.datos_toplayer.mostrar = true;
    },
  },
};
</script>
