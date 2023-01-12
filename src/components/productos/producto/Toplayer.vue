<template>
  <teleport to="#modal">
    <transition name="modal">
      <div
        class="toplayer toplayer-producto"
        v-if="mostrarToplayer"
        @click.self="cerrar($event)"
      >
        <div class="toplayer_content card">
          <div class="acciones-cabecera has-text-right pt-3 pr-3">
            <a
              href="#"
              @click.prevent="cerrar($event, '/ingresar')"
              class="button is-rounded button-icono mr-2"
              v-if="!usuarioCarroCompra()"
              ><i class="fa-solid fa-circle-user"></i> Iniciar Sesión</a
            >
            <button
              class="delete ecomas is-large"
              @click.prevent="cerrar($event)"
            ></button>
          </div>

          <div class="producto horizontal">
            <div class="columns is-vcentered">
              <div class="column is-narrow py-0">
                <Imagen
                  :imagen="producto.imagen"
                  :alt="producto.name"
                  :url="url"
                ></Imagen>
              </div>
              <div class="column py-0">
                <div class="columns is-vcentered">
                  <div class="column is-narrow">
                    <div class="nombre mb-2">{{ producto.name }}</div>
                    <Precio :precios="precios"></Precio>
                  </div>
                  <div class="column is-hidden-mobile is-1"></div>
                  <div class="column">
                    <div
                      class="descripcion mb-0"
                      v-html="producto.short_description"
                    ></div>
                  </div>
                </div>
                <div class="columns is-align-items-end">
                  <div class="column acciones is-narrow pt-0">
                    <div class="cantidad mx-auto has-text-centered">
                      <b class="primero is-size-7">Cantidad</b>
                      <div class="is-flex is-fullwidth is-justify-content-center">
                        <button disabled class="button is-small is-rounded50">-</button>
                        <input
                          type="text"
                          class="input is-rounded is-small is-inline-block"
                          :value="cantidad"
                          readonly
                        />
                        <button disabled class="button is-small is-rounded50">+</button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="pt-0 column has-text-right-tablet has-text-centered-mobile botonera"
                  >
                    <button
                      class="button is-rounded is-7 button-icono mr-2"
                      @click.prevent="cerrar($event)"
                    >
                      <b><i class="fa-solid fa-cart-shopping"></i> Continuar Comprando</b>
                    </button>
                    <button
                      class="button is-rounded is-7 button-icono"
                      @click.prevent="cerrar($event, '/carro')"
                    >
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
      return this.storeCarroCompra.carro.datos_toplayer.mostrar;
    },
    cantidad() {
      return this.storeCarroCompra.carro.datos_toplayer.cantidad;
    },
    producto() {
      return this.storeCarroCompra.carro.datos_toplayer.producto;
    },
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
      return this.producto.hasOwnProperty("images")
        ? this.producto.images[0].src
        : this.producto.image;
    },
  },
  methods: {
    cerrar(event, redireccionar = false) {
      event.stopPropagation();
      this.storeCarroCompra.actualizarCarro(
        { cantidad: 1, mostrar: false, producto: false },
        "datos_toplayer"
      );

      if (redireccionar) this.$router.push({ path: redireccionar });
    },
  },
};
</script>
