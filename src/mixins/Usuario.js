import axios from 'axios'
import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useLlamadasApiStore } from '/src/stores/llamadasApi'

export default {
  data() {
    return {
      cart_key:false,
      opciones:{},
      respuesta:{},
      storeCarroCompra: useCarroCompraStore(),
      store:useLlamadasApiStore(),
    }
  },
    methods:{
        /** ACCIONES USUARIO */

        /** DEFINIR EL ID DEL CARRO */
        definirUsuario(dataUsuario){
          if(dataUsuario){
            localStorage.usuario = JSON.stringify(dataUsuario) ;
            this.storeCarroCompra.actualizarUsuarioStore(dataUsuario) ;
          }
        },
        usuarioCarroCompra(){
          return  this.storeCarroCompra.usuarioCarroCompra ?? false;
        },

        /** LOGIN USUARIO PAR AOBTENER TOKEN*/
        async loginUsuario($usuario,$password) {
          const credenciales = {"username":$usuario,"password":$password};
          let mensaje = {tipo:'',mensaje:''};

          const response = await axios.post(
            import.meta.env.VITE_ENDPOINT_GENERAR_TOKEN,credenciales
          ).catch(error => {
            mensaje = {tipo:'error',mensaje:error.response.data.message};
            return error.response;
          });

          if(response.status == 200){
            mensaje = {tipo:'exito',mensaje:''};
            this.definirUsuario(response.data);
          }

          return mensaje;
        },

        /** VALIDAR EMAIL PARA INICIAR PROCESO REGISTRO */
        async validarEmailRegistro(email) {

            let headers = {};

            if(!this.store.token)
                await this.obtenerToken();

            headers["Authorization"] =  'Bearer '+this.store.token;

            let mensaje = {tipo:'exito',exito:''};

          const response = await axios.post(
            import.meta.env.VITE_VALIDAR_EMAIL,{email},{headers}
          ).catch(error => {
            mensaje = {tipo:'error',error:error.response.data.message};
            return error.response;
          });
          if(response.status != 200){
            mensaje = {tipo:'error',error:'Error de conexión'};
          }
          if(response.data){
            mensaje = {tipo:'error',error:'El usuario ya está registrado'};
          }

          return mensaje;
        },

        /** REGISTRAR USUARIO */
        async registrar_usuario(data) {
          let headers = {};

          if(!this.store.token)
              await this.obtenerToken();

          headers["Authorization"] =  'Bearer '+this.store.token;

          let mensaje = {tipo:'exito',mensaje:'Usuario creado correctamente.'};

          const response = await axios.post(
            import.meta.env.VITE_REGISTRAR_USUARIO,data,{headers}
          ).catch(error => {
            mensaje = {tipo:'error',mensaje:error.response.data.message};
            return error.response;
          });
          if(response.status == 200){
           await this.loginUsuario(data.email,data.password);
          }

          return mensaje;
        },

        /** CERRAR SESIÓN USUARIO*/
        async cerrarSesion() {
          localStorage.removeItem('usuario');
          this.storeCarroCompra.actualizarUsuarioStore({}) ;
          // this.$router.replace({ path: '/ingresar' });
          location.reload();
        },


         /** OBTENER LISTADO DE PEDIDOS DEL USUARIO CONECTADO */
         async pedidosUsuario() {

          let headers = {};
          if(this.storeCarroCompra.usuarioCarroCompra.token){
            headers["Authorization"] =  'Bearer '+this.storeCarroCompra.usuarioCarroCompra.token;

            const response = await axios.get(
              import.meta.env.VITE_ORDERS_USUARIO,{headers}
            ).catch(error => {
              return false;
              return error.response;
            });
            return response;
          }
        },

        /**  OBTENER UN PEDIDO SEGÚN SU ORDER_KEY */
        async obtenerPedido(id,key) {

          let headers = {};
          // if(this.storeCarroCompra.usuarioCarroCompra.token){
            // headers["Authorization"] =  'Bearer '+this.storeCarroCompra.usuarioCarroCompra.token;

            const response = await axios.get(
              import.meta.env.VITE_ORDER+'?id='+id+"&key="+key
            ).catch(error => {
              return error.response;
            });
            return response;
        },




        /** HELPERS */

        validateEmail(email) {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))? true:false;
        }

    },
}