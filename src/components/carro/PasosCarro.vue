

<template>
    <div class="pasos-carro columns is-gapless is-justify-content-space-between	mb-4 is-hidden-mobile">

        <div class="column paso is-narrow">
          <router-link v-if="paso > 1 "  to="/carro/" class="button button-1 is-rounded is-block " :class="{'active':paso==1}" >
            <i class="fa-solid fa-cart-shopping mr-2"></i> CARRO DE COMPRAS
          </router-link>

          <a v-else  class="button button-1 is-rounded is-block" :class="{'active':paso==1}">
            <i class="fa-solid fa-cart-shopping mr-2"></i> CARRO DE COMPRAS
          </a>

        </div>

        <div class="column paso is-narrow">
          <router-link v-if="paso > 2 " to="/carro/registro" class="button button-1 is-rounded is-block " :class="{'active':paso==2}">
            <i class="fa-solid fa-file-invoice mr-2"></i> REGISTRO
          </router-link>

          <a v-else class="button button-1 is-rounded is-block " :class="{'active':paso==2}">
            <i class="fa-solid fa-file-invoice mr-2"></i> REGISTRO
          </a>

        </div>

        <div class="column paso is-narrow">
          <a  class="button button-1 is-rounded is-block " :class="{'active':paso==3}">
            <i class="fa-solid fa-truck-fast  mr-2"></i> DESPACHO
          </a>
        </div>

        <div class="column paso is-narrow">
          <a  class="button button-1 is-rounded is-block ">
            <i class="fa-solid fa-money-check-dollar  mr-2"></i> PAGO
          </a>
        </div>
      </div>
</template>


<script>

export default {
    props:{
        paso:{
            type:Number,
            default:1
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