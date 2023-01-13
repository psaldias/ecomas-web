<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column">
      <form action="#" @submit.prevent="submitFormulario()">
        <Mensajes :mensajes="mensajes"></Mensajes>
        <div v-html="this.storeCarroCompra.carro.validado.mensajes"></div>
        <article
          class="message is-danger my-2 is-small"
          v-if="dataFormularioDespacho.direccion.error"
        >
          <div class="message-body">
            Formato de la dirección de despacho incorrecto, debes ingresar calle y número
            calle, Ciudad Ej. Paicaví 983, concepción, Chile o ingresa tu dirección de
            forma manual <br />
            <a @click.prevent="this.storeCarroCompra.direccion_manual(true)"
              >Ingresar Dirección Manual</a
            >
          </div>
        </article>
        <div class="columns">
          <div class="column">
            <h4 class="primero mb-4">DIRECCIÓN DE ENVÍO</h4>

            <div class="field">
              <label for="" class="label">Dirección</label>
              <GoogleMapsAutocompleteVue
                v-if="libreriaCargada"
                v-on:placechanged="obtenerDireccionDespacho"
                :class="{ 'is-danger': dataFormularioDespacho.direccion.error }"
                :country="['cl']"
                id="direccion_google"
                classname="input input-2  "
                placeholder="Ingresar Dirección"
                key="map1"
                :latLongBounds="{
                  latLng: gmapsBounds,
                  radius: parseInt(
                    store_opciones_generales.restricciones_sucursales.radio_permitido
                  ),
                }"
              ></GoogleMapsAutocompleteVue>
              <div
                v-if="dataFormularioDespacho.direccion.data.direccionCompleta"
                class="is-size-7 mt-2"
              >
                Dirección Seleccionada:
                <b>{{ dataFormularioDespacho.direccion.data.direccionCompleta }}</b>
              </div>
            </div>

            <div class="field" v-if="libreriaCargada">
              <div class="control">
                <input
                  class="input input-2"
                  placeHolder="Casa Departamento o Condominio "
                  type="text"
                  v-model="dataFormularioDespacho.comentario_direccion.data"
                />
              </div>
            </div>

            <div class="field">
              <label for="" class="label">Teléfono Móvil</label>
              <div class="control">
                <input
                  class="input"
                  placeHolder="ej:+56912345678"
                  type="text"
                  v-model="dataFormularioDespacho.telefono.data"
                  maxlength="12"
                  :class="[{ 'is-danger': dataFormularioDespacho.telefono.error }]"
                  @keypress="validarInputTelefono"
                  @focus="moverCursor"
                />
              </div>
            </div>
          </div>

          <div class="column" v-if="dataCarro.registro.tipoDocumento == 'Factura'">
            <h4 class="primero mb-4">DIRECCIÓN DE FACTURACIÓN</h4>

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <InputBase
                  label="Rut Empresa"
                  placeHolder="ej:76.666.666-0"
                  type="text"
                  :error="false"
                  v-model="dataFormularioFacturacion.rut"
                />
              </div>
              <div class="column is-hidden-tablet"></div>
              <div class="column py-0">
                <InputBase
                  label="Razon Social"
                  placeHolder="ej:Transportinos Ltda"
                  type="text"
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
              v-model="dataFormularioFacturacion.giro"
            />

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <InputBase
                  label="Nombre"
                  placeHolder="ej:Pedro"
                  type="text"
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
                  v-model="dataFormularioFacturacion.apellidos"
                />
              </div>
            </div>

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <div class="field">
                  <label for="" class="label">Dirección</label>

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
                    <b>{{
                      dataFormularioFacturacion.direccion.data.direccionCompleta
                    }}</b>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <div class="field">
                  <label for="" class="label">Teléfono Móvil</label>
                  <div class="control">
                    <input
                      class="input"
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
        </div>

        <div class="columns is-centered">
          <div class="column is-5">
            <button
              type="submit"
              class="button button-icono is-fullwidth"
              v-if="!cargando"
            >
              <b>Continuar</b>
            </button>
            <CargandoSeccion v-if="cargando"></CargandoSeccion>
          </div>
        </div>
      </form>
    </div>
    <div class="column is-4">
      <BoxDespacho></BoxDespacho>
      <BoxTotales></BoxTotales>
    </div>
    <DireccionManual @direccion-manual="direccionManual"></DireccionManual>
  </div>
