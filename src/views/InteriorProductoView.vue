<template>
  <main class="interior-producto">
    <div class="wrapper">
      <div class="px-3" v-if="!cargando">
        <nav class="breadcrumb is-small" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/productos/">PRODUCTOS</router-link></li>
            <li>
              <router-link class="is-uppercase" :to="'/productos/' + categoria.slug">{{
                categoria.name
              }}</router-link>
            </li>
            <li class="is-active">
              <a href="#">{{ producto.name }}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="columns is-centered is-gapless mt-6" v-if="!cargando">
        <div class="column is-11-fullhd is-12-desktop">
          <div class="columns is-multiline box px-1 py-1 no-shadow mb-6">
            <div class="column is-7-fullhd is-8-desktop is-12-tablet detalle-producto">
              <div class="card height-100 producto interior pb-6">
                <div class="columns is-vcentered is-gapless px-2 mb-6 is-mobile">
                  <div class="column">
                    <a class="link-categoria">
                      <div class="categoria">
                        {{ categoria.name }}
                      </div>
                    </a>
                  </div>
                  <div class="column is-narrow">
                    <div class="disponible gris3" v-if="conStock">
                      Disponible
                      <span class="check ml-2">
                        <i class="fa-solid fa-check"></i>
                      </span>
                    </div>
                    <div class="disponible gris3" v-else>
                      Agotado
                      <span class="error ml-2 is-danger">
                        <i class="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column is-5">
                    <Imagen
                      :imagen="producto.imagen"
                      :alt="producto.name"
                      :url="url"
                    ></Imagen>
                  </div>
                  <div class="column">
                    <div class="nombre">{{ producto.name }}</div>

                    <Precio :precios="precios" class="mb-5"></Precio>

                    <div class="columns is-gapless is-mobile mb-5 caracteristicas">
                      <div
                        class="column"
                        v-if="this.producto.campos_adicionales.despacho_domicilio"
                      >
                        <div
                          class="columns is-mobile is-gapless envio-despacho is-vcentered"
                        >
                          <div class="column is-narrow mr-2">
                            <i class="fa-solid fa-truck primero"></i>
                          </div>
                          <div
                            class="column gris3"
                            v-html="this.producto.campos_adicionales.despacho_domicilio"
                          ></div>
                        </div>
                      </div>
                      <div
                        class="column"
                        v-if="this.producto.campos_adicionales.retiro_en_tienda"
                      >
                        <div
                          class="columns is-mobile is-gapless envio-despacho is-vcentered"
                        >
                          <div class="column is-narrow mr-2">
                            <i class="fa-solid fa-shop primero"></i>
                          </div>
                          <div
                            class="column gris3"
                            v-html="this.producto.campos_adicionales.retiro_en_tienda"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <Acciones
                      :stock="producto.stock_quantity"
                      :stockStatus="producto.stock_status"
                      :idProducto="producto.id"
                      :producto="producto"
                    ></Acciones>
                  </div>
                </div>
              </div>
            </div>
            <div class="column descripcion is-size-6">
              <div class="card height-100 p-6">
                <h2 class="primero mb-2"><b>CARACTERÍSTICAS</b></h2>
                <div class="content gris3" v-html="producto.description"></div>
              </div>
            </div>
          </div>

          <div class="detalle-producto">
            <Tabs :tabs="tabs"></Tabs>
          </div>
          <SliderProductos
            titulo="Productos Relacionados"
            :categoria="categoria.id"
            :productos="productosRelacionados"
          ></SliderProductos>
        </div>
      </div>
      <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </div>
  </main>
  <Seo
    v-if="!cargando && producto.hasOwnProperty('yoast_head_json')"
    :data_api="producto.yoast_head_json"
  ></Seo>
</template>

<script>
import Imagen from "../components/productos/producto/Imagen.vue";
import Precio from "../components/productos/producto/Precio.vue";
import Acciones from "../components/productos/producto/Acciones.vue";
import Seo from "../components/general/Seo.vue";

