

<template>
  <main class="noticias">
    <div class="wrapper">

        <BannerSeccion titulo="Noticias" imagen="/img/banner-noticias.jpg" />

        <div class="columns is-multiline mt-4">

            <div class="column is-6" v-for="noticia in noticias" :key="noticia.id">
                <Noticia :noticia="noticia"/>
            </div>
        </div>


    </div>
  </main>
</template>



<script>
import Noticia from "../components/general/Noticia.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";

export default {
  components: {
    Noticia,
    BannerSeccion
},
  data() {
    return {
      noticias: [
            {
                id: 1,
                nombre: "Te asesoramos para que hagas la mejor elección en calefacción sustentable",
                imagen: "/img/noticia-1.jpg",
                descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen</p>",
                url: "/noticias/slug"
            },
            {
                id: 2,
                nombre: "Ecomas + Sustentable",
                imagen: "/img/noticia-2.jpg",
                descripcion: "<p>Para Ecomas es muy importante seguir impulsando un desarrollo sustentable, estamos preocupados de incorporar procesos para preservar, conservar y proteger</p>",
                url: "/noticias/slug"
            },
            {
                id: 3,
                nombre: "Ecomas + sustentable: Estufa a Pellet “Carbono Neutro”",
                imagen: "/img/noticia-3.jpg",
                descripcion: "<p>En Ecomas, nos comprometemos con el medio ambiente. Es por eso que a partir del año 2015 incorporamos la línea de estufas y calderas a pellet dentro de nuestra gama</p>",
                url: "/noticias/slug"
            },
            {
                id: 4,
                nombre: "Ahorro y energía: cuánto se puede ahorrar cambiando la leña”",
                imagen: "/img/noticia-4.jpg",
                descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen...</p>",
                url: "/noticias/slug"
            },
            {
                id: 5,
                nombre: "Bioenergía - El mercado del pellet en Chile sigue creciendo”",
                imagen: "/img/noticia-5.jpg",
                descripcion: "<p>Para Ecomas es muy importante seguir impulsando un desarrollo sustentable, estamos preocupados de incorporar procesos para preservar, conservar y proteger...</p>",
                url: "/noticias/slug"
            },
            {
                id: 6,
                nombre: "Tips para lograr un mayor ahorro energético en invierno”",
                imagen: "/img/noticia-6.jpg",
                descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen...</p>",
                url: "/noticias/slug"
            }
        ]
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>