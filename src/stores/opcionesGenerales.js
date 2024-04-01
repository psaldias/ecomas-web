import { defineStore } from 'pinia'

export const useOpcionesGeneralesStore = defineStore('opcionesGenerales', {
  state: () => {
    return {
        init:true,
        mostrar_seleccionar_ubicacion:true,
        cargando:true,
        token:false,
        rrss:false,
        telefono_footer:false,
        url_pagina_equipos:false,
        restricciones_compras:false,
        restricciones_sucursales:false,
        ingreso_con_google:{activo:false},
        menus:{
          "footer-1": [
            {
              "ID": 263,
              "object_id": "15",
              "url": "/somos-ecomas/",
              "title": "Sobre Nosotros",
              "menu_item_parent": "0"
            },
            {
              "ID": 262,
              "object_id": "127",
              "url": "/preguntas-frecuentes/",
              "title": "Preguntas Frecuentes",
              "menu_item_parent": "0"
            },
            {
              "ID": 261,
              "object_id": "180",
              "url": "/sucursales/",
              "title": "Encuentra nuestras sucursales",
              "menu_item_parent": "0"
            },
            {
              "ID": 260,
              "object_id": "185",
              "url": "/contacto/",
              "title": "Contacto",
              "menu_item_parent": "0"
            }
          ],
          "footer-2": [
            {
              "ID": 264,
              "object_id": "264",
              "url": "/productos",
              "title": "Productos",
              "menu_item_parent": "0"
            },
            {
              "ID": 266,
              "object_id": "150",
              "url": "/bases-promocionales/",
              "title": "Bases Promocionales",
              "menu_item_parent": "0"
            },
            {
              "ID": 268,
              "object_id": "139",
              "url": "/terminos-y-condiciones/",
              "title": "Términos y Condiciones",
              "menu_item_parent": "0"
            },
            {
              "ID": 267,
              "object_id": "144",
              "url": "/politicas-y-devoluciones/",
              "title": "Políticas y devoluciones",
              "menu_item_parent": "0"
            },
            {
              "ID": 265,
              "object_id": "203",
              "url": "/distribuidores/",
              "title": "Distribuidores",
              "menu_item_parent": "0"
            }
          ],
          "menu-principal": [
            {
              "ID": 1786,
              "object_id": "1786",
              "url": "/productos",
              "title": "PRODUCTOS",
              "menu_item_parent": "0"
            },
            {
              "ID": 1787,
              "object_id": "1787",
              "url": "/productos",
              "title": "Pellets",
              "menu_item_parent": "1786"
            },
            {
              "ID": 1789,
              "object_id": "1789",
              "url": "/productos/equipos",
              "title": "Estufas",
              "menu_item_parent": "1786"
            },
            {
              "ID": 1788,
              "object_id": "1788",
              "url": "/productos/accesorios",
              "title": "Accesorios",
              "menu_item_parent": "1786"
            },
            {
              "ID": 1793,
              "object_id": "1791",
              "url": "/comparador/",
              "title": "Comparador de estufas",
              "menu_item_parent": "1786"
            },
            {
              "ID": 258,
              "object_id": "180",
              "url": "/sucursales/",
              "title": "SUCURSALES",
              "menu_item_parent": "0"
            },
            {
              "ID": 1790,
              "object_id": "1790",
              "url": "/pedidos",
              "title": "SIGUE TU COMPRA",
              "menu_item_parent": "0"
            },
            {
              "ID": 251,
              "object_id": "185",
              "url": "/contacto/",
              "title": "CONTACTO",
              "menu_item_parent": "0"
            }
          ]
        },
        sucursales:[],
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
        imagen_preload:[],
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
      }else{
        sucursal = state.sucursales.find(sucursal => {
          return sucursal.fields.sucursal_por_defecto;
        });
      }
      StaticRange.sucursal_seleccionada = sucursal;
      return  sucursal;
    }
  },
})