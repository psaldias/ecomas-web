<template>

  <div class="columns">
    <div class="column">
      <div v-html="storeCarroCompra.compraRapida.carro.mensajes" class="mb-2"></div>
    </div>
  </div>

  <div class="columns is-centered">
    <div class="column">
      <div class="card card-compra-rapida card-final height-100">
        <div class="columns is-vcentered is-mobile">
          <div class="column contenido has-text-centered-mobile">
            <h2>Código de descuento</h2>
            <h3 class="mb-2">si tienes un cupón de descuento, ingresa tu código aquí:</h3>

            <div class="field mb-5">
              <input type="text" class="input input-2 w-100" v-model="codigoDescuento" />
            </div>


            <div class="block has-text-right-tablet has-text-centered-mobile">
              <a
                @click.prevent="aplicar_cupon()"
                class="button is-rounded is-small button-icono px-5"
                v-if="!cargando_cupon"
              >
                Aplicar Cupón
              </a>
              <cargando-seccion v-if="cargando_cupon"></cargando-seccion>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="card card-compra-rapida card-final height-100">
        <div class="columns is-vcentered is-mobile">
          <div class="column contenido has-text-centered-mobile">
            <h2>Fecha de Entrega</h2>
            <h3 class="mb-4">Horario seleccionado:</h3>

            <div class="field mb-5">
            <input type="text" disabled class="input input-2 w-100" v-model="fecha" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="card card-compra-rapida card-final height-100">
        <div class="columns is-vcentered is-mobile">
          <div class="column contenido">
            <h2 class="has-text-centered-mobile">Resumen Compra</h2>

            <div class="resumen-compra is-size-6 my-5"  v-if="storeCarroCompra.compraRapida.carro.total > 0">
              <div class="columns is-multiline is-gapless is-mobile">
                <div class="column is-8 border">
                  <span class="pr-2 is-block">
                    {{ dataProducto.name }}
                  </span>
                </div>

                <div class="column is-4 has-text-right border">
                  {{ monedaChilena(dataProducto.line_total) }}
                </div>
                <div class="column is-8 primero has-text-weight-bold">
                  <span class="pr-2 is-block"> Subtotal: </span>
                </div>
                <div class="column is-4 has-text-right has-text-weight-bold primero">
                  {{ monedaChilena(storeCarroCompra.compraRapida.carro.subtotal) }}
                </div>
                <div class="column is-8 primero has-text-weight-bold" v-if="storeCarroCompra.compraRapida.carro.get_shipping_total">
                  <span class="pr-2 is-block"> Envío: </span>
                </div>
                <div class="column is-4 has-text-right has-text-weight-bold primero" v-if="storeCarroCompra.compraRapida.carro.get_shipping_total">
                  {{ monedaChilena(storeCarroCompra.compraRapida.carro.get_shipping_total) }}
                </div>

                <div class="column is-8 primero has-text-weight-bold" v-if="storeCarroCompra.compraRapida.carro.get_discount_total">
                  <span class="pr-2 is-block"> Descuento Cupones: </span>
                </div>
                <div class="column is-4 has-text-right has-text-weight-bold primero" v-if="storeCarroCompra.compraRapida.carro.get_discount_total">
                  {{ monedaChilena(storeCarroCompra.compraRapida.carro.get_discount_total) }}
                </div>


                <div class="column is-8 primero has-text-weight-bold">
                  <span class="pr-2 is-block"> Total a Pagar: </span>
                </div>
                <div class="column is-4 has-text-right has-text-weight-bold primero">
                  {{ monedaChilena(storeCarroCompra.compraRapida.carro.total) }}
                </div>
              </div>
            </div>




            <form :action="urBackEnd+'/wp-admin/admin-post.php'" method="POST" v-if="storeCarroCompra.compraRapida.carro.total > 0">
              <input type="hidden" name="action" value="init_cart">
              <input type="hidden" name="producto" :value='storeCarroCompra.compraRapida.productoSeleccionado'>
              <input type="hidden" name="direccion" :value='JSON.stringify(storeCarroCompra.compraRapida.direccion)'>
              <input type="hidden" name="telefono" :value='storeCarroCompra.compraRapida.telefono'>
              <input type="hidden" name="nombre" :value='storeCarroCompra.compraRapida.nombre'>
              <input type="hidden" name="email" :value='storeCarroCompra.compraRapida.email'>
              <input type="hidden" name="horario_entrega" :value='storeCarroCompra.compraRapida.horarioEntrega'>
              <input type="hidden" name="cupon" :value='storeCarroCompra.compraRapida.codigoDescuento'>
              <input type="hidden" name="id" v-if="storeCarroCompra.usuarioCarroCompra" :value='storeCarroCompra.usuarioCarroCompra.id'>
              <input type="hidden" name="sucursal" v-if="store_opciones_generales.sucursal_seleccionada.ID" :value='store_opciones_generales.sucursal_seleccionada.ID'>
              <input type="hidden" name="email" v-if="storeCarroCompra.usuarioCarroCompra" :value='storeCarroCompra.usuarioCarroCompra.user_email'>


              <div class="block has-text-right-tablet has-text-centered-mobile">
                <button class="button is-rounded is-small button-icono px-5" v-if="!cargando && !storeCarroCompra.compraRapida.carro.errores">
                  Continuar
                </button>
              </div>
            </form>

            <cargando-seccion v-if="cargando"></cargando-seccion>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import locale_es from "date-fns/locale/es";
