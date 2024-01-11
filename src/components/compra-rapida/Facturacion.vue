<template>
  <div class="datos-facturacion block">
    <div class="columns is-variable is-2-desktop is-3-mobile">
      <div class="column py-0">
        <InputBase
          label="Rut Empresa"
          placeHolder="ej:76666666-0"
          type="text"
          inputClass="input input-2 rut"
          labelClass="primero"
          :error="false"
          v-model="dataFormularioFacturacion.rut"
          ref="rut"
          v-on:focusout="formatearRut($event)"
        />
      </div>
      <div class="column is-hidden-tablet"></div>
      <div class="column py-0">
        <InputBase
          label="Razon Social"
          placeHolder="ej:Transportinos Ltda"
          type="text"
          inputClass="input input-2"
          labelClass="primero"
          :error="false"
          v-model="dataFormularioFacturacion.razon_social"
        />
      </div>
    </div>

    <InputBase
      label="Giro"
      placeHolder="ej: Transporte y Carga"
      type="text"
      :error="false"
      max="40"
      inputClass="input input-2"
      labelClass="primero"
      v-model="dataFormularioFacturacion.giro"
    />

    <div class="columns is-variable is-2-desktop is-3-mobile">
      <div class="column py-0">
        <InputBase
          label="Nombre"
          placeHolder="ej:Pedro"
          type="text"
          inputClass="input input-2"
          labelClass="primero"
          :error="false"
          v-model="dataFormularioFacturacion.nombre"
        />
      </div>
      <div class="column is-hidden-tablet"></div>
      <div class="column py-0">
        <InputBase
          label="Apellidos"
          placeHolder="ej:Perez"
          type="text"
          :error="false"
          inputClass="input input-2"
          labelClass="primero"
          v-model="dataFormularioFacturacion.apellidos"
        />
      </div>
    </div>

    <div class="columns is-variable is-2-desktop is-3-mobile">
      <div class="column py-0">
        <div class="field">
          <label for="" class="primero">Dirección</label>

          <GoogleMapsAutocompleteVue2
            v-if="libreriaCargada"
            id="direccion_google2"
            :country="['cl']"
            classname="input input-2"
            :class="{ 'is-danger': dataFormularioFacturacion.direccion.error }"
            placeholder="Ingresar Dirección"
            v-on:placechanged="obtenerDireccionFacturacion"
            key="map2"
          >
          </GoogleMapsAutocompleteVue2>

          <div
            v-if="dataFormularioFacturacion.direccion.data.direccionCompleta"
            class="is-size-7 mt-2"
          >
            Dirección Seleccionada:
            <b>{{ direccionCompletaFacturacion }}</b>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-variable is-2-desktop is-3-mobile">
      <div class="column py-0">
        <div class="field">
          <label for="" class="primero">Teléfono Móvil</label>
          <div class="control">
            <input
              class="input input-2"
              placeHolder="ej:+56912345678"
              type="text"
              v-model="dataFormularioFacturacion.telefono.data"
              maxlength="12"
              :class="[{ 'is-danger': dataFormularioFacturacion.telefono.error }]"
              @keypress="validarInputTelefono"
              @focus="moverCursor"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "/src/assets/libs/jquery.Rut.min.js";
import helpers from "../../utils/helpers";
import InputBase from "../formulario/InputBase.vue";
import GoogleMapsAutocompleteVue2 from "../general/GoogleMapsAutocomplete.vue";
import RegionesYComunas from "../../utils/regionesComunas";
import { useCarroCompraStore } from "/src/stores/carroCompra";
export default {
  props: ["dataFormularioFacturacion"],
  data() {
    return {
      libreriaCargada: false,
      storeCarroCompra: useCarroCompraStore(),
    };
  },
  async mounted() {
    /** IMPORTAR LIBRERIA GOOGLE MAPS PARA EL AUTOCOMPLETE DE LAS DIRECCIONES */
    await helpers.importarLibereriaGoogleMaps();
    this.libreriaCargada = true;
  },
  updated() {
    $(".rut").Rut({ format_on: "keyup" });
  },
  computed: {
    /** DEVUELVE DIRECCIÓN COMPLETA PARA AGREGAR AGREGANDO CIUDAD Y PAIS SI EXISTEN */
    direccionCompletaFacturacion() {
      let direccion = this.dataFormularioFacturacion.direccion.data.direccionCompleta;
      if (this.dataFormularioFacturacion.direccion.data.ciudad)
        direccion += ", " + this.dataFormularioFacturacion.direccion.data.ciudad;
      if (this.dataFormularioFacturacion.direccion.data.pais)
        direccion += ", " + this.dataFormularioFacturacion.direccion.data.pais;
      return direccion;
    },
  },
  methods: {
    formatearRut(input) {
      this.dataFormularioFacturacion.rut.data = $(".rut").val();
    },
    obtenerDireccionFacturacion(data) {
      const region = RegionesYComunas.find((region) => {
        return region.name == data.administrative_area_level_1;
      });

      const direccion = {
        region: region.region_iso_3166_2 ?? data.administrative_area_level_1,
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

      this.dataFormularioFacturacion.direccion.data = direccion;
    },
  },
  components: {
    InputBase,
    GoogleMapsAutocompleteVue2,
  },
};
</script>
