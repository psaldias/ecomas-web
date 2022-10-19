<template>
  <main>
    <div class="quienes-somos" v-if="!cargando">
      <div class="wrapper">
        <BannerSeccion
          :titulo="contenidoInicial.title.rendered"
          :imagen="contenidoInicial.acf.banner.sizes['2048x2048']"
        />

        <section class="numeros mt-6" v-if="numeros.length > 0">
          <div class="container is-max-desktop">
            <div class="columns is-mobile is-multiline is-centered">
              <div
                v-for="(numero, index) in numeros"
                :key="index"
                class="numero column is-3-fullhd is-2-desktop is-6-mobile has-text-centered"
              >
                <div class="imagen">
                  <img
                  :src="numero.icono.sizes.thumbnail"
                  alt=""
                  />
                </div>
                <div class="data is-size-4-desktop is-size-5-mobile has-text-white">
                  <b>{{ numero.numero }}</b>
                </div>
                <div
                  class="descripcion has-text-white"
                  v-html="numero.descripcion"
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="bg-blanco-gris">
        <BloqueImagenTexto
          v-for="(descripcion, index) in cuadrosTextoImagen"
          :key="index"
          :data="descripcion"
        ></BloqueImagenTexto>
      </section>

      <div class="wrapper">
        <div class="columns is-vcentered is-centered mt-6">
          <div class="column is-narrow-desktop is-12-mobile has-text-centered">
            <img :src="contenidoInicial.acf.brochure.imagen.sizes.medium" alt="" />
          </div>
          <div class="column is-narrow-desktop is-12-mobile">
            <a :href="contenidoInicial.acf.brochure.archivo" target="_blank">
              <div class="button-descargar is-rounded">
                <div class="columns is-vcentered is-mobile">
                  <div class="column ">
                    <div>
                      <b>
                      {{contenidoInicial.acf.brochure.texto_1}}
                        <br />
                        <span class="primero">{{contenidoInicial.acf.brochure.texto_2}}</span>
                      </b>
                    </div>
                  </div>
                  <div class="column is-narrow-desktop is-3-touch is-4-mobile">
                    <img src="/img/descargar.png" alt="" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <section class="bg-blanco-gris mt-6">
        <h2 class="primero has-text-centered is-size-4">
          <b>{{contenidoInicial.acf.titulo_cuadros_enumaerados}}</b>
        </h2>
        <Cards class="mt-6" :cards="cards"></Cards>

        <div class="video mt-6">
          <h2 class="primero has-text-centered is-size-4">
            <b>{{contenidoInicial.acf.video.titulo}}</b>
          </h2>

          <div class="columns mt-4 is-centered">
            <div class="column is-8">
              <figure class="image is-16by9">
                <iframe
                  class="has-ratio"
                  width="640"
                  height="360"
                  :src="contenidoInicial.acf.video.url_video_youtube"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <div class="wrapper">
        <marcas titulo="Nuestras Marcas" />
      </div>

    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>


  </main>
</template>

<script>
import Marcas from '../components/general/Marcas.vue'
import BloqueImagenTexto from '../components/quienes-somos/BloqueImagenTexto.vue'
import BannerSeccion from '../components/general/BannerSeccion.vue'
import Cards from '../components/quienes-somos/Cards.vue'
import ErrorSeccion from '/src/components/general/ErrorSeccion.vue'
import CargandoSeccion from '../components/general/CargandoSeccion.vue'

export default {
  components: {
    BannerSeccion,
    Marcas,
    BloqueImagenTexto,
    Cards,
    ErrorSeccion,
    CargandoSeccion
},
  data() {
    return {
      cargando:true,
      contenidoInicial:{
      },
    }
  },
  async mounted (){
   const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_SOMOS);
   if(respuesta){
    this.contenidoInicial = respuesta.data;
    this.cargando = false;
    if(this.contenidoInicial.title.rendered)
      document.title = this.contenidoInicial.title.rendered
   }
  },
  computed: {
    numeros(){
        return this.contenidoInicial.acf.numeros
    },
    cuadrosTextoImagen(){
      return this.contenidoInicial.acf.cuadros_descripciones;
    },
    cards(){
      let cards = {};
      cards = this.contenidoInicial.acf.cuadros_enumerados.map(card => {
        return {
          titulo:'',
          descripcion:card.descripcion,
          estilo:card.tipo,
          imagen: (card.imagen ? card.imagen.sizes.medium:''),
        }
      });
      return cards;
    }
  },
  methods: {
  },
}
</script>
