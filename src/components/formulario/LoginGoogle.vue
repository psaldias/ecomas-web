<template>
    <div class="column has-text-centered " v-if="store_opciones_generales.ingreso_con_google.activo && store_opciones_generales.ingreso_con_google.id ">
        <div v-if="!cargando_google" class="is-inline-block">
            <div id="buttonDiv" class="is-inline-block">
                <img src="/img/btn-facebook.jpg" alt="" class="is-block" />
            </div>
            <!-- <div class="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left">
            </div> -->
        </div>
        <CargandoSeccion v-if="cargando_google"></CargandoSeccion>
    </div>
</template>

  <script>
    import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
    import Mensajes from '/src/components/general/Mensajes.vue';
    import CargandoSeccion from "../general/CargandoSeccion.vue";
    import helpers from '../../utils/helpers';

    export default {
        data() {
            return {
                store_opciones_generales: useOpcionesGeneralesStore(),
                mensajes:{},
                cargando:false,
                cargando_google:false,
            };
        },
        async mounted(){
            if(this.store_opciones_generales.ingreso_con_google.activo && this.store_opciones_generales.ingreso_con_google.id){
                /** IMPORTAR LIBRERIA GOOGLE MAPS PARA EL AUTOCOMPLETE DE LAS DIRECCIONES */
                await helpers.importarLibereriaGoogleGsi();

                google.accounts.id.initialize({
                    client_id: this.store_opciones_generales.ingreso_con_google.id,
                    callback: this.handleCredentialResponse
                });
                google.accounts.id.renderButton(
                    document.getElementById("buttonDiv"),
                    { size: "normal",  width:"100" }  // customization attributes
                );
                // google.accounts.id.prompt(); // also display the One Tap dialog
            }


        },
        methods: {
            async handleCredentialResponse(response) {
                this.cargando = true;
                this.cargando_google = true;
                let respuesta = await this.loginGoogle(response.credential);
                if(respuesta.tipo == 'exito')
                    this.$router.replace({ path: '/mi-cuenta/' });

                this.cargando = false;
                this.cargando_google = false;
                // console.log("Encoded JWT ID token: " + response.credential, response);
                // console.log(respuesta);
            },
        limpiarMensajes(){
            this.mensajes = {
                exito:'',
                error:'',
            }
        }
        },
        components: { Mensajes, CargandoSeccion },
    };
</script>