import { useOpcionesGeneralesStore } from '/src/stores/opcionesGenerales'
import CargandoSeccion from "../general/CargandoSeccion.vue";
import Mensajes from "../general/Mensajes.vue";

export default {
  data() {
    return {
      cargando_cupon:false,
      mensajes:{
      },
      cargando:true,
      locale_es,
      codigoDescuento: "",
      fecha: '',
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  async mounted() {
    /** VALIDAMOS QUE EXISTA EL TELÉFONO */
    if (!this.storeCarroCompra.compraRapida.telefono || !this.storeCarroCompra.compraRapida.nombre || !this.storeCarroCompra.compraRapida.email){
      this.$router.push({ path: "/compra-rapida/" });
    /** VALIDAMOS QUE EXISTA LA DIRECCIÓN */
    }else if (!this.storeCarroCompra.compraRapida.direccion){
      this.$router.push({ path: "/compra-rapida/direccion" });
    /** VALIDAMOS QUE EXISTA LA DIRECCIÓN */
    }else if (!this.storeCarroCompra.compraRapida.productoSeleccionado){
      this.$router.push({ path: "/compra-rapida/producto" });
    }else{
      /** DEFINIR FECHA DE ENTREGA SEGÚN LO CONFIGURADO PARA LA SUCURSAL SELECCIONADA */
      var date = new Date();
      date.setDate(date.getDate() + parseInt(this.sucursalCarro.fields.tiempo_de_despacho))
      const fecha_formateada = date.toLocaleDateString('es-ES').split('/').join('-');
      this.fecha = fecha_formateada;
      this.storeCarroCompra.actualizarCompraRapida(this.fecha, "horarioEntrega");

      /** VALIDAR Y OBTENER VALORES DE LA COMPRA RAPIDA */
      const respuesta = await this.validarCompraRapida('agregar-producto');
      this.cargando = false;
    }

  },
  watch: {
    async 'sucursalCarro.ID'(nuevoValor){
      this.$router.push({ path: "/compra-rapida/direccion" });
    }
  },
  computed: {
    urBackEnd(){
      return import.meta.env.VITE_ENDPOINT_BACKEND;
    },
    sucursalCarro(){
      return this.store_opciones_generales.sucursal_seleccionada
    },
    dataProducto() {
      if (!this.storeCarroCompra.compraRapida.carro.is_empty || this.storeCarroCompra.compraRapida.carro.is_empty > 0) {
        let producto_carro = Object.values(this.storeCarroCompra.compraRapida.carro.productos)[0];
        if(!producto_carro)
          return false;

        let producto = this.storeCarroCompra.ComraRapidaproductosConStock.find(
          (producto) => producto.id === producto_carro.product_id
        );
        producto_carro.name = producto.name;
        return producto_carro;
      }
      return {};
    },
  },
  methods: {
    async aplicar_cupon() {
      if(this.codigoDescuento){
        this.cargando=true;
        this.storeCarroCompra.actualizarCompraRapida(this.codigoDescuento, "codigoDescuento");
        await this.validarCompraRapida('agregar-cupon');
        if(!this.storeCarroCompra.compraRapida.carro.cupon_agregado){
          this.storeCarroCompra.actualizarCompraRapida('', "codigoDescuento");
        }
        this.cargando=false;

      }else{
        let mensajes = {
              tipo:"error",
              mensaje:"Debes indicar un cupón",
        };
        this.storeCarroCompra.actualizarMensaesCompraRapida(mensajes, "cupones");
      }
    },
    async finalizar() {
      // let respuesta = await this.obtenerCarroTest(this.codigoDescuento);
    },
  },
  components: { CargandoSeccion, Mensajes },
};
</script>
