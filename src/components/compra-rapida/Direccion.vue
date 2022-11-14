<template>

  <div class="columns is-gapless is-centered">
    <div class="column is-6">
        <div class="card card-compra-rapida card-direccion">

            <div class="columns is-vcentered is-mobile">
              <div class="column imagen is-3 pl-0 is-hidden-mobile">
              </div>
              <div class="column is-1 is-hidden-mobile"></div>
              <div class="column contenido has-text-centered-mobile">
                <h2>Dirección de entrega</h2>
                <h3 class="mb-1">Dirección registrada para próxima entrega:</h3>

                <article class="message is-danger my-2 is-small" v-if="error">
                  <div class="message-body">
                    {{error}}
                  </div>
                </article>

                <div class="field  columns">
                  <VueGoogleAutocomplete
                    v-on:placechanged="obtenerDireccion"
                    :country="['cl']"
                    id="direccion_google"
                    classname="input input-2 w-80"
                    placeholder="Ingresar Dirección"
                    :latLongBounds="{latLng:gmapsBounds,radius:parseInt(store_opciones_generales.restricciones_sucursales.radio_permitido)}"
                    ></VueGoogleAutocomplete
                  >
                </div>
                <div v-if="direccionActual" class="is-size-7">
                  Dirección Seleccionada: <b>{{direccionActual}}</b>
                </div>

                <div class="block has-text-right-tablet mt-5">
                <a  class="button is-rounded is-small button-icono px-5" @click.prevent="validarDireccion()">
                  Continuar
                </a>
                </div>
              </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
  import { useCarroCompraStore } from '/src/stores/carroCompra'
  import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
  import VueGoogleAutocomplete from "vue-google-autocomplete";
  import  RegionesYComunas  from '/src/utils/regionesComunas'
  export default {
    data() {
        return {
            error: "",
            storeCarroCompra: useCarroCompraStore(),
            store_opciones_generales: useOpcionesGeneralesStore(),
        };
    },
    mounted () {
      if(!this.storeCarroCompra.compraRapida.telefono)
        this.$router.push({ path: "/compra-rapida/" });

    },
    computed: {
      gmapsBounds(){
        if(typeof this.sucursalSeleccionada.fields.coordenadas_sucursal != 'undefined'){
          return {lat:parseFloat(this.sucursalSeleccionada.fields.coordenadas_sucursal.latitud),lng:parseFloat(this.sucursalSeleccionada.fields.coordenadas_sucursal.longitud)}
        }return false
      },
      direccionActual(){
        return (Object.keys(this.storeCarroCompra.compraRapida.direccion).length === 0)
        ? ''
        : this.storeCarroCompra.compraRapida.direccion.direccionCompleta;
      },
      sucursalSeleccionada(){
        return this.store_opciones_generales.sucursal_seleccionada;
      }
    },
    methods: {
        validarDireccion() {
            if (Object.keys(this.storeCarroCompra.compraRapida.direccion).length === 0) {
                this.error = "Debes indicar una Dirección Válida";
            }
            else {
                this.$router.push({ path: "/compra-rapida/producto" });
            }
            return false;
        },

        obtenerDireccion(data) {
          const region = RegionesYComunas.find(region => {
            return region.name == data.administrative_area_level_1
          });

          if(data.street_number == undefined){
            this.error = "Debes indicar una Dirección Válida";
            return false;
          }

          this.error = '';
          const direccion = {
            region:region.region_iso_3166_2 ?? data.administrative_area_level_1 ,
            ciudad:data.administrative_area_level_2,
            comuna:data.locality,
            pais:data.country,
            latitud:data.latitude,
            longitud:data.longitude,
            calle:data.route,
            numero: data.street_number ?? '',
            direccionCompleta : ''
          };

          if(direccion.calle)
            direccion.direccionCompleta += direccion.calle;
          if(direccion.numero)
            direccion.direccionCompleta += " "+direccion.numero;
          if(direccion.ciudad)
            direccion.direccionCompleta += ", "+direccion.ciudad;
          if(direccion.pais)
            direccion.direccionCompleta += ", "+direccion.pais;

          this.storeCarroCompra.actualizarCompraRapida(direccion, "direccion");
        }
    },
    components: { VueGoogleAutocomplete }
};
  </script>