import Tabs from "../components/general/Tabs.vue";
import SliderProductos from "../components/productos/SliderProductos.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";
import { useCarroCompraStore } from "/src/stores/carroCompra";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  components: {
    Imagen,
    Precio,
    Acciones,
    Tabs,
    SliderProductos,
    CargandoSeccion,
    Seo,
  },
  data() {
    return {
      cargando: true,
      datos_toplayer: {
        cantidad: 1,
        mostrar: false,
      },
      producto: {},
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  async mounted() {
    await this.obtenerProducto();

    // if (this.storeCarroCompra.carro.productos.length == 0) {
    //   await this.obtenerProductos();
    // } else {
    //   if (!this.producto) {
    //     this.$router.replace({ name: "404" });
    //   }
    //   this.cargando = false;
    // }

    document.title = this.producto.name || VUE_APP_DEFAULT_TITLE;
  },
  watch: {
    async sucursalCarro() {
      this.obtenerProductos();
    },
  },
  computed: {
    productosRelacionados() {
      return this.storeCarroCompra.carro.productos.listado.filter((producto) => {
        return producto.stock_quantity == null || producto.stock_quantity > 0;
      });
    },
    conStock() {
      if (
        (this.producto.stock_quantity == null) &
          (this.producto.stock_status == "instock") ||
        parseInt(this.producto.stock_quantity) > 0
      ) {
        return true;
      }
      return false;
    },
    sucursalCarro() {
      return this.store_opciones_generales.sucursal_seleccionada.ID;
    },
    // producto() {
    //   return this.storeCarroCompra.carro.productos.find((producto) => {
    //     return producto.slug == this.$route.params.slug;
    //   });
    // },
    precios() {
      return {
        normal: this.producto.price,
        oferta: this.producto.regular_price,
        on_sale: this.producto.on_sale,
      };
    },
    url() {
      return "/producto/" + this.producto.slug;
    },
    categoria() {
      return this.producto.categories[0];
    },
    imagen() {
      return this.producto.images[0].src;
    },
    tabs() {
      let contenido_tabs = false;

      if (this.producto.campos_adicionales) {
        contenido_tabs = [
          {
            id: 1,
            titulo: "CARACTERÍSTICAS",
            columnas: this.producto.campos_adicionales.caracteristicas.columnas ?? 0,
            descripcion:
              this.producto.campos_adicionales.caracteristicas.descripcion ?? "",
            descripcion2:
              this.producto.campos_adicionales.caracteristicas.descripcion_2 ?? "",
          },
          {
            id: 2,
            titulo: "INFORMACIÓN",
            columnas: 1,
            descripcion: this.producto.campos_adicionales.informacion,
            descripcion2: "",
          },
          {
            id: 3,
            titulo: "MANUAL DE EQUIPO",
            columnas: 1,
            descripcion: this.producto.campos_adicionales.manual_de_equipo,
            descripcion2: "",
          },
          {
            id: 4,
            titulo: "FICHA TÉCNICA",
            columnas: 1,
            descripcion: this.producto.campos_adicionales.ficha_tecnica,
            descripcion2: "",
          },
        ];
      }
      return contenido_tabs;
    },
  },
  methods: {
    async obtenerProducto() {
      this.cargando = true;
      const respuesta_producto = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_COMPRA_PRODUCTOS +
          "&slug=" +
          this.$route.params.slug,
        { authorization: true, cache: true }
      );
      if (respuesta_producto.data.length == 1) {
        this.producto = respuesta_producto.data[0];
      }
      // console.log(respuesta_producto);
      this.cargando = false;
    },
    async obtenerProductos() {
      this.cargando = true;
      await this.obtenerProductosTienda();
      if (!this.producto) {
        this.$router.replace({ name: "404" });
      }
      this.cargando = false;
    },
    TopLayer(cantidad) {
      this.datos_toplayer.cantidad = cantidad;
      this.datos_toplayer.mostrar = true;
    },
    obtenerDatoMetaData(key = false) {
      if (key && this.producto) {
        const dato = this.producto.meta_data.find((meta_data) => {
          return meta_data.key == key;
        });
        if (dato) return dato.value;
      }
      return "";
    },
  },
};
</script>
