<template>
  <nav class="pagination is-rounded is-small ml-5" role="navigation" aria-label="pagination" v-if="numeroPaginas > 1">
    <ul class="pagination-list">
      <li>
        <a v-if="paginaActual > 1" class="pagination-link active" aria-label="Go Back"
          @click.prevent="cambiarPagina(1)"><i class="fa-solid fa-angle-left"></i></a>
      </li>
      <li>
        <a class="pagination-link" :class="{ 'is-current': paginaActual == pagina }" aria-label=""
          v-for="pagina in numeroPaginas" :key="pagina" @click.prevent="cambiarPagina(pagina)">{{ pagina }}</a>
      </li>
      <li>
        <a class="pagination-link" v-if="numeroPaginas > 1" aria-label="Next page"
          @click.prevent="cambiarPagina(proximaPaginapagina)"><i class="fa-solid fa-angle-right"></i></a>
      </li>
      <!-- <li><a class="pagination-link" aria-label="">2</a></li>
            <li><a class="pagination-link" aria-label="">3</a></li>-->
    </ul>
  </nav>
</template>

<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
export default {
  components: {},
  data() {
    return {
      storeCarroCompra: useCarroCompraStore(),
    };
  },
  mounted() { },
  computed: {
    numeroPaginas() {
      return this.storeCarroCompra.carro.productos?.paginas;
    },
    totalProductos() {
      return this.storeCarroCompra.carro.productos?.total;
    },
    paginaActual() {
      return this.storeCarroCompra.carro.data.filtros?.pagina;
    },
    proximaPaginapagina() {
      return this.paginaActual >= this.numeroPaginas
        ? this.numeroPaginas
        : this.paginaActual + 1;
    },
  },
  methods: {
    cambiarPagina(pagina) {
      this.storeCarroCompra.actualizarFiltros({
        filters: this.storeCarroCompra.carro.data.filtros.filters,
        precio: this.storeCarroCompra.carro.data.filtros.precio,
        pagina: pagina,
      });
    },
  },
};
</script>
