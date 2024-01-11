<template lang="">
  <CargandoSeccion v-if="cargando"></CargandoSeccion>
  <section class="items-comparador" v-else>
    <div class="columns">
        <div class="column is-3"></div>
    </div>
   </section>
</template>

<script>
import CargandoSeccion from "./CargandoSeccion.vue";
export default {
  components: {
    CargandoSeccion,
  },
  data() {
    return {
      cargando: true,
    };
  },
  async mounted() {
    await this.obtenerProductosTienda();
  },
  computed: {},
  methods: {
    async obtenerProductos() {
      this.cargando = true;
      await this.obtenerProductosTienda({ category: "equipos" });
      this.cargando = false;
    },
  },
};
</script>
