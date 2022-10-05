import axios from 'axios'
import { useLlamadasApiStore } from '@/stores/llamadasApi'

export default {
  data() {
    return {
      errorData:false,
      opciones:{},
      respuesta:{},
      store:useLlamadasApiStore(),
      // url_api:'http://ecomaswp.localhost/wp-json',
      url_api:'https://ecomaswp.mandrildigital.cl/wp-json',
      baseUrl:'/wp/v2/',
    }
  },
    methods:{
        async obtenerInfoInicial(url,opciones = { cache:true,baseUrl:'',requestOptions:false}){
          // return JSON.parse(atob("eyJ0ZXN0IjoiaG9sYSIsIm9qbyI6InRlc3QifQ=="));

            if( this.store.llamadas[url]  && opciones.cache){
              return this.store.llamadas[url].respuesta;
            }else{

              if(opciones.baseUrl)
                this.baseUrl = opciones.baseUrl;

              const response = await axios.get(this.url_api+this.baseUrl+url,opciones.requestOptions).catch(error => {
                if(error.code == "ERR_NETWORK")
                  this.$router.replace({ name: 'error' })

                  return false;

              });

              if(response.status != 200)
                this.errorData = true

              if(response && opciones.cache)
                this.store.guardarLlamada(url,response,this.errorData)

              return response;
            }
        },
        async enviarPost(url,data,opciones = { baseUrl:'',opciones:false}){
          // return JSON.parse(atob("eyJ0ZXN0IjoiaG9sYSIsIm9qbyI6InRlc3QifQ=="));
            let baseUrl = this.baseUrl;

            if(opciones.baseUrl)
              baseUrl = opciones.baseUrl;

            const response = await axios.post(this.url_api+baseUrl+url,data,{
              headers: {
                "Content-Type": "multipart/form-data",
              }}).catch(error => {
              if(error.code == "ERR_NETWORK")
                this.$router.replace({ name: 'error' })

                return false;

            });

            if(response.status != 200)
              this.errorData = true



            return response;
        },
        base64_encode(s) {
            return btoa(unescape(encodeURIComponent(s)));
        },
        base64_decode(s) {
            return decodeURIComponent(escape(atob(s)));
        }
    },
}