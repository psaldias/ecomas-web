<template>
  <div class="listado-productos">
    <div class="columns is-multiline is-variable is-1" v-if="!cargando && categoria">
      <div class="column" :class="clasesColumna" v-for="(producto, index) in productos"
        :key="'listado_productos_column_' + producto.id">
        <Producto :producto="producto" v-if="formato == 'vertical'" :key="'listado_productos_producto_' + producto.id">
        </Producto>
        <ProductoHorizontal :producto="producto" v-if="formato == 'horizontal'"></ProductoHorizontal>
      </div>

      <div class="column has-text-centered" v-if="productos.length == 0">
        <h3 class="primero">No hay productos</h3>
      </div>
    </div>
    <CargandoSeccion v-if="cargando || !categoria"></CargandoSeccion>
  </div>
</template>

<script>
import Producto from "./producto/producto.vue";
import ProductoHorizontal from "./producto/ProductoHorizontal.vue";
import CargandoSeccion from "../general/CargandoSeccion.vue";
import { useCarroCompraStore } from "/src/stores/carroCompra";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  components: {
    Producto,
    CargandoSeccion,
    ProductoHorizontal,
  },
  props: {
    grilla: "",
    categoria: "",
  },
  emits: ['cargando'],
  data() {
    return {
      cargando: false,
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
      controller: false,// signal para parar axios
    };
  },
  watch: {
    async sucursalCarro() {
      this.obtenerProductos();
    },
    filtrosCarro: {
      handler(newValue, oldValue) {
        this.obtenerProductos();
      },
      deep: true,
    },
    // categoria: {
    //   handler(newValue, oldValue) {
    //     console.log('categoria');
    //     this.obtenerProductos();
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.obtenerProductos();
  },
  computed: {
    filtrosCarro() {
      return this.storeCarroCompra.carro.data.filtros;
    },
    productos() {
      return this.storeCarroCompra.carro.productos.listado
        ? this.storeCarroCompra.carro.productos.listado.filter((producto) => {
          return producto.stock_quantity == null || producto.stock_quantity > 0;
        })
        : [];
    },
    clasesColumna() {
      return this.grilla == "lista" ? "is-12" : "is-3-fullhd is-4-widescreen";
    },
    formato() {
      return this.grilla == "lista" ? "horizontal" : "vertical";
    },
    sucursalCarro() {
      return this.store_opciones_generales.sucursal_seleccionada.ID;
    },
    cargandoApp() {
      return this.store_opciones_generales.cargando;
    }
  },
  methods: {
    async obtenerProductos() {
      if (this.cargando || this.cargandoApp) return;
      this.cargando = true;

      if (this.categoria)
        await this.obtenerProductosTienda({ category: this.categoria.slug });

      this.cargando = false;
      this.$emit('cargando', this.cargando);
    },
  },
};
</script>
