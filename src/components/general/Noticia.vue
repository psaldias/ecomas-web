<template lang="">
    <div class="card noticia py-4 px-4 is-flex  is-justify-content-center ">

        <router-link :to="'/noticias/'+noticia.slug">
            <div className="imagen mb-4" v-if="noticia.featured_media_image" v-html="noticia.featured_media_image"></div>
            <div className="imagen mb-4" v-else-if="store_opciones_generales.imagen_por_defecto_noticias" v-html="store_opciones_generales.imagen_por_defecto_noticias"></div>
            <h4
                className="mb-2 primero has-text-weight-bold has-text-centered">
                {{noticia.title.rendered}}
            </h4>
            <div class="content has-text-centered" v-html="noticia.excerpt.rendered">
            </div>
        </router-link>
    </div>
</template>

<script>
import { useOpcionesGeneralesStore } from "../../stores/opcionesGenerales";
export default {
    props: {
        noticia: {},
    },
    data() {
        return {
            store_opciones_generales: useOpcionesGeneralesStore(),
        };
    },
    computed: {},
    methods: {
    },
};
</script>