

<template>
  <main class="mi-cuenta">
    <div class="wrapper" v-if="usuarioCarroCompra()">

        <BannerSeccion titulo="Mi Cuenta" imagen="/img/banner-mi-cuenta.jpg" />


        <div class="columns is-variable is-4-tablet mt-4">
            <div class="column menu is-narrow">
                <RouterLink to="/mi-cuenta/"  class="button button-3 is-block mb-2 ">
                    <i class=" mr-2 fa-solid fa-circle-user"></i> Mi información Personal
                </RouterLink>
                <RouterLink to="/mi-cuenta/direcciones"  class="button button-3 is-block mb-2 active">
                    <i class=" mr-2 fa-solid fa-location-dot"></i> Mis Direcciones
                </RouterLink>
                <RouterLink to="/pedidos/"  class="button button-3 is-block mb-2 ">
                   <i class=" mr-2 fa-solid fa-list-check"></i> Mis pedidos
                </RouterLink>
                <a @click.prevent="cerrarSesion()" class="button button-3 is-block">
                   <i class=" mr-2 fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión
                </a>
            </div>
            <div class="column">
                <h2 class="primero"><strong>Bienvenid@!.</strong> Aquí puedes gestionar tu información personal y pedidos.</h2>

                <div class="columns is-variable is-1">
                    <div class="column">
                        <div class="message  mt-4 is-ecomas">
                            <div class="message-header">
                                Dirección Despacho
                                <a href="#" @click.prevent="direccion_despacho.editar = !direccion_despacho.editar" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                            </div>
                            <div class="message-body">
                                <div class="block">
                                    <strong class="primero">Dirección Actual: </strong> <strong>{{ usuarioCarroCompra().shipping.address_1 }}</strong>
                                </div>
                                <div class="block">
                                    <strong class="primero">Comentario Dirección: </strong> <strong>{{ usuarioCarroCompra().shipping.comentario_direccion }}</strong>
                                </div>
                                <form action="#" @submit.prevent="actualizarDireccionDespacho()" v-if="direccion_despacho.editar">
                                    <hr>
                                    <Mensajes :mensajes="direccion_despacho.mensajes" ></Mensajes>
                                    <div class="field">
                                        <label for="" class="label" >Dirección</label>
                                        <GoogleMapsAutocompleteVue
                                            v-if="libreriaCargada"
                                            v-on:placechanged="obtenerDireccionDespacho"
                                            :class="{'is-danger':direccion_despacho.direccion.error}"
                                            :country="['cl']"
                                            id="direccion_google"
                                            classname="input input-2  "
                                            placeholder="Ingresar Dirección"
                                            key="map1"
                                            ></GoogleMapsAutocompleteVue
                                        >
                                        <div v-if="direccion_despacho.direccion.data.direccionCompleta" class="is-size-7 mt-2">
                                            Dirección Seleccionada: <b>{{direccion_despacho.direccion.data.direccionCompleta}}</b>
                                        </div>
                                    </div>

                                    <div class="field"  v-if="libreriaCargada">
                                        <div class="control">
                                            <input
                                            class="input input-2"
                                            placeHolder="Casa Departamento o Condominio "
                                            type="text"
                                            v-model="direccion_despacho.comentario_direccion.data"
                                            />
                                        </div>
                                    </div>

                                    <div class="field has-text-right">
                                        <button type="submit" class="button button-2 bg-primero" v-if="!direccion_despacho.cargando">Actualizar</button>
                                        <CargandoSeccion v-if="direccion_despacho.cargando" class="small"></CargandoSeccion>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="message  mt-4 is-ecomas ">
                            <div class="message-header">
                                Dirección Facturación
                                <a href="#" @click.prevent="direccion_facturacion.editar = !direccion_facturacion.editar" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                            </div>
                            <div class="message-body">
                                <div class="block">
                                    <strong class="primero">Dirección Actual: </strong> <strong>{{ usuarioCarroCompra().billing.address_1 }}</strong>
                                </div>
                                <form action="#" @submit.prevent="actualizarDireccionFacturacion()" v-if="direccion_facturacion.editar">
                                    <hr>
                                    <Mensajes :mensajes="direccion_facturacion.mensajes" class="mb-4"></Mensajes>
                                    <div class="field">
                                        <label for="" class="label" >Dirección</label>
                                        <GoogleMapsAutocompleteVue2
                                            v-if="libreriaCargada"
                                            v-on:placechanged="obtenerDireccionFacturacion"
                                            :class="{'is-danger':direccion_facturacion.direccion.error}"
                                            :country="['cl']"
                                            id="direccion_google2"
                                            classname="input input-2  "
                                            placeholder="Ingresar Dirección"
                                            key="map1"
                                            ></GoogleMapsAutocompleteVue2
                                        >
                                        <div v-if="direccion_facturacion.direccion.data.direccionCompleta" class="is-size-7 mt-2">
                                            Dirección Seleccionada: <b>{{direccion_facturacion.direccion.data.direccionCompleta}}</b>
                                        </div>
                                    </div>

                                    <div class="field has-text-right">
                                        <button type="submit" class="button button-2 bg-primero" v-if="!direccion_facturacion.cargando">Actualizar</button>
                                        <CargandoSeccion v-if="direccion_facturacion.cargando" class="small"></CargandoSeccion>
                                    </div>
                                </form>
                                </div>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
  </main>
