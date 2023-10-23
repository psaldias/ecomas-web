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
                <div class="column is-6-tablet is-12-mobile">
                  <div class="field">
                    <div class="control">
                      <div class="select is-fullwidth">
                        <select
                          v-model="regionSeleccionada"
                          @change="
                            comunaSeleccionada = '';
                            tipoSeleccionado = '';
                          "
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
              </div>
            </div>

            <div class="columns is-centered">
              <div
                class="column is-6 border-right-sucursales"
                v-if="comunasTienda.length > 0"
              >
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
                            Tienda Venta Directa y Online
                          </h3>
                          <h4
                            class="primero has-text-weight-normal has-text-centered is-size-6"
                          >
                            Pellet • Estufas • Calderas
                          </h4>
                        </div>
                      </div>

                      <div class="columns is-multiline is-variable is-2 is-centered">
                        <div class="column is-6 py-1" v-for="comuna in comunasTienda">
                          <a
                            class="button button-icono is-fullwidth"
                            :class="{
                              'bg-gris2':
                                comuna.term_id != comunaSeleccionada ||
                                tipoSeleccionado != 'tienda-venta-directa',
                            }"
                            @click.prevent="
                              comunaSeleccionada = comuna.term_id;
                              tipoSeleccionado = 'tienda-venta-directa';
                            "
                            >{{ comuna.name }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-6" v-if="comunasOnline.length > 0">
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
                          <h4
                            class="primero has-text-weight-normal has-text-centered is-size-6"
                          >
                            Pellet • Estufas • Calderas
                          </h4>
                        </div>
                      </div>
                      <div class="columns is-multiline is-variable is-2 is-centered">
                        <div class="column is-6 py-1" v-for="comuna in comunasOnline">
                          <a
                            class="button button-icono is-fullwidth"
                            :class="{
                              'bg-gris2':
                                comuna.term_id != comunaSeleccionada ||
                                tipoSeleccionado != 'pedidos-online',
                            }"
                            @click.prevent="
                              comunaSeleccionada = comuna.term_id;
                              tipoSeleccionado = 'pedidos-online';
                            "
                            >{{ comuna.name }}</a
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
        <div class="sucursales mt-6" v-if="regionSeleccionada">
          <h1 class="is-size-5 has-text-weight-bold mb-0">{{ region.name }}</h1>
          <hr class="bg-primero mt-2" />
          <div v-if="sucursalesRegion.length == 0">No hay sucursales</div>

          <div class="sucursal" v-for="sucursal in sucursalesRegion" :key="sucursal.ID">
            <div class="columns">
              <div class="column item-sucursal is-3">
                <div
                  class="columns is-mobile is-gapless"
                  v-if="sucursal.acf.direccion && esVentaDirecta(sucursal)"
                >
                  <div class="column is-narrow mr-2">
                    <img src="/img/direccion.png" alt="Dirección" class="mt-1" />
                  </div>
                  <div class="column">
                    <strong>Dirección</strong>
                    <div class="gris3 content">{{ sucursal.acf.direccion }}</div>
                  </div>
                </div>

                <div
                  class="columns is-mobile is-gapless"
                  v-if="!esVentaDirecta(sucursal)"
                >
                  <div class="column is-narrow mr-2">
                    <img src="/img/direccion.png" alt="Dirección" class="mt-1" />
                  </div>
                  <div class="column">
                    <strong>
                      <span v-for="(comuna, index) in sucursal.regiones_comunas" class="">
                        {{ obtenerComuna(comuna).name
                        }}{{ index + 1 < sucursal.regiones_comunas.length ? ", " : "" }}
                      </span>
                    </strong>
                  </div>
                </div>
                <div class="columns is-mobile is-gapless">
                  <div class="column is-narrow mr-2">
                    <img src="/img/mapa.png" alt="Ver mapa" class="mt-1" />
                  </div>
                  <div class="column content">
                    <strong>Ver mapa:</strong>

                    <div
                      class="is-flex gris3"
                      v-if="
                        sucursal.acf.coordenadas_sucursal.latitud &&
                        sucursal.acf.coordenadas_sucursal.longitud
                      "
                    >
                      <div class="mr-2">
                        <a :href="urlGoogle(sucursal)" target="_blank">Google maps</a>
                      </div>
                      <div class="">
                        <img src="/img/google.png" alt="Google" />
                      </div>
                    </div>
                    <div class="is-flex gris3">
                      <div class="mr-2">
                        <a :href="urlWaze(sucursal)" target="_blank">Waze</a>
                      </div>
                      <div class="">
                        <img src="/img/waze-2.png" alt="Google" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="column item-sucursal is-3"
                v-if="sucursal.acf.telefono || sucursal.acf.horario"
              >
                <div class="columns is-mobile is-gapless">
                  <div class="column is-narrow mr-2">
                    <img src="/img/horario.png" alt="Horario" class="mt-1" />
                  </div>
                  <div class="column">
                    <strong>Horario y Teléfono:</strong><br />
                    <div
                      class="content gris3"
                      v-if="sucursal.acf.horario"
                      v-html="sucursal.acf.horario"
                    ></div>
                  </div>
                </div>
                <div class="columns is-mobile is-gapless" v-if="sucursal.acf.telefono">
                  <div class="column is-narrow mr-2">
                    <img src="/img/telefono.png" alt="Teléfono" class="mt-1" />
                  </div>
                  <div class="column content gris3">
                    <a :href="'tel:' + sucursal.acf.telefono"
                      ><strong>{{ sucursal.acf.telefono }}</strong></a
                    >
                  </div>
                </div>
              </div>

              <div
                class="column is-3 item-sucursal"
                v-if="sucursal.acf.cobertura_despacho"
              >
                <div class="columns is-mobile is-gapless">
                  <div class="column is-narrow mr-2">
                    <img
                      src="/img/cobertura-despacho.png"
                      alt="Cobertura Despacho"
                      class="mt-1"
                    />
                  </div>
                  <div class="column">
                    <strong>Cobertura despacho:</strong><br />
                    <div
                      class="content gris3"
                      v-html="sucursal.acf.cobertura_despacho"
                    ></div>
                  </div>
                </div>
              </div>

              <div
                class="column is-narrow item-sucursal"
                v-if="
                  sucursal.acf.despacho_a_domicilio?.estado ||
                  sucursal.acf.retiro_en_tienda
                "
              >
                <div class="columns is-mobile is-gapless">
                  <div class="column is-narrow mr-2">
                    <img src="/img/servicios.png" alt="Servicios" class="mt-1" />
                  </div>
                  <div class="column">
                    <strong>Servicios:</strong><br />
                    <div
                      class="tags are-medium mb-2 mt-2"
                      v-if="sucursal.acf.despacho_a_domicilio?.estado"
                    >
                      <span class="tag"
                        ><img
                          src="/img/despacho-domicilio.png"
                          alt="Despacho a domicilio"
                          class="mr-1"
                        />
                        Despacho a domicilio
                      </span>
                      <span
                        class="tag"
                        v-if="sucursal.acf.despacho_a_domicilio?.tiempo_de_despacho"
                        >{{ sucursal.acf.despacho_a_domicilio.tiempo_de_despacho }}</span
                      >
                    </div>
                    <div class="tags are-medium" v-if="sucursal.acf.retiro_en_tienda">
                      <span class="tag">
                        <img
                          src="/img/retiro-tienda.png"
                          alt="Retiro en tienda"
                          class="mr-1"
                        />
                        Retiro en tienda
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
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
      tipoSeleccionado: "",
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
    region() {
      return this.regiones_comunas.find(
        (region) => region.term_id == this.regionSeleccionada
      );
    },
    sucursalesRegion() {
      /** SI NO HAY REGIÓN DEVUELVE ARRAY VACIÓ */
      if (!this.regionSeleccionada) return [];
      /** SI HAY UNA REGIÓN SELECCIONADA, BUSCA LAS SUCURSALES ASOCIADAS A ESA REGIÓN / COMUNA DE LA REGIÓN */
      let idsComunas = this.idsComunas();
      /** RECORRER SUCURSALES PARA BUSCAR LAS QUE PERTENEZCAN A LOS IDS DE COMUNAS */
      return this.filtrarSucursales(idsComunas, this.tipoSeleccionado);
    },

    comunasOnline() {
      /** SI HAY UNA REGIÓN SELECCIONADA, BUSCA LAS SUCURSALES ASOCIADAS A ESA REGIÓN / COMUNA DE LA REGIÓN */
      let idsComunas = this.idsComunas();
      return this.comunas.filter((comuna) => {
        const sucursales = this.filtrarSucursales([comuna.term_id], "pedidos-online");
        return sucursales.length > 0;
      });
    },
    comunasTienda() {
      /** SI HAY UNA REGIÓN SELECCIONADA, BUSCA LAS SUCURSALES ASOCIADAS A ESA REGIÓN / COMUNA DE LA REGIÓN */
      let idsComunas = this.idsComunas();
      return this.comunas.filter((comuna) => {
        const sucursales = this.filtrarSucursales(
          [comuna.term_id],
          "tienda-venta-directa"
        );
        return sucursales.length > 0;
      });
    },
  },
  methods: {
    // VALIDA SI LA SUCURSAL ES VENTA DIRECTA O VENTA ONLINE PARA DETERMINAR SI SE MUESTRA O NO LA DIRECCIÓN Y MAPA
    esVentaDirecta(sucursal) {
      return sucursal.tipo_sucursales.find((tipo) => tipo.slug == "tienda-venta-directa");
    },
    /** CREAR ARRAY CON LOS IDS DE COMUNAS DONDE PODRIAN ESTAR LAS SUCURSALES */
    idsComunas() {
      let idsComunas = [];
      if (this.comunaSeleccionada) {
        idsComunas.push(this.comunaSeleccionada);
      } else if (this.comunas) {
        this.comunas.forEach((comuna) => {
          idsComunas.push(comuna.term_id);
        });
      }
      return idsComunas;
    },
    /** RECORRER SUCURSALES PARA BUSCAR LAS QUE PERTENEZCAN A LOS IDS DE COMUNAS y/o al tipo seleccionado*/
    filtrarSucursales(comunas, tipoSucursal = false) {
      return this.sucursales.filter((sucursal) => {
        const filteredArray = sucursal.regiones_comunas.filter((region_comuna) =>
          comunas.includes(region_comuna)
        );

        if (filteredArray.length > 0) {
          if (!tipoSucursal) return true;
          else {
            return sucursal.tipo_sucursales.find((tipo) => tipo.slug == tipoSucursal);
          }
        } else {
          return false;
        }
      });
    },
    /** OBTENER LISTADO DE SUCURSALES */
    async obtenerSucursales() {
      const respuesta = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_SECCION_SUCURSALES_LISTADO
      );
      this.sucursales = respuesta.data.sucursales;
      this.regiones_comunas = respuesta.data.regiones_comunas;
      this.regionSeleccionada = this.regiones[0].term_id;

      this.cargando = false;
    },
    obtenerComuna(id) {
      return this.regiones_comunas.find((comuna) => comuna.term_id == id);
    },
    /** ACCIÓN BOTON BUSCAR DEL FILTRO POR REGIÓN */
    async filtrarPorRegion() {},
    /** GENERAR URL DE GOOGLE MAPS */
    urlGoogle: function (sucursal) {
      return (
        "https://maps.google.com/maps/search/ecomas " + sucursal.acf.direccion
        // "/@" +
        // sucursal.acf.coordenadas_sucursal.latitud +
        // "," +
        // sucursal.acf.coordenadas_sucursal.longitud

        // "&t=&z=14&ie=UTF8&iwloc="
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
