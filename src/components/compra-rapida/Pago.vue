<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column ">
      <Mensajes :mensajes="mensajes"></Mensajes>
      <div v-html="this.storeCarroCompra.carro.validado.mensajes"></div>
      <div class="card pago">
        <h4 class="primero mb-4">MÉTODO DE PAGO</h4>
          <div v-if="!cargando">


            <div  v-for="metodo in metodosPago">
              <div class="control mb-2 metodo" >
                <label class="radio">
                  <input type="radio" name="metodo-pago" v-model="metodoSeleccionado" :value="metodo.id">
                  <span class="imagen"><img :src="metodo.icono" alt=""> </span>  {{metodo.nombre}}
                </label>
              </div>
              <div class="content is-size-7 mt-2">
                {{metodo.descripcion}}
              </div>
            </div>



            <div class="mt-4">
              <button class="button bg-primero has-text-white is-rounded px-6" @click.prevent="realizarPedido">Realizar el Pedido</button>
            </div>
          </div>
          <CargandoSeccion v-else></CargandoSeccion>

<!--
          <div class="control metodo">
            <label class="radio">
              <input type="radio" name="metodo-pago">
              <span class="imagen"><img src="/img/mercado-pago.png" alt=""> </span> Mercado Pago
            </label>
          </div> -->



      </div>
    </div>
    <div class="column is-4">

      <BoxDespacho></BoxDespacho>
      <BoxTotales :boton="false"></BoxTotales>
    </div>
  </div>
</template>

<script>
import BoxDespacho from '/src/components/carro/BoxDespacho.vue';
import BoxTotales from '/src/components/compra-rapida/BoxTotales.vue';
import InputCheck from '../formulario/InputCheck.vue';
import CargandoSeccion from '../general/CargandoSeccion.vue';
import Mensajes from '/src/components/general/Mensajes.vue';

import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useOpcionesGeneralesStore } from '/src/stores/opcionesGenerales'
export default {
    data() {
        return {
          cargando:false,
          metodoSeleccionado:false,
          storeCarroCompra: useCarroCompraStore(),
          store_opciones_generales: useOpcionesGeneralesStore(),
          metodosPago:[],
          mensajes: {
            exito:'',
            error:'',
          },
        };
    },
    computed: {
      metodosActivos(){
        return this.metodosPago.filter(metodo => metodo.enabled)
      },
      sucursalSeleccionada(){
        return this.store_opciones_generales.sucursal_seleccionada;
      }
    },
    methods: {
      async obtenerMetodosPago(){
        this.cargando = true;
        this.metodosPago = await this.obtenerMetodosDePago();
        this.cargando = false;
      },
      async realizarPedido(){

          if(!this.metodoSeleccionado){
            this.mensajes.error = 'Debes seleccionar un método de pago';
            return false;
          }

          this.storeCarroCompra.actualizarCompraRapida(this.metodoSeleccionado, "metodo_pago");
          /** VALIDAR CARRO */
          this.cargando = true;
          await this.validarCompraRapida('pago');

          if(this.storeCarroCompra.compraRapida.carro.metodo_pago.result != 'success'){
            this.mensajes.error = 'Ocurrio un error';
            this.cargando = false;
          }else{
            window.location.href = this.storeCarroCompra.compraRapida.carro.metodo_pago.redirect;
          }

      }
    },
    async mounted(){
      /** VALIDAR CARRO */
      this.cargando = true;
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


        await this.validarCompraRapida('agregar-producto');
        this.cargando = false;

        this.obtenerMetodosPago();

        this.metodoSeleccionado = this.storeCarroCompra.compraRapida.metodo_pago;
    }
      // window.location.href = this.storeCarroCompra.carro.validado.metodo_pago.redirect;
    },
    watch:{
    'sucursalSeleccionada.fields.coordenadas_sucursal':{
      async handler(newValue, oldValue) {
        this.cargando = true;
        await this.validarCompraRapida('agregar-producto');
        this.cargando = false;
      },
      deep: true
    },
  },
    components: { BoxDespacho, BoxTotales, InputCheck, CargandoSeccion, Mensajes }
};
</script>
