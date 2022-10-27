

<template>
  <main class="bases-promocionales">
    <div class="wrapper" v-if="!cargando">

      <BannerSeccion
        :titulo="data.title.rendered"
        :imagen="data.acf.imagen_banner.sizes['2048x2048']"
      />

    <section class="mt-6">
      <Cards class="mt-6" :cards="cards" :numero="false"></Cards>
    </section>

    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
  <Seo v-if="data.hasOwnProperty('yoast_head_json')" :data="data.yoast_head_json"></Seo>
</template>



<script>
import Marcas from "../components/general/Marcas.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import Cards from "/src/components/quienes-somos/Cards.vue";
import Seo from '../components/general/Seo.vue'
export default {
    components:{
    BannerSeccion,
    Marcas,
    CargandoSeccion,
    Cards,
    Seo
},
    data() {
        return {
            data:{},
            cargando:true,
        };
    },
    async mounted (){
      const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_BASES_PROMOCIONALES);
      if(respuesta){
        this.data = respuesta.data;
        this.cargando = false;

        if(this.data.title.rendered)
          document.title = this.data.title.rendered
      }
    },
    computed: {
      cards(){
      let cards = {};
      cards = this.data.acf.bases.map(card => {
        return {
          titulo:card.titulo,
          descripcion:card.descripcion,
          estilo:card.tipo,
          imagen: (card.imagen ? card.imagen.sizes.medium:''),
          archivo: (card.archivo ? card.archivo.url:''),
        }
      });
      return cards;
      },
    },
    methods: {},
}
</script>