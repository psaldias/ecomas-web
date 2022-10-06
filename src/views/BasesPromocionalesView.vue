

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
</template>



<script>
import Marcas from "../components/general/Marcas.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import CargandoSeccion from "@/components/general/CargandoSeccion.vue";
import Cards from "@/components/quienes-somos/Cards.vue";

export default {
    components:{
    BannerSeccion,
    Marcas,
    CargandoSeccion,
    Cards
},
    data() {
        return {
            data:{},
            cargando:true,
        };
    },
    async mounted (){
      const respuesta = await this.enviarGet('pages/150');
      if(respuesta){
        this.data = respuesta.data;
        this.cargando = false;
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