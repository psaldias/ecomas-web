<template>
  <div
    class="column has-text-centered"
    v-if="
      store_opciones_generales.ingreso_con_facebook.activo &&
      store_opciones_generales.ingreso_con_facebook.app_id
    "
  >
    <!-- <div id="fb-root"></div> -->
    <a @click.prevent="logInWithFacebook" v-if="!cargando_facebook"
      ><img src="/img/btn-facebook.jpg" alt=""
    /></a>
    <CargandoSeccion v-if="cargando_facebook"></CargandoSeccion>
    <small>
      <Mensajes :mensajes="mensajes" clases="is-small"></Mensajes>
    </small>
  </div>
</template>

<script>
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import Mensajes from "/src/components/general/Mensajes.vue";
import CargandoSeccion from "../general/CargandoSeccion.vue";
import helpers from "../../utils/helpers";

export default {
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      mensajes: {},
      cargando: false,
      cargando_facebook: false,
    };
  },
  async mounted() {
    /** IMPORTAR LIBRERIA FACEBOOK */
    // await helpers.importarLibereria("https://connect.facebook.net/en_US/sdk.js");
    const app_id = this.store_opciones_generales.ingreso_con_facebook.app_id;
    window.fbAsyncInit = function () {
      FB.init({
        appId: app_id,
        cookie: false,
        version: "v15.0",
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
  methods: {
    async logInWithFacebook() {
      this.mensajes = {};
      this.cargando_facebook = true;
      FB.login(this.procesarRespuesta, { scope: "email" });
      return false;
    },
    async procesarRespuesta(response) {
      if (response.authResponse) {
        this.procesarAcceso(response.authResponse.accessToken);
      } else {
        this.mensajes.error = "No se pudo conectar con facebook.";
        // alert("User cancelled login or did not fully authorize.");
        this.cargando_facebook = false;
      }
    },
    async procesarAcceso(token) {
      let respuesta = await this.loginFacebook(token);
      if (respuesta.tipo == "exito") this.$router.replace({ path: "/mi-cuenta/" });
      else this.cargando_facebook = false;
    },
  },
  components: { Mensajes, CargandoSeccion },
};
</script>
