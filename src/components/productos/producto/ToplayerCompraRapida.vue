<template>
  <teleport to="#modal">
    <transition name="modal">
      <div class="toplayer toplayer-producto" v-if="mostrarToplayer" @click.self="cerrar($event)">
        <div class="toplayer_content card">
          <div class="acciones-cabecera has-text-right pt-3 pr-3">
            <a href="#" @click.prevent="cerrar($event, '/ingresar')" class="button is-rounded button-icono mr-2"
              v-if="!usuarioCarroCompra()"><i class="fa-solid fa-circle-user"></i> Iniciar Sesión</a>
            <button class="delete ecomas is-large" @click.prevent="cerrar($event)"></button>
          </div>

          <div class="producto horizontal">
            <div class="columns is-vcentered">
              <div class="column is-narrow py-0">
                <Imagen :imagen="producto.imagen" :alt="producto.name" :url="url"></Imagen>
              </div>
              <div class="column py-0">
                <div class="columns is-vcentered">
                  <div class="column is-narrow">
                    <div class="nombre mb-2">{{ producto.name }}</div>
                    <Precio :precios="precios"></Precio>
                  </div>
                  <div class="column is-hidden-mobile is-1"></div>
                  <div class="column">
                    <div class="descripcion mb-0" v-html="producto.short_description"></div>
                  </div>
                </div>
                <div class="columns is-align-items-end">
                  <div class="column acciones is-narrow pt-0">
                    <div class="cantidad mx-auto has-text-centered">
                      <b class="primero is-size-7">Cantidad</b>
                      <div class="is-flex is-fullwidth is-justify-content-center">
                        <button class="button is-small is-rounded50" @click.prevent="disminuirCantidad">-</button>
                        <input type="text" class="input is-rounded is-small is-inline-block" :value="cantidad" readonly />
                        <button class="button is-small is-rounded50" @click.prevent="aumentarCantidad">+</button>
                      </div>
                    </div>
                  </div>
                  <div class="pt-0 column has-text-right-tablet has-text-centered-mobile botonera">
                    <button class="button is-rounded is-7 button-icono mr-2" @click.prevent="cerrar($event)">
                      <b><i class="fa-solid fa-cart-shopping"></i> Continuar Comprando</b>
                    </button>
                    <button class="button is-rounded is-7 button-icono"
                      @click.prevent="cerrar($event, '/compra-rapida/')">
                      <b><i class="fa-solid fa-cart-shopping"></i> Ir a pagar</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <Mensajes :mensajes="mensajes"></Mensajes>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
import Imagen from "./Imagen.vue";
import Precio from "./Precio.vue";
import Acciones from "./Acciones.vue";
import { useCarroCompraStore } from "/src/stores/carroCompra";
import Mensajes from "../../general/Mensajes.vue";
export default {
  components: {
    Imagen,
    Precio,
    Acciones,
    Mensajes,
  },
  emits: ["cerrarTopLayer"],
  props: ["ver_toplayer", "data_producto"],
  data() {
    return {
      idProducto: false,
      storeCarroCompra: useCarroCompraStore(),
    };
  },
  computed: {
    mensajes() {
      let mensajes = {
        exito: "",
        error: "",
      };
      mensajes[
        this.storeCarroCompra.carro.datos_toplayer.respuesta.tipo
      ] = this.storeCarroCompra.carro.datos_toplayer.respuesta.mensaje;
      return mensajes;
    },
    mostrarToplayer() {
      return this.ver_toplayer;
    },
    cantidad() {
      return this.storeCarroCompra.compraRapida.cantidad;
    },
    producto() {
      return this.data_producto;
    },
    precios() {
      return {
        normal: this.producto.regular_price,
        oferta: this.producto.price,
        on_sale: this.producto.on_sale,
        bolsas_producto: this.producto.bolsas_producto,
      };
    },
    url() {
      return "/producto/" + this.producto.slug;
    },
    categoria() {
      return this.producto.categories[0].name;
    },
    imagen() {
      return this.producto.hasOwnProperty("images")
        ? this.producto.images[0].src
        : this.producto.image;
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
      let cantidad = this.cantidad;
      if (cantidad > 1) {
        cantidad--;
        this.storeCarroCompra.actualizarCompraRapida(cantidad, 'cantidad');
      }
    },
    aumentarCantidad() {
      let cantidad = this.cantidad;
      if (!this.limiteStock) {
        cantidad++;
        this.storeCarroCompra.actualizarCompraRapida(cantidad, 'cantidad');
      } else if (cantidad + 1 <= this.limiteStock) {
        cantidad++;
        this.storeCarroCompra.actualizarCompraRapida(cantidad, 'cantidad');
      }
    },

    cerrar(event, redireccionar = false) {
      event.stopPropagation();
      this.$emit("cerrarTopLayer");
      if (redireccionar) this.$router.push({ path: redireccionar });
    },
  },
};
</script>
