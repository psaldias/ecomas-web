<template>
  <div class="columns is-gapless is-centered">
    <div class="column is-6">
      <div class="card card-compra-rapida card-producto">
        <div class="columns is-vcentered is-mobile">
          <div class="column imagen is-3 pl-0 is-hidden-mobile"></div>
          <div class="column is-1 is-hidden-mobile"></div>
          <div class="column contenido has-text-centered-mobile">
            <h2>Bolsas Pellets</h2>
            <h3 class="mb-4">¿Cuantas necesitas?</h3>

            <div class="field mb-5" v-if="!cargando">
              <div class="select select-2">
                <select name="cantidad" id="" v-model="producto">
                  <option
                    :value="producto.id"
                    v-for="producto in productosDisponibles"
                    :key="producto.id"
                  >
                    {{ producto.name }}
                  </option>
                </select>
              </div>
            </div>
            <CargandoSeccion v-if="cargando"></CargandoSeccion>

            <div class="wrapper-imagen-descripcion-producto mx-auto-mobile">
              <img src="/img/pellet-15-kg.webp" alt="" />

              <p class="is-size-7">
                *Compra rápida desde 12 bolsas, si necesitas menos unidades te esperamos
                en nuestras tiendas
              </p>
            </div>

            <div class="block has-text-right-tablet">
              <a
                href="#"
                @click.prevent="continuar()"
                class="button is-rounded is-small button-icono px-5"
              >
                Continuar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import CargandoSeccion from "../general/CargandoSeccion.vue";
import { useOpcionesGeneralesStore } from '/src/stores/opcionesGenerales'
export default {
  data() {
    return {
      producto: "",
      cargando: false,
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  async mounted() {
    /** VALIDAMOS QUE EXISTA EL TELÉFONO */
    if (!this.storeCarroCompra.compraRapida.telefono)
      this.$router.push({ path: "/compra-rapida/" });
    /** VALIDAMOS QUE EXISTA LA DIRECCIÓN */
    if (!this.storeCarroCompra.compraRapida.direccion)
      this.$router.push({ path: "/compra-rapida/direccion" });

    /** COMPROBAR QUE LOS PRODUCTOS PARA COMRPA ESTÁN CARGADOS, SINO LOS TRAE DE LA API */
    this.obtenerProductosCarro();
    // if (this.storeCarroCompra.compraRapida.productos.length == 0) {
    //   const respuesta = await this.enviarGet(
    //     import.meta.env.VITE_ENDPOINT_CARRO_COMPRA_PRODUCTOS,
    //     {
    //       cache: false,
    //       authorization: true,
    //     }
    //   );
    //   if (respuesta) {
    //     this.storeCarroCompra.actualizarCompraRapida(respuesta.data, "productos");
    //     this.cargando = false;
    //   }
    // } else {
    //   this.cargando = false;
    // }


  },
  watch: {
    producto(nuevoValor) {
      this.storeCarroCompra.actualizarCompraRapida(nuevoValor, "productoSeleccionado");
    },
    async sucursalCarro(){
      this.producto = false;
        this.obtenerProductosCarro();
    }
  },
  computed: {
    productosDisponibles(){
        return this.storeCarroCompra.ComraRapidaproductosConStock.filter(producto => {
            return (producto.stock_quantity == null || producto.stock_quantity > 0);
        });
    },
    sucursalCarro(){
        return this.store_opciones_generales.sucursal_seleccionada.ID
    }
  },
  methods: {
    continuar() {
      this.$router.push({ path: "/compra-rapida/final" });

    },
    async obtenerProductosCarro(){
        this.cargando = true;
        await this.obtenerProductosCompraRapida();

        /** ASIGNAR COMO PRODUCTO SELECCIONADO EL QUE LLEGO DEL HOME, SINO ASIGNA EL PRIMERO */
        if (!this.storeCarroCompra.compraRapida.carro.is_empty) {
          this.storeCarroCompra.compraRapida.productoSeleccionado = this.producto = Object.values(this.storeCarroCompra.compraRapida.carro.productos)[0].product_id;
        } else if (this.storeCarroCompra.compraRapida.productoSeleccionado) {
          this.producto = this.storeCarroCompra.compraRapida.productoSeleccionado;
        } else {
          this.storeCarroCompra.compraRapida.productoSeleccionado = this.producto = this.productosDisponibles[0].id;
        }

        this.cargando = false;
    }
  },
  components: { CargandoSeccion },
};
</script>
