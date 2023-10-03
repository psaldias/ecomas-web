<template>
  <transition name="modal">
    <div
      class="toplayer toplayer-direccion"
      v-if="mostrarToplayer"
      @click.self="cerrar($event)"
    >
      <div class="toplayer_content card p-4">
        <h3 class="primero is-size-5 px-2">Ingresar Dirección Manual</h3>

        <div class="px-2">
          <article class="message is-danger my-2 is-small" v-if="error">
            <div class="message-body">
              {{ error }}
            </div>
          </article>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="">Región</label>
              <input
                type="text"
                class="input"
                :value="this.region.name"
                readonly
                disabled
              />
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label>Comuna</label>
              <input
                type="text"
                class="input"
                :value="this.comuna.name"
                readonly
                disabled
              />
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="">Dirección</label>
              <input
                type="text"
                class="input disabled"
                v-model="direccion.calle"
                maxlength="100"
                readonly
              />
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label>Número</label>
              <input
                type="text"
                class="input disabled"
                v-model="direccion.numero"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label for="">Comentario</label>
              <input type="text" class="input" v-model="comentario_direccion" />
            </div>
          </div>
        </div>

        <div class="block">
          <div id="mapPicker" ref="mapPicker" style="height: 200px"></div>
        </div>

        <div class="block has-text-right-tablet mt-5 px-2">
          <a
            class="button is-rounded is-small button-icono px-5 mr-3 bg-gris3"
            @click.prevent="this.storeCarroCompra.direccion_manual(false)"
          >
            Cerrar
          </a>
          <a
            class="button is-rounded is-small button-icono px-5"
            @click.prevent="validarDireccion"
          >
            Continuar
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import Mensajes from "../../general/Mensajes.vue";
import helpers from "../../../utils/helpers.js";
export default {
  components: {
    Mensajes,
  },
  data() {
    return {
      error: false,
      storeCarroCompra: useCarroCompraStore(),
      comentario_direccion: "",
      direccion: {
        calle: "",
        ciudad: "",
        comuna: "",
        direccionCompleta: "",
        latitud: 0,
        longitud: 0,
        numero: "",
        pais: "Chile",
        region: "CL-BI",
      },
      ADDRESS_COMPONENTS: {
        plus_code: "long_name",
        subpremise: "short_name",
        street_number: "short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        administrative_area_level_2: "long_name",
        administrative_area_level_3: "long_name",
        country: "long_name",
        postal_code: "short_name",
      },
    };
  },
  computed: {
    /** obtener desde el store del carro de compras si se debe mostrar o no este componente (toplayer) */
    mostrarToplayer() {
      return this.storeCarroCompra.direccionManual.mostrar;
    },
    /** obtener todas las ubicaciones desde el store */
    ubicaciones() {
      return this.store_opciones_generales.ubicaciones_sucursales ?? false;
    },
    /** obte er todas las regiones desde el store */
    regiones() {
      let regiones = false;
      if (this.ubicaciones) {
        regiones = this.ubicaciones.filter((ubicacion) => ubicacion.parent == 0);
      }
      return regiones;
    },
    /** obtener sucursal seleccionada por cliente desde el store */
    sucursal() {
      return this.store_opciones_generales.sucursal_seleccionada;
    },
    /** obtener la comuna de la sucursal seleccionada */
    comuna() {
      return this.sucursal.regiones_comunas.find(
        (comuna) => comuna.term_id == localStorage.sucursalSeleccionada
      );
    },
    /** obtener la region de la sucursal seleccionada */
    region() {
      return this.regiones.find((region) => {
        return region.term_id == this.comuna.parent;
      });
    },
  },
  async mounted() {
    /** IMPORTAR LIBRERIA GOOGLE MAPS PARA EL AUTOCOMPLETE DE LAS DIRECCIONES */
    await helpers.importarLibereriaGoogleMaps();

    /** setear comuna y regino dependiendo de la sucursal seleccionada */
    this.direccion.comuna = this.comuna.name;
    this.direccion.region = this.region.description;

    var location = new google.maps.LatLng(
      this.sucursal.fields.coordenadas_sucursal.latitud,
      this.sucursal.fields.coordenadas_sucursal.longitud
    );

    var latLng = new google.maps.LatLng({
      lat: parseFloat(this.sucursal.fields.coordenadas_sucursal.latitud),
      lng: parseFloat(this.sucursal.fields.coordenadas_sucursal.longitud),
    });

    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.Circle({
        center: latLng,
        radius: parseInt(
          this.store_opciones_generales.restricciones_sucursales.radio_permitido
        ),
      }).getBounds()
    );

    var mapProperty = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      restriction: {
        latLngBounds: defaultBounds,
      },
    };

    var map = new google.maps.Map(this.$refs.mapPicker, mapProperty);

    var marker = new google.maps.Marker({
      map: map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: location,
    });

    this.geocodePosition(marker.getPosition());

    const context = this;
    google.maps.event.addListener(marker, "dragend", function () {
      map.setCenter(marker.getPosition());
      context.geocodePosition(marker.getPosition());
    });
  },
  methods: {
    /** OBTENER LA POSICIÓN DEL MARCADOR Y HACER ALGO CON ELLA */
    geocodePosition(pos) {
      const context = this;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          latLng: pos,
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const data = context.formatResult(results[0]);
            // console.log(data);

            context.direccion = {
              region: data.administrative_area_level_1,
              ciudad:
                data.administrative_area_level_3 ?? data.administrative_area_level_2,
              comuna: data.locality,
              pais: data.country,
              latitud: data.latitude,
              longitud: data.longitude,
              calle: data.route ?? data.plus_code,
              numero: data.street_number ?? "",
              direccionCompleta: "",
            };

            if (context.direccion.calle)
              context.direccion.direccionCompleta += context.direccion.calle;
            if (context.direccion.numero && context.direccion.numero != 0)
              context.direccion.direccionCompleta += " " + context.direccion.numero;
          }
        }
      );
    },
    /**
     * FORMATEAR RESULTADO DE google APIs
     * @param place
     * @returns {{formatted output}}
     */
    formatResult(place) {
      // console.log(place);
      let returnData = {};
      for (let i = 0; i < place.address_components.length; i++) {
        let addressType = place.address_components[i].types[0];

        if (this.ADDRESS_COMPONENTS[addressType]) {
          let val = place.address_components[i][this.ADDRESS_COMPONENTS[addressType]];
          returnData[addressType] = val;
        }
      }

      returnData["latitude"] = place.geometry.location.lat();
      returnData["longitude"] = place.geometry.location.lng();
      return returnData;
    },
    /** crea string con el formato de dirección completa */
    direccionCompleta() {
      let direccion = this.direccion.calle;
      if (this.direccion.numero) direccion += " " + this.direccion.numero;

      return direccion;
    },
    /** función para cerrar el toplyar */
    cerrar(event) {
      event.stopPropagation();
      this.storeCarroCompra.direccion_manual(false);
    },
    /** función que valida el formulario */
    validarDireccion() {
      this.error = false;
      /*** si no se indica la calle no puede continuar */
      if (!this.direccion.calle || this.direccion.calle == "") {
        this.error = "Debes Ingresar una dirección.";
        return false;
      }

      /*** si no se indica la calle no puede continuar */
      if (!this.direccion.numero || this.direccion.numero == "") {
        this.error = "Debes Ingresar una dirección con número.";
        return false;
      }
      /** seteamos valores en objeto final de dirección */
      this.direccion.comuna = this.direccion.ciudad = this.comuna.name;
      this.direccion.direccionCompleta = this.direccionCompleta();
      this.direccion.latitud = this.direccion.latitud;
      this.direccion.longitud = this.direccion.longitud;
      /** emite dirección y comentario a componente padre */
      this.$emit("direccionManual", {
        direccion: this.direccion,
        comentario_direccion: this.comentario_direccion,
      });
      /** se cierra el componente (toplayer) */
      this.storeCarroCompra.direccion_manual(false);

      //   if (this.tipoCompra() == "compra-rapida") {
      //     this.storeCarroCompra.actualizarCompraRapida(this.direccion, "direccion");

      //     this.storeCarroCompra.actualizarCompraRapida(
      //       this.comentario_direccion,
      //       "comentario_direccion"
      //     );
      //   }
    },
  },
};
</script>
