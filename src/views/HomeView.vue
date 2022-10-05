
<template>
  <main>
    <div v-if="!cargando">

      <div class="wrapper wrapper-fullm" v-if="contenidoInicial.acf.compra_rapida.visible">
        <section class="columns compra-rapida is-vcentered is-gapless is-mobile">
          <div class="column is-narrow titulo">
            <h2 class="pr-4" v-html="contenidoInicial.acf.compra_rapida.titulo_home">

            </h2>
          </div>
          <div class="column is-1 is-hidden-mobile"></div>

          <CompraRapida />
        </section>
      </div>

      <div class="wrapper" >
        <BannerHome :imagenes="contenidoInicial.acf.banner"></BannerHome>
      </div>



      <div class="wrapper">
        <marcas></marcas>
      </div>

      <div class="wrapper wrapper-fullm">
        <section class="quienes-somos-home my-6" v-if="contenidoInicial.acf.quienes_somos.activo">
          <div class="wrapper">
            <div class="columns p-0 contenedor is-vcentered">
              <div class="column p-0 is-4 is-offset-2 contenido">
                <div class="wrap">
                  <img class="mb-4" :src="contenidoInicial.acf.quienes_somos.imagen.sizes.medium" alt="" />

                  <h1 class="mb-4"><b>{{contenidoInicial.acf.quienes_somos.titulo}}</b></h1>
                  <div class="content is-fullwidth" v-html="contenidoInicial.acf.quienes_somos.descripcion">
                  </div>
                  <div class="block">
                    <router-link :to="contenidoInicial.acf.quienes_somos.boton.url" class="button button-2 bg-verde is-rounded" v-if="contenidoInicial.acf.quienes_somos.boton.url">
                      {{contenidoInicial.acf.quienes_somos.boton.texto}}
                        <i class="has-text-white ml-2 fa-solid fa-arrow-pointer"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="column p-0 is-6 is-align-self-flex-end imagen">
                <img src="/img/bg-home-quienes-somos-planta.jpg" class="mt-6 is-block" />
              </div>
            </div>
          </div>
        </section>
        <NoticiasDestacada titulo="Noticias" />
      </div>
    </div>

    <CargandoSeccion v-if="cargando"></CargandoSeccion>
    <ErrorSeccion v-if="errorData"></ErrorSeccion>
  </main>
</template>

<script>
  import CompraRapida from "@/components/home/CompraRapida.vue";
  import NoticiasDestacada from "@/components/general/NoticiasDestacadas.vue";
  import Marcas from "@/components/general/Marcas.vue";
  import BannerHome from "../components/home/BannerHome.vue"
  import CargandoSeccion from "@/components/general/CargandoSeccion.vue";
  import ErrorSeccion from "@/components/general/ErrorSeccion.vue";

    export default {
      components: {
    CompraRapida,
    NoticiasDestacada,
    Marcas,
    BannerHome,
    CargandoSeccion,
    ErrorSeccion
},
      async mounted (){
        const respuesta = await this.obtenerInfoInicial('pages/73');
        if(respuesta){
          this.contenidoInicial = respuesta.data;
          this.cargando = false;
        }
      },
      data() {
        return {
          cargando:true,
          contenidoInicial:{
          },

        };
      },
      computed: {
      },
      methods: {
      },
    };
    </script>