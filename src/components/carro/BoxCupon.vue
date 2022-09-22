

<template>
     <div class="card mb-4 has-text-centered min-h-250 columns is-vcentered is-centered">
        <div class="column is-10">
            <p class="primero mb-4"><b>Si tienes un cupón de descuento, ingresa el código aquí:</b></p>
            <div class="field mb-4">
                <input type="text" name="codigo" value="" class="input">
            </div>
            <div class="field mb-0">
                <button class="button bg-primero has-text-white is-rounded px-6"><b>Activar Código</b></button>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    props:{
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