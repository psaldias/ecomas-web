import { defineStore } from 'pinia'

export const useCarroCompraStore = defineStore('carroCompra', {
  state: () => {
    return {
        carro:{
          productosEnCaro:{},
          productos:{}
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