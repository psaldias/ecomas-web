

<template>
    <form action="#" @submit.prevent="iniciarRegistro()">
        <div class="block">
            <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                    <input type="text" class="input" placeHolder="nombre@contacto.cl" v-model="email">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope gris2"></i>
                    </span>
                </div>
            </div>
            <div class="field">
                <Mensajes :mensajes="mensajes"></Mensajes>
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
    <!-- <div class="columns mt-6 py-0">
        <div class="column py-0">
            <a href="#"><img src="/img/btn-facebook.jpg" alt="" class="is-block"></a>
        </div>
        <div class="column py-0">
            <a href="#"><img src="/img/btn-google.jpg" alt="" class="is-block"></a>
        </div>
    </div> -->
</template>



<script>
import Mensajes from '/src/components/general/Mensajes.vue';
import CargandoSeccion from '../general/CargandoSeccion.vue';
import {useUsuarioRegistroStore} from '/src/stores/usuarioRegistro'

  export default {
    data() {
      return {
          email:'',
          mensajes:{},
          cargando:false,
          storeUsuario: useUsuarioRegistroStore(),
      };
    },
    mounted(){
        this.email = this.storeUsuario.usuario.email ?? '';
    },
    methods: {
      async iniciarRegistro(){
        this.limpiarMensajes();
        if(!this.email){
            this.mensajes.error="Debes indicar un Email";
            return;
        }
        if(!this.validateEmail(this.email)){
            this.mensajes.error="Debes indicar un Email Válido";
            return;
        }
        this.cargando=true;

        let respuesta = await this.validarEmailRegistro(this.email);
        this.mensajes = respuesta;

        this.cargando=false;
        if(respuesta.tipo == 'exito'){
            this.storeUsuario.guardarDato('email',this.email);
            this.$router.push({ name: 'Registro' });
        }
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
