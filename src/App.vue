
<template>
  <main>
    <HeaderView />
    <router-view :key="$route.path"></router-view>
    <FooterView></FooterView>
    {{store.cargando}}
  </main>
</template>


<script>
  import HeaderView from "./components/layout/HeaderView.vue";
  import FooterView from "./components/layout/FooterView.vue";
  import { useOpcionesGeneralesStore } from "./stores/opcionesGenerales";

  export default {
    components: {
      HeaderView,
      FooterView,
  },
    data() {
      return {
        store_opciones_generales:useOpcionesGeneralesStore(),
      }
    },
    async mounted (){
     const respuesta = await this.obtenerInfoInicial('ecomas/init');
     if(respuesta){
       this.store_opciones_generales.guardarDatos(respuesta.data);
      }
    },
  }
  </script>
