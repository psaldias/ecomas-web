<template>
  <main class="distribuidores">
    <div class="wrapper">
      <BannerSeccion titulo="Distribuidores" imagen="/img/banner-distribuidores.jpg" />

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

      <div class="columns is-centered">
        <div class="column is-11">
          <div class="listado-sucursales">
            <div class="columns is-multiline is-mobile">
              <div
                class="column is-4-fullhd is-6-desktop"
                v-for="(distribuidor,index) in distribuidoresFiltrados"
                :key="index"
              >
                <div class="card p-4 pb-0">
                  <div class="contenido">
                    <h4 class="primero">{{ distribuidor.nombre }}</h4>
                    <div class="datos-contacto content mt-4">
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-location-dot is-size-7"></i>
                            </div>
                            <div class="column">
                                <b class="primero"> {{ distribuidor.comuna }}</b>
                            </div>
                        </div>
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-phone-volume is-size-7"></i>
                            </div>
                            <div class="column">
                                <b>Fono:</b> {{ distribuidor.telefono }}
                            </div>
                        </div>
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-house-chimney is-size-7"></i>
                            </div>
                            <div class="column">
                                <b>Dirección:</b> {{ distribuidor.direccion }}
                            </div>
                        </div>
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-envelope is-size-7"></i>
                            </div>
                            <div class="column">
                                <b>Correo:</b> {{ distribuidor.correo }}
                            </div>
                        </div>
                    </div>
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
      distribuidores: [
        {
          region: "Bíobio",
          comuna: "Hualpen",
          nombre: "ROBERTO HERNANDEZ",
          telefono: "+56 9 7994 4880",
          direccion: "Los Zorzales 8034-2, Hualpén.",
          correo: "rhernandez@gmail.com",
        },
        {
          region: "Temuco",
          comuna: "Temuco",
          nombre: "La Sierra",
          telefono: "+56 9 7994 4880",
          direccion: "Los Jinetes 35-B, Temuco.",
          correo: "contacto@lasierra.com",
        },
        {
          region: "Bíobio",
          comuna: "Penco",
          nombre: "ENOGAS",
          telefono: "+56 9 7994 4880",
          direccion: "Los Zorzales 8034-2, Penco.",
          correo: "contacto@enogas.com",
        },
        {
          region: "Rancagua",
          comuna: "Hualpen",
          nombre: "ROBERTO HERNANDEZ",
          telefono: "+56 9 7994 4880",
          direccion: "Los Zorzales 8034-2, Hualpén.",
          correo: "rhernandez@gmail.com",
        },
      ],
    };
  },
  computed: {
    regiones() {
      let array_regiones = [];
      this.distribuidores.forEach((element) => {
        array_regiones.push(element.region);
      });
      return [...new Set(array_regiones)];
    },
    comunas() {
      let comunas = [];
      this.distribuidores.forEach((element) => {
        if (this.region) {
          if (element.region == this.region) {
            comunas.push(element.comuna);
          }
        } else comunas.push(element.comuna);
      });

      return [...new Set(comunas)];
    },
    distribuidoresFiltrados() {
      return this.distribuidores.filter((distribuidor) => {
        if (this.comuna) return distribuidor.comuna == this.comuna;
        else if (this.region) return distribuidor.region == this.region;
        else return true;
      });
    },
  },
  methods: {
    cambioRegion() {
      this.comuna = "";
    },
  },
};
</script>
