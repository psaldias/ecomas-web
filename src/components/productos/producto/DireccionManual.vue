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
              <input type="text" class="input" v-model="direccion.calle" />
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label>Número</label>
              <input type="text" class="input" v-model="direccion.numero" />
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
  mounted() {
    /** setear comuna y regino dependiendo de la sucursal seleccionada */
    this.direccion.comuna = this.comuna.name;
    this.direccion.region = this.region.description;
  },
  methods: {
    /** crea string con el formato de dirección completa */
    direccionCompleta() {
      let direccion = this.direccion.calle;
      if (this.direccion.numero) direccion += " " + this.direccion.numero;

      direccion += ", " + this.direccion.ciudad + ", " + this.region.name;

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
      /** seteamos valores en objeto final de dirección */
      this.direccion.comuna = this.direccion.ciudad = this.comuna.name;
      this.direccion.direccionCompleta = this.direccionCompleta();
      this.direccion.latitud = this.sucursal.fields.coordenadas_sucursal.latitud;
      this.direccion.longitud = this.sucursal.fields.coordenadas_sucursal.longitud;
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
