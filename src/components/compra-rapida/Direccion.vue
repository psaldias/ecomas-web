<template>
  <div class="columns is-gapless is-centered">
    <div class="column is-6">
      <div class="card card-compra-rapida card-direccion">
        <div class="columns is-vcentered is-mobile">
          <div class="column imagen is-3 pl-0 is-hidden-mobile"></div>
          <div class="column is-1 is-hidden-mobile"></div>
          <div class="column contenido has-text-centered-mobile">
            <h2>Dirección de entrega</h2>
            <h3 class="mb-1">Dirección registrada para próxima entrega:</h3>

            <article class="message is-danger my-2 is-small" v-if="error">
              <div class="message-body">
                {{ error }}
                o ingresa tu dirección de forma manual <br />
                <a @click.prevent="this.storeCarroCompra.direccion_manual(true)"
                  >Ingresar Dirección Manual</a
                >
              </div>
            </article>

            <div class="field columns">
              <GoogleMapsAutocompleteVue
                v-on:placechanged="obtenerDireccion"
                :country="['cl']"
                id="direccion_google"
                classname="input input-2 w-80"
                placeholder="Ingresar Dirección (Calle, número, ciudad)"
                :latLongBounds="{
                  latLng: gmapsBounds,
                  radius: parseInt(
                    store_opciones_generales.restricciones_sucursales.radio_permitido
                  ),
                }"
                v-if="libreriaCargada"
              ></GoogleMapsAutocompleteVue>
            </div>
            <div v-if="direccionActual" class="is-size-7">
              Dirección Seleccionada: <b>{{ direccionActual }}</b>
            </div>

            <div class="field">
              <div class="control">
                <input
                  class="input input-2 w-80"
                  placeHolder="Casa, departamento o condominio ( información adicional)"
                  type="text"
                  v-model="comentario_direccion"
                />
              </div>
            </div>

            <div class="block has-text-right-tablet mt-5">
              <a
                class="button is-rounded is-small button-icono px-5"
                @click.prevent="validarDireccion()"
              >
                Continuar
              </a>
            </div>
          </div>
        </div>
      </div>
      <DireccionManual @direccion-manual="direccionManual"></DireccionManual>
    </div>
  </div>
</template>

<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import GoogleMapsAutocompleteVue from "../general/GoogleMapsAutocomplete.vue";
import RegionesYComunas from "/src/utils/regionesComunas";
import helpers from "../../utils/helpers";
import DireccionManual from "../productos/producto/DireccionManual.vue";

export default {
  data() {
    return {
      libreriaCargada: false,
      error: "",
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
      comentario_direccion: "",
    };
  },
  async mounted() {
    if (!this.storeCarroCompra.compraRapida.telefono)
      this.$router.push({ path: "/compra-rapida/" });

    /** IMPORTAR LIBRERIA GOOGLE MAPS PARA EL AUTOCOMPLETE DE LAS DIRECCIONES */
    await helpers.importarLibereriaGoogleMaps();
    this.libreriaCargada = true;

    this.comentario_direccion = this.storeCarroCompra.compraRapida.comentario_direccion;
  },
  computed: {
    gmapsBounds() {
      if (typeof this.sucursalSeleccionada.fields.coordenadas_sucursal != "undefined") {
        return {
          lat: parseFloat(this.sucursalSeleccionada.fields.coordenadas_sucursal.latitud),
          lng: parseFloat(this.sucursalSeleccionada.fields.coordenadas_sucursal.longitud),
        };
      }
      return false;
    },
    direccionActual() {
      return !this.storeCarroCompra.compraRapida.direccion
        ? ""
        : this.storeCarroCompra.compraRapida.direccion.direccionCompleta;
    },
    sucursalSeleccionada() {
      return this.store_opciones_generales.sucursal_seleccionada;
    },
  },
  methods: {
    direccionManual(data) {
      this.comentario_direccion = data.comentario_direccion;
      this.storeCarroCompra.actualizarCompraRapida(data.direccion, "direccion");
      this.validarDireccion();
    },
    validarDireccion() {
      if (Object.keys(this.storeCarroCompra.compraRapida.direccion).length === 0) {
        this.error =
          "Formato de la dirección incorrecto, debes ingresar calle y número calle, Ciudad Ej. Paicaví 983, concepción, Chile";
      } else {
        this.storeCarroCompra.actualizarCompraRapida(
          this.comentario_direccion,
          "comentario_direccion"
        );
        this.$router.push({ path: "/compra-rapida/producto" });
      }
      return false;
    },

    obtenerDireccion(data) {
      const region = RegionesYComunas.find((region) => {
        return region.name == data.administrative_area_level_1;
      });
      if (data.street_number == undefined) {
        this.error =
          "Formato de la dirección incorrecto, debes ingresar calle y número calle, Ciudad Ej. Paicaví 983, concepción, Chile";
        return false;
      }

      this.error = "";
      const direccion = {
        region:
          region && region.region_iso_3166_2
            ? region.region_iso_3166_2
            : data.administrative_area_level_1,
        ciudad: data.administrative_area_level_3 ?? data.administrative_area_level_2,
        comuna: data.locality,
        pais: data.country,
        latitud: data.latitude,
        longitud: data.longitude,
        calle: data.route,
        numero: data.street_number ?? "0",
        direccionCompleta: "",
      };

      if (direccion.calle) direccion.direccionCompleta += direccion.calle;
      if (direccion.numero && direccion.numero != 0)
        direccion.direccionCompleta += " " + direccion.numero;
      if (direccion.ciudad) direccion.direccionCompleta += ", " + direccion.ciudad;
      if (direccion.pais) direccion.direccionCompleta += ", " + direccion.pais;

      this.storeCarroCompra.actualizarCompraRapida(direccion, "direccion");
    },
  },
  components: { GoogleMapsAutocompleteVue, DireccionManual },
};
</script>
