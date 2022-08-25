<template>
    <div class="precio " :class="{'en-oferta':precios.oferta > 0}">
        <div class="oferta" v-if="precios.oferta">$ {{valorFormateado(precios.oferta)}}</div>
        <div class="normal">$ {{valorFormateado(precios.normal)}}</div>
    </div>
</template>

<script>

export default {
    props:{
        precios:{
            normal:0,
            oferta:0,
        }
    },
    data() {
        return {
        };
    },
    computed: {
    },
    methods: {
        valorFormateado(valor){
            return new Intl.NumberFormat('cl-CL').format(valor);
            return valor.toLocaleString('cl-CL', {
                    style: 'currency',
                    currency: 'CLP',
                });
        }
    },
}
</script>