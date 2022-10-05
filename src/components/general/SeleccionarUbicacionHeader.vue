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
                    <select  v-model="regionSeleccionada">
                      <option :value="region.term_id" v-for="region in regiones" :key="region.term_id">{{region.name}}</option>
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
                    <select  id=""  v-model="comunaSeleccionada">
                      <option :value="comuna.term_id" v-for="comuna in comunas" :key="comuna.term_id">{{comuna.name}}</option>
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
      ubicaciones:{},
      cargando:true,
      regionSeleccionada:0,
      comunaSeleccionada:0,
    };
  },
  async mounted() {
        const respuesta = await this.obtenerInfoInicial("ecomas/taxonomies?slug=regiones_comunas&hide_empty=true&post_type=sucursales");
        if(respuesta){
          this.ubicaciones = respuesta.data;
          if(this.ubicaciones)
            this.regionSeleccionada = this.regiones[0].term_id;
          this.cargando = false;
        }
  },
  computed: {
    regiones (){
      let regiones = {};
      if(this.ubicaciones){
        regiones = this.ubicaciones.filter(ubicacion => ubicacion.parent == 0);
      }
      return regiones;
    },
    comunas(){
      let comunas = {};
      if(this.ubicaciones){
        comunas = this.ubicaciones.filter(ubicacion => ubicacion.parent === this.regionSeleccionada);
        this.comunaSeleccionada = comunas[0].term_id;
      }
      return comunas;
    }
  },
  methods: {},
};
</script>
