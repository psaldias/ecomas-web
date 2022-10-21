

<template>
    <div class="pasos-carro columns is-gapless is-justify-content-space-between	mb-4 is-hidden-mobile">
        <div class="column paso is-narrow">
          <a to="/carro/" class="button button-1 is-rounded is-block " :class="{'active':paso=='paso-1'}">
            <i class="fa-solid fa-cart-shopping mr-2"></i> CARRO
            DE COMPRAS
          </a>
        </div>
        <div class="column paso is-narrow">
          <a to="/carro/registro" class="button button-1 is-rounded is-block " :class="{'active':paso=='paso-2'}">
            <i class="fa-solid fa-file-invoice mr-2"></i> REGISTRO
          </a>
        </div>
        <div class="column paso is-narrow">
          <a to="/carro/despacho" class="button button-1 is-rounded is-block " :class="{'active':paso=='paso-3'}">
          <i class="fa-solid fa-truck-fast  mr-2"></i> DESPACHO
          </a>
        </div>
        <div class="column paso is-narrow">
          <a to="/carro/pago" class="button button-1 is-rounded is-block " :class="{'active':paso=='paso-4'}">
            <i class="fa-solid fa-money-check-dollar  mr-2"></i> PAGO
          </a>
        </div>
      </div>
</template>


<script>

export default {
    props:{
        paso:{
            type:String,
            default:'paso-1'
        }
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
    },
}
</script>