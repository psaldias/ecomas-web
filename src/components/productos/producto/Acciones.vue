<template>
  <main>
    <div class="acciones" v-if="formato == 'normal' && conStock">
      <div class="columns is-vcentered is-gapless is-mobile">
        <div class="column is-flex cantidad">
          <button class="button is-small is-rounded50" @click="disminuirCantidad()">
            -
          </button>
          <input
            type="text"
            class="input is-rounded is-small is-inline-block"
            v-model="cantidad"
            readonly
          />
          <button class="button is-small is-rounded50" @click="this.aumentarCantidad()">
            +
          </button>
        </div>
        <div class="column is-narrow">
          <button
            v-if="!cargando"
            class="button is-rounded is-small button-icono comprar"
            @click.prevent="agregarProducto()"
          >
            <b><i class="fa-solid fa-cart-shopping"></i> Comprar</b>
          </button>
          <CargandoSeccion v-if="cargando" class="medium"></CargandoSeccion>
        </div>
      </div>
    </div>

    <div class="acciones" v-else-if="formato == 'horizontal' && conStock">
      <div class="cantidad mx-auto has-text-centered">
        <b class="primero is-size-7">Cantidad</b>
        <div class="is-flex is-fullwidth is-justify-content-center">
          <button class="button is-small is-rounded50" @click="disminuirCantidad()">
            -
          </button>
          <input
            type="text"
            class="input is-rounded is-small is-inline-block"
            v-model="cantidad"
            readonly
          />
          <button class="button is-small is-rounded50" @click="this.aumentarCantidad()">
            +
          </button>
        </div>
      </div>
      <div class="column has-text-centered">
        <button
          v-if="!cargando"
          class="button is-rounded is-small button-icono comprar"
          @click.prevent="agregarProducto()"
        >
          <b><i class="fa-solid fa-arrows-rotate is-size-7"></i> Actualizar</b>
        </button>
        <CargandoSeccion v-if="cargando" class="medium"></CargandoSeccion>
      </div>
    </div>
  </main>
</template>

<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import CargandoSeccion from "../../general/CargandoSeccion.vue";

export default {
  props: {
    cantidadCarro: {
      default: 1,
    },
    stock: {
      default: 0,
    },
    stockStatus: {
      default: "",
    },
    idProducto: {
      default: false,
    },
    producto: {
      default: {},
    },
    toplayer: {
      default: true,
    },
    variacion: {
      default: false,
    },
    formato: { default: "normal" },
  },
  data() {
    return {
      storeCarroCompra: useCarroCompraStore(),
      cantidad: 1,
      cargando: false,
    };
  },
  mounted() {
    this.cantidad = this.cantidadCarro;
  },
  watch: {
    stock() {
      this.cantidad = 1;
    },
  },
  computed: {
    conStock() {
      if (
        (this.stock == null) & (this.stockStatus == "instock") ||
        parseInt(this.stock) > 0
      ) {
        return true;
      }
      return false;
    },
    limiteStock() {
      if (this.producto.sold_individually) return 1;

      if ((this.stock == null) & (this.stockStatus == "instock")) {
        return false;
      }
      return parseInt(this.stock);
    },
  },
  methods: {
    disminuirCantidad() {
      if (this.cantidad > 1) {
        this.cantidad--;
      }
    },
    aumentarCantidad() {
      if (!this.limiteStock) {
        this.cantidad++;
      } else if (this.cantidad + 1 <= this.limiteStock) this.cantidad++;
    },
    async agregarProducto() {
      this.cargando = true;
      await this.agregarProductoCarro(
        this.idProducto,
        this.cantidad,
        this.producto,
        this.toplayer,
        this.variacion
      );
      this.cargando = false;
      // this.$emit("agregarProducto", this.cantidad);
    },
  },
  components: { CargandoSeccion },
};
</script>
