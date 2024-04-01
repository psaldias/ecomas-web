<template>
  <main class="column productos-compra-rapida">
    <div>
      <TransitionGroup name="list" class="columns is-mobile" tag="ul" v-if="!cargando" appear>
        <li class="column py-0" v-for="(producto, index) in productosDisponibles" :key="producto.id">
          <div class="card py-4 px-3">
            <div class="columns is-gapless is-vcentered mb-0 is-mobile">
              <div class="column is-narrow mr-2">
                <img src="/img/icono-bolsa-ecomas.png" alt="Bolsa" width="19" height="25" />
              </div>
              <div class="column text-nowrap has-text-right">
                <b>{{ producto.name }}</b>
              </div>
            </div>
            <div class="valores">
              <div class="valor primero has-text-centered">
                <b>{{ monedaChilena(producto.price) }}</b>
              </div>
              <div class="valor-unitario has-text-centered is-size-7" v-if="producto.on_sale">
                <del>{{
        monedaChilena(
          producto.regular_price / parseInt(producto.bolsas_producto)
        )
      }}
                  c/u</del>
              </div>
              <div class="valor-unitario has-text-centered" v-if="producto.bolsas_producto">
                {{ monedaChilena(producto.price / parseInt(producto.bolsas_producto)) }}
                c/u
              </div>
            </div>

            <div class="block mt-4">
              <a href="#" @click.prevent="verToplayer(producto)"
                class="button is-rounded has-background-black is-toggle-rounded is-block has-text-centered has-text-white">
                <i class="has-text-white fa-solid fa-cart-shopping mr-1"></i>
                Comprar
              </a>
            </div>
          </div>
        </li>
      </TransitionGroup>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
    <ToplayerCompraRapida :data_producto="producto_toplayer" :ver_toplayer="toplayer"
      @cerrarTopLayer="toplayer = false"></ToplayerCompraRapida>
  </main>
</template>

<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import CargandoSeccion from "../general/CargandoSeccion.vue";
import ToplayerCompraRapida from "../productos/producto/ToplayerCompraRapida.vue";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  data() {
    return {
      cargando: true,
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
      toplayer: false,
      producto_toplayer: false,
    };
  },
  mounted() {
    this.obtenerProductosCarro();
  },
  watch: {
    async sucursalCarro() {
      this.obtenerProductosCarro();
    },
  },
  computed: {
    productosDisponibles() {
      return this.storeCarroCompra.ComraRapidaproductosConStock.filter((producto) => {
        return producto.stock_quantity == null || producto.stock_quantity > 0;
      });
    },
    sucursalCarro() {
      return this.store_opciones_generales.sucursalSeleccionada?.ID;
    },
  },
  methods: {
    verToplayer(producto) {
      this.storeCarroCompra.actualizarCompraRapida(producto.id, "productoSeleccionado");
      this.toplayer = true;
      this.producto_toplayer = producto;
    },
    irACompraRapida(id) {
      this.verToplayer(id);
    },
    async obtenerProductosCarro() {
      /** si no existe la sucursal no buscar los productos */
      if (!this.sucursalCarro) return;
      this.cargando = true;
      await this.obtenerProductosCompraRapida();
      this.cargando = false;
    },
    cerrar_toplayer() {
      this.toplayer = false;
    },
  },
  components: { CargandoSeccion, ToplayerCompraRapida },
};
</script>
