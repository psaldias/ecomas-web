<template>
  <div class="card seguimiento mb-4">
    <Mensajes :mensajes="mensajes"></Mensajes>

    <div v-if="!cargando">
      <div class="columns is-gapless pasos has-text-centered is-centered">
        <div class="column is-3-desktop is-12-mobile" :class="{ active: ingresado }">
          <div class="numero">
            <span>1</span>
          </div>
          <h4>INGRESADO</h4>
          <p v-if="enPreparacion">El vendedor esta preparando tu pedido</p>
        </div>
        <div class="column is-3-desktop is-12-mobile" :class="{ active: enPreparacion }">
          <div class="numero">
            <span>2</span>
          </div>
          <h4>EN PREPARACIÓN</h4>
          <p v-if="enPreparacion">El vendedor esta preparando tu pedido</p>
        </div>
        <div class="column is-3-desktop is-12-mobile" :class="{ active: enRuta }">
          <div class="numero">
            <span>3</span>
          </div>
          <h4>EN RUTA</h4>
          <p v-if="enRuta">Hora estimada de llegada <br> {{ ventana }}</p>
        </div>
        <div class="column is-3-desktop is-12-mobile" :class="{ active: entregado }" v-if="!noEntregado">
          <div class="numero">
            <span>4</span>
          </div>
          <h4>ENTREGADO</h4>
          <div v-if="entregado">
            <p>
              Fecha de entrega <br>
              {{ fecha_entrega }}
              a las {{ hora_entrega }} hrs.
              <br />
            </p>
          </div>
        </div>
        <div class="column is-3-desktop is-12-mobile active error" v-if="noEntregado">
          <div class="numero ">
            <span>4</span>
          </div>
          <h4>NO ENTREGADO</h4>
          <div v-if="redespacho">
            <p>
              Redespacho <br>
              <strong>{{ idRedespacho }}</strong>
            </p>
          </div>
        </div>
      </div>
      <div v-if="seguimiento">
        <div class="columns">
          <div class="column">

            <div class="block">
              <h2 class="primero"><strong>Detalle del conductor</strong></h2>
              <hr class="m-2" />
              <ul>
                <li>
                  <strong>Condutor asignado:</strong>
                  {{ conductor }}
                </li>
                <li>
                  <strong>Patente del vehículo:</strong>
                  {{ patente }}
                </li>
                <li>
                  <strong>Local de salida:</strong>
                  {{ local }}
                </li>
                <li>
                  <strong>Dirección de entrega:</strong>
                  {{ direccionEntrega }}
                </li>
              </ul>
            </div>

            <div class="block" v-if="imagenes_entrega.length > 0">
              <h2 class="primero"><strong>Comprobante de Entrega</strong></h2>
              <hr class="m-2" />
              <div class="columns is-multiline is-mobile">
                <div class="column is-narrow" v-for="imagen in imagenes_entrega">
                  <figure class="image is-128x128">
                    <a :href="imagen.url_foto" data-fancybox>
                      <img :src="imagen.url_foto" class="object-fit" />
                    </a>
                  </figure>
                </div>
              </div>
            </div>

          </div>

          <div class="column" v-if="center_map">
            <h2 class="primero"><strong>Mapa lugar de entrega</strong></h2>
            <hr class="m-2" />
            <GoogleMap api-key="AIzaSyBnb8VlPnX3eITu2nRY1jy8d1FMjFGQDXM" style="width: 100%; height: 500px"
              :center="center_map" :zoom="12">
              <Marker :options="{ position: center_map }" />
            </GoogleMap>
          </div>
        </div>


      </div>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </div>
</template>

<script>

import "/src/assets/libs/fancybox/jquery.fancybox.min.js";
import "/src/assets/libs/fancybox/jquery.fancybox.min.css";

import CargandoSeccion from "../general/CargandoSeccion.vue";
import Mensajes from "../general/Mensajes.vue";
import { GoogleMap, Marker } from 'vue3-google-map'
export default {
  props: ["orden"],
  data() {
    return {
      cargando: false,
      seguimiento: false,
      mensajes: {
        exito: "",
        error: "",
      },
    };
  },
  computed: {
    ingresado() {
      return !this.seguimiento;
    },
    enPreparacion() {
      return this.seguimiento && this.seguimiento.data.order.estado == "ASIGNADO";
    },
    enRuta() {
      if (!this.seguimiento) return false;

      return this.seguimiento.data.order.estado == "EN RUTA";
    },
    entregado() {
      if (!this.seguimiento) return false;

      return (
        this.seguimiento.data.order.estado == "ENTREGADO" ||
        this.seguimiento.data.order.estado == "ENTREGADO ATRASADO"
      );
    },
    noEntregado() {
      if (!this.seguimiento) return false;

      return (
        this.seguimiento.data.order.estado == "NO ENTREGADO"
      );
    },
    redespacho() {
      if (!this.seguimiento) return false;

      return (
        this.seguimiento.data.redespacho.redespachos_asociados.length > 0
      );
    },
    idRedespacho() {
      if (!this.seguimiento) return false;

      return (
        this.seguimiento.data.redespacho.redespachos_asociados[0].numero
      );
    },
    conductor() {
      return this.seguimiento?.data?.vehicle?.usuario_app;
    },
    patente() {
      return this.seguimiento?.data?.vehicle?.patente;
    },
    local() {
      return this.seguimiento?.data?.order?.local;
    },
    direccionEntrega() {
      return this.seguimiento?.data?.client?.direccion;
    },
    fecha_entrega() {
      if (!this.seguimiento.data.order.hora_entrega) return;
      const date = new Date(this.seguimiento.data.order.hora_entrega);
      const formatter = new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const formattedDate = formatter.format(date);
      return formattedDate;
    },
    hora_entrega() {
      if (!this.seguimiento.data.order.hora_entrega) return;
      const date = new Date(this.seguimiento.data.order.hora_entrega);
      const formatter = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit' });
      const formattedDate = formatter.format(date);
      return formattedDate;
    },
    ventana() {
      return this.seguimiento.data.order.ventana;
    },
    imagenes_entrega() {
      if (!this.seguimiento?.data?.photo) return [];

      return this.seguimiento.data.photo;
    },
    center_map() {
      if (!this.seguimiento.data.client.latitud || !this.seguimiento.data.client.longitud) return;
      return { lat: parseFloat(this.seguimiento.data.client.latitud), lng: parseFloat(this.seguimiento.data.client.longitud) }
    }
  },
  methods: {
    async obtenerRastreo() {
      this.cargando = true;
      /** reset mensajes */
      this.mensajes = { exito: "", error: "" };
      const respuesta = await this.enviarGet(
        import.meta.env.VITE_ENDPOINT_SEGUIMIENTO + "?orden=" + this.orden.number
      );
      this.seguimiento = respuesta.data;

      this.cargando = false;
    },
  },
  async mounted() {
    await this.obtenerRastreo();
  },
  watch: {
    "orden.id": {
      handler(newValue, oldValue) {
        this.obtenerRastreo();
      },
    },
  },
  components: { CargandoSeccion, Mensajes, GoogleMap, Marker },
};
</script>
<style>
.object-fit {
  object-fit: cover;
  height: 100% !important
}

.pedidos .seguimiento .pasos .active.error h4 {
  color: #f1291a;
}

.pedidos .seguimiento .pasos .active.error .numero span {
  background: #f1291a;
}
</style>