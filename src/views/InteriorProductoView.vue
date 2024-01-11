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

                <div class="columns is-vcentered">
                  <div class="column is-5">
                    <a class="imagen" data-fancybox="galeria" :href="producto.images[0].src" v-html="producto.imagen"></a>
                    <div class="is-hidden-tablet">
                      <SliderImagenesProducto v-if="mobile" :imagenes="producto.images"></SliderImagenesProducto>
                    </div>
                  </div>
                  <div class="column">
                    <div class="nombre">{{ producto.name }}</div>

                    <Precio :precios="precios" class="mb-5"></Precio>

                    <div v-if="this.producto.campos_adicionales.despacho_domicilio ||
                      this.producto.campos_adicionales.retiro_en_tienda
                      " class="columns is-gapless is-mobile mb-5 caracteristicas">
                      <div class="column" v-if="this.producto.campos_adicionales.despacho_domicilio">
                        <div class="columns is-mobile is-gapless envio-despacho is-vcentered">
                          <div class="column is-narrow mr-2">
                            <i class="fa-solid fa-truck primero"></i>
                          </div>
                          <div class="column gris3" v-html="this.producto.campos_adicionales.despacho_domicilio"></div>
                        </div>
                      </div>
                      <div class="column" v-if="this.producto.campos_adicionales.retiro_en_tienda">
                        <div class="columns is-mobile is-gapless envio-despacho is-vcentered">
                          <div class="column is-narrow mr-2">
                            <i class="fa-solid fa-shop primero"></i>
                          </div>
                          <div class="column gris3" v-html="this.producto.campos_adicionales.retiro_en_tienda"></div>
                        </div>
                      </div>
                    </div>

                    <div class="block" v-if="variacionesColores.length > 0">
                      <label for="" class="primero"><b>Color</b></label>
                      <div class="control color-producto">
                        <div class="columns is-variable is-1 is-mobile is-multiline">
                          <a v-for="variacion_producto in variacionesColores" @click.prevent="
                            dropdown = false;
                          cambiarVariacion(variacion_producto);
                          " href="#" class="column is-narrow btn-color" :class="{
  'is-active': variacion_producto.id == variacion.id,
}">
                            <div :style="'background-color:' + variacion_producto.attributes[0].hex
                              "></div>
                          </a>
                        </div>
                      </div>
                      <div class="control" v-if="false">
                        <div class="dropdown" :class="{ 'is-active': dropdown }">
                          <div class="dropdown-trigger">
                            <button class="button button-1" aria-haspopup="true" aria-controls="dropdown-menu"
                              @click="dropdown = !dropdown">
                              <span v-html="nombreVariacion(variacion)"></span>
                              <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                              </span>
                            </button>
                          </div>
                          <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <div class="dropdown-content">
                              <a v-for="variacion_producto in variacionesColores"
                                v-html="nombreVariacion(variacion_producto)" @click.prevent="
                                  dropdown = false;
                                cambiarVariacion(variacion_producto);
                                " href="#" class="dropdown-item" :class="{
  'is-active': variacion_producto.id == variacion.id,
}">
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Acciones :stock="producto.stock_quantity" :stockStatus="producto.stock_status"
                      :idProducto="producto.id" :producto="producto" :variacion="false"></Acciones>
                  </div>
                </div>
                <div class="columns is-gapless is-hidden-mobile">
                  <div class="column is-5">
                    <SliderImagenesProducto v-if="!mobile" :imagenes="producto.images"></SliderImagenesProducto>
                  </div>
                </div>
              </div>
            </div>
            <div class="column descripcion is-size-6 is-5-fullhd is-4-desktop is-12-tablet">
              <div class="tabs is-boxed mb-0 is-fullwidth bg-blanco tabs-producto" v-if="producto.campos_adicionales.tabla_ficha_tecnica ||
                producto.campos_adicionales.instalacion
                ">
                <ul>
                  <li :class="{ 'is-active': tab_activa == 1 }">
                    <a @click.prevent="tab_activa = 1">
                      <span>CARACTERÍSTICAS</span>
                    </a>
                  </li>
                  <li :class="{ 'is-active': tab_activa == 2 }" v-if="producto.campos_adicionales.tabla_ficha_tecnica">
                    <a @click.prevent="tab_activa = 2">
                      <span>FICHA TÉCNICA</span>
                    </a>
                  </li>
                  <li :class="{ 'is-active': tab_activa == 3 }" v-if="producto.campos_adicionales.instalacion">
                    <a @click.prevent="tab_activa = 3">
                      <span>INSTALACION</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card p-5" :class="{
                'height-100-tab-producto':
                  producto.campos_adicionales.tabla_ficha_tecnica,
                'height-100': !producto.campos_adicionales.tabla_ficha_tecnica,
              }">
                <div v-if="tab_activa == 1">
                  <h2 class="primero mb-2"><b>CARACTERÍSTICAS</b></h2>
                  <div class="content gris3" v-html="producto.description"></div>
                </div>
                <div v-if="tab_activa == 2 && producto.campos_adicionales.tabla_ficha_tecnica
                  ">
                  <h2 class="primero mb-2"><b>FICHA TÉCNICA</b></h2>
                  <div class="content gris3 tab-ficha-tecnica">
                    <table class="table table-sm is-narrow gris3 is-bordered">
                      <tr v-for="fila in producto.campos_adicionales.tabla_ficha_tecnica">
                        <td>
                          <strong>{{ fila.nombre }}</strong>
                        </td>
                        <td>{{ fila.valor }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div v-if="tab_activa == 3 && producto.campos_adicionales.instalacion">
                  <h2 class="primero mb-2"><b>INSTALACIÓN</b></h2>
                  <div class="content gris3 tab-ficha-tecnica">
                    <div class="content gris3" v-html="producto.campos_adicionales.instalacion"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="block" v-if="producto.campos_adicionales.galeria">
            <div class="slider-galeria-gral">
              <div class="item" v-for="imagen in producto.campos_adicionales.galeria">
                <img :src="imagen" alt="" />
              </div>
            </div>
          </div>

          <div class="detalle-producto" v-if="tabs">
            <Tabs :tabs="tabs"></Tabs>
          </div>
          <CargandoSeccion v-if="cargando_productos_relacionados"></CargandoSeccion>

          <SliderProductos v-else titulo="Productos Relacionados" :categoria="categoria.id"
            :productos="productos_relacionados"></SliderProductos>
        </div>
      </div>
      <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </div>
  </main>
  <Seo v-if="!cargando && producto.hasOwnProperty('yoast_head_json')" :data_api="producto.yoast_head_json"></Seo>
</template>

<script>
import "/src/assets/libs/fancybox/jquery.fancybox.min.js";
import "/src/assets/libs/fancybox/jquery.fancybox.min.css";

import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
import "/src/assets/libs/slick/slick.min.css";
import "/src/assets/libs/slick/slick-theme.min.css";

import Imagen from "../components/productos/producto/Imagen.vue";
import Precio from "../components/productos/producto/Precio.vue";
import Acciones from "../components/productos/producto/Acciones.vue";
import Seo from "../components/general/Seo.vue";

import Tabs from "../components/general/Tabs.vue";
import SliderProductos from "../components/productos/SliderProductos.vue";
import SliderImagenesProducto from "../components/productos/producto/SliderImagenes.vue";
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
    SliderImagenesProducto,
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
      producto_original: {},
      producto: {},
      variaciones: {},
      variacion: false,
      mobile: false,
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
      dropdown: false,
      cargando_productos_relacionados: true,
      productos_relacionados: false,
      tab_activa: 1,
    };
  },
  async mounted() {
    this.cargando = true;
    await this.obtenerProducto();
    /** SI EL PRODUCTO ES VARIABLE, OBTENER INFORMACIÓN DE CADA VARIACIÓN */
    if (this.producto.type == "variable") await this.obtenerVariaciones();
    this.cargando = false;

    this.obtenerProductosRelacionados();

    $.fancybox.defaults.backFocus = false;

    document.title = this.producto.name || "";

    this.mediaQuery();
    window.addEventListener("resize", (event) => {
      this.mediaQuery();
    });

    if (this.producto.campos_adicionales.galeria) {
      this.cargarSliderGaleria();
    }
  },
  watch: {
    async sucursalCarro() {
      this.obtenerProductos();
    },
  },
  computed: {
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
        normal: this.producto.regular_price,
        oferta: this.producto.price,
        on_sale: this.producto.on_sale,
        bolsas_producto: this.producto.bolsas_producto,
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

    variacionesColores() {
      let variacionesColor = [];
      if (this.variaciones.length) {
        this.variaciones.forEach((variacion) => {
          if (variacion.attributes.length == 1 && variacion.attributes[0].name == "Color")
            variacionesColor.push(variacion);
        });
      }
      return variacionesColor;
    },
  },
  methods: {
    async obtenerProducto() {
      const respuesta_producto = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_COMPRA_PRODUCTOS +
        "&slug=" +
        this.$route.params.slug +
        "&sucursal=" +
        this.store_opciones_generales.sucursal_seleccionada.ID,
        { authorization: true, cache: true }
      );

      if (respuesta_producto.data.length == 1) {
        console.log(respuesta_producto.data);
        this.producto = JSON.parse(JSON.stringify(respuesta_producto.data[0]));
        this.producto_original = respuesta_producto.data[0];
      }
    },
    async obtenerVariaciones() {
      const respuesta = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_URL_API +
        "/wc/v3/products/" +
        this.producto_original.id +
        "/variations" +
        "?sucursal=" +
        this.store_opciones_generales.sucursal_seleccionada.ID,
        { authorization: true, cache: true }
      );

      this.variaciones = respuesta.data;

      if (this.variaciones.length > 0) {
        this.cambiarVariacion(this.variaciones[0]);
      }

      // this.producto = respuesta.data[0];
    },
    cambiarVariacion(variacion) {
      this.variacion = variacion;
      // console.log(variacion);
      // this.producto.name = variacion.name;
      this.producto.stock_quantity = variacion.stock_quantity;
      this.producto.stock_status = variacion.stock_status;
      this.producto.id = variacion.id;
      this.producto.regular_price = variacion.regular_price;
      this.producto.sale_price = variacion.sale_price;
      this.producto.price = variacion.price;
      this.producto.on_sale = variacion.on_sale;
      this.producto.imagen = variacion.imagen;
      this.producto.images = [variacion.image];
      this.producto.description = variacion.description
        ? variacion.description
        : this.producto_original.description;
    },

    /** OBTENER PRODUCTOS RELACIONADOS DEL PRODUCTO ACTUAL, SI NO VIENEN SE OBTIENEN ALGUNOS POR DEFECTO */
    async obtenerProductosRelacionados() {
      const relacionados = this.producto_original.campos_adicionales
        .productos_relacionados
        ? this.producto_original.campos_adicionales.productos_relacionados.join(",")
        : false;
      let campo_relacionados = "";
      let per_page = "&per_page=5";
      if (relacionados) {
        campo_relacionados = "&include=" + relacionados;
        per_page = "";
      }

      const respuesta = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_URL_API +
        "/wc/v3/products/?" +
        "exclude=" +
        this.producto_original.id +
        campo_relacionados +
        "&sucursal=" +
        this.store_opciones_generales.sucursal_seleccionada.ID +
        per_page,
        { authorization: true, cache: true }
      );
      this.productos_relacionados = respuesta.data;

      this.cargando_productos_relacionados = false;
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

    nombreVariacion(variacion) {
      let nombre = "";

      variacion.attributes.forEach((atributo, index) => {
        nombre += "<b>" + atributo.name + "</b> : " + atributo.option;
        if (index + 1 < variacion.attributes.length) nombre += " - ";
      });

      return nombre;
    },
    mediaQuery() {
      this.mobile = window.matchMedia("(max-width: 768px)").matches;
    },
    cargarSliderGaleria() {
      console.log("aca");
      /** CREAR INSTANCIA DE CARRUSEL */
      setTimeout(() => {
        $(".slider-galeria-gral").slick({
          slidesToShow: 1,
          dots: false,
          arrows: true,
          infinite: false,
          pauseOnHover: false,
          pauseOnFocus: false,
          autoplay: false,
          autoplaySpeed: 5000,
          prevArrow:
            '<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
          nextArrow:
            '<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
        });
      }, 300);
    },
  },
};
</script>
