

<template>
    <div class="listado-productos">
        <div class="columns is-multiline is-variable is-1">

            <div class="column " :class="clasesColumna" v-for="(producto, index) in productos" :key="producto.id">
                <Producto :producto="producto"  v-if="formato == 'vertical'"></Producto>
                <ProductoHorizontal :producto="producto"  v-if="formato == 'horizontal'"></ProductoHorizontal>
            </div>
        </div>
    </div>
</template>


<script>
import Producto from './producto/producto.vue';
import ProductoHorizontal from './producto/ProductoHorizontal.vue';

export default {
    components: {
    Producto,
    ProductoHorizontal
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