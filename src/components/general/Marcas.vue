

<template>
    <main>
    <section class="marcas-home mt-6" v-if="!cargando">
            <div class="titulo bg-tercero mb-4">
                <h3 class="primero has-text-weight-bold px-4">{{data.title.rendered}}</h3>
            </div>

            <div class="columns listado-marcas is-mobile is-multiline px-0 ">
                <div class="column is-4-mobile " v-for="marca,index in data.acf.marcas" :key="index">
                    <div class="card py-4 px-2 is-flex is-align-items-center is-justify-content-center ">
                        <a :href="marca.link" v-if="marca.link" target="_blank">
                            <img :src="marca.imagen.sizes.medium"  :alt="marca.name"/>
                        </a>
                        <div v-else>
                            <img :src="marca.imagen.sizes.medium"  :alt="marca.name"/>
                        </div>
                    </div>
                </div>
            </div>
    </section>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </main>
</template>

<script>
import CargandoSeccion from './CargandoSeccion.vue';
export default{
    data() {
        return {
            data: {},
            cargando: true,
            marcas: {}
        };
    },
    async mounted() {
        const respuesta = await this.obtenerInfoInicial("pages/106");
        this.data = respuesta.data;
        this.cargando = false;
    },
    computed: {},
    methods: {},
    components: { CargandoSeccion }
}
</script>

