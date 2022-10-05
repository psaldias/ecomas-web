import { defineStore } from 'pinia'

export const useLlamadasApiStore = defineStore('llamadasApi', {
  state: () => {
    return { llamadas: {

    } }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    guardarLlamada(key,respuesta,error) {
      this.llamadas[key] = {
        fecha: Date.now(),
        respuesta,
        error
      }
    },
  },
})