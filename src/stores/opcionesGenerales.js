import { defineStore } from 'pinia'

export const useOpcionesGeneralesStore = defineStore('opcionesGenerales', {
  state: () => {
    return {
        cargando:true,
        token:false,
        rrss:false,
        telefono_footer:false,
        restricciones_compras:false,
        restricciones_sucursales:false,
        menus:{},
        sucursales:false,
        ubicaciones_sucursales:false,
        sucursal_seleccionada:false,
        asuntos:{},
     }
  },
  actions: {
    guardarDatos(datos) {
      /** ALMACENAR LOS DATOS QUE LLEGAN */
      Object.keys(datos).map(key => {
        this[key] = datos[key];
      });
      /** SI EXISTEN SUCURSALES OBTENER LA QUE ES POR DEFECTO */
      if(datos.sucursales){
        this.sucursal_seleccionada = datos.sucursales.find(sucursal => {
          return sucursal.fields.sucursal_por_defecto;
        });
      }
    },

    actualizarSucuralSeleccionada(id_comuna) {
      this.sucursal_seleccionada = this.sucursales.find(sucursal => {
        return sucursal.regiones_comunas[0].term_id == id_comuna;
      });
    },

  },
  getters: {
    sucursalSeleccionada : (state) => {
      let sucursal = false;
      if(localStorage.sucursalSeleccionada){
        if(state.sucursales){
          sucursal = state.sucursales.find(sucursal => {
            return sucursal.regiones_comunas[0].term_id == localStorage.sucursalSeleccionada;
          });
        }
      }else if(state.sucursal_seleccionada){
        sucursal = state.sucursal_seleccionada;
      }

      return  sucursal;
    }
  },
})