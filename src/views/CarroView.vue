<template>
  <main class="carro">
    <div class="wrapper">
      <PasosCarro :paso="paso" class="mb-6"></PasosCarro>

      <div class="columns is-centered is-gapless ">
        <div class="column is-12-fullhd is-12-desktop">
          <router-view :key="$route.path" ></router-view>
        </div>
      </div>
      <!-- <SliderProductos
            titulo="Productos Relacionados"
          ></SliderProductos> -->
    </div>
  </main>
</template>

<script>
import PasosCarro from "/src/components/carro/PasosCarro.vue";
import SliderProductos from "/src/components/productos/SliderProductos.vue";

export default {
  components: { PasosCarro, SliderProductos },
  data() {
    return {
      paso:'paso-1',
    };
  },
  created() {
    this.paso = this.$route.meta.paso;
  },
  computed: {},
  methods: {},
};
</script>
