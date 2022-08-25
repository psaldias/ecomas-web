<script>
import Noticia from './Noticia.vue';
export default {
    props: {
        titulo: String
    },
    data() {
        return {
            noticias: [
                {
                    id: 1,
                    nombre: "Te asesoramos para que hagas la mejor elección en calefacción sustentable",
                    imagen: "/img/noticia-1.jpg",
                    descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen</p>",
                    url: "#"
                },
                {
                    id: 2,
                    nombre: "Ecomas + Sustentable",
                    imagen: "/img/noticia-2.jpg",
                    descripcion: "<p>Para Ecomas es muy importante seguir impulsando un desarrollo sustentable, estamos preocupados de incorporar procesos para preservar, conservar y proteger</p>",
                    url: "#"
                },
                {
                    id: 3,
                    nombre: "Ecomas + sustentable: Estufa a Pellet “Carbono Neutro”",
                    imagen: "/img/noticia-3.jpg",
                    descripcion: "<p>En Ecomas, nos comprometemos con el medio ambiente. Es por eso que a partir del año 2015 incorporamos la línea de estufas y calderas a pellet dentro de nuestra gama</p>",
                    url: "#"
                }
            ]
        };
    },
    computed: {},
    methods: {},
    components: { Noticia }
}
</script>

<template>
    <section class="noticias-home mt-6">
        <div class="titulo bg-tercero mb-4">
            <h3 class="primero has-text-weight-bold">{{titulo}}</h3>
        </div>

        <div class="columns listado-noticias ">
            <div class="column  " v-for="noticia in noticias" :key="noticia.id">

                <Noticia :noticia="noticia"/>

            </div>
        </div>
    </section>
</template>