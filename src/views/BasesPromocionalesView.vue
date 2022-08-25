

<template>
  <main class="quienes-somos">
    <div class="wrapper">

      <BannerSeccion
        titulo="Bases Promocionales"
        imagen="/img/banner-bases-promo.jpg"
      />

    <section class="mt-6">
      <Cards class="mt-6" :cards="cards" :numero="false"></Cards>

    </section>

    </div>
  </main>
</template>



<script>
import Marcas from "../components/general/Marcas.vue";
import BloqueImagenTexto from "../components/quienes-somos/BloqueImagenTexto.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import Cards from "../components/quienes-somos/Cards.vue";

export default {
    components:{
      BannerSeccion,Marcas,BloqueImagenTexto
    },
    data() {
        return {
            cards:[
              {
                titulo: "DESCUENTOS 50% OFF ASPIRADORAS",
                descripcion:"20 de Junio de 2022",
                archivo:"#",
                estilo: "",
                imagen: "",
              },{
                titulo: "DESCUENTOS DÍA DEL PADRE",
                descripcion:"13 de Junio de 2022",
                archivo:"#",
                estilo: "",
                imagen: "",
              },{
                titulo: "EcoCyber",
                descripcion:"30 de mayo de 2022",
                archivo:"#",
                estilo: "",
                imagen: "",
              },{
                titulo: "DESCUENTO NUEVOS CLIENTES",
                descripcion:"9 de mayo de 2022",
                archivo:"#",
                estilo: "",
                imagen: "",
              },{
                titulo: "CAMPAÑA INVIERNO PROMOCION PATERNO",
                descripcion:"15 de marzo de 2022",
                archivo:"#",
                estilo: "",
                imagen: "",
              },{
                titulo: "ESTE VERANO PREPARA TU CALEFACCIÓN",
                descripcion:"03 de enero de 2022",
                archivo:"#",
                estilo: "",
                imagen: "",
              },{
                titulo: "NO NECESITAS UNA CHIMENEA PARA ABRIR EL MEJOR REGALO",
                descripcion:"16 de diciembre de 2021",
                archivo:"#",
                estilo: "",
                imagen: "",
              },
            ]
        };
    },
    computed: {},
    methods: {},
    components: { BloqueImagenTexto, Marcas, BannerSeccion, Cards }
}
</script>