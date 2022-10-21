

<template>
     <div class="card mb-4 has-text-centered min-h-250 columns is-vcentered is-centered">
        <div class="column is-10">
            <form action="" @submit.prevent="enviarFormulario()">
            <p class="primero mb-4"><b>Si tienes un cupón de descuento, ingresa el código aquí:</b></p>
                <div class="field mb-4">
                    <input type="text" name="codigo"  class="input" v-model="cupon">
                </div>
                <div class="field mb-0">
                    <button type="submit" class="button bg-primero has-text-white is-rounded px-6" v-if="!this.storeCarroCompra.carro.cargando"><b>Activar Código</b></button>
                    <CargandoSeccion v-else class="medium"></CargandoSeccion>
                </div>
                </form>
        </div>
    </div>
</template>


<script>
import { useCarroCompraStore } from '/src/stores/carroCompra'
import CargandoSeccion from '../general/CargandoSeccion.vue';
export default {
    props: {},
    data() {
        return {
            cupon: "",
            storeCarroCompra: useCarroCompraStore(),
        };
    },
    computed: {},
    methods: {
        enviarFormulario(){
            this.aplicarCuponCarro(this.cupon);
        }
    },
    components: { CargandoSeccion }
}
</script>