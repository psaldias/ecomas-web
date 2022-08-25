<template>
  <main class="main-producto">
    <div class="card producto" :class="formato" v-if="formato == 'vertical'">
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

      <div class="nombre">{{ producto.nombre }}</div>

      <Precio :precios="producto.precios"></Precio>

      <div class="descripcion" v-html="producto.descripcion"></div>

      <Acciones
        :stock="producto.stock"
        :idProducto="producto.id"
        @agregarProducto="TopLayer"
      ></Acciones>
    </div>

    <div class="card producto" :class="formato" v-if="formato == 'horizontal'">
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
                <div
                  class="descripcion mb-0"
                  v-html="producto.descripcion"
                ></div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-hidden-mobile"></div>
              <div class="column is-narrow">
                <Acciones
                  :stock="producto.stock"
                  :idProducto="producto.id"
                  @agregarProducto="TopLayer"
                ></Acciones>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toplayer
      :producto="producto"
      :data="datos_toplayer"
      :key="'toplayer_' + producto.id"
    ></Toplayer>
  </main>
</template>

<script>
import Imagen from './Imagen.vue'
import Precio from './Precio.vue'
import Acciones from './Acciones.vue'
import Toplayer from './Toplayer.vue'

export default {
  props: {
    formato: {
      type: String,
      default: 'vertical',
    },
    producto: {},
  },
  components: {
    Imagen,
    Precio,
    Acciones,
    Toplayer,
  },
  data() {
    return {
      datos_toplayer: {
        cantidad: 1,
        mostrar: false,
      },
    }
  },
  computed: {},
  methods: {
    TopLayer(cantidad) {
      this.datos_toplayer.cantidad = cantidad
      this.datos_toplayer.mostrar = true
    },
  },
}
</script>
