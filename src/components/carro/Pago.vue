<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column ">
      <div class="card pago ">
        <h4 class="primero mb-4">MÉTODO DE PAGO</h4>
          <div class="control mb-2 metodo">
            <label class="radio">
              <input type="radio" name="metodo-pago">
              <span class="imagen"><img src="/img/webpay.png" alt=""> </span>  Transbank Webpay Plus
            </label>
          </div>


          <div class="control metodo">
            <label class="radio">
              <input type="radio" name="metodo-pago">
              <span class="imagen"><img src="/img/mercado-pago.png" alt=""> </span> Mercado Pago
            </label>
          </div>

          <div class="content is-size-6 mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare elit auctor turpis pretium tempus. Duis volutpat quam sit amet nunc tincidunt vestibulum. Curabitur feugiat, tortor ut euismod pharetra, erat metus tempus turpis, sit amet accumsan ipsum ex at orci. Integer pellentesque ullamcorper risus, <router-link to="/terminos-y-condiciones/" class="primero">Terminos y Condiciones</router-link>


        </div>


      </div>
    </div>
    <div class="column is-4">

      <BoxDespacho></BoxDespacho>
      <BoxTotales :boton="false"></BoxTotales>
    </div>
  </div>
</template>

<script>
import BoxDespacho from './BoxDespacho.vue';
import BoxTotales from './BoxTotales.vue';
import InputCheck from '../formulario/InputCheck.vue';
export default {
    data() {
        return {};
    },
    computed: {},
    methods: {},
    components: { BoxDespacho, BoxTotales, InputCheck }
};
</script>
