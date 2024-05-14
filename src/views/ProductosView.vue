<template>
  <main class="productos" v-if="!cargando">
    <div class="wrapper">
      <div class="columns is-vcentered mb-4 is-mobile is-multiline titulo-opciones is-variable is-1 is-centered">
        <div class="column py-0" :class="[
          { 'is-10': categoria.slug == 'pellet' },
          { 'is-3': categoria.slug != 'pellet' },
        ]">
          <h2 class="primero is-size-4">
            <b class="is-uppercase">
              {{ categoria.name }}
            </b>
          </h2>
        </div>
        <div class="column py-0" v-if="categoria.slug != 'pellet'">
          <div class="opciones columns is-vcentered is-gapless mb-0 px-3">
            <div class="column is-hidden-mobile">

            </div>
            <div class="column is-narrow acciones-paginador">
              <div class="columns is-mobile is-vcentered is-gapless is-justify-content-flex-end">
                <AccionesGrilla @cambiarGrilla="cambiarGrilla" class="is-hidden-mobile"></AccionesGrilla>
                <div class="column is-narrow">
                  <Paginador class="is-hidden-mobile"></Paginador>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-variable is-1 is-centered">
        <div class="column is-3 filtros" v-if="categoria.slug != 'pellet'">
          <Filtros></Filtros>
        </div>

        <div class="column py-0" :class="[{ 'is-10': categoria.slug == 'pellet' }]">
          <ListadoProductos :grilla="grilla" :categoria="categoria" v-if="categoria"></ListadoProductos>

          <div class="columns is-justify-content-flex-end" v-if="categoria.slug != 'pellet'">
            <div class="column is-narrow">
              <Paginador></Paginador>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <CargandoSeccion v-if="cargando"></CargandoSeccion>
</template>


<script>
// import BannerSeccion from "../components/general/BannerSeccion.vue";
import ListadoProductos from "../components/productos/ListadoProductos.vue";
import Paginador from "../components/productos/Paginador.vue";
import AccionesGrilla from "../components/productos/AccionesGrilla.vue";
import Filtros from "../components/productos/Filtros.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  components: {
    ListadoProductos,
    Paginador,
    AccionesGrilla,
    Filtros,
    CargandoSeccion
  },
  data() {
    return {
      grilla: "grid",
      store_opciones_generales: useOpcionesGeneralesStore(),
      categorias: {},
      categoria: false, // pellet por defecto

    };
  },
  async mounted() {
    const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_COMPRA_PRODUCTOS_CATEGORIAS);
    if (respuesta) {
      this.categorias = respuesta.data;
    }
    if (this.$route.params.categoria) {
      const categoria_seleccionada = Object.values(this.categorias).find((categoria) => categoria.slug == this.$route.params.categoria);

      this.categoria = (categoria_seleccionada) ? categoria_seleccionada : { slug: '-' };

    } else {
      this.categoria = Object.values(this.categorias).find(categoria => categoria.term_id == 33);
    }

    document.title = this.categoria.name || import.meta.env.VUE_APP_DEFAULT_TITLE;
    console.log(this.categoria);

  },
  computed: {
    cargando() {
      return this.store_opciones_generales.cargando;
    }
  },
  methods: {
    cambiarGrilla(grilla) {
      this.grilla = grilla;
    },
  },
};
</script>
