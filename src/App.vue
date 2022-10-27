<template>
  <main>
    <HeaderView  />
    <router-view
      :key="$route.path"
      v-if="!store_opciones_generales.cargando"
    ></router-view>
    <CargandoSeccion v-if="store_opciones_generales.cargando"></CargandoSeccion>
    <FooterView></FooterView>
    <Toplayer></Toplayer>
  </main>
</template>

<script>
import HeaderView from "./components/layout/HeaderView.vue";
import FooterView from "./components/layout/FooterView.vue";
import Toplayer from '/src/components/productos/producto/Toplayer.vue'
import { useOpcionesGeneralesStore } from "./stores/opcionesGenerales";
import { useCarroCompraStore } from '/src/stores/carroCompra'
import CargandoSeccion from "./components/general/CargandoSeccion.vue";
import helpers from '/src/utils/helpers.js'

export default {
  components: {
    HeaderView,
    FooterView,
    CargandoSeccion,
    Toplayer,
  },
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      storeCarroCompra: useCarroCompraStore(),
    };
  },
  async mounted() {
    const respuesta = await this.enviarGet(import.meta.env.VITE_INIT,{cache:true,authorization:true});
    if (respuesta) {
      this.store_opciones_generales.guardarDatos(respuesta.data);
      if(localStorage.sucursalSeleccionada){
        this.store_opciones_generales.actualizarSucuralSeleccionada(localStorage.sucursalSeleccionada);
      }

      if(localStorage.dataCarro){
        this.storeCarroCompra.actualizarCarro(helpers.base64_decode(localStorage.dataCarro,true),'data');
      }
    }else{
      this.store_opciones_generales.guardarDatos({cargando:false});
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
