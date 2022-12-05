import axios from 'axios'
import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useLlamadasApiStore } from '/src/stores/llamadasApi'

export default {
  data() {
    return {
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
            localStorage.removeItem('dataCarro');
          }else{
            return mensaje;
          }

          return mensaje;
        },

        /** ACTUALIZAR DATOS USUARIO */
        async actualizar_usuario(data) {
          let headers = {};

          // if(!this.store.token)
          //     await this.obtenerToken();

          headers["Authorization"] =  'Bearer '+this.store.token;

          let mensaje = {tipo:'exito',mensaje:'Datos actualizados correctamente.'};

          const response = await axios.post(
            import.meta.env.VITE_ENDPOINT_ACTUALIZAR_USUARIO+this.usuarioCarroCompra().id,data,{headers}
          ).catch(error => {
            mensaje = {tipo:'error',mensaje:error.response.data.message};
            return error.response;
          });

          if(response.status == 200){
            let dataUsuario = this.usuarioCarroCompra();
            if(data?.first_name)
              dataUsuario.user_first_name = data.first_name
            if(data?.last_name)
              dataUsuario.user_last_name = data.last_name
            if(data?.phone)
              dataUsuario.billing.phone = data.phone

            this.definirUsuario(dataUsuario);
          }

          return mensaje;
        },

        /** ACTUALIZAR DATOS USUARIO */
        async actualizar_billing_usuario(data) {
          let headers = {};

          if(this.storeCarroCompra.usuarioCarroCompra.token)
            headers["Authorization"] =  'Bearer '+this.storeCarroCompra.usuarioCarroCompra.token;

          let mensaje = {tipo:'exito',mensaje:'Datos actualizados correctamente.'};

          const response = await axios.post(
            import.meta.env.VITE_ACTUALIZAR_BILLING_USUARIO,data,{headers}
          ).catch(error => {
            mensaje = {tipo:'error',mensaje:error.response.data.message};
            return error.response;
          });

          if(response.status == 200){
            let dataUsuario = this.usuarioCarroCompra();
            if(data?.billing_phone)
              dataUsuario.billing.phone = data.billing_phone

            this.definirUsuario(dataUsuario);
          }

          return mensaje;
        },

        /** VALIDAR EMAIL PARA INICIAR PROCESO REGISTRO */
        async validarEmailRegistro(email) {

            let headers = {};

            // if(!this.store.token)
            //     await this.obtenerToken();

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

          // if(!this.store.token)
          //     await this.obtenerToken();

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

        /** RECUPERAR CONTRASEÑA */
        async recuperarPassword(email) {

          let headers = {};

          // if(!this.store.token)
          //     await this.obtenerToken();

          headers["Authorization"] =  'Bearer '+this.store.token;

          let mensaje = {tipo:'exito',exito:''};

        const response = await axios.post(
          import.meta.env.VITE_VALIDAR_LOST_PASSWORD,{email},{headers}
        ).catch(error => {
          return error.data;
        });
        return response.data;
      },
       /** RECUPERAR CONTRASEÑA */
       async actualizarPassword(id, key = false, password) {

        let headers = {};

        // if(!this.store.token)
        //     await this.obtenerToken();

        headers["Authorization"] =  'Bearer '+this.store.token;

        let mensaje = {tipo:'exito',exito:''};

      const response = await axios.post(
        import.meta.env.VITE_ACTUALIZAR_PASSWORD,{id,key,password},{headers}
      ).catch(error => {
        return error.data;
      });
      return response.data;
    },

        /** CERRAR SESIÓN USUARIO*/
        async cerrarSesion() {
          localStorage.removeItem('usuario');
          localStorage.removeItem('dataCarro');
          this.storeCarroCompra.actualizarUsuarioStore(false) ;
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
        async obtenerPedido(id,key = false) {

          let headers = {};
          headers["Authorization"] =  'Bearer '+this.store.token;
            let url = '?id='+id;
            if(key)
              url += '&key='+key;

            const response = await axios.get(
              import.meta.env.VITE_ORDER+url,{headers}
            ).catch(error => {
              return error.response;
            });
            return response;
        },




        /** HELPERS */

        validateEmail(email) {
            return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))? true:false;
        }

    },
}