<template>
  <main class="distribuidores">
    <div class="wrapper" v-if="!cargando">
      <BannerSeccion :titulo="data.title.rendered" :imagen="data.acf.imagen_banner.sizes['2048x2048']" />

      <div class="columns is-centered mt-4 is-size-6" v-if="!cargando_regiones">
        <div class="column is-3">
          <div class="select is-fullwidth">
            <select
              @change="cambioRegion()"
              v-model="region"
              id=""
              class="has-text-weight-bold"
            >
              <option value="">Todos</option>
              <option v-for="(region, index) in regiones" :key="region.term_id" :value="region.term_id">
                {{ region.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-3">
          <div class="select is-fullwidth">
            <select v-model="comuna" id="" class="has-text-weight-bold">
              <option value="">Todos</option>
              <option v-for="(comuna, index) in comunas" :key="comuna.term_id" :value="comuna.term_id">
                {{ comuna.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <CargandoSeccion v-if="cargando_regiones"></CargandoSeccion>

      <div class="columns is-centered" v-if="!cargando_distribuidores">
        <div class="column is-11">
          <div class="listado-sucursales">
            <div class="columns is-multiline is-mobile">
              <div
                class="column is-4-fullhd is-6-desktop"
                v-for="(distribuidor,index) in distribuidoresFiltrados"
                :key="index"
              >
                <div class="card p-4 pb-0">
                  <div class="contenido">
                    <h4 class="primero">{{ distribuidor.title.rendered }}</h4>
                    <div class="datos-contacto content mt-4">
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-location-dot is-size-7"></i>
                            </div>
                            <div class="column">
                                <b class="primero"> {{ obtenerComuna(distribuidor.regiones_comunas[0]).name }}</b>
                            </div>
                        </div>
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-phone-volume is-size-7"></i>
                            </div>
                            <div class="column">
                                <b>Fono:</b> {{ distribuidor.acf.fono }}
                            </div>
                        </div>
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-house-chimney is-size-7"></i>
                            </div>
                            <div class="column">
                                <b>Dirección:</b> {{ distribuidor.acf.direccion }}
                            </div>
                        </div>
                        <div class="columns is-gapless mb-1 is-mobile">
                            <div class="column is-1 mr-1 has-text-centered">
                                <i class="primero fa-solid fa-envelope is-size-7"></i>
                            </div>
                            <div class="column">
                                <b>Correo:</b> {{ distribuidor.acf.correo }}
                            </div>
                        </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CargandoSeccion v-if="cargando_distribuidores"></CargandoSeccion>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
</template>

<script>
import BannerSeccion from "../components/general/BannerSeccion.vue";
import CargandoSeccion from "@/components/general/CargandoSeccion.vue";

export default {
  components: {
    BannerSeccion,
    CargandoSeccion,
},
  data() {
    return {
      data:{},
      regiones_comunas:{},
      distribuidoreswp:{},
      cargando:true,
      cargando_regiones:true,
      cargando_distribuidores:true,
      region: "",
      comuna: "",
    };
  },
  async mounted (){

   const respuesta =  await this.obtenerInfoInicial('pages/203');
   if(respuesta){
    this.data = respuesta.data;
    this.cargando = false;
   }

   const respuesta_regiones =  await this.obtenerInfoInicial('ecomas/taxonomies?slug=regiones_comunas&hide_empty=true&post_type=distribuidores');
   if(respuesta_regiones){
    this.regiones_comunas = respuesta_regiones.data;
    this.cargando_regiones = false;
   }

   const respuesta_distribbuidores = await this.obtenerInfoInicial('distribuidores');
   if(respuesta_distribbuidores){
     this.distribuidoreswp = respuesta_distribbuidores.data;
     this.cargando_distribuidores = false;
   }

  },
  computed: {
    regiones (){
      let regiones = {};
      if(this.regiones_comunas){
        regiones = this.regiones_comunas.filter(ubicacion => ubicacion.parent == 0);
      }
      return regiones;
    },
    comunas(){
      let comunas = {};
      if(this.regiones_comunas){
        comunas = this.regiones_comunas.filter(ubicacion => ubicacion.parent === this.region);
        // this.comuna = comunas[0].term_id;
      }
      return comunas;
    },
    distribuidoresFiltrados() {
      return this.distribuidoreswp.filter((distribuidor) => {
        if(this.comuna){
          return distribuidor.regiones_comunas[0] == this.comuna;
        }else if(this.region){
          const ids = [];
          this.comunas.forEach(comuna => {ids.push(comuna.term_id)});
          return ids.includes(distribuidor.regiones_comunas[0]);
        }else return true;

      });
    },
  },
  methods: {
    cambioRegion() {
      this.comuna = "";
    },
    obtenerComuna(id){
      return this.regiones_comunas.find(ubicacion => ubicacion.term_id === id);
    },
  },
};
</script>
