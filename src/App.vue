<template>
  <main>
    <HeaderView  />
    <router-view
      :key="$route.path"
      v-if="!store_opciones_generales.cargando"
    ></router-view>
    <CargandoSeccion v-if="store_opciones_generales.cargando"></CargandoSeccion>
    <FooterView></FooterView>
  </main>
</template>

<script>
import HeaderView from "./components/layout/HeaderView.vue";
import FooterView from "./components/layout/FooterView.vue";
import { useOpcionesGeneralesStore } from "./stores/opcionesGenerales";

import CargandoSeccion from "./components/general/CargandoSeccion.vue";

export default {
  components: {
    HeaderView,
    FooterView,
    CargandoSeccion,
  },
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  async mounted() {
    const respuesta = await this.enviarGet(import.meta.env.VITE_INIT,{cache:true,authorization:true});
    if (respuesta) {
      this.store_opciones_generales.guardarDatos(respuesta.data);
    }else{
      this.store_opciones_generales.guardarDatos({cargando:false});
    }

  },
};
</script>
