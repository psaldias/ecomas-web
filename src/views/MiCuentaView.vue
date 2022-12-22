

<template>
  <main class="mi-cuenta">
    <div class="wrapper" v-if="usuarioCarroCompra()">

        <BannerSeccion titulo="Mi Cuenta" imagen="/img/banner-mi-cuenta.jpg" />


        <div class="columns is-variable is-4-tablet mt-4">
            <div class="column menu is-narrow">
                <RouterLink to="/mi-cuenta/"  class="button button-3 is-block mb-2 active">
                    <i class=" mr-2 fa-solid fa-circle-user"></i> Mi información Personal
                </RouterLink>
                <RouterLink to="/mi-cuenta/direcciones"  class="button button-3 is-block mb-2">
                    <i class=" mr-2 fa-solid fa-location-dot"></i> Mis Direcciones
                </RouterLink>
                <RouterLink to="/pedidos/"  class="button button-3 is-block mb-2">
                   <i class=" mr-2 fa-solid fa-list-check"></i> Mis pedidos
                </RouterLink>
                <a @click.prevent="cerrarSesion()" class="button button-3 is-block">
                   <i class=" mr-2 fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión
                </a>
            </div>
            <div class="column">
                <h2 class="primero"><strong>Bienvenid@!.</strong> Aquí puedes gestionar tu información personal y pedidos.</h2>
                <div class="message  mt-4 is-ecomas">
                    <div class="message-header">
                        INFORMACIÓN PERSONAL
                        <a href="#" @click.prevent="informacion_personal.editar = !informacion_personal.editar" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                    </div>
                    <div class="message-body">
                        <div class="columns is-multiline is-variable is-6-desktop is-1-mobile" v-if="!informacion_personal.editar">
                            <div class="column is-narrow">
                                <strong class="primero">Nombre: </strong> <strong>{{ usuarioCarroCompra().user_first_name }}</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Apellidos: </strong> <strong>{{ usuarioCarroCompra().user_last_name }}</strong>
                            </div>
                        </div>
                        <form action="#" @submit.prevent="actualizarInformacionPersonal(1)" v-if="informacion_personal.editar">
                            <Mensajes :mensajes="informacion_personal.mensajes"></Mensajes>
                            <div class="columns is-variable">
                                <div class="column ">
                                    <div class="field">
                                        <label for="" class="primero has-text-weight-bold">Nombre</label>
                                        <input type="text"   class="input" v-model="informacion_personal.first_name">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="field">
                                        <label for="" class="primero has-text-weight-bold">Apellido Paterno</label>
                                        <input type="text"   class="input" v-model="informacion_personal.apellido_paterno">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="field">
                                        <label for="" class="primero has-text-weight-bold">Apellido Materno</label>
                                        <input type="text"   class="input" v-model="informacion_personal.apellido_materno">
                                    </div>
                                </div>
                            </div>

                            <div class="field has-text-right">
                                <button type="submit" class="button button-2 bg-primero" v-if="!informacion_personal.cargando">Actualizar</button>
                                <CargandoSeccion v-if="informacion_personal.cargando" class="small"></CargandoSeccion>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="message  mt-4 is-ecomas ">
                    <div class="message-header">
                        CONTACTO
                        <a href="#" @click.prevent="billing.editar = !billing.editar" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                    </div>
                    <div class="message-body">
                        <div class="columns is-multiline">
                            <div class="column is-narrow">
                                <strong class="primero">Teléfono: </strong> <strong>{{ usuarioCarroCompra().billing.phone }}</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Email: </strong> <strong>{{ usuarioCarroCompra().user_email }}</strong>
                            </div>
                        </div>

                        <form action="#" @submit.prevent="actualizarBilling(1)" v-if="billing.editar">
                            <Mensajes :mensajes="billing.mensajes"></Mensajes>
                            <div class="columns is-variable">
                                <div class="column ">
                                    <div class="field">
                                        <label for="" class="primero has-text-weight-bold">Teléfono</label>
                                        <input type="text"   class="input" v-model="billing.phone"  @focus="moverCursor"  @keypress="validarInputTelefono" maxlength="12">
                                    </div>
                                </div>
                            </div>

                            <div class="field has-text-right">
                                <button type="submit" class="button button-2 bg-primero" v-if="!billing.cargando">Actualizar</button>
                                <CargandoSeccion v-if="billing.cargando" class="small"></CargandoSeccion>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="message  mt-4 is-ecomas">
                    <div class="message-header">
                        CONTRASEÑA
                        <a href="#" @click.prevent="password.editar = !password.editar" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                    </div>
                    <div class="message-body">
                        <div class="columns is-multiline">
                            <div class="column is-narrow">
                                <strong class="primero">Contraseña: </strong> <strong>xxxxxxxxx</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Confirmar Contraseña: </strong> <strong>xxxxxxx</strong>
                            </div>
                        </div>
                        <form action="#" @submit.prevent="actualizarPassword()" v-if="password.editar">
                            <Mensajes :mensajes="password.mensajes"></Mensajes>
                            <div class="columns is-variable">
                                <div class="column ">
                                    <div class="field">
                                        <label for="" class="primero has-text-weight-bold">Contraseña</label>
                                        <input type="password"   class="input" v-model="password.password">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="field">
                                        <label for="" class="primero has-text-weight-bold">Repetir Contraseña</label>
                                        <input type="password"   class="input" v-model="password.re_password">
                                    </div>
                                </div>
                            </div>

                            <div class="field has-text-right">
                                <button type="submit" class="button button-2 bg-primero" v-if="!password.cargando">Actualizar</button>
                                <CargandoSeccion v-if="password.cargando" class="small"></CargandoSeccion>
                            </div>
                        </form>
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

