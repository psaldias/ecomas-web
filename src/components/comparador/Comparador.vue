<template lang="">
  <Mensajes :mensajes="mensajes"></Mensajes>
  <CargandoSeccion v-if="cargando"></CargandoSeccion>
  <section class="items-comparador" v-else>
    <div class="columns is-mobile">
        <div class="column is-3 column-comparador" v-for="index in items_maximo">
            <itemComparador :productos="productos"></itemComparador>
        </div>
    </div>
   </section>
</template>

<script>
import itemComparador from "./item-comparador.vue";
import CargandoSeccion from "../general/CargandoSeccion.vue";
import Mensajes from "../general/Mensajes.vue";
export default {
    components: {
        CargandoSeccion,
        Mensajes,
        itemComparador
    },
    data() {
        return {
            items_maximo: 4,
            cantidad_items: 1,
            cargando: true,
            mensajes: {},
            productos: []
        };
    },
    async mounted() {
        await this.obtenerProductos();
        this.cargando = false;
    },
    computed: {},
    methods: {
        async obtenerProductos() {

            const respuesta = await this.enviarGet(
                import.meta.env.VITE_ENDPOINT_COMPRA_PRODUCTOS_V2 + "&category=equipos&per_page=100"
            );
            if (respuesta) {
                if (respuesta.data.total == 0) {
                    this.mensajes = { error: 'No hay productos' }
                }
                this.productos = respuesta.data.listado;

            }
        },
    },
};
</script>
