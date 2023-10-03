<template>
  <div class="precio" :class="{ 'en-oferta': precios.on_sale > 0 }">
    <div class="normal">
      <div class="columns is-gapless is-vcentered is-multiline">
        <div class="column is-12">
          {{ monedaChilena(precios.normal) }}
        </div>
      </div>
    </div>
    <div class="oferta" v-if="precios.on_sale">
      <div class="columns is-gapless is-vcentered is-multiline">
        <div class="column is-narrow">
          {{ monedaChilena(precios.oferta) }}
        </div>
      </div>
    </div>
    <div class="valor-unitario" v-if="precios.bolsas_producto">
      {{ monedaChilena(precios.oferta / parseInt(precios.bolsas_producto)) }} c/u.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    precios: {
      normal: 0,
      oferta: 0,
      on_sale: false,
      bolsas_producto: false,
    },
  },
  data() {
    return {};
  },
};
</script>
