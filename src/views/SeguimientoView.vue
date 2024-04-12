<template>
    <main class="pedidos">
        <div class="wrapper">

            <div class="columns is-gapless is-centered mt-4 is-multiline" v-if="!cargandoApp">
                <div class="column is-8-desktop is-8-tablet" v-if="!ordenActiva && !pedidos">
                    <h1 class="primero mb-4 is-size-5">SEGUIMIENTO PEDIDO</h1>
                    <div class="card ">
                        <div class="columns is-centered ">

                            <div class="column contenido has-text-centered-mobile">
                                <h2 class="mb-4 primero"><b>Buscar Pedido</b></h2>

                                <article class="message is-danger my-2 is-small" v-if="mensajes.error">
                                    <div class="message-body">
                                        {{ mensajes.error }}
                                    </div>
                                </article>

                                <div class="field mb-4 ">
                                    <div class="control">
                                        <div v-if="tipo_busqueda == 1">
                                            <input type="text" class="input input-2 " v-model="orden" />
                                            <p class="help">Ingresa el número del pedido</p>
                                        </div>
                                        <div v-else-if="tipo_busqueda == 2">
                                            <input type="text" class="input input-2 rut" v-model="rut"
                                                placeHolder="76666666-0" />
                                            <p class="help">Ingresa tu rut sin puntos y con guión</p>
                                        </div>
                                        <div v-else>
                                            <input type="email" class="input input-2 email" v-model="email"
                                                placeHolder="" />
                                            <p class="help">Ingresa tu email</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="field mb-4 ">
                                    <div class="control">
                                        <label class="radio">
                                            <input type="radio" :value="1" name="tipo_busqueda"
                                                v-model="tipo_busqueda" />
                                            Número de Pedido
                                        </label>
                                        <label class="radio">
                                            <input type="radio" :value="2" name="tipo_busqueda"
                                                v-model="tipo_busqueda" />
                                            Rut
                                        </label>
                                        <label class="radio">
                                            <input type="radio" :value="3" name="tipo_busqueda"
                                                v-model="tipo_busqueda" />
                                            Email
                                        </label>
                                    </div>
                                </div>



                                <div class="block has-text-right-tablet">
                                    <a href="#" class="button is-rounded is-small button-icono px-5"
                                        @click.prevent="validar()">
                                        Buscar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-8-desktop is-8-tablet mt-4" v-if="pedidos">
                    <div class="table-container maximo-alto">
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
                                <tr v-for="(pedido, index) in pedidos" :key="pedido.id">
                                    <td class="has-text-centered">{{ index + 1 }}</td>
                                    <td class="primero">{{ pedido.number }}</td>
                                    <td class="has-text-centered">
                                        {{ fechaFormateada(pedido.date_created.date) }}
                                    </td>
                                    <td class="has-text-centered">{{ monedaChilena(pedido.total) }}</td>
                                    <td>
                                        <div class="button button-2" @click.prevent="ordenActiva = pedido"
                                            :class="[pedido.status, ordenActiva.id == pedido.id ? 'active' : '']">
                                            <!-- {{pedido.status_html}} -->
                                            VER ESTADO
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="column is-10-fullhd is-12-desktop  mt-6" v-if="ordenActiva">
                    <div class="pedido">
                        <h2 class="primero"><strong>SEGUIMIENTO PEDIDO</strong></h2>

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

                        <RastreoPedido :orden="ordenActiva"></RastreoPedido>


                    </div>


                </div>
            </div>
            <CargandoSeccion v-if="cargando || cargandoApp"></CargandoSeccion>
        </div>
    </main>
</template>

<script>
import helpers from '../utils/helpers';
import RastreoPedido from '../components/carro/RastreoPedido.vue';
import CargandoSeccion from '/src/components/general/CargandoSeccion.vue';
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
export default {
    data() {
        return {
            cargando: false,
            orden: '',
            rut: '',
            email: '',
            ordenActiva: false,
            pedidos: false,
            tipo_busqueda: 1, // 1 numero pedido, 2 rut, 3 email
            mensajes: {},
            store_opciones_generales: useOpcionesGeneralesStore(),
        };
    },
    async mounted() {

    },
    computed: {
        cargandoApp() {
            return this.store_opciones_generales.cargando;
        }
    },
    methods: {
        async validar() {
            /** RESET MENSAJE ERROR */
            this.mensajes.error = false;

            let id = false;
            /** VALIDAR DEPENDIENDO DEL TIPO DE BUSQUEDA */
            switch (this.tipo_busqueda) {
                case 1:
                    this.validar_numero_pedido();
                    id = this.orden
                    break;
                case 2:
                    this.validar_rut();
                    id = this.rut;
                    break;
                case 3:
                    this.validar_email();
                    id = this.email;
                    break;
                default:
                    break;
            }
            /** SI HAY ERRORES NO CONTINUA */
            if (this.mensajes.error) return;

            let respuesta;
            this.cargando = true;
            if (this.tipo_busqueda == 1) {
                respuesta = await this.obtenerPedido(
                    id
                );
                if (respuesta.status == 200 && respuesta.data) { this.ordenActiva = respuesta.data }
                else this.mensajes.error = "No existe el pedido";
            } else {
                respuesta = await this.buscarPedidosUsuario(
                    id, this.tipo_busqueda
                );

                if (respuesta.status == 200 && respuesta.data.length > 0) { this.pedidos = respuesta.data }
                else this.mensajes.error = "No se encontraron pedidos";

            }

            this.cargando = false;


        },
        /** VALIDAR QUE INGRESÓ UN NÚMERO DE PEDIDO */
        validar_numero_pedido() {

            if (!this.orden) {
                this.mensajes.error = 'Debes indicar un número de orden';
            }
        },
        /** VALIDAR QUE EL RUT INGRESADO SEA CORRECTO */
        validar_rut() {
            if (!helpers.validaRut(this.rut)) {
                this.mensajes.error = 'Debes indicar un rut válido';
            }
        },
        /** VALIDAR QUE EL EMAIL TENGA UN FORMATO CORRECTO */
        validar_email() {
            if (!helpers.validateEmail(this.email)) {
                this.mensajes.error = 'Debes indicar un email válido';
            }
        }
    },
    components: { CargandoSeccion, RastreoPedido }
};
</script>
<style>
.maximo-alto {
    max-height: 230px;
    overflow: auto;
}
</style>