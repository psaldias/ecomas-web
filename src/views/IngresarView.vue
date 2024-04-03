<template>
    <div v-if="!cargando">
        <main class="noticias" v-if="!storeCarroCompra.usuarioCarroCompra">
            <div class="wrapper">
                <div class="columns is-centered is-gapless">
                    <div class="column is-10-fullhd is-11-desktop is-12-mobbile">
                        <div class="columns is-variable is-0-mobile">
                            <div class="column is-6">

                                <div class="card height-100 p-5">
                                    <h4 class="primero mb-5">¿No tienes cuenta? Regístrate ahora </h4>

                                    <FormularioRegistroEmail></FormularioRegistroEmail>


                                </div>
                            </div>

                            <div class="column is-6">
                                <div class="card height-100 p-5">
                                    <h4 class="primero mb-5">Iniciar Sesión</h4>
                                    <FormularioLogin></FormularioLogin>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    </div>
    <CargandoSeccion v-else></CargandoSeccion>
</template>



<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";
import Mensajes from '/src/components/general/Mensajes.vue';
import FormularioLogin from '/src/components/formulario/FormularioLogin.vue';
import FormularioRegistroEmail from "/src/components/formulario/FormularioRegistroEmail.vue";

export default {
    data() {
        return {
            login: {
                email: '',
                password: '',
            },
            mensajes: {},
            mensajesRegistro: {},
            storeCarroCompra: useCarroCompraStore(),
            store_opciones_generales: useOpcionesGeneralesStore(),
        };
    },
    created() {

        if (this.storeCarroCompra.usuarioCarroCompra)
            this.$router.push({ path: '/mi-cuenta/' });
    },
    mounted() {
    },
    computed: {
        cargando() {
            return this.store_opciones_generales.cargando;
        },
    },
    methods: {

        async registrarse() {
            let respuesta = await this.validarEmailRegistro(this.login.email, this.login.password);
            this.$router.push({ name: 'Registro' });
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
