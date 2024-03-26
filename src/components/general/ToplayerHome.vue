<template>
  <teleport to="#modal">
    <transition name="modal">
      <div class="toplayer toplayer-home" v-if="mostrarToplayer" @click.self="cerrar($event)">
        <div class="toplayer_content">
          <button class="delete ecomas is-large" @click.prevent="cerrar($event)" aria-label="Cerrar"></button>
          <div v-if="toplayer.link">
            <a :href="toplayer.link" v-if="verificarUrlExterna(toplayer.link)" target="_blank" @click="cerrar($event)">
              <span v-html="toplayer.imagen"></span>
            </a>
            <router-link :to="toplayer.link" @click="cerrar($event)" v-else>
              <span v-html="toplayer.imagen"></span>
            </router-link>
          </div>

          <img v-else :src="toplayer.imagen.url" alt="this.toplayer.imagen.name" />
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
import { useOpcionesGeneralesStore } from "../../stores/opcionesGenerales";
export default {
  props: ["toplayer"],
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      mostrar: false,
    };
  },
  mounted() {
    this.mostrar = this.toplayer.mostrar;
  },
  computed: {
    mostrarToplayer() {
      return this.store_opciones_generales.mostrar_toplayer_home && this.toplayer.mostrar
        ? true
        : false;
    },
  },
  methods: {
    cerrar(event, redireccionar = false) {
      event.stopPropagation();
      this.store_opciones_generales.actualizarToplayerHome(false);
    },
    verificarUrlExterna(url) {
      var pattern = /^((http|https|ftp):\/\/)/;
      return pattern.test(url);
    },
  },
};
</script>
<style scope></style>
