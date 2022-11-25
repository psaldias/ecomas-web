

<template>
  <main class="noticias">
    <div class="wrapper">
        <div class="columns is-centered is-gapless">
            <div class="column is-10-fullhd is-11-desktop is-12-mobbile">
                <div class="columns is-variable is-centered is-0-mobile">
                    <div class="column is-6">

                        <div class="card height-100 p-5">
                            <h4 class="primero mb-5">Recuperar Contraseña</h4>
                            <p>Introduce una nueva contraseña.</p>
                            <form action="#" @submit.prevent="enviar">
                                <div class="block">
                                    <div class="field">
                                        <Mensajes :mensajes="mensajes"></Mensajes>
                                    </div>
                                    <div class="field">
                                        <label for="" class="label">Nueva Contraseña</label>
                                        <div class="control has-icons-left">
                                            <input type="password" class="input" placeHolder="******" v-model="password">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-key gris2"></i>
                                            </span>
                                        </div>
                                        <p class="is-size-7 mt-1">Mínimo 6 caracteres</p>
                                    </div>
                                    <div class="field">
                                        <label for="" class="label">Vuelve a introducir tu nueva contraseña</label>
                                        <div class="control has-icons-left">
                                            <input type="password" class="input" placeHolder="******" v-model="re_password">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-key gris2"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-text-right">
                                            <div class="columns is-gapless is-justify-content-flex-end">
                                                <div class="column is-5">
                                                    <CargandoSeccion v-if="cargando" ></CargandoSeccion>
                                                    <button v-if="!cargando" type="submit" class="button button-1 bg-primero has-text-white is-fullwidth">Continuar</button>
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
  </main>
</template>



<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import Mensajes from '/src/components/general/Mensajes.vue';
import FormularioLogin from '/src/components/formulario/FormularioLogin.vue';
import FormularioRegistroEmail from "/src/components/formulario/FormularioRegistroEmail.vue";
import CargandoSeccion from "../components/general/CargandoSeccion.vue";

export default {
  data() {
    return {
        password:'',
        re_password:'',
        id:'',
        key:'',
        mensajes:{},
        storeCarroCompra: useCarroCompraStore(),
        cargando:false,
    };
  },
  mounted(){
    if (!this.$route.query.key || !this.$route.query.id) {
      this.$router.replace({ path: "/ingresar" });
      return false;
    }

    this.key = this.$route.query.key;
    this.id = this.$route.query.id;



  },
  computed: {
  },
  methods: {
    async enviar(){
        this.mensajes = {};
        if(this.password.length < 6){
            this.mensajes.error = 'Contraseña muy corta.';
            return false;
        }else if(this.password != this.re_password){
            this.mensajes.error = 'Las contraseñas no coinciden.';
            return false;
        }

        this.cargando = true;
        let respuesta = await this.actualizarPassword(this.id,this.key,this.password);
        this.mensajes = respuesta;
        this.cargando = false;
    },

    limpiarMensajes(){
        this.mensajes = {
            exito:'',
            error:'',
        }
    }
  },
  components: { Mensajes, FormularioLogin, FormularioRegistroEmail, CargandoSeccion },
};
</script>
