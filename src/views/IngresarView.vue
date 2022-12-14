

<template>
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

                            <!-- <GoogleSignInButton
                            @success="handleLoginSuccess"
                            @error="handleLoginError"
                        ></GoogleSignInButton> -->

                        <!-- <GoogleLogin :callback="handleLoginSuccess"/> -->
                        <!-- <div id="g_id_onload"
                            data-client_id="546617116065-4m1ccp46ds69q8u1an510i6ht5tet68o.apps.googleusercontent.com"
                            data-login_uri="http://localhost:5173/ingresar"
                            data-auto_prompt="false">aaaaa
                        </div>
                        <div class="g_id_signin"
                            data-type="standard"
                            data-size="large"
                            data-theme="outline"
                            data-text="sign_in_with"
                            data-shape="rectangular"
                            data-logo_alignment="left">bbbb
                        </div> -->



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
import Mensajes from '/src/components/general/Mensajes.vue';
import FormularioLogin from '/src/components/formulario/FormularioLogin.vue';
import FormularioRegistroEmail from "/src/components/formulario/FormularioRegistroEmail.vue";

export default {
  data() {
    return {
        login:{
            email:'',
            password:'',
        },
        mensajes:{},
        mensajesRegistro:{},
        storeCarroCompra: useCarroCompraStore(),
    };
  },
  created(){

      if(this.storeCarroCompra.usuarioCarroCompra)
          this.$router.push({ path: '/mi-cuenta/' });
  },
  mounted(){
  },
  computed: {
  },
  methods: {

    async registrarse(){
        let respuesta = await this.validarEmailRegistro(this.login.email,this.login.password);
        this.$router.push({ name: 'Registro' });
    },
    handleLoginSuccess(response){
        const { credential } = response;
        console.log(response);
        console.log("Access Token", credential);

    },
    handleLoginError(){
        console.error("Login failed");

    },

    limpiarMensajes(){
        this.mensajes = {
            exito:'',
            error:'',
        }
    }
  },
  components: { Mensajes, FormularioLogin, FormularioRegistroEmail },
};
</script>
