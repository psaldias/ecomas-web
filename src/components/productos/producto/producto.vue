<template>
  <main class="main-producto">
    <div class="card producto" :class="formato" v-if="formato == 'vertical'">
      <a class="link-categoria">
        <div class="categoria">
          {{ categoria }}
        </div>
      </a>
      <!-- <router-link :to="url" class="imagen" v-html="producto.imagen"> </router-link> -->
      <Imagen
        :imagen="producto_activo.imagen"
        :alt="producto_activo.name"
        :url="url"
      ></Imagen>

      <div class="nombre">{{ producto_activo.name }}</div>
      <!--
      <PrecioVariable
        v-if="producto.variable"
        :precios="{ desde: producto.min_price, hasta: producto.max_price }"
      ></PrecioVariable> -->
      <Precio :precios="precios"></Precio>

      <div
        v-if="producto_activo.short_description"
        class="descripcion"
        v-html="producto_activo.short_description"
      ></div>

      <div class="block mb-2" v-if="producto.variable && variacionesColores.length > 0">
        <label for="" class="primero is-size-7"><b>Color</b></label>
        <div class="control color-producto">
          <div class="columns is-variable is-1 is-mobile is-multiline">
            <a
              v-for="variacion_producto in variacionesColores"
              @click.prevent="
                dropdown = false;
                cambiarVariacion(variacion_producto);
              "
              href="#"
              class="column is-narrow btn-color"
              :class="{
                'is-active': variacion_producto.id == variacion.id,
              }"
            >
              <div
                :style="'background-color:' + variacion_producto.attributes[0].hex"
              ></div>
            </a>
          </div>
        </div>
        <div class="control is-fullwidth" v-if="false">
          <div class="dropdown is-small is-fullwidth" :class="{ 'is-active': dropdown }">
            <div class="dropdown-trigger">
              <button
                class="button button-1 is-small has-text-left"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                @click="dropdown = !dropdown"
              >
                <span class="button-text" v-html="nombreVariacion(variacion)"></span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <a
                  v-for="variacion_producto in variaciones"
                  v-html="nombreVariacion(variacion_producto)"
                  @click.prevent="
                    dropdown = false;
                    cambiarVariacion(variacion_producto);
                  "
                  href="#"
                  class="dropdown-item is-size-7"
                  :class="{
                    'is-active': variacion_producto.id == variacion.id,
                  }"
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Acciones
        class="mt-2"
        :stock="producto_activo.stock_quantity"
        :stockStatus="producto_activo.stock_status"
        :idProducto="producto_activo.id"
        :producto="producto_activo"
      ></Acciones>
    </div>

    <!-- <div class="card producto" :class="formato" v-if="formato == 'horizontal'">
      <div class="producto horizontal">
        <div class="columns is-vcentered">
          <div class="column is-narrow py-0">
            <div class="imagen-categoria">
              <a class="link-categoria">
                <div class="categoria">
                  {{ categoria }}
                </div>
              </a>
              <div class="imagen" v-html="producto.imagen"></div>
              <Imagen :imagen="imagen" :alt="producto.name" :url="url"></Imagen>
            </div>
          </div>
          <div class="column py-0">
            <div class="columns is-vcentered">
              <div class="column is-narrow">
                <div class="nombre">{{ producto.name }}</div>

                <Precio :precios="precios"></Precio>
              </div>
              <div class="column is-hidden-mobile is-1"></div>
              <div class="column">
                <div class="descripcion mb-0" v-html="producto.short_description"></div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-hidden-mobile"></div>
              <div class="column is-narrow">
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
      </div>
    </div> -->
  </main>
</template>

<script>
import Imagen from "./Imagen.vue";
import Precio from "./Precio.vue";
import PrecioVariable from "./PrecioVariable.vue";
import Acciones from "./Acciones.vue";
import { R } from "../../../../dist/assets/regionesComunas.66196813";

export default {
  props: {
    formato: {
      default: "vertical",
    },
    producto: {},
  },
  components: {
    Imagen,
    Precio,
    PrecioVariable,
    Acciones,
  },
  mounted() {
    this.producto_activo = JSON.parse(JSON.stringify(this.producto));
    if (this.producto.variable) this.cambiarVariacion(this.producto.variaciones[0]);
  },
  data() {
    return {
      producto_activo: {},
      variacion: {},
      dropdown: false,
    };
  },
  computed: {
    variaciones() {
      return this.producto.variaciones;
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
    precios() {
      return {
        normal: this.producto_activo.regular_price,
        oferta: this.producto_activo.price,
        on_sale: this.producto_activo.on_sale,
        bolsas_producto: this.producto_activo.bolsas_producto,
      };
    },
    url() {
      return "/producto/" + this.producto.slug;
    },
    categoria() {
      return this.producto.categories[0].name;
    },
    imagen() {
      return this.producto.images[0].src;
    },
  },
  methods: {
    cambiarVariacion(variacion) {
      this.variacion = variacion;
      // this.producto.name = variacion.name;
      this.producto_activo.stock_quantity = variacion.stock_quantity;
      this.producto_activo.stock_status = variacion.stock_status;
      this.producto_activo.id = variacion.id;
      this.producto_activo.regular_price = variacion.regular_price;
      this.producto_activo.price = variacion.price;
      this.producto_activo.on_sale = variacion.on_sale;
      this.producto_activo.imagen = variacion.imagen;
      this.producto_activo.images = [variacion.image];
      this.producto_activo.description = variacion.description
        ? variacion.description
        : this.producto_activo.description;
    },
    nombreVariacion(variacion) {
      let nombre = "";
      if (variacion.attributes) {
        variacion.attributes.forEach((atributo, index) => {
          nombre += "<b>" + atributo.name + "</b> : " + atributo.option;
          if (index + 1 < variacion.attributes.length) nombre += " - ";
        });
      }

      return nombre;
    },
    coloresVariacion(variacion) {
      console.log(variacion.attributes);
      if (variacion.attributes) {
        return variacion.attributes;
        console.log(variacion.attributes.filter((atributo) => atributo.name == "Color"));
      }
    },
  },
};
</script>
