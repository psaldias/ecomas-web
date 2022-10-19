import axios from 'axios'
import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useLlamadasApiStore } from '/src/stores/llamadasApi'
import { useOpcionesGeneralesStore } from '/src/stores/opcionesGenerales'

export default {
  data() {
    return {
      cart_key:false,
      opciones:{},
      respuesta:{},
      storeCarroCompra: useCarroCompraStore(),
      store:useLlamadasApiStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
    }
  },
    methods:{

      /** FUNCIÓN PARA VALIDAR_COMPRA_RAPIDA */
      async obtenerProductosCompraRapida(  data = { } ){

        let headers = {};

        if(!this.store.token)
          await this.obtenerToken();

        headers["Authorization"] =  'Bearer '+this.store.token;


        const response = await axios.get( import.meta.env.VITE_ENDPOINT_CARRO_COMPRA_PRODUCTOS+'&sucursal='+this.store_opciones_generales.sucursal_seleccionada.ID ,{headers}).catch(error => {
            if(error.code == "ERR_NETWORK")
              this.$router.replace({ name: 'error' })
              return false;
          });

        if(response.status != 200)
          this.errorData = true;

        /** GUARDAR DATOS CARRO EN STORE */
        this.storeCarroCompra.actualizarCompraRapida(response.data, "productos");

      },


        /** FUNCIÓN PARA VALIDAR_COMPRA_RAPIDA */
        async validarCompraRapida( accion =' agregar_producto', data = { } ){

          data.id = this.storeCarroCompra.compraRapida.productoSeleccionado;
          data.quantity = 1;
          data.accion = accion;
          data.direccion = this.storeCarroCompra.compraRapida.direccion;
          data.telefono = this.storeCarroCompra.compraRapida.telefono;
          data.horario_entrega = this.storeCarroCompra.compraRapida.horarioEntrega;
          data.cupon = this.storeCarroCompra.compraRapida.codigoDescuento;
          data.sucursal = this.store_opciones_generales.sucursal_seleccionada.ID;

          let headers = {};
          if(this.storeCarroCompra.usuarioCarroCompra.token){
            headers["Authorization"] =  'Bearer '+this.storeCarroCompra.usuarioCarroCompra.token;
          }


          const response = await axios.post( import.meta.env.VITE_ENDPOINT_VALIDAR_COMPRA_RAPIDA , data,{headers}).catch(error => {
              if(error.code == "ERR_NETWORK")
                this.$router.replace({ name: 'error' })
                return false;
            });

          if(response.status != 200)
            this.errorData = true;

          /** GUARDAR DATOS CARRO EN STORE */
          this.storeCarroCompra.actualizarCompraRapida(response.data, "carro");

        },



        /** FUNCIONES GENERALES */
        monedaChilena(valor){
          if(!valor)
            return valor;

          return "$"+new Intl.NumberFormat('cl-CL').format( parseInt(valor));
        },
        fechaFormateada(fecha,hora = true){
          var date = new Date(fecha);
          let opciones = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }
          if(hora){
            opciones.hour = '2-digit';
            opciones.minute = '2-digit';
            opciones.second = '2-digit';
          }
          return date.toLocaleString('es-Es', opciones);
        }
    },
}