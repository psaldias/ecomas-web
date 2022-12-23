

<template>
    <main class="productos">
        <div class="wrapper">
            <div class="columns is-centered mt-4 titulo-opciones is-variable">
                <div class="column is-10 py-0">
                    <h2 class="primero is-size-4 is-uppercase"><b>{{ categoria.name }}</b></h2>
                </div>
            </div>
            <div class="columns is-centered ">
                <div class="column is-10">
                    <ListadoProductos  :grilla="grilla" :categoria="categoria"></ListadoProductos>
                </div>

            </div>

        </div>
    </main>
</template>



<script>
// import BannerSeccion from "../components/general/BannerSeccion.vue";
import ListadoProductos from "../components/productos/ListadoProductos.vue";
// import Paginador from "../components/productos/Paginador.vue";
// import AccionesGrilla from "../components/productos/AccionesGrilla.vue";

export default {
    components:{
        ListadoProductos,
    },
    data() {
        return {
            grilla:'grid',
            categoria: {
                term_id:33,
                name:'Pellet',
                slug:'pellet'
            } // pellet por defecto
        };
    },
    beforeMount(){

        if( this.$route.params.categoria){
            const categoria_seleccionada = Object.values(this.storeCarroCompra.carro.categorias).find(categoria => categoria.slug == this.$route.params.categoria );

            if(categoria_seleccionada)
                this.categoria = categoria_seleccionada
        }

        document.title = this.categoria.name || VUE_APP_DEFAULT_TITLE;
    },

}
</script>