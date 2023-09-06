<template>
  <div class="precio" :class="{ 'en-oferta': precios.on_sale > 0 }">
    <div class="oferta" v-if="precios.on_sale">
      <div class="columns is-gapless is-vcentered">
        <div class="column is-narrow">
          {{ monedaChilena(precios.oferta) }}
        </div>
        <div class="column valor-unitario is-narrow ml-2" v-if="precios.bolsas_producto">
          {{ monedaChilena(precios.oferta / parseInt(precios.bolsas_producto)) }} Uni.
        </div>
      </div>
    </div>

    <div class="normal">
      <div class="columns is-gapless is-vcentered">
        <div class="column is-narrow">
          {{ monedaChilena(precios.normal) }}
        </div>
        <div
          class="column valor-unitario is-narrow ml-2"
          v-if="precios.bolsas_producto && !precios.on_sale"
        >
          {{ monedaChilena(precios.oferta / parseInt(precios.bolsas_producto)) }} Uni.
        </div>
      </div>
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
