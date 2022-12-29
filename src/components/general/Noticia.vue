<template lang="">
    <div class="card noticia py-4 px-4 is-flex  is-justify-content-center ">

        <router-link :to="'/noticias/'+noticia.slug">
            <div className="imagen mb-4">
                <img v-if="(typeof noticia._embedded['wp:featuredmedia']  !== 'undefined' )"
                    :src="noticia._embedded['wp:featuredmedia']['0'].source_url"
                    :alt="noticia.nombre"
                />
                <img v-else
                    :src="store_opciones_generales.imagen_por_defecto_noticias.sizes.medium"
                    :width="store_opciones_generales.imagen_por_defecto_noticias.sizes['medium-width']"
                    :height="store_opciones_generales.imagen_por_defecto_noticias.sizes['medium-height']"
                    alt="Ecomas Imagen por defecto"
                />
            </div>
            <h5
                className="mb-2 primero has-text-weight-bold has-text-centered">
                {{noticia.title.rendered}}
            </h5>
            <div class="content has-text-centered" v-html="noticia.excerpt.rendered">
            </div>
        </router-link>
    </div>
</template>

<script>
import { useOpcionesGeneralesStore } from "../../stores/opcionesGenerales";
export default {
  props: {
    noticia:{},
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