<template>
  <main class="pedidos">
    <div class="wrapper">
      <div class="columns is-centered is-gapless">
        <div class="column is-10-fullhd is-12-desktop" v-if="!cargando">
          <div class="pedido" v-if="ordenActiva">
            <h2 class="primero"><strong>DETALLE PEDIDO</strong></h2>

            <div class="columns is-gapless mt-4">
              <div class="column is-narrow">
                <strong class="primero">N° Pedido:</strong> {{ ordenActiva.number }}
              </div>
              <div class="column is-1"></div>
              <div class="column has-text-right-desktop" v-if="ordenActiva.date_paid">
                <strong class="primero">Fecha Pago:</strong> {{ ordenActiva.date_paid }}
              </div>
              <!-- <div class="column has-text-right-desktop">
                        <strong class="primero ">24 Bolsas /</strong> Fecha  de entrega: 08 y 09 de Julio
                    </div> -->
            </div>

            <RastreoPedido
              :orden="ordenActiva"
              v-if="
                ordenActiva.status == 'completed' ||
                ordenActiva.status == 'processing' ||
                ordenActiva.status == 'facturado'
              "
            ></RastreoPedido>

            <div class="card p-4">
              <div class="columns">
                <div class="column is-3-desktop is-12-mobile">
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
                  </div>
                  <div v-if="ordenActiva.shipping.address_1">
                    <h5 class="primero"><strong>Datos de Envío</strong></h5>
                    <div class="block is-size-6 mb-4">
                      Fecha Entrega: {{ obtenerDatoMetaData("fecha_entrega") }}<br />
                      {{
                        ordenActiva.shipping.first_name +
                        " " +
                        ordenActiva.shipping.last_name
                      }}<br />
                      {{ ordenActiva.shipping.address_1 }}<br />
                      {{ ordenActiva.shipping.address_2 }}<br />
                      {{ ordenActiva.shipping.city }}<br />
                      {{ ordenActiva.shipping.email }}<br />
                    </div>
                  </div>
                  <div v-if="ordenActiva.customer_note">
                    <h5 class="primero mb-2"><strong>Información Adicional</strong></h5>
                    <div
                      class="block is-size-6"
                      v-html="ordenActiva.customer_note.replace(/\n/g, '<br />')"
                    ></div>
                  </div>
                </div>
                <div class="column is-5-desktop is-12-mobile">
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
                <div
                  class="column is-4-desktop is-12-mobile"
                  v-if="ordenActiva.status != 'failed'"
                >
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
          </div>

          <div class="table-container">
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th class="primero has-text-centered" width="8%">N°</th>
                  <th class="primero">Pedido</th>
                  <th class="has-text-centered">FECHA</th>
                  <th class="has-text-centered">PRECIO</th>
                  <th class="primero has-text-centered" width="10%">ESTADO</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pedido, index) in pedidosFiltrados" :key="pedido.id">
                  <td class="has-text-centered">{{ index + 1 }}</td>
                  <td class="primero">{{ pedido.number }}</td>
                  <td class="has-text-centered">
                    {{ fechaFormateada(pedido.date_created.date) }}
                  </td>
                  <td class="has-text-centered">{{ monedaChilena(pedido.total) }}</td>
                  <td>
                    <div
                      class="button button-2"
                      @click.prevent="cambiarPedidoActivo(pedido)"
                      :class="[pedido.status, order == pedido.id ? 'active' : '']"
                    >
                      <!-- {{pedido.status_html}} -->
                      VER ESTADO
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <CargandoSeccion v-if="cargando"></CargandoSeccion>
      </div>
    </div>
  </main>
</template>

<script>
import RastreoPedido from "../components/carro/RastreoPedido.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
export default {
  data() {
    return {
      cargando: true,
      pedidos: false,
      order: false,
    };
  },
  beforeMount() {
    if (!this.usuarioCarroCompra()) this.$router.replace({ path: "/seguimiento" });
  },
  async mounted() {
    if (this.$route.query) {
      this.order = this.$route.query.order;
    }
    const respuesta = await this.pedidosUsuario();

    if (respuesta) this.pedidos = respuesta.data;

    this.cargando = false;
  },
  computed: {
    ordenActiva() {
      if (this.order && this.pedidos) {
        return this.pedidos.find((pedido) => pedido.id == this.order);
      } else return false;
    },
    pedidosFiltrados() {
      return this.pedidos
        ? this.pedidos.filter((pedido) => pedido.status != "cancelled")
        : [];
    },
  },
  methods: {
    cambiarPedidoActivo(pedido) {
      if (pedido.status == "cancelled" || this.order == pedido.id) this.order = false;
      else this.order = pedido.id;

      document.getElementById("body").scrollIntoView({ behavior: "smooth" });
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
      if (this.ordenActiva) {
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
      if (this.ordenActiva) {
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
  components: { CargandoSeccion, RastreoPedido },
};
</script>