import helpers from '/src/utils/helpers';

export default {
  components: {
    BannerSeccion,
    CargandoSeccion,
    Mensajes
},
  data() {
    return {
        storeCarroCompra: useCarroCompraStore(),
        informacion_personal:{
            editar:false,
            mensajes:{},
            cargando:false,
            usuario_rut:'',
            first_name:'',
            apellido_paterno:'',
            apellido_materno:''
        },
        billing:{
            editar:false,
            mensajes:{},
            cargando:false,
            phone:''
        },
        password:{
            editar:false,
            mensajes:{},
            cargando:false,
            password:'',
            re_password:'',
        }
    };
  },
  beforeMount() {
    if(!this.usuarioCarroCompra())
        this.$router.replace({ path: '/ingresar' })
  },
  mounted() {
    this.informacion_personal.usuario_rut = this.usuarioCarroCompra().usuario_rut;
    this.informacion_personal.first_name = this.usuarioCarroCompra().user_first_name;
    this.informacion_personal.apellido_paterno = (this.usuarioCarroCompra())? this.usuarioCarroCompra().user_last_name.split(' ')[0] : '';
    this.informacion_personal.apellido_materno =  (this.usuarioCarroCompra())? this.usuarioCarroCompra()?.user_last_name.split(' ')[1] : '';
    this.billing.phone =  (this.usuarioCarroCompra())? this.usuarioCarroCompra().billing.phone : '';
  },
  methods:{
    async actualizarInformacionPersonal(){
        this.informacion_personal.cargando = true;
        const respuesta = await this.actualizar_usuario({
            first_name:this.informacion_personal.first_name,
            last_name:this.informacion_personal.apellido_paterno+" "+this.informacion_personal.apellido_materno,
            meta:{billing_phone:"1111111",usuario_rut:'123123123'},
        })
        this.informacion_personal.cargando = false;
        this.informacion_personal.mensajes[respuesta.tipo] = respuesta.mensaje;


    },
    async actualizarBilling(){
        this.billing.cargando = true;
        this.billing.mensajes = {};
        if( !helpers.validarTelefono(this.billing.phone.toString())){
            this.billing.mensajes.error = "Formato Teléfono Incorrecto";
            this.billing.cargando = false;
            return false;
        }
        const respuesta = await this.actualizar_billing_usuario({
            billing_phone: this.billing.phone,
            id: this.usuarioCarroCompra().id,
        })
        this.billing.cargando = false;
        this.billing.mensajes[respuesta.tipo] = respuesta.mensaje;
    },
    async actualizarPassword(){
        this.password.mensajes = {};
        if(this.password.password.length < 6){
            this.password.mensajes.error='La contraseña debe tener un largo mínimo de 6 caracteres'
        }
        if(this.password.password != this.password.re_password){
            this.password.mensajes.error='Las contraseñas no coinciden.'
        }
        this.password.cargando = true;
        const respuesta = await this.actualizar_usuario({
            password: this.password.password,
        })
        this.password.cargando = false;
        this.password.mensajes[respuesta.tipo] = respuesta.mensaje;
    },
    validarInputTelefono ($event) {
      helpers.validarInputTelefono($event);
    },
    moverCursor($event){
      const largo = $event.target.value.toString().length;
      $event.target.setSelectionRange (largo,largo)
    }
  }
};
</script>