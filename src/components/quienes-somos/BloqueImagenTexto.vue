<script>
export default {

    props:{
        data:{},
    },
    data() {
        return {

        }
    },
    computed:{
    },
    methods:{
    }
}
</script>

<template>
    <section class="bloque-texto-imagen mt-4 ">
        <div class="columns is-multiline" :class="data.posicion_imagen">
            <div class="column contenedor-imagen is-4">
                <div class="imagen">
                    <img :src="data.imagen.sizes.large" alt="">
                </div>
            </div>
            <div class="column  contenedor-texto is-8 " :class="data.estilo">
                <div class="card">
                    <div class="content" v-html="data.descripcion"></div>
                </div>
            </div>
        </div>
    </section>
</template>