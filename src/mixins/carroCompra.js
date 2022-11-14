import axios from 'axios'
import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useLlamadasApiStore } from '/src/stores/llamadasApi'
import { useOpcionesGeneralesStore } from '/src/stores/opcionesGenerales'

export default {
  data() {
    return {
      opciones:{},
      respuesta:{},
      storeCarroCompra: useCarroCompraStore(),
      store:useLlamadasApiStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
    }
  },
    methods:{


      /**
       *
       * FUNCIONES COMPRA RAPIDA
       *
       *
       */
      /** FUNCIÓN PARA VALIDAR_COMPRA_RAPIDA */

      async obtenerProductosCompraRapida(  data = { } ){

        let headers = {};

        // if(!this.store.token)
        //   await this.obtenerToken();
        headers["Authorization"] =  'Bearer '+this.store.token;


        const response = await axios.get( import.meta.env.VITE_ENDPOINT_COMPRA_RAPIDA_PRODUCTOS+'&sucursal='+this.store_opciones_generales.sucursal_seleccionada.ID ,{headers}).catch(error => {
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
        data.email = this.storeCarroCompra.compraRapida.email;
        data.nombre = this.storeCarroCompra.compraRapida.nombre;
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

      /**
       *
       *
       * FUNCIONES COMPRA NORMAL
       *
       *
       */
      /** OBTENER PRODUCTOS PARA LA TIENDA */
      async obtenerProductosTienda(  data = { } ){

        let headers = {};

        // if(!this.store.token)
        //   await this.obtenerToken();

        headers["Authorization"] =  'Bearer '+this.store.token;


        const response = await axios.get( import.meta.env.VITE_ENDPOINT_COMPRA_PRODUCTOS+'&sucursal='+this.store_opciones_generales.sucursal_seleccionada.ID ,{headers}).catch(error => {
            if(error.code == "ERR_NETWORK")
              this.$router.replace({ name: 'error' })
              return false;
          });

        if(response.status != 200)
          this.errorData = true;

        /** GUARDAR DATOS CARRO EN STORE */
        this.storeCarroCompra.actualizarCarro(response.data, "productos");

      },

      /** FUNCIÓN PARA VALIDAR SI EL PRODUCTO SE PUEDE AGREGAR AL CARRO */
      async validarProductoCompraNormal( idProducto, cantidad=1 ){
        let data = {
          idProducto,
          cantidad,
          sucursal:this.store_opciones_generales.sucursal_seleccionada.ID
        };

        let headers = {};
        // if(!this.store.token)
        //   await this.obtenerToken();

        headers["Authorization"] =  'Bearer '+this.store.token;

        const response = await axios.post( import.meta.env.VITE_ENDPOINT_VALIDAR_PRODUCTO_COMPRA_NORMAL+'?sucursal='+data.sucursal , data,{headers}).catch(error => {
          if(error.code == "ERR_NETWORK")
            this.$router.replace({ name: 'error' })
            return error.response;
        });


        return response.data;
      },

      /** FUNCIÓN PARA VALIDAR COMPRA NORMAL */
      async validarCompraNormal( accion = 'validar', extra = {} ){
        this.storeCarroCompra.actualizarCarro(true, "cargando");
        /** ELIKMINAR MENSAJES DEL CARRO ANTES DE VOLVER A COMPROBAR */
        let carroValidado = this.storeCarroCompra.carro.validado;
        if(carroValidado.hasOwnProperty('mensajes')){
          carroValidado.mensajes = '';
          this.storeCarroCompra.actualizarCarro(carroValidado, "validado");
        }

        let data = {};
        data.productos = this.storeCarroCompra.carro.data.productos;
        data.registro = this.storeCarroCompra.carro.data.registro;
        data.despacho = this.storeCarroCompra.carro.data.despacho;
        data.facturacion = this.storeCarroCompra.carro.data.facturacion;
        data.sucursal = this.store_opciones_generales.sucursal_seleccionada.ID;
        data.extra = extra;
        data.cupon = this.storeCarroCompra.carro.data.cupon;
        data.accion = accion;
        data.usuario = this.storeCarroCompra.usuarioCarroCompra.id;
        if(data.productos.length > 0){

          // data.direccion = this.storeCarroCompra.compraRapida.direccion;
          // data.telefono = this.storeCarroCompra.compraRapida.telefono;
          // data.horario_entrega = this.storeCarroCompra.compraRapida.horarioEntrega;

          let headers = {};
          if(this.storeCarroCompra.usuarioCarroCompra.token){
            headers["Authorization"] =  'Bearer '+this.storeCarroCompra.usuarioCarroCompra.token;
          }


          const response = await axios.post( import.meta.env.VITE_ENDPOINT_VALIDAR_COMPRA_NORMAL+'?sucursal='+data.sucursal  , data,{headers}).catch(error => {
              if(error.code == "ERR_NETWORK")
                this.$router.replace({ name: 'error' })
                return false;
            });

          if(response.status != 200)
            this.errorData = true;

          /** GUARDAR DATOS CARRO EN STORE */
          this.storeCarroCompra.actualizarCarro(response.data, "validado");
        }
        this.storeCarroCompra.actualizarCarro(false, "cargando");

      },

      /** FUNCIÓN PARA AGREGAR UN PRODUCTO EN CARRO NORMAL */
      async agregarProductoCarro( idProducto, cantidad = 1, producto , toplayer = true ){
        cantidad = parseInt(cantidad);
        const respuesta = await this.validarProductoCompraNormal(idProducto, cantidad);
        if(respuesta.tipo == "exito"){
          this.storeCarroCompra.agregarProductoCarro(idProducto, cantidad);
        }else{
          /** SI ES ERROR AGREGAMOS EL ERROR EN EL PRODUCTO DEL CARRO PARA VISUALIZAR */
          let carroValidado = this.storeCarroCompra.carro.validado;
          if(carroValidado){
            const indexProducto = carroValidado.productos.findIndex(producto => producto.id == idProducto);
            if(indexProducto >= 0){
              carroValidado.productos[indexProducto].errores = respuesta.mensaje;
              this.storeCarroCompra.actualizarCarro(carroValidado, 'validado');
            }
          }


        }

        if(toplayer)
          this.storeCarroCompra.actualizarCarro({cantidad,mostrar:true,producto,respuesta}, 'datos_toplayer');

        return respuesta;

      },
      /** FUNCIÓN PARA ELIMINAR UN PRODUCTO DEL CARRO NORMAL */
      async eliminarProductoCarro( idProducto){
        this.storeCarroCompra.eliminarProductoCarro(idProducto);
      },
      /** FUNCIÓN PARA APLICAR CUPON EN CARRO NORMAL */
      async aplicarCuponCarro( cupon ){
        if(cupon){
          let dataCarro = this.storeCarroCompra.carro.data;
          dataCarro.cupon = cupon
          this.storeCarroCompra.actualizarCarro(dataCarro,'data');
          this.validarCompraNormal('cupon');
        }
      },

      /** FUNCIÓN PARA RESTAURAR SESIÓN DEL CARRO NORMAL */
      limpiarCarro(  ){

        let dataCarro = {
          productos:[],
          cupon:[],
          registro:{
            rut: '',
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            tipoDocumento: 'Boleta',
            email: '',
            confirmar_email: '',
            password: '',
            confirmar_password: '',
            crearCuenta:false,
          },
          despacho:{
            direccion:{
              direccionCompleta:''
            },
            telefono:'',
          },
          facturacion:{
            rut:'',
            razon_social:'',
            giro:'',
            nombre:'',
            apellidos:'',
            direccion:{
              direccionCompleta:''
            },
            telefono:'',
          }
        }

        this.storeCarroCompra.actualizarCarro(dataCarro,'data');
      },



        /** FUNCIONES GENERALES */
        monedaChilena(valor){
          if(!valor)
            return valor;

          return new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format( parseInt(valor));
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