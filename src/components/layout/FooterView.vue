<template>
  <footer class="mt-6">
    <div class="wrapper">
      <div class="columns is-centered is-mobile is-multiline">
        <div class="column is-narrow-desktop is-12-mobile has-text-centered">
          <router-link to="/">
            <img src="/img/Ecomas-Logo-footer.webp" alt="Ecomas" width="228" height="68" />
          </router-link>

          <div class="has-text-centered rrss is-narrow mt-4"
            v-if="!store_opciones_generales.cargando && store_opciones_generales.rrss">
            <a :href="store_opciones_generales.rrss.instagram" v-if="store_opciones_generales.rrss.instagram"
              target="blank" class="ml-2" aria-label="Instagram"><i
                class="has-text-white fa-brands is-size-5 fa-instagram"></i></a>
            <a :href="store_opciones_generales.rrss.facebook" v-if="store_opciones_generales.rrss.facebook"
              target="blank" class="ml-2" aria-label="Facebook"><i
                class="has-text-white fa-brands is-size-5 fa-square-facebook"></i></a>
            <a :href="store_opciones_generales.rrss.youtube" v-if="store_opciones_generales.rrss.youtube" target="blank"
              class="ml-2" aria-label="Youtube"><i class="has-text-white fa-brands is-size-5 fa-square-youtube"></i></a>
          </div>
        </div>
        <div class="column is-narrow-desktop is-12-mobile px-4" v-if="footer1"></div>
        <div class="column is-narrow-desktop is-6-mobile" v-if="footer1">
          <nav>
            <ul>
              <li v-for="menu in footer1" :key="menu.ID">
                <router-link :to="obtenerSlug(menu.url)">{{ menu.title }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="column is-narrow px-4 is-hidden-mobile" v-if="footer2"></div>
        <div class="column is-narrow-desktop is-6-mobile" v-if="footer2">
          <nav>
            <ul>
              <li v-for="menu in footer2" :key="menu.ID">
                <router-link :to="obtenerSlug(menu.url)">{{ menu.title }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="column is-narrow-desktop is-12-mobile px-4" v-if="!store_opciones_generales.cargando && store_opciones_generales.telefono_footer
              "></div>
        <div class="column is-narrow-desktop is-align-self-center has-text-centered-mobile" v-if="!store_opciones_generales.cargando && store_opciones_generales.telefono_footer
              ">
          <a :href="'tel:' + store_opciones_generales.telefono_footer"
            class="button is-rounded button-fono has-text-white">
            <b><i class="fa-solid fa-phone-volume primero"></i>
              <span class="primero">FONO:</span>
              {{ store_opciones_generales.telefono_footer }}</b>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import CargandoSeccion from "../general/CargandoSeccion.vue";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  computed: {
    footer1() {
      return this.store_opciones_generales.menus["footer-1"];
    },
    footer2() {
      return this.store_opciones_generales.menus["footer-2"];
    },
  },
  mounted() { },
  methods: {
    obtenerSlug(url) {
      url = url.replace(/^.*\/\/[^\/]+/, "");
      return url;
    },
  },
  components: { CargandoSeccion },
};
</script>
