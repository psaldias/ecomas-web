<template>
  <div class="precio" :class="{ 'en-oferta': precios.on_sale > 0 }">
    <div class="oferta" v-if="precios.on_sale">{{ monedaChilena(precios.oferta) }}</div>
    <div class="normal">{{ monedaChilena(precios.normal) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    precios: {
      normal: 0,
      oferta: 0,
      on_sale: false,
    },
  },
  data() {
    return {};
  },
};
</script>
