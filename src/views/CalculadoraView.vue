<template>
  <main class="sucursales">
    <div class="wrapper" v-if="!cargando">
      <section class="banner-seccion v2 no-icon calculadora mb-6">
        <div
          className="imagen is-relative "
          :style="{
            backgroundImage: 'url(' + data.acf.imagen_banner.sizes['2048x2048'] + ')',
          }"
        >
          <h1>{{ data.title.rendered }}</h1>
        </div>
      </section>

      <div class="wrapper wrapper-fullm">
        <div class="columns is-centered">
          <div class="column is-6-fullhd is-8-desktop" v-if="paso != 4">
            <h2
              class="has-text-centered primero mb-5"
              v-html="data.acf.mensaje_ayuda"
            ></h2>
          </div>
        </div>

        <div class="px-2">
          <article class="message is-danger my-2 is-small" v-if="error">
            <div class="message-body">
              {{ error }}
            </div>
          </article>
        </div>
        <article class="panel is-success" v-if="paso == 1">
          <p class="panel-heading bg-primero has-text-centered">
            {{ data.acf.paso_1.pregunta }}
          </p>

          <div class="panel-body calculadora pregunta pregunta-1">
            <div class="columns is-centered">
              <div class="column is-narrow">
                <div class="control has-text-centered">
                  <label class="radio">
                    <div v-html="data.acf.paso_1.alternativas.alternativa_1"></div>
                    <input
                      type="radio"
                      name="pregunta_1"
                      v-model="pregunta_1"
                      value="50-70"
                    />
                  </label>
                </div>
              </div>
              <div class="column is-narrow">
                <div class="control has-text-centered">
                  <label class="radio">
                    <div v-html="data.acf.paso_1.alternativas.alternativa_2"></div>
                    <input
                      type="radio"
                      name="pregunta_1"
                      value="75-90"
                      v-model="pregunta_1"
                    />
                  </label>
                </div>
              </div>
              <div class="column is-narrow">
                <div class="control has-text-centered">
                  <label class="radio">
                    <div v-html="data.acf.paso_1.alternativas.alternativa_3"></div>
                    <input
                      type="radio"
                      name="pregunta_1"
                      value="95-130"
                      v-model="pregunta_1"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="has-text-right">
              <div class="columns is-justify-content-flex-end">
                <div class="column no-border is-3">
                  <a
                    href=""
                    class="button button-icono is-fullwidth"
                    @click.prevent="pasarPaso2()"
                    >Siguiente</a
                  >
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="panel is-success" v-if="paso == 2">
          <p class="panel-heading bg-primero has-text-centered">
            {{ data.acf.paso_2.pregunta }}
          </p>

          <div class="panel-body calculadora pregunta pregunta-2">
            <div class="columns is-centered">
              <div class="column is-2">
                <div class="control has-text-centered">
                  <label class="radio">
                    <div v-html="data.acf.paso_2.alternativas.alternativa_1"></div>
                    <input
                      type="radio"
                      name="pregunta_2"
                      v-model="pregunta_2"
                      value="1"
                    />
                  </label>
                </div>
              </div>
              <div class="column is-2">
                <div class="control has-text-centered">
                  <label class="radio">
                    <div v-html="data.acf.paso_2.alternativas.alternativa_2"></div>
                    <input
                      type="radio"
                      name="pregunta_2"
                      value="2"
                      v-model="pregunta_2"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="has-text-right">
              <div class="columns is-justify-content-flex-end">
                <div class="column no-border is-3">
                  <a
                    href=""
                    class="button button-icono is-fullwidth"
                    @click.prevent="pasarPaso3()"
                    >Siguiente</a
                  >
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="panel is-success" v-if="paso == 3">
          <p class="panel-heading bg-primero has-text-centered">
            {{ data.acf.paso_3.pregunta }}
          </p>

          <div class="panel-body calculadora pregunta pregunta-3">
            <div class="columns is-centered">
              <div class="column no-border is-4">
                <div class="field">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="pregunta_3">
                        <option value="">Selecciona una Región</option>
                        <option :value="region" v-for="region in regiones" :key="region">
                          {{ region }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="has-text-right">
              <div class="columns is-justify-content-flex-end">
                <div class="column no-border is-3">
                  <a
                    href=""
                    class="button button-icono is-fullwidth"
                    @click.prevent="finalizar()"
                    >Siguiente</a
                  >
                </div>
              </div>
            </div>
          </div>
        </article>

        <div class="respuesta" v-if="paso == 4">
          <div class="card p-4 has-text-centered mb-6">
            <h2 class="primero has-text-centered py-4">
              <strong>{{ data.acf.mensaje_resultado }}</strong>
            </h2>
            <a href="" class="button button-icono" @click.prevent="reiniciar()"
              >Volver a Calcular</a
            >
          </div>

          <h3 class="primero has-text-centered mb-6">
            {{ data.acf.mensaje_resultado_2 }}
          </h3>
          <SliderProductosCalculadora
            :productos="productos"
            :productos_calculadora="this.data.acf.productos"
            v-if="!cargando_productos"
          ></SliderProductosCalculadora>
          <CargandoSeccion v-else></CargandoSeccion>
        </div>
      </div>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
  <Seo
    v-if="!cargando && data.hasOwnProperty('yoast_head_json')"
    :data_api="data.yoast_head_json"
  ></Seo>
</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
import "/src/assets/libs/slick/slick.min.css";
import "/src/assets/libs/slick/slick-theme.min.css";

import SliderProductosCalculadora from "../components/productos/SliderProductosCalculadora.vue";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import Seo from "/src/components/general/Seo.vue";
export default {
  components: {
    CargandoSeccion,
    SliderProductosCalculadora,
    Seo,
  },
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      regiones: [
        "Arica y Parinacota",
        "Tarapaca",
        "Antofagasta",
        "Atacama",
        "Coquimbo",
        "Valparaiso",
        "Metropolitana de Santiago",
        "O'Higgins",
        "Maule",
        "Ñuble",
        "Bio Bio",
        "La Araucanía",
        "Los Ríos",
        "Los Lagos",
        "Aysen",
        "Magallanes",
      ],
      combinaciones: {
        "Arica y Parinacota": {
          "50-70": { 1: [1, 2], 2: [3] },
          "75-90": { 1: [3, 4, 5], 2: [4, 5] },
          "95-130": { 1: [6, 7], 2: [7] },
        },
        Tarapaca: {
          "50-70": { 1: [1, 2], 2: [3] },
          "75-90": { 1: [3, 4, 5], 2: [4, 5] },
          "95-130": { 1: [6, 7], 2: [7] },
        },
        Antofagasta: {
          "50-70": { 1: [1, 2], 2: [3] },
          "75-90": { 1: [3, 4, 5], 2: [4, 5] },
          "95-130": { 1: [6, 7], 2: [7] },
        },
        Atacama: {
          "50-70": { 1: [1, 2], 2: [3] },
          "75-90": { 1: [3, 4, 5], 2: [4, 5] },
          "95-130": { 1: [6, 7], 2: [7] },
        },
        Coquimbo: {
          "50-70": { 1: [1, 2], 2: [3] },
          "75-90": { 1: [3, 4, 5], 2: [4, 5] },
          "95-130": { 1: [6, 7], 2: [7] },
        },
        Valparaiso: {
          "50-70": { 1: [1, 2], 2: [3] },
          "75-90": { 1: [4, 5], 2: [6] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "Metropolitana de Santiago": {
          "50-70": { 1: [3, 4], 2: [4, 5] },
          "75-90": { 1: [4, 5, 6], 2: [6, 7] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "O'Higgins": {
          "50-70": { 1: [3, 4], 2: [4, 5] },
          "75-90": { 1: [4, 5, 6], 2: [6, 7] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        Maule: {
          "50-70": { 1: [3, 4], 2: [4, 5] },
          "75-90": { 1: [4, 5, 6], 2: [6, 7] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "\u00d1uble": {
          "50-70": { 1: [3, 4], 2: [4, 5] },
          "75-90": { 1: [4, 5, 6], 2: [6, 7] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "Bio Bio": {
          "50-70": { 1: [3, 4], 2: [4, 5, 6] },
          "75-90": { 1: [4, 5, 6], 2: [6, 7, 8] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "La Araucan\u00eda": {
          "50-70": { 1: [3, 4], 2: [4, 5, 6] },
          "75-90": { 1: [4, 5, 6], 2: [6, 7, 8] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "Los R\u00edos": {
          "50-70": { 1: [3, 4], 2: [4, 5, 6] },
          "75-90": { 1: [5, 6], 2: [6, 7, 8] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        "Los Lagos": {
          "50-70": { 1: [3, 4], 2: [4, 5, 6] },
          "75-90": { 1: [5, 6], 2: [6, 7, 8] },
          "95-130": { 1: [7, 8], 2: [8, 9] },
        },
        Aysen: {
          "50-70": { 1: [4, 5], 2: [5, 6] },
          "75-90": { 1: [6, 7], 2: [8, 9] },
          "95-130": { 1: [8, 9], 2: [8, 9] },
        },
        Magallanes: {
          "50-70": { 1: [4, 5], 2: [5, 6] },
          "75-90": { 1: [6, 7], 2: [8, 9] },
          "95-130": { 1: [8, 9], 2: [8, 9] },
        },
      },
      data: {},
      error: false,
      cargando: true,
      cargando_productos: true,
      paso: 1,
      pregunta_1: "",
      pregunta_2: "",
      pregunta_3: "",
      productos: {},
    };
  },
  async mounted() {
    /** OBTENER INFORMACIÓN DE LA PAGINA */
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_CALCULADORA
    );
    if (respuesta) {
      this.data = respuesta.data;

      if (this.data.title.rendered) document.title = this.data.title.rendered;
    }
    this.cargando = false;
  },
  computed: {},
  methods: {
    /** FUNCIÓN DE PASAR DEL PASO 1 AL PASO 2 */
    pasarPaso2() {
      if (this.pregunta_1 != "") {
        this.paso = 2;
        this.error = false;
      } else {
        this.error = "Debes seleccionar una Opción";
      }
    },

    /** FUNCIÓN DE PASAR DEL PASO 2 AL PASO 3 */
    pasarPaso3() {
      if (this.pregunta_2 != "") {
        this.paso = 3;
        this.error = false;
      } else {
        this.error = "Debes seleccionar una Opción";
      }
    },
    /** FINALIZAR Y MOSTRAR RESULTADO */
    finalizar() {
      if (this.pregunta_3 != "") {
        this.paso = 4;
        this.error = false;
        this.buscarProductos();
      } else {
        this.error = "Debes seleccionar una Opción";
      }
    },

    /** FUNCIÓN PARA REINICIAR TODO EL PROCESO */
    reiniciar() {
      this.paso = 1;
      this.error = false;
      this.pregunta_1 = "";
      this.pregunta_2 = "";
      this.pregunta_3 = "";
    },

    async buscarProductos() {
      /** PRIMERO VALIDA QUE EXISTAN TODAS LAS RESPUESTAS */
      if (!this.pregunta_3 || !this.pregunta_2 || !this.pregunta_1) {
        this.error = "Debes completar todas las preguntas";
        return;
      }

      this.cargando_productos = true;

      let productos = "";
      this.combinaciones[this.pregunta_3][this.pregunta_1][this.pregunta_2].forEach(
        (indice) => {
          productos += "" + this.data.acf.productos[indice - 1].producto + ",";
        }
      );

      const respuesta_producto = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_COMPRA_PRODUCTOS_V2 +
          "&include=" +
          productos +
          "&sucursal=" +
          this.store_opciones_generales.sucursal_seleccionada.ID,
        { authorization: true, cache: true }
      );

      this.productos = respuesta_producto.data.listado;
      this.cargando_productos = false;

      // if (respuesta_producto.data.length == 1) {
      //   this.producto = JSON.parse(JSON.stringify(respuesta_producto.data[0]));
      //   this.producto_original = respuesta_producto.data[0];
      // }
    },
  },
};
</script>
