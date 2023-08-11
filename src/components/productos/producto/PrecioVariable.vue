<template>
  <div class="precio">
    <div class="normal desde">Desde {{ monedaChilena(precios.desde) }}</div>
    <div class="normal hasta"></div>
  </div>
</template>

<script>
export default {
  props: {
    precios: {
      desde: 0,
      hasta: 0,
    },
  },
  data() {
    return {};
  },
};
</script>
