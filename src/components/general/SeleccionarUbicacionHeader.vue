<template>
  <main>
    <a href="#" class="primero ubicacion" @click.prevent="mostrarMenu = !mostrarMenu; error_ubicacion= false">
      <i class="primero mr-1 fa-solid fa-location-dot"></i>
      Comuna
    </a>

    <section class="seleccionar-ubicacion" ref="seleccionarUbicacion" v-if="mostrarMenu">
      <div class="card">
        <button class="delete ecomas is-large" @click.prevent="mostrarMenu=false; "></button>
        <div v-if="error_ubicacion" class="has-text-centered">
          <img src="/img/icono-error.jpg" alt="" />
          <p class="mt-4">
            <span class="primero"
              >Lo sentimos pero no tenemos despachos a tu ubicación,</span
            >
            <br />
            estamos trabajando permanentemente en mejoras para ustedes.
          </p>
        </div>
        <div v-else>
          <p class="has-text-centered">
            Seleccionar comuna en la que encuentras para ver la disponibilidad despacho o
            tiempos de entrega.
          </p>
          <div class="columns is-variable mb-3 mt-5 is-1">
            <div class="column mr-2">
              <div class="field">
                <label for="" class="label">Región</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select name="region" id="">
                      <option value="Región del Biobio">Región del Biobio</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label for="" class="label">Comuna</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select name="comuna" id="">
                      <option value="Concepción">Concepción</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <button
              class="button button-icono is-fullwidth"
              @click="error_ubicacion = true"
            >
              Guardar Ubicación
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      error_ubicacion: false,
      mostrarMenu: false,
    };
  },
  computed: {},
  methods: {},
};
</script>
