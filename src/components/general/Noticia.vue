<template lang="">
    <div class="card noticia py-4 px-4 is-flex  is-justify-content-center ">

        <router-link :to="noticia.url">
            <div className="imagen mb-4">
                <img
                    :src="noticia.imagen"
                    :alt="noticia.nombre"
                />
            </div>
            <h5
                className="mb-2 primero has-text-weight-bold has-text-centered">
                {{noticia.nombre}}
            </h5>
            <div class="content has-text-centered" v-html="noticia.descripcion">
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
  props: {
    noticia:{},
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
  },
};
</script>