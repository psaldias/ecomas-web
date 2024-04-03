<template>
  <main class="carro" v-if="!cargando">
    <div class="wrapper">
      <PasosCarro :paso="paso" class="mb-6"></PasosCarro>

      <div class="columns is-centered is-gapless ">
        <div class="column is-12-fullhd is-12-desktop">
          <router-view :key="$route.path"></router-view>
        </div>
      </div>
      <!-- <SliderProductos
            titulo="Productos Relacionados"
          ></SliderProductos> -->
    </div>
  </main>
  <CargandoSeccion v-if="cargando"></CargandoSeccion>
</template>

<script>
import PasosCarro from "/src/components/carro/PasosCarro.vue";
import SliderProductos from "/src/components/productos/SliderProductos.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  components: { PasosCarro, SliderProductos, CargandoSeccion },
  data() {
    return {
      paso: 'paso-1',
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  created() {
    this.paso = this.$route.meta.paso;
  },
  computed: {
    cargando() {
      return this.store_opciones_generales.cargando;
    }
  },
  methods: {},
};
</script>
