
<template>
    <main class="column">
        <div class=" columns productos-compra-rapida is-mobile" v-if="!cargando">
            <div class="column py-0" v-for="producto in productos" :key="producto.id" >
            <div class="card py-4 px-3 ">
                <div class="columns is-gapless is-vcentered mb-4 is-mobile">
                    <div class="column is-narrow mr-2">
                        <img  src="/img/icono-bolsa-ecomas.png" alt="">
                    </div>
                    <div class="column text-nowrap has-text-right">
                        <b>{{producto.name}}</b>
                    </div>
                </div>
                <div class="valor primero has-text-centered ">
                <b>${{precioFormateado(producto.price)}}</b>
                </div>

                <div class="block mt-4">
                <router-link :to="'/compra-rapida/'" class="button is-rounded has-background-black is-toggle-rounded is-block has-text-centered has-text-white">
                    <i class="has-text-white fa-solid fa-cart-shopping mr-1"></i>
                    Comprar
                </router-link>
                </div>
            </div>
            </div>
        </div>
        <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </main>
</template>

<script>
import CargandoSeccion from '../general/CargandoSeccion.vue';
export default {
    data() {
        return {
            productos: {},
            cargando: true,
        };
    },
    async mounted() {
        const respuesta = await this.enviarGet("/products?orderby=price&order=asc", { cache: true, baseUrl: "/wc/v3" });
        if (respuesta) {
            this.productos = respuesta.data;
            this.cargando = false;
        }
    },
    computed: {},
    methods: {
        precioFormateado(valor){
            return new Intl.NumberFormat('cl-CL').format(valor);
        }
    },
    components: { CargandoSeccion }
}
</script>