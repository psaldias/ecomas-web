

<template>
    <div class="card mb-4 has-text-centered min-h-250 columns is-vcentered is-centered" v-if="mostrar">
        <div class="column">
            <img src="/img/despacho-ecomas.jpg" alt="" class="mb-2">
            <p class="primero mb-0"><b>TIEMPO DE DESPACHO</b></p>
            <p class="">{{this.store_opciones_generales.sucursal_seleccionada.fields.tiempo_de_despacho}}</p>
        </div>
    </div>
</template>


<script>
import { useOpcionesGeneralesStore } from '/src/stores/opcionesGenerales'

export default {
    props:{
    },
    data() {
        return {
            store_opciones_generales: useOpcionesGeneralesStore(),
        }
    },
    computed: {
        mostrar(){
            if(this.store_opciones_generales.sucursal_seleccionada.fields.tiempo_de_despacho)
                return true;

            return false;
        }
    },
}
</script>