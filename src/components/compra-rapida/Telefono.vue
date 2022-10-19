<template>

  <div class="columns is-gapless is-centered">
    <div class="column is-6-desktop is-8-tablet">
        <div class="card card-compra-rapida card-telefono">

            <div class="columns is-vcentered is-mobile">
              <div class="column imagen is-3 pl-0">
              </div>
              <div class="column is-1 is-hidden-mobile"></div>
              <div class="column contenido has-text-centered-mobile">
                <h2>Cual es tu teléfono</h2>
                <h3 class="mb-1">Ingresa tu número de teléfono</h3>

                <article class="message is-danger my-2 is-small" v-if="error">
                  <div class="message-body">
                    {{error}}
                  </div>
                </article>

                <div class="field mb-5 columns is-mobile is-gapless is-centered-mobile ">
                  <div class="column is-narrow mr-2  " >
                    <input type="text" class="input input-2" value="+569" readonly style="width:55px;padding:0;">
                  </div>
                  <div class="column is-narrow">
                    <input type="text" class="input input-2 " v-model.number="telefono"  @keypress="soloNumeros">
                  </div>
                </div>

                <div class="block has-text-right-tablet">
                <a href="#" class="button is-rounded is-small button-icono px-5" @click.prevent="validarTelefono()">
                  Continuar
                </a>
                </div>
              </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import { useCarroCompraStore } from '/src/stores/carroCompra'
export default {
  data() {
    return {
      telefono:'',
      error:'',
      storeCarroCompra:useCarroCompraStore(),
    };
  },
  mounted () {
    /** COMPLETAR TELEFONO SI YA LO INGRESÓ ANTES O SI ESTÁ REGISTRADO */
    if(this.storeCarroCompra.compraRapida.telefono){
      this.telefono = this.storeCarroCompra.compraRapida.telefono;

    }else if(this.usuarioCarroCompra()){
      this.telefono = this.usuarioCarroCompra().billing.phone;
    }

  },
  computed: {},
  methods: {
    validarTelefono(){
      if(!this.telefono){
        this.error = "Debes indicar un número de teléfono";
      }else{
        this.storeCarroCompra.actualizarCompraRapida(this.telefono,'telefono');
        this.$router.push({ path: '/compra-rapida/direccion' })
      }
      return false;
    },
    soloNumeros ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
          $event.preventDefault();
      }
    }
  },
};
</script>
