

<template>
    <div class="card mb-4 has-text-centered totales min-h-250 columns is-vcentered is-centered">
        <div class="column is-10">
            <p class="primero mb-4"><b>RESUMEN TOTAL DE TU ORDEN</b></p>
            <table class="table is-borderless has-text-left	 is-narrow mx-auto">
                <tr class="item">
                    <td class=""><b>SUBTOTAL</b></td>
                    <td><b>$3.200.156</b></td>
                </tr>
                <tr class="item">
                    <td class=""><b>DESPACHO</b></td>
                    <td><b>$16.990</b></td>
                </tr>
                <tr class="total">
                    <td class=" primero"><b>TOTAL</b></td>
                    <td class="primero"><b>$3.217.146</b></td>
                </tr>
            </table>
            <div class="field" v-if="boton">
                <router-link to="/carro/registro/" class="button bg-primero has-text-white is-rounded px-6"><b>Ir a Pagar</b></router-link>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props:{
        boton:{
            type:Boolean,
            default:true,
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