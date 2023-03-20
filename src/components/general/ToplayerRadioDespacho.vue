<template>
  <teleport to="#modal">
    <transition name="modal">
      <div
        class="toplayer toplayer-radio-despacho"
        v-if="mostrarToplayer"
        @click.self="cerrar($event)"
      >
        <div class="toplayer_content card">
          <div class="acciones-cabecera has-text-right pt-3 pr-3">
            <button
              class="delete ecomas is-large"
              @click.prevent="cerrar($event)"
            ></button>
          </div>

          <div class="columns">
            <div class="column">
              <h3
                class="mb-4"
                v-if="store_opciones_generales.radio_texto_principal"
                v-html="store_opciones_generales.radio_texto_principal"
              ></h3>

              <div
                class="destacado mb-4"
                v-if="store_opciones_generales.radio_caja_destacada"
              >
                <div class="columns is-vcentered is-mobile">
                  <div class="column is-narrow is-hidden-mobile">
                    <img
                      src="/img/icono-radio-despacho-mensaje.png"
                      alt="Radio Despacho"
                    />
                  </div>
                  <div
                    class="column is-size-6 content"
                    v-html="store_opciones_generales.radio_caja_destacada"
                  ></div>
                </div>
              </div>

              <div
                class="is-size-6 content mb-4"
                v-if="store_opciones_generales.radio_pie"
                v-html="store_opciones_generales.radio_pie"
              ></div>
            </div>
            <div class="column is-5 is-hidden-mobile">
              <img src="/img/icono-radio-despacho.jpg" alt="Radio Despacho" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
import { useOpcionesGeneralesStore } from "../../stores/opcionesGenerales";
export default {
  components: {},
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      mostrar: false,
    };
  },
  mounted() {
    if (this.store_opciones_generales.radio_activo) this.mostrar = true;
  },
  computed: {
    mostrarToplayer() {
      return this.mostrar;
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
