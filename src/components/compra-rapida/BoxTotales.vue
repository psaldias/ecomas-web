

<template>
    <div class="card mb-4 has-text-centered totales min-h-250 columns is-vcentered is-centered">
        <div class="column is-10">
            <p class="primero mb-4"><b>RESUMEN TOTAL DE TU ORDEN</b></p>
            <table class="table is-borderless has-text-left	 is-narrow mx-auto">
                <tr class="item">
                    <td class=""><b>SUBTOTAL</b></td>
                    <td><b>{{monedaChilena(storeCarroCompra.compraRapida.carro.subtotal)}}</b></td>
                </tr>
                <tr class="item" v-if="storeCarroCompra.compraRapida.carro.get_shipping_total && !storeCarroCompra.compraRapida.carro.error_despacho">
                    <td class=""><b>DESPACHO</b></td>
                    <td><b>{{monedaChilena(storeCarroCompra.compraRapida.carro.get_shipping_total)}}</b></td>
                </tr>
                <tr class="item" v-if="storeCarroCompra.compraRapida.carro.get_discount_total">
                    <td class=""><b>CUPONES</b></td>
                    <td><b>- {{monedaChilena(storeCarroCompra.compraRapida.carro.get_discount_total)}}</b></td>
                </tr>
                <tr class="total">
                    <td class=" primero"><b>TOTAL</b></td>
                    <td class="primero"><b>{{monedaChilena(storeCarroCompra.compraRapida.carro.total)}}</b></td>
                </tr>
            </table>
            <div class="field" >
                <slot v-if="!this.storeCarroCompra.compraRapida.cargando"></slot>
                <CargandoSeccion v-else class="medium"></CargandoSeccion>

            </div>
        </div>
    </div>
</template>


<script>
import { useCarroCompraStore } from '/src/stores/carroCompra'
import CargandoSeccion from '../general/CargandoSeccion.vue';
export default {
    props: {
    },
    data() {
        return {
            storeCarroCompra: useCarroCompraStore(),
        };
    },
    computed: {},
    components: { CargandoSeccion }
}
</script>