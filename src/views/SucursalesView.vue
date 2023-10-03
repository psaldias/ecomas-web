<template>
  <main class="sucursales">
    <div class="wrapper" v-if="!cargando">
      <section class="banner-seccion v2">
        <div
          className="imagen is-relative "
          :style="{
            backgroundImage: 'url(' + data.acf.imagen_banner.sizes['2048x2048'] + ')',
          }"
        >
          <h1>
            <img src="/img/icono-banner.png" alt="" class="mr-4" />{{
              data.title.rendered
            }}
          </h1>
        </div>
      </section>
      <!-- <pre>{{data.title.rendered}}</pre> -->

      <div class="wrapper wrapper-fullm">
        <div class="columns is-centered mb-4">
          <div class="column is-10">
            <div class="block">
              <div class="columns is-mobile is-centered">
                <div class="column is-4">
                  <div class="field">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select
                          v-model="regionSeleccionada"
                          @change="comunaSeleccionada = ''"
                        >
                          <option value="">Selecciona una Región</option>
                          <option
                            :value="region.term_id"
                            v-for="region in regiones"
                            :key="region.term_id"
                          >
                            {{ region.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div class="column">
                  <div class="field">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select v-model="comunaSeleccionada" @change="cambiarComunas()">
                          <option value="">Seleccionar una Comuna</option>
                          <option
                            :value="comuna.term_id"
                            v-for="comuna in comunas"
                            :key="comuna.term_id"
                          >
                            {{ comuna.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="column is-3">
                  <div class="field">
                    <button class="button button-icono is-fullwidth">BUSCAR</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div class="columns is-centered is-gapless">
                  <div class="column">
                    <div class="titulo-seccion">
                      <div
                        class="columns is-vcentered is-centered is-mobile is-gapless px-2"
                      >
                        <div class="column is-narrow mr-4">
                          <img src="/img/tienda.png" alt="Tienda" />
                        </div>
                        <div class="column is-narrow-desktop">
                          <h3 class="primero has-text-weight-bold has-text-centered">
                            Tienda Venta Directa
                          </h3>
                          <h4 class="primero has-text-weight-normal has-text-centered">
                            Pellet • Estufas • Calderas • Pedidos Online
                          </h4>
                        </div>
                      </div>

                      <div class="columns is-multiline is-variable is-2">
                        <div class="column is-6 py-1">
                          <a class="button button-icono bg-gris2 is-fullwidth"
                            >Concepción</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <div class="columns is-centered is-gapless">
                  <div class="column">
                    <div class="titulo-seccion">
                      <div
                        class="columns is-vcentered is-centered is-mobile is-gapless px-2"
                      >
                        <div class="column is-narrow mr-4">
                          <img src="/img/pedido-online.png" alt="Pedido Online" />
                        </div>
                        <div class="column is-narrow-desktop">
                          <h3 class="primero has-text-weight-bold has-text-centered">
                            Pedidos Online
                          </h3>
                          <h4 class="primero has-text-weight-normal has-text-centered">
                            Pellet • Estufas • Calderas
                          </h4>
                        </div>
                      </div>
                      <div class="columns is-multiline is-variable is-2">
                        <div class="column is-6 py-1">
                          <a class="button button-icono bg-gris2 is-fullwidth"
                            >Concepción</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sucursales mt-6">
          <h1 class="is-size-5 has-text-weight-bold mb-0">Puerto Montt</h1>
          <hr class="bg-primero mt-2" />

          <div class="columns">
            <div class="column">
              <div class="columns is-mobile is-gapless">
                <div class="column is-narrow mr-2">x</div>
                <div class="column">
                  <strong>Dirección</strong><br />
                  Pedro Aguirre Cerda #786
                </div>
              </div>
              <div class="columns is-mobile is-gapless">
                <div class="column is-narrow mr-2">x</div>
                <div class="column content">
                  <strong>Ver mapa:</strong><br />
                  <a href="#">Google Maps</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <SucursalesHome titulo="Sucursales"></SucursalesHome> -->
      </div>

      <!-- <div class="columns is-centered mt-4 is-size-6">
        <div class="column is-3">
          <div class="select is-fullwidth">
            <select
              @change="cambioRegion()"
              v-model="region"
              id=""
              class="has-text-weight-bold"
            >
              <option value="">Todos</option>
              <option v-for="(region, index) in regiones" :key="index" :value="region">
                {{ region }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-3">
          <div class="select is-fullwidth">
            <select v-model="comuna" id="" class="has-text-weight-bold">
              <option value="">Todos</option>
              <option v-for="(comuna, index) in comunas" :key="index" :value="comuna">
                {{ comuna }}
              </option>
            </select>
          </div>
        </div>
      </div> -->

      <!-- <div class="columns is-centered is-gapless">
        <div class="column is-11">
          <div class="listado-sucursales">
            <div class="columns is-multiline is-mobile ">
              <div
                class="column is-4-fullhd is-6-desktop is-12-mobile"
                v-for="sucursal in sucursalesFiltradas"
                :key="sucursal.id"
              >
                <div class="card p-4 pb-0">
                  <div class="contenido">
                    <h4 class="primero">{{ sucursal.nombre }}</h4>
                    <figure class="image is-16by9 mt-3">
                      <iframe
                        class="has-ratio"
                        width="640"
                        height="360"
                        :src="urlIframe(sucursal)"
                        frameborder="0"
                        allowfullscreen
                      ></iframe>
                    </figure>
                    <div class="datos-contacto content mt-4">
                      <b>Dirección:</b> {{ sucursal.detalle.direccion }}<br />
                      <b>Teléfono Celular:</b>
                      {{ sucursal.detalle.telefono_celular }}<br />
                      <b>Teléfono Fijo:</b> {{ sucursal.detalle.telefono_fijo }}
                    </div>
                  </div>
                  <div class="links has-text-right mt-4">
                    <a target="_blank" :href="urlGoogle(sucursal)" class="mr-4"
                      ><img src="/img/google-maps.png" alt=""
                    /></a>
                    <a target="_blank" :href="urlWaze(sucursal)" class="mr-4"
                      ><img src="/img/waze.png" alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
  <Seo
    v-if="!cargando && data.hasOwnProperty('yoast_head_json')"
    :data_api="data.yoast_head_json"
  ></Seo>
</template>

<script>
import BannerSeccion from "../components/general/BannerSeccion.vue";
import SucursalesHome from "/src/components/home/SucursalesHome.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import Seo from "/src/components/general/Seo.vue";
export default {
  components: {
    BannerSeccion,
    SucursalesHome,
    CargandoSeccion,
    Seo,
  },
  data() {
    return {
      data: {},
      cargando: true,
      sucursal_actual: 1,
      sucursales: {},
      regionSeleccionada: "",
      comunaSeleccionada: "",
      regiones_comunas: {},
    };
  },
  async mounted() {
    /** OBTENER INFORMACIÓN DE LA PAGINA */
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_SUCURSALES
    );
    if (respuesta) {
      this.data = respuesta.data;

      if (this.data.title.rendered) document.title = this.data.title.rendered;
    }
    /** LUEGO OBTENER EL LISTADO DE SUCURSALES */
    this.obtenerSucursales();
  },
  computed: {
    regiones() {
      return this.regiones_comunas.filter((region) => region.parent == 0);
    },
    comunas() {
      if (!this.regionSeleccionada) return [];

      return this.regiones_comunas.filter(
        (comuna) => comuna.parent == this.regionSeleccionada
      );
    },
  },
  methods: {
    /** OBTENER LISTADO DE SUCURSALES */
    async obtenerSucursales() {
      const respuesta = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_SECCION_SUCURSALES_LISTADO
      );
      this.sucursales = respuesta.data.sucursales;
      this.regiones_comunas = respuesta.data.regiones_comunas;

      this.cargando = false;

      console.log(this.sucursales, this.regiones_comunas);
    },
    /** GENERAR URL DE GOOGLE MAPS */
    urlGoogle: function (sucursal) {
      return (
        "https://maps.google.com/maps?q=" +
        sucursal.acf.coordenadas_sucursal.latitud +
        "," +
        sucursal.acf.coordenadas_sucursal.longitud +
        "&t=&z=14&ie=UTF8&iwloc="
      );
    },
    /** GENERAR URL DE WAZE */
    urlWaze: function (sucursal) {
      return (
        "https://waze.com/ul?q=ecomas " +
        encodeURIComponent(sucursal.acf.direccion) +
        ", " +
        sucursal.post_title
      );
    },
  },
};
</script>
