

<template>
    <div class="listado-productos">
        <div class="columns is-multiline is-variable is-1" v-if="!cargando">

            <div class="column " :class="clasesColumna" v-for="(producto, index) in productos" :key="'listado_productos_column_'+producto.id">
                <Producto :producto="producto"  v-if="formato == 'vertical'" :key="'listado_productos_producto_'+producto.id"></Producto>
                <!-- <ProductoHorizontal :producto="producto"  v-if="formato == 'horizontal'"></ProductoHorizontal> -->
            </div>
        </div>
        <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </div>
</template>


<script>
import Producto from './producto/producto.vue';
// import ProductoHorizontal from './producto/ProductoHorizontal.vue';
import CargandoSeccion from '../general/CargandoSeccion.vue';
import { useCarroCompraStore } from '/src/stores/carroCompra'

export default {
    components: {
    Producto,
    CargandoSeccion
},
    props: {
        grilla:'',
        categoria:'',
    },
    data() {
        return {
            cargando:false,
            storeCarroCompra: useCarroCompraStore(),
        };
    },
    watch:{
        async sucursalCarro(){
            this.obtenerProductos();
        }
    },
    mounted(){
        this.obtenerProductos();
    },
    computed: {
        productos(){
            return this.storeCarroCompra.carro.productos.filter(producto => {
                return (producto.stock_quantity == null || producto.stock_quantity > 0);
            });
        },
        clasesColumna(){
            return (this.grilla == "lista")?'is-12':'is-3-fullhd is-4-widescreen';
        },
        formato(){
            return (this.grilla == "lista")?'horizontal':'vertical';
        },
        sucursalCarro(){
            return this.store_opciones_generales.sucursal_seleccionada.ID
        },
    },
    methods: {
        async obtenerProductos(){
            this.cargando = true;
            await this.obtenerProductosTienda({category: this.categoria.term_id});
            this.cargando = false;
        },
    },
}
</script>