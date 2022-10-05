
<template>
    <main>
        <BannerSeccion  v-if="!cargando" :titulo="contenido.title.rendered" :imagen="contenido.acf.imagen_banner.sizes['2048x2048']" />
        <CargandoSeccion v-if="cargando"></CargandoSeccion>

    </main>

</template>

  <script>
import BannerSeccion from '../general/BannerSeccion.vue';
import CargandoSeccion from '../general/CargandoSeccion.vue';
export default {
    data() {
        return {
            contenido:{},
            cargando:true,
        };
    },
    async mounted (){
        const respuesta = await this.obtenerInfoInicial('pages/120');
        this.contenido = respuesta.data;
        this.cargando = false;
    },
    computed: {},
    methods: {},
    components: { BannerSeccion, CargandoSeccion }
}
  </script>