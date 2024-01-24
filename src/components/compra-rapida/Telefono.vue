<template>
  <div class="columns is-gapless is-centered">
    <div class="column is-6-desktop is-8-tablet">
      <div class="card card-compra-rapida card-datos">
        <div class="columns is-vcentered is-mobile">
          <div class="column imagen is-2 pl-0"></div>
          <div class="column is-1 is-hidden-mobile"></div>
          <div class="column contenido has-text-centered-mobile">
            <h2 class="mb-4">Tus Datos</h2>

            <article class="message is-danger my-2 is-small" v-if="error">
              <div class="message-body">
                {{ error }}
              </div>
            </article>

            <div class="field mb-4">
              <label class="primero">Ingresa tu nombre</label>

              <div class="control">
                <input type="text" class="input input-2" v-model="nombre" @keypress="validarLetras" />
              </div>
            </div>

            <div class="field mb-4">
              <label class="primero">Ingresa tu Email</label>
              <div class="control">
                <input type="email" class="input input-2" v-model="email" :class="{ disabled: this.usuarioCarroCompra() }"
                  :readonly="this.usuarioCarroCompra()" />
              </div>
            </div>

            <label class="primero">Ingresa tu teléfono</label>
            <div class="field">
              <input class="input input-2" type="text" v-model="telefono" @focus="moverCursor"
                @keypress="validarInputTelefono" maxlength="12" pattern="[0-9]" />
            </div>
            <div class="block">
              <label class="checkbox primero">
                <b class="mr-2">¿Necesitas Factura?</b>
                <input type="checkbox" name="" id="" v-model="mostrar_facturacion" />
              </label>
            </div>

            <facturacion :dataFormularioFacturacion="dataFormularioFacturacion" v-if="mostrar_facturacion"></facturacion>

            <div class="block has-text-right-tablet">
              <a href="#" class="button is-rounded is-small button-icono px-5" @click.prevent="validar()">
                Continuar
              </a>
            </div>
          </div>
          <div class="column is-1 is-hidden-mobile"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from "../../utils/helpers";
