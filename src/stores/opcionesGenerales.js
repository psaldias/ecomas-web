import { defineStore } from 'pinia'

export const useOpcionesGeneralesStore = defineStore('opcionesGenerales', {
  state: () => {
    return {
        cargando:true,
        rrss:{
            instagram:false,
            facebook:false,
            youtube:false,
            whatsapp:false
        },
        telefono_footer:false,
        menus:{}
     }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    guardarDatos(datos) {
      this.cargando = datos.cargando;
      this.rrss = datos.rrss;
      this.telefono_footer = datos.telefono_footer;
      this.menus = datos.menus;
    },
  },
})