<template>
  <main class="quienes-somos">
    <div class="wrapper">
      <BannerSeccion titulo="Sucursales" imagen="/img/banner-sucursales.jpg" />

      <div class="columns is-centered mt-4 is-size-6">
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
        <!-- <div class="column is-2">
          <button class="button bg-primero has-text-white is-fullwidth">
            BUSCAR
          </button>
        </div> -->
      </div>

      <div class="columns is-centered is-gapless">
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
      </div>
    </div>
  </main>
</template>

<script>
import BannerSeccion from "../components/general/BannerSeccion.vue";

export default {
  components: {
    BannerSeccion,
  },
  data() {
    return {
      region: "",
      comuna: "",
      sucursales: [
        {
          id: 1,
          region: "O'Higgins",
          nombre: "Rancagua",
          detalle: {
            direccion: "Javiera Carrera #1085 Local 2 Villa Caren",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 2,
          region: "Ñuble",
          nombre: "Chillán",
          detalle: {
            direccion: "Avda. Ecuador #852",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 3,
          region: "Bíobio",
          nombre: "Concepción",
          detalle: {
            direccion: "Pedro Aguirre Cerda #786",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 4,
          nombre: "Los Angeles",
          region: "Bíobio",
          detalle: {
            direccion: "Avda. Las Industrias #1245",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 5,
          nombre: "Temuco",
          region: "La Araucanía",
          detalle: {
            direccion: "Avenida San Martín #0301",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 6,
          nombre: "Valdivia",
          region: "Los Ríos",
          detalle: {
            direccion: "Carlos Anwandter #782",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 7,
          nombre: "Osorno",
          region: "Los Lagos",
          detalle: {
            direccion: "Ramón Freire #303",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
        {
          id: 8,
          nombre: "Puerto Montt",
          region: "Los Lagos",
          detalle: {
            direccion: "Avda. Presidente Ibáñez #296",
            telefono_fijo: "+56 9 9448 8926",
            telefono_celular: "7 2241 8453",
          },
        },
      ],
    };
  },
  computed: {
    regiones() {
      let array_regiones = [];
      this.sucursales.forEach((element) => {
        array_regiones.push(element.region);
      });
      return [...new Set(array_regiones)];
    },
    comunas() {
      let comunas = [];
      this.sucursales.forEach((element) => {
        if (this.region) {
          if (element.region == this.region) {
            comunas.push(element.nombre);
          }
        } else comunas.push(element.nombre);
      });

      return [...new Set(comunas)];
    },
    sucursalesFiltradas() {
      return this.sucursales.filter((sucursal) => {
        if (this.comuna) return sucursal.nombre == this.comuna;
        else if (this.region) return sucursal.region == this.region;
        else return true;
      });
    },
  },
  methods: {
    cambioRegion() {
      this.comuna = "";
    },
    urlGoogle: function (sucursal) {
      return (
        "https://maps.google.com/maps?q=ecomas " +
        encodeURIComponent(sucursal.detalle.direccion) +
        ", " +
        sucursal.nombre +
        "&t=&z=13&ie=UTF8&iwloc="
      );
    },
    urlWaze: function (sucursal) {
      return (
        "https://waze.com/ul?q=ecomas " +
        encodeURIComponent(sucursal.detalle.direccion) +
        ", " +
        sucursal.nombre
      );
    },
    urlIframe: function (sucursal) {
      return (
        "https://maps.google.com/maps?q=ecomas " +
        encodeURIComponent(sucursal.detalle.direccion) +
        ", " +
        sucursal.nombre +
        "&z=13&output=embed"
      );
    },
  },
};
</script>
