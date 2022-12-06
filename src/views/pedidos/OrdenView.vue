<template>
  <main class="pedidos">
    <div class="wrapper">
      <div class="columns is-centered is-gapless"  v-if="!cargando">
        <div class="column is-10-fullhd is-12-desktop">
          <Mensajes :mensajes="mensajes" class="mb-4"></Mensajes>
          <div class="pedido" v-if="ordenActiva">
            <h2 class="primero"><strong>DETALLE PEDIDO</strong></h2>

            <div class="columns is-gapless mt-4">
              <div class="column is-narrow">
                <strong class="primero">N° Pedido:</strong> {{ ordenActiva.number }}
              </div>
              <div class="column is-1"></div>
              <div class="column has-text-right-desktop" v-if="ordenActiva.date_paid">
                <strong class="primero">Fecha Pago:</strong>
                {{ (ordenActiva.date_paid) }}
              </div>
              <!-- <div class="column has-text-right-desktop">
                        <strong class="primero ">24 Bolsas /</strong> Fecha  de entrega: 08 y 09 de Julio
                    </div> -->
            </div>


            <div class="card p-4">
              <div class="columns">
                <div class="column is-3-desktop is-12-mobile">
                  <div v-if="ordenActiva.billing.address_1">
                    <h5 class="primero mb-2"><strong>Datos del cliente</strong></h5>
                    <div class="block is-size-6 mb-4">
                      {{
                        ordenActiva.billing.first_name +
                        " " +
                        ordenActiva.billing.last_name
                      }}<br />
                      {{ ordenActiva.billing.address_1 }}<br />
                      {{ ordenActiva.billing.address_2 }}<br />
                      {{ ordenActiva.billing.city }}<br />
                      {{ ordenActiva.billing.phone }}<br />
                      {{ ordenActiva.billing.email }}<br />
                      {{ ordenActiva.billing.company }}<br />
                      {{ obtenerDatoMetaData("billing_giro") }}<br />
                    </div>
                  </div>

                  <div v-if="ordenActiva.shipping.address_1">
                    <h5 class="primero mb-2"><strong>Datos de Envío</strong></h5>
                    <div class="block is-size-6 mb-4">
                      <div v-if="obtenerDatoMetaData('fecha_entrega')">
                        Fecha Entrega: {{ obtenerDatoMetaData("fecha_entrega") }}<br />
                      </div>
                      {{
                        ordenActiva.shipping.first_name +
                        " " +
                        ordenActiva.shipping.last_name
                      }}<br />
                      {{ ordenActiva.shipping.address_1 }}<br />
                      {{ ordenActiva.shipping.address_2 }}<br />
                      {{ ordenActiva.shipping.city }}<br />
                      {{ ordenActiva.billing.email }}<br />
                    </div>
                  </div>

                  <div v-if="ordenActiva.customer_note">
                    <h5 class="primero mb-2"><strong>Información Adicional</strong></h5>
                    <div class="block is-size-6" v-html="ordenActiva.customer_note.replace(/\n/g, '<br />')">

                    </div>
                  </div>
                </div>
                <div class="column is-5-desktop is-12-mobile" >
                  <h5 class="primero mb-2"><strong>Detalles del pedido</strong></h5>
                  <div class="block is-size-6">
                    <table class="table is-fullwidth">
                      <tr
                        v-for="producto in ordenActiva.items"
                        :key="producto.product_id"
                      >
                        <td>
                          <b class="primero">{{ producto.product_name }}</b> x
                          {{ producto.quantity }}
                        </td>
                        <td class="has-text-right">
                          {{ monedaChilena(producto.subtotal) }}
                        </td>
                      </tr>
                      <tr>
                        <td>Subtotal:</td>
                        <td class="has-text-right">
                          {{ monedaChilena(ordenActiva.subtotal) }}
                        </td>
                      </tr>
                      <tr v-if="ordenActiva.discount_total != '0'">
                        <td>Descuento:</td>
                        <td class="has-text-right">
                          -{{ monedaChilena(ordenActiva.discount_total) }}
                        </td>
                      </tr>
                      <tr>
                        <td>Envio:</td>
                        <td class="has-text-right">
                          {{ monedaChilena(ordenActiva.shipping_total) }}
                        </td>
                      </tr>
                      <tr>
                        <td>Método de pago:</td>
                        <td class="has-text-right">
                          {{ ordenActiva.payment_method_title }}
                        </td>
                      </tr>
                      <tr class="primero has-text-weight-bold">
                        <td>Total:</td>
                        <td class="has-text-right">
                          {{ monedaChilena(ordenActiva.total) }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="column is-4-desktop is-12-mobile" v-if="ordenActiva.status == 'failed'">
                  <a @click.prevent="reintentarPago" class="btn w-100 has-text-centered bg-primero">
                    Volver a intentar el pago
                  </a>
                </div>
                <div class="column is-4-desktop is-12-mobile" v-if="ordenActiva.status != 'failed'">
                  <h5 class="primero mb-2"><strong>Detalles del pago</strong></h5>
                  <div class="block is-size-6">
                    <table class="table is-fullwidth">
                      <tr>
                        <td>Respuesta de la Transacción:</td>
                        <td class="has-text-right">
                          {{ obtenerDatoMetaData("transactionResponse") }}
                        </td>
                      </tr>
                      <tr>
                        <td>Orden de Compra:</td>
                        <td class="has-text-right">
                          {{ obtenerDatoMetaData("buyOrder") }}
                        </td>
                      </tr>
                      <tr>
                        <td>Código de autorización:</td>
                        <td class="has-text-right">
                          {{ obtenerDatoMetaData("authorizationCode") }}
                        </td>
                      </tr>
                      <tr>
                        <td>Número de tarjeta:</td>
                        <td class="has-text-right">
                          **** **** **** {{ obtenerDatoMetaData("cardNumber") }}
                        </td>
                      </tr>
                      <tr>
                        <td>Tipo de pago:</td>
                        <td class="has-text-right">{{ tipoPago() }}</td>
                      </tr>
                      <tr>
                        <td>Tipo de cuota:</td>
                        <td class="has-text-right">{{ tipoCuota() }}</td>
                      </tr>
                      <tr>
                        <td>Número de cuotas:</td>
                        <td class="has-text-right">
                          {{ obtenerDatoMetaData("installmentsNumber") }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="card seguimiento">

                    <div class="columns is-gapless pasos has-text-centered is-centered">
                        <div class="column is-3-desktop is-12-mobile ">
                            <div class="numero active">
                                <span>1</span>
                            </div>
                            <h4>EN PREPARACIÓN</h4>
                            <p>El vendedor esta preparando tus bolsas de pellets</p>
                        </div>
                        <div class="column is-3-desktop  is-12-mobile active">
                            <div class="numero">
                                <span>2</span>
                            </div>
                            <h4>EN CAMINO</h4>
                            <p>El vendedor despachó tu paquete.</p>
                        </div>
                        <div class="column is-3-desktop  is-12-mobile">
                            <div class="numero">
                                <span>3</span>
                            </div>
                            <h4>EN VIAJE</h4>
                            <p>04/07/2022<br>Llega entre el 08 y 09 de Julio</p>
                        </div>
                        <div class="column is-3-desktop is-12-mobile">
                            <div class="numero">
                                <span>4</span>
                            </div>
                            <h4>ENTREGA</h4>
                            <p>Tu pedido fue entregado con éxito</p>
                        </div>
                    </div>
                </div> -->
          </div>
        </div>
      </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>

    </div>
  </main>
</template>

<script>
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import Mensajes from "/src/components/general/Mensajes.vue";
export default {
  data() {
    return {
      cargando: true,
      ordenActiva: false,
      mensajes:{}
    };
  },
  async mounted() {
    if (!this.$route.query.id || !this.$route.query.key) {
      this.$router.replace({ path: "/" });
      return false;
    }

    const respuesta = await this.obtenerPedido(
      this.$route.query.id,
      this.$route.query.key
    );

    if (respuesta.status == 200 && respuesta.data){ this.ordenActiva = respuesta.data}
    else  this.mensajes.error = "No existe el pedido";

    this.cargando = false;

    document.title = 'Orden #'+this.ordenActiva.id;

    if(this.ordenActiva.status == 'failed'){
      this.mensajes.error = 'Transacción fallida. Puedes volver a intentar el pago'
    }

    const tipo_compra = this.obtenerDatoMetaData("tipo_compra");
    if(tipo_compra == 'normal' && this.ordenActiva.status != 'failed'){
      this.limpiarCarro();
    }
  },
  computed:{
    urBackEnd(){
      return import.meta.env.VITE_ENDPOINT_BACKEND;
    },
    metodo_pago(){
      return this.obtenerDatoMetaData("metodo_pago") ?? false;
    }
  },
  methods: {
    async reintentarPago(){
      this.cargando = true;

      if(!this.metodo_pago){
        this.mensajes.error = 'No se pudo volver a intentar';
        this.cargando = false;
        return false;
      }
      const respuesta = await this.obtenerUrlPago(this.ordenActiva.id,this.metodo_pago);
      if(respuesta.result != 'success'){
          this.mensajes.error = 'Ocurrio un error';
          this.cargando = false;
        }else{
          window.location.href = respuesta.redirect;
        }

    },
    obtenerDatoMetaData(key = false) {
      if (key && this.ordenActiva) {
        const dato = this.ordenActiva.meta_data.find((meta_data) => {
          return meta_data.key == key;
        });
        if (dato) return dato.value;
      }
      return "";
    },
    tipoPago() {
      if (this.ordenActiva && this.ordenActiva.status != 'failed') {
        let webpay_response = this.obtenerDatoMetaData("webpay_rest_response");
        webpay_response = JSON.parse(webpay_response);
        switch (webpay_response.paymentTypeCode) {
          case "VD":
            return "Débito";
            break;

          default:
            return "Crédito";
            break;
        }
      }
      return false;
    },
    tipoCuota() {
      if (this.ordenActiva && this.ordenActiva.status != 'failed') {
        let webpay_response = this.obtenerDatoMetaData("webpay_rest_response");
        webpay_response = JSON.parse(webpay_response);
        switch (webpay_response.paymentTypeCode) {
          case "VD":
            return "Venta Débito";
            break;
          case "VN":
            return "Venta Normal";
            break;
          case "VC":
            return "Venta en cuotas";
            break;
          case "SI":
            return "3 cuotas sin interés";
            break;
          case "S2":
            return "2 cuotas sin interés";
            break;
          case "NC":
            return "N cuotas sin interés";
            break;
          default:
            return "Sin cuotas";
            break;
        }
      }
      return false;
    },
  },
  components: { CargandoSeccion, Mensajes },
};
</script>
