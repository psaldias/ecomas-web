<template>
    <main>
        <section class="marcas-home mt-6">
            <div class="titulo bg-tercero mb-4">
                <h3 class="primero has-text-weight-bold px-4">{{ titulo }}</h3>
            </div>

            <div class="columns listado-marcas is-mobile is-multiline px-0 " v-if="!cargando">
                <div class="column is-4-mobile " v-for="marca, index in data.acf.marcas" :key="index">
                    <div class="card py-4 px-2 is-flex is-align-items-center is-justify-content-center ">
                        <a :href="marca.link" v-if="marca.link" target="_blank" v-html="marca.imagen">
                        </a>
                        <div v-else v-html="marca.imagen">
                        </div>
                    </div>
                </div>
            </div>
            <CargandoSeccion v-if="cargando"></CargandoSeccion>
        </section>
    </main>
</template>

<script>
import CargandoSeccion from './CargandoSeccion.vue';
export default {
    data() {
        return {
            data: {},
            cargando: true,
            marcas: {}
        };
    },
    async mounted() {
        const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_MARCAS);
        this.data = respuesta.data;
        this.cargando = false;
    },
    computed: {
        titulo() {
            return (this.data?.title) ? this.data.title : 'Nuestras Marcas'
        }
    },
    methods: {},
    components: { CargandoSeccion }
}
</script>
