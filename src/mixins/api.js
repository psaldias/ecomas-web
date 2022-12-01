import axios from 'axios'
import { useLlamadasApiStore } from '/src/stores/llamadasApi'

export default {
  data() {
    return {
      errorData:false,
      opciones:{},
      respuesta:{},
      store:useLlamadasApiStore(),
    }
  },
    methods:{
        /** FUNCION PARA PETICIONES GET CON AXIONS */
        async enviarGet(url,opciones = { cache:true, requestOptions:false}){
            /** verficar si la url ya está en cache y si se solicita leer el cache */
            if( this.store.llamadas[url]  && opciones.cache){
              return this.store.llamadas[url].respuesta;
            }else{

              let headers = {};

              /** validar si el endpoint necesita autorización */
              if(opciones.authorization){

                headers["Authorization"] =  'Bearer '+this.store.token;
              }

              const response = await axios.get(url,{headers}).catch(error => {
                if(error.code == "ERR_NETWORK")
                  this.$router.push({ name: 'error' })
                  return false;
              });

              if(response.status != 200)
                this.errorData = true

              if(response && opciones.cache)
                this.store.guardarLlamada(url,response,this.errorData)

              return response;
            }
        },
        /** FUNCION PARA PETICIONES POST CON AXIONS */
        async enviarPost(url,data,opciones = { opciones:false}){
            let headers = {
              "Content-Type": "multipart/form-data",
            }

            /** validar si el endpoint necesita autorización */
            if(opciones.authorization){

              headers["Authorization"] =  'Bearer '+this.store.token;
            }

            const response = await axios.post(
              url,
              data,{
                headers: headers
              }).catch(error => {
              if(error.code == "ERR_NETWORK")
                this.$router.push({ name: 'error' })
                return false;
            });

            if(response.status != 200)
              this.errorData = true

            return response;
        },
        /** FUNCION PARA PETICIONES POST CON AXIONS */
        async enviarDelete(url,data,opciones = {}){

          const response = await axios.post(
            url,
            data).catch(error => {
            if(error.code == "ERR_NETWORK")
              this.$router.push({ name: 'error' })
              return false;
          });

          if(response.status != 200)
            this.errorData = true

          return response;
      },
        /** OBTENER JSON TOKEN */
        // async obtenerToken() {

        //   const credenciales = {"username":import.meta.env.VITE_USUARIO_ADMIN,"password":import.meta.env.VITE_CLAVE_USUARIO_ADMIN};

        //   const response = await axios.post(
        //     import.meta.env.VITE_ENDPOINT_GENERAR_TOKEN,credenciales
        //   ).catch(error => {
        //       this.$router.replace({ name: 'error' })
        //       return false;
        //   });

        //   /** SI NO SE OBTIENE EL TOKEN REDIRECCION A ERROR */
        //   if(!response){
        //       this.$router.replace({ name: 'error' })
        //       return false;
        //   }

        //   this.store.guardarToken(response.data.token);
        //   // axios.defaults.headers.common['Authorization'] = 'Bearer '+this.store.token;


        // },
        base64_encode(s) {
            return btoa(unescape(encodeURIComponent(s)));
        },
        base64_decode(s) {
            return decodeURIComponent(escape(atob(s)));
        }
    },
}