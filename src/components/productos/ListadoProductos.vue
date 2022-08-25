

<template>
    <div class="listado-productos">
        <div class="columns is-multiline">

            <div class="column " :class="clasesColumna" v-for="(producto, index) in productos" :key="producto.id">
                <Producto :producto="producto" :formato="formato"></Producto>
            </div>
        </div>
    </div>
</template>


<script>
import Producto from './producto/producto.vue';

export default {
    components: {
        Producto
    },
    props: {
        grilla:'',
        productos: {},
    },
    data() {
        return {
        };
    },
    computed: {
        clasesColumna(){
            return (this.grilla == "lista")?'is-12':'is-3-fullhd is-4-widescreen';
        },
        formato(){
            return (this.grilla == "lista")?'horizontal':'vertical';
        }
    },
    methods: {
    },
}
</script>