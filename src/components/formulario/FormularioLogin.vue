<template>
    <form action="#">
        <div class="block">
            <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                    <input type="text" class="input" placeHolder="nombre@contacto.cl" v-model="login.email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope gris2"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <label for="" class="label">Contraseña</label>
                <div class="control has-icons-left">
                    <input type="password" class="input" placeHolder="******" v-model="login.password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock gris2"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <Mensajes :mensajes="mensajes"></Mensajes>
            </div>
            <div class="field">
                <div class="control has-text-right">
                    <div class="columns is-variable is-1 is-justify-content-space-between">
                        <div class="column is-narrow is-hidden-mobile">
                            <router-link to="/mi-cuenta/recuperar" class="button button-1 bg-verde has-text-white is-fullwidth ">Olvidé mi Contraseña</router-link>
                        </div>
                        <div class="column is-5">
                        <CargandoSeccion v-if="cargando" ></CargandoSeccion>
                        <a v-if="!cargando"  @click.prevent="loginFormulario()" class="button button-1 bg-primero has-text-white is-fullwidth ">Continuar</a>
                        </div>
                        <div class="column is-narrow is-hidden-tablet">
                            <router-link to="/mi-cuenta/recuperar" class="button button-1 bg-verde has-text-white is-fullwidth ">Olvidé mi Contraseña</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns is-variable is-1 is-gapless is-vcentered" >
            <LoginGoogle v-if="store_opciones_generales.ingreso_con_google.activo && store_opciones_generales.ingreso_con_google.id " ></LoginGoogle>
            <LoginFacebook></LoginFacebook>
        </div>
    </form>
</template>

  <script>
    import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
    import Mensajes from '/src/components/general/Mensajes.vue';
    import CargandoSeccion from "../general/CargandoSeccion.vue";
    import helpers from '../../utils/helpers';
import LoginGoogle from "./LoginGoogle.vue";
import LoginFacebook from "./LoginFacebook.vue";

    export default {
        data() {
        return {
            login:{
                email:'',
                password:'',
            },
            store_opciones_generales: useOpcionesGeneralesStore(),
            mensajes:{},
            cargando:false,
        };
        },
         mounted(){



        },
        methods: {

            async loginFormulario(){
                this.limpiarMensajes();

                if(!this.login.email || !this.login.password){
                    this.mensajes.error="Debes indicar un Usuario y Contraseña";
                    return;
                }
                if(!this.validateEmail(this.login.email)){
                    this.mensajes.error="Debes indicar un Email Válido";
                    return;
                }

                this.cargando = true;
                this.cargando_google = true;
                let respuesta = await this.loginUsuario(this.login.email,this.login.password);
                if(respuesta.tipo == 'exito')
                this.$router.replace({ path: '/mi-cuenta/' });

                this.mensajes[respuesta.tipo] = respuesta.mensaje;
                this.cargando = false;
                this.cargando_google = false;
            },

            limpiarMensajes(){
                this.mensajes = {
                    exito:'',
                    error:'',
                }
            }
        },
        components: { Mensajes, CargandoSeccion, LoginGoogle, LoginFacebook },
    };
</script>
