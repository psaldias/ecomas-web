<template>
  <teleport to="#modal">
    <transition name="modal">
      <div
        class="toplayer toplayer-general"
        v-if="mostrarToplayer"
        @click.self="cerrar($event)"
      >
        <div class="toplayer_content">
          <button class="delete ecomas is-large" @click.prevent="cerrar($event)"></button>

          <div
            class="contenido-toplayer"
            :class="{ 'px-6': this.store_opciones_generales.toplayer_general_padding }"
            :style="colorFondo"
            v-html="this.store_opciones_generales.toplayer_general_contenido"
          ></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
import { useOpcionesGeneralesStore } from "../../stores/opcionesGenerales";
export default {
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      mostrar: true,
      pathActual: "",
    };
  },
  mounted() {},
  watch: {
    "$route.path"() {
      this.pathActual = this.$route.path;
    },
  },
  computed: {
    colorFondo() {
      if (this.store_opciones_generales.toplayer_general_color_fondo)
        return (
          "background-color:" + this.store_opciones_generales.toplayer_general_color_fondo
        );
    },
    mostrarToplayer() {
      return this.activarToplayer && this.mostrar;
    },
    /** VALIDAR SI SE DEBE MOSTRAR EL TOPLAYER, DEPENDIENDO DE LA URL, ESTADOS, ETC */
    activarToplayer() {
      /** SI ESTÁ DESACTIVADO NO SE MUESTRA */
      if (!this.store_opciones_generales.toplayer_general_estado) return false;
      /** SI ES PARA TODO EL SITIO ENTONCES SE MUESTRA*/
      if (this.store_opciones_generales.toplayer_general_todo_el_sitio) return true;

      /** VALIDAR SI CORRESPONDE A LA URL ACTUAL */
      return this.store_opciones_generales.toplayer_general_urls.find((url) => {
        return url.url == this.pathActual;
      });
    },
  },
  methods: {
    cerrar(event, redireccionar = false) {
      event.stopPropagation();
      this.mostrar = false;
    },
  },
};
</script>
<style scope></style>
