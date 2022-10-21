import { defineStore } from 'pinia'
import helpers from '/src/utils/helpers.js'

export const useCarroCompraStore = defineStore('carroCompra', {
  state: () => {
    return {
        carro:{
          cargando:false,
          validado:false,
          data:{
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
          },
          productos:[],
          datos_toplayer: {
            cantidad: 1,
            mostrar: false,
            producto: false,
            respuesta:{tipo:'',mensaje:''}
          },
          cargando:false,
        },
        compraRapida:{
          telefono:'',
          direccion:false,
          codigoDescuento:false,
          horarioEntrega:false,
          productoSeleccionado:false,
          productos:[],
          carro:{
            is_empty:true,
            productos:[],
            mensajes:""
          },
        },
        usuario:false
     }
  },
  actions: {
    actualizarCompraRapida(data, key = false) {
      if(key)
        this.compraRapida[key] = data;
      else
        this.compraRapida = data;
    },
    actualizarMensaesCompraRapida(data, key) {
        this.compraRapida.carro.mensajes[key] = data;
    },
    actualizarCarro(data, key = false) {
      if(key)
        this.carro[key] = data;
      else
        this.carro = data;

      localStorage.dataCarro = helpers.base64_encode(this.carro.data,true);
    },
    agregarProductoCarro(idProducto, cantidad = 1) {
      const index = this.carro.data.productos.findIndex(producto => producto.id === idProducto );

      if(index >= 0)
        this.carro.data.productos[index] = {id:idProducto,cantidad}
      else
        this.carro.data.productos.push({id:idProducto,cantidad});

        localStorage.dataCarro = helpers.base64_encode(this.carro.data,true);
    },
    eliminarProductoCarro(idProducto) {
      const productos = this.carro.data.productos.filter(producto => producto.id != idProducto );
      this.carro.data.productos = productos;

      localStorage.dataCarro = helpers.base64_encode(this.carro.data,true);
    },
    actualizarUsuarioStore(data) {
      this.usuario = data;
    },

  },
  getters: {
    ComraRapidaproductosConStock: (state) => {
      if(state.compraRapida.productos.length == 0)
        return [];

      return state.compraRapida.productos.filter(producto => producto.stock_status == 'instock');
    },
    usuarioCarroCompra : (state) => {
      let usuario = false;
      if(localStorage.usuario){
        usuario = JSON.parse(localStorage.usuario);
        state.actualizarUsuarioStore(usuario);
      }else if(state.usuario){
        usuario = state.usuario;
      }

      return  usuario;
    }
  },
})