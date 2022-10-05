<script>
import Noticia from './Noticia.vue';
import CargandoSeccion from './CargandoSeccion.vue';

export default {
    props: {
        titulo: String
    },
    async mounted (){
        const respuesta = await this.obtenerInfoInicial('posts?per_page=3&_embed=true');
        this.noticias = respuesta.data;
        this.cargando = false;
    },
    data() {
        return {
            cargando:true,
            contenidoInicial:{},
        };
    },
    computed: {},
    methods: {},

    components: { Noticia, CargandoSeccion }
}
</script>

<template>
    <section class="noticias-home mt-6 is-hidden-mobile" v-if="!cargando" >
        <div class="titulo bg-tercero mb-4">
            <h3 class="primero has-text-weight-bold">{{titulo}}</h3>
        </div>

        <div class="columns listado-noticias ">
            <div class="column  " v-for="noticia in noticias" :key="noticia.id">

                <Noticia :noticia="noticia"/>

            </div>
        </div>
    </section>

    <CargandoSeccion v-if="cargando"></CargandoSeccion>
</template>