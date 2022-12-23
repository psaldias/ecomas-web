<template>
  <main>
    <HeaderView  />
    <router-view
      :key="$route.path"
      v-if="!store_opciones_generales.cargando"
    ></router-view>
    <CargandoSeccion v-if="store_opciones_generales.cargando"></CargandoSeccion>

    <div v-if="customHtml" v-html="customHtml"></div>
    <FooterView></FooterView>
    <Toplayer></Toplayer>
  </main>

  <Seo></Seo>
</template>

<script>
import HeaderView from "./components/layout/HeaderView.vue";
import FooterView from "./components/layout/FooterView.vue";
import Toplayer from '/src/components/productos/producto/Toplayer.vue'

import { useOpcionesGeneralesStore } from "./stores/opcionesGenerales";
import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useLlamadasApiStore } from '/src/stores/llamadasApi'

import CargandoSeccion from "./components/general/CargandoSeccion.vue";
import helpers from '/src/utils/helpers.js'
import Seo from "/src/components/general/Seo.vue";
export default {
  components: {
    HeaderView,
    FooterView,
    CargandoSeccion,
    Toplayer,
    Seo,

  },
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      storeCarroCompra: useCarroCompraStore(),
      store:useLlamadasApiStore(),
      customHtml:false,
    };
  },
  async mounted() {
    const respuesta = await this.enviarGet(import.meta.env.VITE_INIT,{cache:true,authorization:false});
    if (respuesta) {
      const token = respuesta.data.token;
      const categorias = respuesta.data.categorias;
      delete respuesta.data.token;
      delete respuesta.data.categorias;


      this.store_opciones_generales.guardarDatos(respuesta.data);
      this.store.guardarToken(token);

      /** SI YA SE TIENE UNA SUCURSAL ALMACENADA EN LOCALSTORAGE ENTONCES QUEDA POR DEFECTO */
      if(localStorage.sucursalSeleccionada){
        this.store_opciones_generales.actualizarSucuralSeleccionada(localStorage.sucursalSeleccionada);
      }

      /** SI YA EXISTE INFORMACIÓN DE CARRO EN LOCALSTORAGE SE PASA AL STORE DE CARRO COMPRA */
      if(localStorage.dataCarro){
        const dataCarro = helpers.base64_decode(localStorage.dataCarro,true);

        if(dataCarro.sucursal != this.store_opciones_generales.sucursal_seleccionada.ID)
          dataCarro.despacho.direccion.direccionCompleta = ''

        this.storeCarroCompra.actualizarCarro(helpers.base64_decode(localStorage.dataCarro,true),'data');
      }
      /** GUARDAR LAS CATEGORIAS EN EL STORE */
      this.storeCarroCompra.actualizarCarro(categorias,'categorias');

    }else{
      this.store_opciones_generales.guardarDatos({cargando:false});
    }


    /** CARGAR SCRIPT PERSONALIZADOS DEL ADMINISTRADOR OPCIONES ECOMAS - GENERALES */
    if(this.store_opciones_generales.scripts_personalizados){
      this.customHtml = '';
      this.store_opciones_generales.scripts_personalizados.forEach(script => {
        if(script.estado){
          if(script.html)
            this.customHtml += script.html;
          if(script.url_script)
            helpers.importarLibereria(script.url_script);
        }

      });
    }

  },
  computed:{
    sucursalSeleccionada(){
      return this.store_opciones_generales.sucursal_seleccionada;
    }
  },
  methods:{
    haversineDistance(latlngA, latlngB, isMiles) {
    const squared = x => x * x;
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371; // Earth’s mean radius in km

    const dLat = toRad(latlngB[0] - latlngA[0]);
    const dLon = toRad(latlngB[1] - latlngA[1]);

    const dLatSin = squared(Math.sin(dLat / 2));
    const dLonSin = squared(Math.sin(dLon / 2));

    const a = dLatSin +
              (Math.cos(toRad(latlngA[0])) * Math.cos(toRad(latlngB[0])) * dLonSin);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    if (isMiles) distance /= 1.609344;

    return distance;
  }
  }
};
</script>
