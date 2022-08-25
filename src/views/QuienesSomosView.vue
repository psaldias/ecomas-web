

<template>
  <main class="quienes-somos">
    <div class="wrapper">

      <BannerSeccion
        titulo="Somos ecomas"
        imagen="/img/banner-quienes-somos.jpg"
      />

      <section class="numeros mt-6">
        <div class="container is-max-desktop">
          <div class="columns is-mobile is-multiline is-centered">

            <div v-for="(numero,index) in numeros" :key="index" class="numero column is-3-fullhd is-2-desktop is-6-mobile has-text-centered">
                <div class="imagen">
                  <img :src="numero.imagen" alt="">
                </div>
                <div class="data is-size-4 has-text-white">
                  <b>{{numero.numero}}</b>
                </div>
                <div class="descripcion has-text-white" v-html="numero.nombre">
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="bg-blanco-gris">
      <BloqueImagenTexto v-for="(descripcion, index) in descripciones"
          :key="index"
          :data="descripcion"
      ></BloqueImagenTexto>
    </section>

    <div class="wrapper">
      <div class="columns  is-vcentered is-centered mt-6">
        <div class="column is-narrow-desktop is-12-mobile has-text-centered ">
          <img src="/img/descargar-brochure.jpg" alt="">
        </div>
        <div class="column is-narrow-desktop is-12-mobile">
          <a href="#" >
            <div class="button-descargar is-rounded">
              <div class="columns is-vcentered is-mobile">
                <div class="column">
                  <p>
                    <b>Descargar Nuestro<br>
                    <span class="primero">BROCHURE CORPORATIVO</span></b>
                  </p>
                </div>
                <div class="column is-narrow-desktop is-2-touch">
                  <img src="/img/descargar.png" alt="">
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <section class="bg-blanco-gris  mt-6">
      <h2 class="primero has-text-centered is-size-4"><b>¿Por qué elegir pellets Ecomas?</b></h2>
      <Cards class="mt-6" :cards="cards"></Cards>

      <div class="video mt-6">
        <h2 class="primero has-text-centered is-size-4"><b>Ecomas - Cambiante al calor sustentable</b></h2>

        <div class="columns mt-4 is-centered">
          <div class="column is-8">
            <figure class="image is-16by9 ">
              <iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/eX83a6HRfSU" frameborder="0" allowfullscreen></iframe>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <div class="wrapper">
      <marcas titulo="Nuestras Marcas" />
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
      BannerSeccion,Marcas,BloqueImagenTexto,Cards
    },
    data() {
        return {
            numeros: [
                {
                    id: 1,
                    nombre: "Bolsas al día",
                    numero: "430.000",
                    imagen: "/img/quienes-somos/icono-1.png",
                },
                {
                    id: 2,
                    nombre: "Toneladas en<br> transporte al mes",
                    numero: "18.000",
                    imagen: "/img/quienes-somos/icono-2.png",
                },
                {
                    id: 3,
                    nombre: "Puntos de ventas",
                    numero: "350",
                    imagen: "/img/quienes-somos/icono-3.png",
                },
                {
                    id: 4,
                    nombre: "Hogares en Chile.",
                    numero: "100.000",
                    imagen: "/img/quienes-somos/icono-4.png",
                },
            ],
            descripciones: [
                {
                    descripcion: "ECOMAS empresa productora, pionera y líder absoluta en el desarrollo de la industria del pellet en Chile, más de 15 años avalan nuestro compromiso ambiental, siempre con una visión a largo plazo para seguir creciendo con el mercado.",
                    imagen: "/img/quienes-somos/somos-1.png",
                    posicionImagen: "izquierda",
                    estilo: "hero"
                },
                {
                    descripcion: "<p>Nuestro pellet se caracteriza por ser un producto de alta calidad, alineado a los máximos estándares del mercado Internacional, producido con un 100% de subproductos de la industria de remanufactura específicamente de Pino radiata, libre de químicos y agentes contaminantes. La calidad de nuestro producto y el permanente trabajo e innovación del área de producción nos permite anualmente renovar y obtener la certificación de calidad europea ENPLUS.</p><p>Nuestro equipo de trabajo es fundamental para lograr los objetivos que año a año nos planteamos, está marcadamente definido por valores comunes como: la responsabilidad, el compromiso, creatividad y la actitud de servicio orientada al cliente.</p>",
                    imagen: "/img/quienes-somos/somos-2.png",
                    posicionImagen: "derecha",
                    estilo: ""
                },
                {
                    descripcion: "<p>Tenemos la convicción de los múltiples beneficios ambientales del pellet como combustible renovable, es por ello que hoy lo consideramos una alternativa real de reemplazo a los combustibles fósiles y a los altamente contaminantes como la leña húmeda, entre otros.</p><p>Estamos comprometidos con el medio ambiente y nuestros clientes, es por ello que seguiremos trabajando por una mejora continua.</p>",
                    imagen: "/img/quienes-somos/somos-3.png",
                    posicionImagen: "izquierda",
                    estilo: ""
                }
            ],
            cards:[
              {
                descripcion: "<p>Sin aditivos ni impurezas</p>",
                estilo: "importante",
                imagen: "",
              },
              {
                descripcion: "<p>Producto de excelente calidad, desde 2016 contamos con Certificación internacional de calidad ENPLUS.</p>",
                estilo: "",
                imagen: "/img/quienes-somos/certificacion-enplus.jpg",
              },
              {
                descripcion: "<p>Nuestra Planta de elaboración del producto esta implementada con tecnología de punta.</p>",
                estilo: "",
                imagen: "",
              },
              {
                descripcion: "<p>Capacidad Calórica entregada es superior debido a sus bajos índices de humedad 6% - 8% aprox.</p>",
                estilo: "",
                imagen: "",
              },{
                descripcion: "<p>Es un combustible Limpio, por sus características genera menor cantidad de residuos lo que prolonga vida útil y buen funcionamiento del equipo.</p>",
                estilo: "",
                imagen: "",
              },{
                descripcion: "<p>Producto Ecológico, materia prima sin aditivos químicos, madera de pino radiata subproducto obtenido de proceso de remanufactura, CO2 neutro.</p>",
                estilo: "",
                imagen: "",
              },{
                descripcion: "<p>Es un producto fácil de almacenar, debe mantenerse en un lugar seco, fuera del alcance del agua. La Calidad del pellet es vital para el buen funcionamiento de los equipos; el control del contenido de cenizas, impurezas, parámetros físicos, densidad, humedad y poder calorífico es necesario para lograr un producto de alto estándar</p>",
                estilo: "",
                imagen: "",
              },{
                descripcion: "<p>Nuestro pellet está constantemente siendo chequeado en nuestro propio laboratorio y cada cierto período de tiempo, muestreamos nuestro combustible en laboratorios Internacionales.</p>",
                estilo: "",
                imagen: "",
              },
            ]
        };
    },
    computed: {},
    methods: {},
}
</script>