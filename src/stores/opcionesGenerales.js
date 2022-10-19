import { defineStore } from 'pinia'

export const useOpcionesGeneralesStore = defineStore('opcionesGenerales', {
  state: () => {
    return {
        cargando:true,
        token:false,
        rrss:false,
        telefono_footer:false,
        menus:{},
        sucursales:[],
        ubicaciones_sucursales:false,
        sucursal_seleccionada:false,
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
})