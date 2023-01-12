<template>
  <main class="productos">
    <div class="wrapper">
      <div
        class="columns is-vcentered mb-4 is-mobile is-multiline titulo-opciones is-variable is-1 is-centered"
      >
        <div
          class="column py-0"
          :class="[
            { 'is-10': categoria.slug == 'pellet' },
            { 'is-3': categoria.slug != 'pellet' },
          ]"
        >
          <h2 class="primero is-size-4"><b>PELLETS</b></h2>
        </div>
        <div class="column py-0" v-if="categoria.slug != 'pellet'">
          <div class="opciones columns is-vcentered is-gapless mb-0 px-3">
            <div class="column is-hidden-mobile">
              <!-- <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                <ul>
                  <li><a href="#">Pellet</a></li>
                  <li><a href="#">Ecoheat</a></li>
                  <li><a href="#">55 70m2</a></li>
                  <li><a href="#">$500.000 - $1.000.000</a></li>
                </ul>
              </nav> -->
            </div>
            <div class="column is-narrow acciones-paginador">
              <div
                class="columns is-mobile is-vcentered is-gapless is-justify-content-flex-end"
              >
                <AccionesGrilla
                  @cambiarGrilla="cambiarGrilla"
                  class="is-hidden-mobile"
                ></AccionesGrilla>
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
          <ListadoProductos :grilla="grilla" :categoria="categoria"></ListadoProductos>

          <div
            class="columns is-justify-content-flex-end"
            v-if="categoria.slug != 'pellet'"
          >
            <div class="column is-narrow">
              <Paginador></Paginador>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<!--<template>
    <main class="productos">
        <div class="wrapper">
            <div class="columns is-centered mt-4 titulo-opciones is-variable">
                <div class="column is-10 py-0">
                    <h2 class="primero is-size-4 is-uppercase"><b>{{ categoria.name }}</b></h2>
                </div>
            </div>
            <div class="columns is-centered ">
                <div class="column is-10">
                    <ListadoProductos  :grilla="grilla" :categoria="categoria"></ListadoProductos>
                </div>

            </div>

        </div>
    </main>
</template>-->

<script>
// import BannerSeccion from "../components/general/BannerSeccion.vue";
import ListadoProductos from "../components/productos/ListadoProductos.vue";
import Paginador from "../components/productos/Paginador.vue";
import AccionesGrilla from "../components/productos/AccionesGrilla.vue";
import Filtros from "../components/productos/Filtros.vue";

export default {
  components: {
    ListadoProductos,
    Paginador,
    AccionesGrilla,
    Filtros,
  },
  data() {
    return {
      grilla: "grid",
      categoria: {
        term_id: 33,
        name: "Pellet",
        slug: "pellet",
      }, // pellet por defecto
    };
  },
  beforeMount() {
    if (this.$route.params.categoria) {
      const categoria_seleccionada = Object.values(
        this.storeCarroCompra.carro.categorias
      ).find((categoria) => categoria.slug == this.$route.params.categoria);

      if (categoria_seleccionada) this.categoria = categoria_seleccionada;
    }

    document.title = this.categoria.name || VUE_APP_DEFAULT_TITLE;
  },
  methods: {
    cambiarGrilla(grilla) {
      this.grilla = grilla;
    },
  },
};
</script>
