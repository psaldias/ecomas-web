<template>

  <div class="columns is-gapless is-centered">
    <div class="column is-6-desktop is-8-tablet">
        <div class="card card-compra-rapida card-datos">

            <div class="columns is-vcentered is-mobile">
              <div class="column imagen is-2 pl-0">
              </div>
              <div class="column is-1 is-hidden-mobile"></div>
              <div class="column contenido has-text-centered-mobile">
                <h2 class="mb-4">Tus Datos</h2>


                <article class="message is-danger my-2 is-small" v-if="error">
                  <div class="message-body">
                    {{error}}
                  </div>
                </article>

                <div class="field mb-4 ">
                  <label class="primero">Ingresa tu nombre</label>

                  <div class="control">
                    <input type="text" class="input input-2 " v-model.number="nombre"  />
                  </div>
                </div>

                <div class="field mb-4 ">
                  <label class="primero">Ingresa tu Email</label>
                  <div class="control">
                    <input type="email" class="input input-2 " v-model.number="email" :class="{'disabled':this.usuarioCarroCompra()}"  :readonly="this.usuarioCarroCompra()"/>
                  </div>
                </div>

                <label class="primero">Ingresa tu teléfono</label>
                <div class="field">
                  <p class="control has-icons-left">
                    <input class="input input-2 pl-6" type="text"   v-model.number="telefono"  @keypress="soloNumeros">
                    <span class="icon is-left ">
                      +569
                    </span>
                  </p>
                </div>


                <div class="block has-text-right-tablet">
                <a href="#" class="button is-rounded is-small button-icono px-5" @click.prevent="validar()">
                  Continuar
                </a>
                </div>
              </div>
              <div class="column is-1 is-hidden-mobile"></div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import helpers from '../../utils/helpers';
import { useCarroCompraStore } from '/src/stores/carroCompra'
export default {
  data() {
    return {
      email:'',
      nombre:'',
      telefono:'',
      error:'',
      storeCarroCompra:useCarroCompraStore(),
    };
  },
  mounted () {
    /** COMPLETAR TELEFONO SI YA LO INGRESÓ ANTES O SI ESTÁ REGISTRADO */
    console.log(this.usuarioCarroCompra().user_email);
    this.telefono = (this.storeCarroCompra.compraRapida.telefono != '') ? this.storeCarroCompra.compraRapida.telefono : ((this.usuarioCarroCompra())? this.usuarioCarroCompra().billing.phone : '') ;
    this.nombre = (this.storeCarroCompra.compraRapida.nombre != '') ? this.storeCarroCompra.compraRapida.nombre : ((this.usuarioCarroCompra())? this.usuarioCarroCompra().user_display_name : '') ;
    this.email = (this.storeCarroCompra.compraRapida.email != '') ? this.storeCarroCompra.compraRapida.email :  ((this.usuarioCarroCompra())? this.usuarioCarroCompra().user_email: '') ;


  },
  computed: {},
  methods: {
    validar(){
      if(!this.telefono){
        this.error = "Debes indicar un número de teléfono";
      }else if(!this.nombre){
        this.error = "Debes ingresar tu nombre";
      }else if(!this.email || !helpers.validateEmail(this.email)){
        this.error = "Debes ingresar un email válido";
      }else{
        this.storeCarroCompra.actualizarCompraRapida(this.telefono,'telefono');
        this.storeCarroCompra.actualizarCompraRapida(this.nombre,'nombre');
        this.storeCarroCompra.actualizarCompraRapida(this.email,'email');
        this.$router.push({ path: '/compra-rapida/direccion' })
      }
      return false;
    },
    soloNumeros ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
          $event.preventDefault();
      }
    }
  },
};
</script>
