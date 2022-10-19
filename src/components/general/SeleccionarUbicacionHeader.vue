<template>
  <main v-if="store_opciones_generales.sucursales">
    <a href="#" class="primero ubicacion" @click.prevent="mostrarMenu = !mostrarMenu; error_ubicacion= false">
      <i class="primero mr-1 fa-solid fa-location-dot"></i>
      {{store_opciones_generales.sucursal_seleccionada.post_title}}
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
          <div class="columns is-variable mb-3 mt-5 is-1" v-if="!store_opciones_generales.cargando">
            <div class="column mr-2">
              <div class="field">
                <label for="" class="label">Región</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select  v-model="regionSeleccionada" @change="cambiarComunas()">
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
              @click="guardarUbicacion()"
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
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
  props: {},
  data() {
    return {
      error_ubicacion: false,
      mostrarMenu: false,
      cargando:true,
      regionSeleccionada:0,
      comunaSeleccionada:0,
      store_opciones_generales: useOpcionesGeneralesStore(),
      comunas:{},
    };
  },
  mounted() {

    if(this.sucursal_por_defecto){
      this.regionSeleccionada = this.sucursal_por_defecto.regiones_comunas[0].parent;
      this.comunaSeleccionada = this.sucursal_por_defecto.regiones_comunas[0].term_id;
    }else if(this.regiones){
      console.log(this.regiones);
      this.regionSeleccionada = this.regiones[0].term_id;
    }

    if(this.ubicaciones){
        this.comunas = this.ubicaciones.filter(ubicacion => ubicacion.parent === this.regionSeleccionada);
    }
  },
  computed: {
    ubicaciones(){
      return this.store_opciones_generales.ubicaciones_sucursales ?? [];
    },
    sucursal_por_defecto(){
      return this.store_opciones_generales.sucursales.find(sucursal => {
        return sucursal.fields.sucursal_por_defecto;
      });
    },
    regiones (){
      let regiones = false;
      if(this.ubicaciones){
        regiones = this.ubicaciones.filter(ubicacion => ubicacion.parent == 0);
      }
      return regiones;
    },
  },
  methods: {
    cambiarComunas(){
      this.comunas = this.ubicaciones.filter(ubicacion => ubicacion.parent === this.regionSeleccionada);
      if(this.comunas.length > 0)
          this.comunaSeleccionada = this.comunas[0].term_id;
    },
    guardarUbicacion(){
      this.store_opciones_generales.actualizarSucuralSeleccionada(this.comunaSeleccionada);
      this.mostrarMenu = false;
    }
  },
};
</script>