</template>



<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";
import Mensajes from "../components/general/Mensajes.vue";

import GoogleMapsAutocompleteVue from '../components/general/GoogleMapsAutocomplete.vue';
import GoogleMapsAutocompleteVue2 from '../components/general/GoogleMapsAutocomplete.vue';

import helpers from '/src/utils/helpers';
import  RegionesYComunas  from '/src/utils/regionesComunas'

export default {
  components: {
    BannerSeccion,
    CargandoSeccion,
    Mensajes,
    GoogleMapsAutocompleteVue,
    GoogleMapsAutocompleteVue2
},
  data() {
    return {
        storeCarroCompra: useCarroCompraStore(),
        direccion_despacho: {
            direccion: {data:{direccionCompleta:''},error:false,requerido:false},
            telefono: {data:'+569',error:false,requerido:true},
            comentario_direccion: {data:'',error:false,requerido:false},
            mensajes:{},
            editar:false,
            cargando:false,
        },
        direccion_facturacion: {
            direccion: {data:{direccionCompleta:''},error:false,requerido:false},
            telefono: {data:'+569',error:false,requerido:true},
            mensajes:{},
            editar:false,
            cargando:false,
        },
        libreriaCargada:false,
    };
  },
  beforeMount() {
    if(!this.usuarioCarroCompra())
        this.$router.replace({ path: '/ingresar' })
  },
  async mounted() {
    /** IMPORTAR LIBRERIA GOOGLE MAPS PARA EL AUTOCOMPLETE DE LAS DIRECCIONES */
    await helpers.importarLibereriaGoogleMaps();
    this.libreriaCargada = true;


  },
  methods:{
    /** OBTIENE LOS DATOS DEL INPUT DIRECCIÓN CON INFORMACIÓN DE GOOGLE */
    obtenerDireccionDespacho(data) {

      const region = RegionesYComunas.find(region => {
        return region.name == data.administrative_area_level_1
      });

      this.direccion_despacho.error = "";

      const direccion = {
          region:region.region_iso_3166_2 ?? data.administrative_area_level_1 ,
          ciudad:data.administrative_area_level_3 ?? data.administrative_area_level_2,
          comuna:data.locality,
          pais:data.country,
          latitud:data.latitude,
          longitud:data.longitude,
          calle:data.route,
          numero: data.street_number ?? '0',
          direccionCompleta : ''
      };

      if(direccion.calle)
        direccion.direccionCompleta += direccion.calle;
    if(direccion.numero && direccion.numero != 0)
        direccion.direccionCompleta += " "+direccion.numero;
      if(direccion.ciudad)
        direccion.direccionCompleta += ", "+direccion.ciudad;
      if(direccion.pais)
        direccion.direccionCompleta += ", "+direccion.pais;

      this.direccion_despacho.direccion.data = direccion;
    },

    /** OBTIENE LOS DATOS DEL INPUT DIRECCIÓN CON INFORMACIÓN DE GOOGLE */
    obtenerDireccionFacturacion(data) {

        const region = RegionesYComunas.find(region => {
            return region.name == data.administrative_area_level_1
        });

        this.direccion_facturacion.error = "";

        const direccion = {
            region:region.region_iso_3166_2 ?? data.administrative_area_level_1 ,
            ciudad:data.administrative_area_level_3 ?? data.administrative_area_level_2,
            comuna:data.locality,
            pais:data.country,
            latitud:data.latitude,
            longitud:data.longitude,
            calle:data.route,
            numero: data.street_number ?? '0',
            direccionCompleta : ''
        };

        if(direccion.calle)
            direccion.direccionCompleta += direccion.calle;
        if(direccion.numero && direccion.numero != 0)
            direccion.direccionCompleta += " "+direccion.numero;
        if(direccion.ciudad)
            direccion.direccionCompleta += ", "+direccion.ciudad;
        if(direccion.pais)
            direccion.direccionCompleta += ", "+direccion.pais;

        this.direccion_facturacion.direccion.data = direccion;
    },

    async actualizarDireccionFacturacion(){
        this.direccion_facturacion.mensajes = {};
        if(!this.direccion_facturacion.direccion.data.direccionCompleta){
            this.direccion_facturacion.mensajes.error = 'Debes indicar una dirección válida';
            return false;
        }
        this.direccion_facturacion.cargando = true;
        const respuesta = await this.actualizar_billing_usuario({
            direccion:this.direccion_facturacion.direccion.data,
            id: this.usuarioCarroCompra().id,
        })
        this.direccion_facturacion.cargando = false;
        this.direccion_facturacion.mensajes[respuesta.tipo] = respuesta.mensaje;

    },

    async actualizarDireccionDespacho(){
        this.direccion_despacho.mensajes = {};
        if(!this.direccion_despacho.direccion.data.direccionCompleta){
            this.direccion_despacho.mensajes.error = 'Debes indicar una dirección válida';
            return false;
        }
        this.direccion_despacho.cargando = true;
        const respuesta = await this.actualizar_shipping_usuario({
            direccion:this.direccion_despacho.direccion.data,
            id: this.usuarioCarroCompra().id,
            comentario_direccion: this.direccion_despacho.comentario_direccion.data,
        })
        this.direccion_despacho.cargando = false;
        this.direccion_despacho.mensajes[respuesta.tipo] = respuesta.mensaje;

    },
  }
};
</script>