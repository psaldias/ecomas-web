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
};
</script>
