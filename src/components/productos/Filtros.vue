<template>
  <div class="filtros">
    <a href="#" class="button button-filtro is-hidden-tablet" @click.prevent="toggleFiltros($event)">
      Filtros
      <img src="/img/icono-filtro.png" alt="" />
    </a>

    <div class="card p-5 is-hidden-mobile" ref="filtrosMovil">
      <h6 class="primero mb-4"><b>FILTROS</b></h6>

      <div class="filtros-dinamicos" v-if="!cargando && filtros">
        <div class="filtro" v-for="filtro in filtros" :key="'filtro-' + filtro.id">
          <div class="mb-2">
            <b>{{ filtro.nombre }}</b>
          </div>
          <ul v-if="filtro.terms.length > 0">
            <li :key="filtro.slug + '-term-0'">
              <label class="radio"><input type="radio" :name="'filters[' + filtro.slug + ']'" :value="false"
                  v-model="data_filtros[filtro.slug]" />
                Todos
              </label>
            </li>
            <li v-for="term in filtro.terms" :key="'term-' + term.id">
              <label class="radio"><input type="radio" :name="'filters[' + filtro.slug + ']'" :value="term.slug"
                  v-model="data_filtros[filtro.slug]" />
                {{ term.nombre }} ({{ term.cantidad }})
              </label>
            </li>
          </ul>
        </div>
      </div>

      <CargandoSeccion v-if="cargando" class="small"></CargandoSeccion>

      <div class="filtro">
        <div class="mb-2"><b>Precio</b></div>
        <ul>
          <li>
            <label class="radio"><input type="radio" name="precio" value="false" v-model="precio" key="precio0" />
              Todos</label>
          </li>
          <li>
            <label class="radio"><input type="radio" name="precio" value="0-500000" v-model="precio" key="precio1" />
              Hasta $500.000</label>
          </li>
          <li>
            <label class="radio"><input type="radio" name="precio" value="500000-1000000" v-model="precio"
                key="precio2" />
              $500.000 - $1.000.00</label>
          </li>
          <li>
            <label class="radio"><input type="radio" name="precio" value="1000000-1500000" v-model="precio"
                key="precio3" />
              $1.000.000 $1.500.000</label>
          </li>
          <li>
            <label class="radio"><input type="radio" name="precio" value="1500000-2000000" v-model="precio"
                key="precio4" />
              $1.500.000 - $2.000.000</label>
          </li>
          <li>
            <label class="radio">
              <input type="radio" name="precio" value="2000000" v-model="precio" key="precio5" />
              Sobre $2.000.000</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CargandoSeccion from "../general/CargandoSeccion.vue";
import { useCarroCompraStore } from "/src/stores/carroCompra";

export default {
  components: {
    CargandoSeccion,
  },
  props: {},
  data() {
    return {
      cargando: false,
      storeCarroCompra: useCarroCompraStore(),
      filtros: false,
      data_filtros: {},
      precio: false,
    };
  },

  mounted() {
    this.obtenerFiltros();
  },
  watch: {
    precio() {
      this.actualizarFiltros();
    },
    data_filtros: {
      handler(newValue, oldValue) {
        this.actualizarFiltros();
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    async obtenerFiltros() {
      this.cargando = true;
      const respuesta = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_COMPRA_FILTROS_PRODUCTOS
      );
      if (respuesta.status == 200) this.filtros = respuesta.data;

      this.filtros.forEach((filtro) => {
        this.data_filtros[filtro.slug] = false;
      });
      this.cargando = false;
    },
    actualizarFiltros() {
      this.storeCarroCompra.actualizarFiltros({
        filters: this.data_filtros,
        precio: this.precio,
        pagina: 1,
      });
    },
    toggleFiltros(e) {
      e.target.classList.toggle("active");
      this.$refs.filtrosMovil.classList.toggle("is-hidden-mobile");
    },
  },
};
</script>
