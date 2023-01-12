<template>
  <div
    class="card mb-4 min-h-250 columns is-vcentered is-centered p-4 is-size-6"
    v-if="store_opciones_generales.terminos_y_condiciones_box_pago"
  >
    <div
      class="column links-primero"
      v-html="store_opciones_generales.terminos_y_condiciones_box_pago"
    ></div>
  </div>
</template>

<script>
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import helpers from "/src/utils/helpers.js";

export default {
  props: {},
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  mounted() {
    helpers.LinksARouterLink(this.$el, this);
  },
};
</script>