import facturacion from "./Facturacion.vue";
import { useCarroCompraStore } from "/src/stores/carroCompra";
export default {
  data() {
    return {
      email: "",
      nombre: "",
      telefono: {
        type: String,
        default: "+569",
      },
      mostrar_facturacion: false,
      dataFormularioFacturacion: {
        rut: { data: "", error: false, requerido: true },
        razon_social: { data: "", error: false, requerido: true },
        giro: { data: "", error: false, requerido: true },
        nombre: { data: "", error: false, requerido: true },
        apellidos: { data: "", error: false, requerido: true },
        direccion: { data: { direccionCompleta: "" }, error: false, requerido: true },
        telefono: { data: "+569", error: false, requerido: true },
      },
      error: "",
      storeCarroCompra: useCarroCompraStore(),
    };
  },
  mounted() {
    /** VALIDAR SI SELECCIONÓ UN PRODUCTO, YA QUE SE QUITÓ ESTE PASO EN EL FLUJO NORMAL DE LA COMPRA RAPIDA */
    if (!this.storeCarroCompra.compraRapida.productoSeleccionado)
      this.$router.push({ path: "/" });
    /** COMPLETAR TELEFONO SI YA LO INGRESÓ ANTES O SI ESTÁ REGISTRADO */

    this.telefono =
      this.storeCarroCompra.compraRapida.telefono != ""
        ? this.storeCarroCompra.compraRapida.telefono
        : this.usuarioCarroCompra()
          ? this.usuarioCarroCompra().billing.phone
          : "+569";
    this.nombre =
      this.storeCarroCompra.compraRapida.nombre != ""
        ? this.storeCarroCompra.compraRapida.nombre
        : this.nombreUsuario;
    this.email =
      this.storeCarroCompra.compraRapida.email != ""
        ? this.storeCarroCompra.compraRapida.email
        : this.usuarioCarroCompra()
          ? this.usuarioCarroCompra().user_email
          : "";
  },
  computed: {
    /** RETORNA EL NOMBRE DEL USUARIO SI ESTÁ LOGUEADO */
    nombreUsuario() {
      if (!this.usuarioCarroCompra()) return "";
      return (
        this.usuarioCarroCompra().user_first_name +
        " " +
        this.usuarioCarroCompra().user_last_name
      );
    },
  },
  methods: {
    validar() {
      try {
        if (!helpers.validarTelefono(this.telefono.toString()))
          throw "Debes indicar un número de teléfono válido Ej: +56912345678";

        if (!this.nombre) throw "Debes ingresar tu nombre";
        if (!helpers.validarString(this.nombre)) throw "Debes ingresar un nombre válido";
        if (!this.email || !helpers.validateEmail(this.email))
          throw "Debes ingresar un email válido";

        this.validarFacturacion();

        this.storeCarroCompra.actualizarCompraRapida(String(this.telefono), "telefono");
        this.storeCarroCompra.actualizarCompraRapida(this.nombre, "nombre");
        this.storeCarroCompra.actualizarCompraRapida(this.email, "email");
        this.storeCarroCompra.actualizarCompraRapida(
          this.mostrar_facturacion,
          "con_facturacion"
        );
        /** ACTUALIZAR DATOS DE FACTURACIÓN, EN CASO DE NO REQUERIR FACTURA SE RESETEAN LOS VALORES */
        if (this.mostrar_facturacion) {
          this.storeCarroCompra.actualizarCompraRapida(
            {
              rut: this.dataFormularioFacturacion.rut.data,
              razon_social: this.dataFormularioFacturacion.razon_social.data,
              giro: this.dataFormularioFacturacion.giro.data,
              nombre: this.dataFormularioFacturacion.nombre.data,
              apellidos: this.dataFormularioFacturacion.apellidos.data,
              direccion: this.dataFormularioFacturacion.direccion.data,
              telefono: this.dataFormularioFacturacion.telefono.data,
            },
            "facturacion"
          );
        } else {
          this.storeCarroCompra.actualizarCompraRapida(
            {
              rut: "",
              razon_social: "",
              giro: "",
              nombre: "",
              apellidos: "",
              direccion: {
                direccionCompleta: "",
              },
              telefono: "",
            },
            "facturacion"
          );
        }
        this.$router.push({ path: "/compra-rapida/direccion" });
      } catch (error) {
        this.error = error;
      }
      return false;
    },
    validarFacturacion() {
      if (!this.mostrar_facturacion) return;

      this.dataFormularioFacturacion.rut.error = false;
      this.dataFormularioFacturacion.razon_social.error = false;
      this.dataFormularioFacturacion.giro.error = false;
      this.dataFormularioFacturacion.nombre.error = false;
      this.dataFormularioFacturacion.apellidos.error = false;
      this.dataFormularioFacturacion.direccion.error = false;

      if (!helpers.validaRut(this.dataFormularioFacturacion.rut.data)) {
        this.dataFormularioFacturacion.rut.error = true;
        throw "Debes indicar un Rut de facturación Válido";
      }
      if (!this.dataFormularioFacturacion.razon_social.data) {
        this.dataFormularioFacturacion.razon_social.error = true;
        throw "Debes ingresar una Razon Social para facturación";
      }
      if (!helpers.validarString(this.dataFormularioFacturacion.razon_social.data)) {
        this.dataFormularioFacturacion.razon_social.error = true;
        throw "Debes ingresar una Razon Social válida para facturación";
      }
      if (!this.dataFormularioFacturacion.giro.data) {
        this.dataFormularioFacturacion.giro.error = true;
        throw "Debes ingresar un Giro para facturación";
      }
      if (!helpers.validarString(this.dataFormularioFacturacion.giro.data)) {
        this.dataFormularioFacturacion.giro.error = true;
        throw "Debes ingresar un Giro válido para facturación";
      }
      if (!this.dataFormularioFacturacion.nombre.data) {
        this.dataFormularioFacturacion.nombre.error = true;
        throw "Debes ingresar un nombre para facturación";
      }
      if (!helpers.validarString(this.dataFormularioFacturacion.nombre.data)) {
        this.dataFormularioFacturacion.nombre.error = true;
        throw "Debes ingresar un nombre válido para facturación";
      }
      if (!this.dataFormularioFacturacion.apellidos.data) {
        this.dataFormularioFacturacion.apellidos.error = true;
        throw "Debes ingresar un apellido para facturación";
      }
      if (!helpers.validarString(this.dataFormularioFacturacion.apellidos.data)) {
        this.dataFormularioFacturacion.apellidos.error = true;
        throw "Debes ingresar un apellido válido para facturación";
      }

      if (!this.dataFormularioFacturacion.direccion.data.direccionCompleta) {
        this.dataFormularioFacturacion.direccion.error = true;
        throw "Formato de la dirección de facturación incorrecto, debes ingresar calle y número calle, Ciudad Ej. Paicaví 983, concepción, Chile";
      }

      if (
        !helpers.validarTelefono(this.dataFormularioFacturacion.telefono.data.toString())
      ) {
        this.dataFormularioFacturacion.telefono.error = true;
        throw "Debes indicar un número de teléfono válido para facturación Ej: +56912345678";
      }
    },
    validarInputTelefono($event) {
      helpers.validarInputTelefono($event);
    },
    validarLetras($event) {
      helpers.validarInputString($event);
    },
    moverCursor($event) {
      const largo = $event.target.value.toString().length;
      $event.target.setSelectionRange(largo, largo);
    },
  },
  components: {
    facturacion,
  },
};
</script>