</template>

<script>
import DireccionManual from "../productos/producto/DireccionManual.vue";
import Mensajes from "/src/components/general/Mensajes.vue";
import BoxDespacho from "./BoxDespacho.vue";
import BoxTotales from "./BoxTotales.vue";
import InputBase from "../formulario/InputBase.vue";
import InputSelect from "../formulario/InputSelect.vue";
import InputCheck from "../formulario/InputCheck.vue";
import GoogleMapsAutocompleteVue from "../general/GoogleMapsAutocomplete.vue";
import GoogleMapsAutocompleteVue2 from "../general/GoogleMapsAutocomplete.vue";
import helpers from "/src/utils/helpers.js";
import RegionesYComunas from "/src/utils/regionesComunas";

import { useCarroCompraStore } from "/src/stores/carroCompra";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import CargandoSeccion from "../general/CargandoSeccion.vue";
export default {
  data() {
    return {
      libreriaCargada: false,
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
      dataFormularioDespacho: {
        direccion: { data: { direccionCompleta: "" }, error: false, requerido: false },
        telefono: { data: "+569", error: false, requerido: true },
        comentario_direccion: { data: "", error: false, requerido: false },
      },
      dataFormularioFacturacion: {
        rut: { data: "", error: false, requerido: true },
        razon_social: { data: "", error: false, requerido: true },
        giro: { data: "", error: false, requerido: true },
        nombre: { data: "", error: false, requerido: true },
        apellidos: { data: "", error: false, requerido: true },
        direccion: { data: { direccionCompleta: "" }, error: false, requerido: false },
        telefono: { data: "+569", error: false, requerido: true },
      },
      mensajes: {
        exito: "",
        error: "",
      },
      cargando: false,
    };
  },
  async mounted() {
    if (!this.storeCarroCompra.carro.data.productos.length) {
      this.$router.push({ path: "/productos" });
      return false;
    }

    /** VALIDAR CARRO */
    this.cargando = true;
    await this.validarCompraNormal();
    this.cargando = false;

    /** IMPORTAR LIBRERIA GOOGLE MAPS PARA EL AUTOCOMPLETE DE LAS DIRECCIONES */
    await helpers.importarLibereriaGoogleMaps();
    this.libreriaCargada = true;

    /** EN CASO DE QUE EL CARRO CONTENGA ERRORES, REDIRECCIONA A /CARRO */
    // if(this.storeCarroCompra.carro.validado.con_errores)
    //   this.$router.replace({ path: '/carro/' });

    this.preLlenarDatos();
  },
  watch: {
    "sucursalSeleccionada.fields.coordenadas_sucursal": {
      handler(newValue, oldValue) {
        this.dataFormularioDespacho.direccion.data.direccionCompleta = "";
      },
      deep: true,
    },
  },
  computed: {
    dataCarro() {
      return this.storeCarroCompra.carro.data;
    },
    gmapsBounds() {
      if (typeof this.sucursalSeleccionada.fields.coordenadas_sucursal != "undefined") {
        return {
          lat: parseFloat(this.sucursalSeleccionada.fields.coordenadas_sucursal.latitud),
          lng: parseFloat(this.sucursalSeleccionada.fields.coordenadas_sucursal.longitud),
        };
      }
      return false;
    },
    urBackEnd() {
      return import.meta.env.VITE_ENDPOINT_BACKEND;
    },
    sucursalSeleccionada() {
      return this.store_opciones_generales.sucursal_seleccionada;
    },
  },
  methods: {
    /** OBTENER INFORMACIÓN DESDE COMPONENTE DIRECCION MANUAL Y COMPLETA LA DIRECCIÓN DE DESPACHO */
    direccionManual(data) {
      this.dataFormularioDespacho.comentario_direccion.data = data.comentario_direccion;
      this.dataFormularioDespacho.direccion.data = data.direccion;
      this.dataFormularioDespacho.direccion.error = false;

      let dataCarro = this.dataCarro;
      dataCarro.despacho = {
        direccion: data.direccion,
        telefono: this.dataFormularioDespacho.telefono.data,
        comentario_direccion: this.dataFormularioDespacho.comentario_direccion.data,
      };
    },
    /** RELLENA LOS DATOS DEL FORMULARIO  SI EXISTE INFORMACIÓN EN LOCALSTORA O SI ES UN USUARIO REGISTRADO TOMA SUS DATOS */
    preLlenarDatos() {
      /** DESPACHO */
      if (this.storeCarroCompra.carro.data.despacho.direccion)
        this.dataFormularioDespacho.direccion.data = this.storeCarroCompra.carro.data.despacho.direccion;

      this.dataFormularioDespacho.telefono.data = this.storeCarroCompra.carro.data
        .despacho.telefono
        ? this.storeCarroCompra.carro.data.despacho.telefono
        : this.storeCarroCompra.usuario
        ? this.storeCarroCompra.usuario.shipping.phone
        : "+569";

      this.dataFormularioDespacho.comentario_direccion.data = this.storeCarroCompra.carro
        .data.despacho.comentario_direccion
        ? this.storeCarroCompra.carro.data.despacho.comentario_direccion
        : "";

      /** FACTURACION */
      if (this.storeCarroCompra.carro.data.registro.tipoDocumento == "Factura") {
        this.dataFormularioFacturacion.rut.data = this.storeCarroCompra.carro.data
          .facturacion.rut
          ? this.storeCarroCompra.carro.data.facturacion.rut
          : this.storeCarroCompra.usuario.billing_direccion_completa
          ? this.storeCarroCompra.usuario.billing_direccion_completa.rut
          : "";
        this.dataFormularioFacturacion.razon_social.data = this.storeCarroCompra.carro
          .data.facturacion.razon_social
          ? this.storeCarroCompra.carro.data.facturacion.razon_social
          : this.storeCarroCompra.usuario.billing_direccion_completa
          ? this.storeCarroCompra.usuario.billing_direccion_completa.razon_social
          : "";
        this.dataFormularioFacturacion.giro.data = this.storeCarroCompra.carro.data
          .facturacion.giro
          ? this.storeCarroCompra.carro.data.facturacion.giro
          : this.storeCarroCompra.usuario.billing_direccion_completa
          ? this.storeCarroCompra.usuario.billing_direccion_completa.giro
          : "";
        this.dataFormularioFacturacion.nombre.data = this.storeCarroCompra.carro.data
          .facturacion.nombre
          ? this.storeCarroCompra.carro.data.facturacion.nombre
          : this.storeCarroCompra.usuario.billing_direccion_completa
          ? this.storeCarroCompra.usuario.billing_direccion_completa.nombre
          : "";
        this.dataFormularioFacturacion.apellidos.data = this.storeCarroCompra.carro.data
          .facturacion.apellidos
          ? this.storeCarroCompra.carro.data.facturacion.apellidos
          : this.storeCarroCompra.usuario.billing_direccion_completa
          ? this.storeCarroCompra.usuario.billing_direccion_completa.apellidos
          : "";
        this.dataFormularioFacturacion.telefono.data = this.storeCarroCompra.carro.data
          .facturacion.telefono
          ? this.storeCarroCompra.carro.data.facturacion.telefono
          : this.storeCarroCompra.usuario.billing_direccion_completa
          ? this.storeCarroCompra.usuario.billing_direccion_completa.telefono
          : "+569";

        if (this.storeCarroCompra.carro.data.facturacion.direccion.direccionCompleta) {
          this.dataFormularioFacturacion.direccion.data = this.storeCarroCompra.carro.data.facturacion.direccion;
        } else if (this.storeCarroCompra.usuario.billing_direccion_completa)
          this.dataFormularioFacturacion.direccion.data = this.storeCarroCompra.usuario.billing_direccion_completa;
      }
    },
    /** OBTIENE LOS DATOS DEL INPUT DIRECCIÓN CON INFORMACIÓN DE GOOGLE */
    obtenerDireccionDespacho(data) {
      /** BUSCA LA REGIÓN EN BD LOCAL DE REGIONES PARA OBTENER EL CÓDIGO ISO */
      // const locality = data.locality.normalize('NFD').replace(/\p{Diacritic}/gu, "");
      // const region = RegionesYComunas.find(region => {
      //   return region.communes.find(comuna => {
      //     var comuna2 = comuna.normalize('NFD').replace(/\p{Diacritic}/gu, "");
      //     console.log(comuna2);
      //     return comuna2 == locality
      //   });
      // });
      const region = RegionesYComunas.find((region) => {
        return region.name == data.administrative_area_level_1;
      });

      // if(data.street_number == undefined){
      //   this.mensajes.error = "Formato de la dirección de despacho incorrecto, debes ingresar calle y número calle, Ciudad Ej. Paicaví 983, concepción, Chile";
      //   return false;
      // }

      this.mensajes.error = "";

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
      if (direccion.ciudad) direccion.direccionCompleta += ", " + direccion.ciudad;
      if (direccion.pais) direccion.direccionCompleta += ", " + direccion.pais;

      this.dataFormularioDespacho.direccion.data = direccion;
      let dataCarro = this.dataCarro;
      dataCarro.despacho = {
        direccion,
        telefono: this.dataFormularioDespacho.telefono.data,
        comentario_direccion: this.dataFormularioDespacho.comentario_direccion.data,
      };

      this.storeCarroCompra.actualizarCarro(dataCarro, "data");
    },

    obtenerDireccionFacturacion(data) {
      // const region = RegionesYComunas.find(region => {
      //   return region.communes.find(comuna => {
      //     var comuna2 = comuna.normalize('NFD').replace(/\p{Diacritic}/gu, "");
      //     return comuna2 == data.locality
      //   });
      // });
      const region = RegionesYComunas.find((region) => {
        return region.name == data.administrative_area_level_1;
      });

      // if(data.street_number == undefined){
      //   this.mensajes.error = "Formato de la dirección de facturación incorrecto, debes ingresar calle y número calle, Ciudad Ej. Paicaví 983, concepción, Chile";
      //   return false;
      // }
      this.mensajes.error = "";

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
      if (direccion.ciudad) direccion.direccionCompleta += ", " + direccion.ciudad;
      if (direccion.pais) direccion.direccionCompleta += ", " + direccion.pais;

      this.dataFormularioFacturacion.direccion.data = direccion;
      let dataCarro = this.dataCarro;
      dataCarro.facturacion = {
        rut: this.dataFormularioFacturacion.rut.data,
        razon_social: this.dataFormularioFacturacion.razon_social.data,
        giro: this.dataFormularioFacturacion.giro.data,
        nombre: this.dataFormularioFacturacion.nombre.data,
        apellidos: this.dataFormularioFacturacion.apellidos.data,
        telefono: this.dataFormularioFacturacion.telefono.data,
        direccion,
      };
      this.storeCarroCompra.actualizarCarro(dataCarro, "data");
    },
    async submitFormulario() {
      this.limpiarMensajes();

      this.cargando = true;
      let errorGeneral = false;
      let dataFormularioPost = {};

      /** VALIDAR DESPACHO */
      if (this.dataFormularioDespacho.direccion.data.direccionCompleta == "") {
        this.dataFormularioDespacho.direccion.error = true;
        errorGeneral = true;
      } else this.dataFormularioDespacho.direccion.error = false;

      if (
        !helpers.validarTelefono(this.dataFormularioDespacho.telefono.data.toString())
      ) {
        this.dataFormularioDespacho.telefono.error = true;
        errorGeneral = true;
      } else this.dataFormularioDespacho.telefono.error = false;

      /** VALIDAR FACTURACION */
      if (this.storeCarroCompra.carro.data.registro.tipoDocumento == "Factura") {
        const rutValido = helpers.validaRut(this.dataFormularioFacturacion.rut.data);
        this.dataFormularioFacturacion.rut.error = !rutValido;
        if (this.dataFormularioFacturacion.rut.error) errorGeneral = true;

        if (
          !this.dataFormularioFacturacion.razon_social.data ||
          this.dataFormularioFacturacion.razon_social.data == ""
        ) {
          this.dataFormularioFacturacion.razon_social.error = true;
          errorGeneral = true;
        } else this.dataFormularioFacturacion.razon_social.error = false;

        if (
          !this.dataFormularioFacturacion.giro.data ||
          this.dataFormularioFacturacion.giro.data == ""
        ) {
          this.dataFormularioFacturacion.giro.error = true;
          errorGeneral = true;
        } else this.dataFormularioFacturacion.giro.error = false;

        if (
          !this.dataFormularioFacturacion.nombre.data ||
          this.dataFormularioFacturacion.nombre.data == ""
        ) {
          this.dataFormularioFacturacion.nombre.error = true;
          errorGeneral = true;
        } else this.dataFormularioFacturacion.nombre.error = false;

        if (
          !this.dataFormularioFacturacion.apellidos.data ||
          this.dataFormularioFacturacion.apellidos.data == ""
        ) {
          this.dataFormularioFacturacion.apellidos.error = true;
          errorGeneral = true;
        } else this.dataFormularioFacturacion.apellidos.error = false;

        if (
          !this.dataFormularioFacturacion.telefono.data ||
          !helpers.validarTelefono(
            this.dataFormularioFacturacion.telefono.data.toString()
          )
        ) {
          this.dataFormularioFacturacion.telefono.error = true;
          errorGeneral = true;
        } else this.dataFormularioFacturacion.telefono.error = false;

        if (this.dataFormularioFacturacion.direccion.data.direccionCompleta == "") {
          this.dataFormularioFacturacion.direccion.error = true;
          errorGeneral = true;
        } else this.dataFormularioFacturacion.direccion.error = false;
      }

      if (!errorGeneral) {
        this.cargando = true;
        let dataCarro = this.storeCarroCompra.carro.data;
        dataCarro.despacho = {
          direccion: this.dataFormularioDespacho.direccion.data,
          telefono: this.dataFormularioDespacho.telefono.data,
          comentario_direccion: this.dataFormularioDespacho.comentario_direccion.data,
        };
        dataCarro.facturacion = {
          rut: this.dataFormularioFacturacion.rut.data,
          razon_social: this.dataFormularioFacturacion.razon_social.data,
          giro: this.dataFormularioFacturacion.giro.data,
          nombre: this.dataFormularioFacturacion.nombre.data,
          apellidos: this.dataFormularioFacturacion.apellidos.data,
          telefono: this.dataFormularioFacturacion.telefono.data,
          direccion: this.dataFormularioFacturacion.direccion.data,
        };

        this.storeCarroCompra.actualizarCarro(dataCarro, "data");
        await this.validarCompraNormal();

        if (!this.storeCarroCompra.carro.validado.con_errores) {
          this.$router.push({ path: "/carro/pago" });
          // this.$refs.form_pago.submit()
          return false;
        } else {
          this.$router.push({ path: "/carro/" });
        }

        // return false;
      }
      this.cargando = false;
    },
    limpiarMensajes() {
      this.mensajes = {
        exito: "",
        error: "",
      };
    },
    validarInputTelefono($event) {
      helpers.validarInputTelefono($event);
    },
    moverCursor($event) {
      const largo = $event.target.value.toString().length;
      $event.target.setSelectionRange(largo, largo);
    },
  },
  components: {
    BoxDespacho,
    BoxTotales,
    InputBase,
    InputSelect,
    InputCheck,
    GoogleMapsAutocompleteVue,
    GoogleMapsAutocompleteVue2,
    Mensajes,
    CargandoSeccion,
    DireccionManual,
  },
};
</script>
