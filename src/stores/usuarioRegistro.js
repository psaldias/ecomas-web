import { defineStore } from 'pinia'

export const useUsuarioRegistroStore = defineStore('usuarioRegistro', {
  state: () => {
    return {
      usuario: {
        email:''
      },
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    guardarDato(key,dato) {
      this.usuario[key] = dato;
    },

  },
})