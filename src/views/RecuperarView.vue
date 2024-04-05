<template>
    <main class="noticias">
        <div class="wrapper" v-if="!cargandoApp">
            <div class="columns is-centered is-gapless">
                <div class="column is-10-fullhd is-11-desktop is-12-mobbile">
                    <div class="columns is-variable is-centered is-0-mobile">
                        <div class="column is-6">

                            <div class="card height-100 p-5">
                                <h4 class="primero mb-5">Recuperar Contraseña</h4>
                                <p>¿Perdiste tu contraseña? Por favor, introduce tu nombre de usuario o correo
                                    electrónico. Recibirás un enlace para crear una contraseña nueva por correo
                                    electrónico.</p>
                                <form action="#" @submit.prevent="enviar">
                                    <div class="block">
                                        <div class="field">
                                            <Mensajes :mensajes="mensajes"></Mensajes>
                                        </div>
                                        <div class="field">
                                            <label for="" class="label">Email</label>
                                            <div class="control has-icons-left">
                                                <input type="text" class="input" placeHolder="nombre@contacto.cl"
                                                    v-model="email">
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-envelope gris2"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <div class="control has-text-right">
                                                <div class="columns is-gapless is-justify-content-flex-end">
                                                    <div class="column is-5">
                                                        <CargandoSeccion v-if="cargando"></CargandoSeccion>
                                                        <button v-if="!cargando" type="submit"
                                                            class="button button-1 bg-primero has-text-white is-fullwidth">Continuar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>


                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
        <CargandoSeccion v-if="cargandoApp"></CargandoSeccion>
    </main>
</template>



<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import Mensajes from '/src/components/general/Mensajes.vue';
import FormularioLogin from '/src/components/formulario/FormularioLogin.vue';
import FormularioRegistroEmail from "/src/components/formulario/FormularioRegistroEmail.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";

export default {
    data() {
        return {
            email: '',
            mensajes: {},
            storeCarroCompra: useCarroCompraStore(),
            store_opciones_generales: useOpcionesGeneralesStore(),
            cargando: false,
        };
    },
    mounted() {
        if (this.storeCarroCompra.usuarioCarroCompra)
            this.$router.push({ path: '/mi-cuenta/' });
    },
    computed: {
        cargandoApp() {
            return this.store_opciones_generales.cargando;
        }
    },
    methods: {
        async enviar() {
            this.mensajes = {};
            this.cargando = true;
            let respuesta = await this.recuperarPassword(this.email);
            this.mensajes = respuesta;
            this.cargando = false;
        },

        limpiarMensajes() {
            this.mensajes = {
                exito: '',
                error: '',
            }
        }
    },
    components: { Mensajes, FormularioLogin, FormularioRegistroEmail, CargandoSeccion },
};
</script>
