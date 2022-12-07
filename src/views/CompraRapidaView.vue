<template>
  <main class="interior-compra-rapida carro">
    <div class="wrapper">

        <div class="pasos has-text-centered">
            <img src="/img/pasos-compra-rapida.v2.png" alt="">
        </div>
      <div class="columns is-centered is-gapless mt-6">
        <div class="column is-12-fullhd is-12-desktop">
          <router-view :key="$route.path" ></router-view>
        </div>
      </div>
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
