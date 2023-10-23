import { defineStore } from 'pinia'

export const useOpcionesGeneralesStore = defineStore('opcionesGenerales', {
  state: () => {
    return {
        cargando:true,
        token:false,
        rrss:false,
        telefono_footer:false,
        url_pagina_equipos:false,
        restricciones_compras:false,
        restricciones_sucursales:false,
        ingreso_con_google:{activo:false},
        menus:{},
        sucursales:false,
        ubicaciones_sucursales:false,
        sucursal_seleccionada:false,
        asuntos:{},
        imagen_por_defecto_noticias:false,
        terminos_y_condiciones_box_pago:false,
        radio_activo:false,
        radio_caja_destacada:'',
        radio_pie:'',
        radio_texto_principal:'',
        mostrar_toplayer_home:true,

        toplayer_general_contenido:'',
        toplayer_general_estado:false,
        toplayer_general_todo_el_sitio:false,
        toplayer_general_color_fondo:false,
        toplayer_general_padding:false,
        toplayer_general_urls:[],
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
      let sucursal_seleccionada = false;
      if(this.sucursales){
        sucursal_seleccionada = this.sucursales.find(sucursal => {
          const sucursal_encontrada = sucursal.regiones_comunas.find(comuna => comuna.term_id == id_comuna)
          return sucursal_encontrada;
        });
      }

      this.sucursal_seleccionada = (sucursal_seleccionada) ? sucursal_seleccionada: false;
    },
    actualizarToplayerHome(valor){
      this.mostrar_toplayer_home = valor;
    }

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