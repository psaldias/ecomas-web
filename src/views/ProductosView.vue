

<template>
    <main class="productos">
        <div class="wrapper">
            <div class="columns is-centered mt-4 titulo-opciones is-variable">
                <div class="column is-10 py-0">
                    <h2 class="primero is-size-4"><b>PELLETS</b></h2>
                </div>
            </div>
            <div class="columns is-centered ">
                <div class="column is-10">
                    <ListadoProductos  :grilla="grilla"></ListadoProductos>
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
    // BannerSeccion,
    // Paginador,
    // AccionesGrilla
},
    data() {
        return {
            grilla:'grid',
        };
    },
}
</script>