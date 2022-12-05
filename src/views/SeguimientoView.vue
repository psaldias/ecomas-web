<template>
  <main class="pedidos">
    <div class="wrapper">

        <div class="columns is-gapless is-centered mt-4" >
            <div class="column is-6-desktop is-8-tablet" v-if="!ordenActiva">
                <h1 class="primero mb-4 is-size-5">SEGUIMINETO PEDIDO</h1>
                <div class="card ">
                    <div class="columns is-centered ">

                        <div class="column contenido has-text-centered-mobile">
                            <h2 class="mb-4 primero"><b>Número de Pedido</b></h2>

                            <article class="message is-danger my-2 is-small" v-if="mensajes.error">
                                <div class="message-body">
                                    {{mensajes.error}}
                                </div>
                            </article>

                            <div class="field mb-4 ">
                                <div class="control">
                                    <input type="text" class="input input-2 " v-model="orden"  />
                                </div>
                            </div>



                            <div class="block has-text-right-tablet">
                                <a href="#" class="button is-rounded is-small button-icono px-5" @click.prevent="validar()">
                                Buscar
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-10-fullhd is-12-desktop" v-if="ordenActiva">
                <div class="pedido" >
                    <h2 class="primero"><strong>SEGUIMIENTO PEDIDO</strong></h2>

                    <div class="columns is-gapless mt-4">
                        <div class="column is-narrow">
                            <strong class="primero">N° Pedido:</strong> {{ordenActiva.id}}
                        </div>
                        <div class="column is-1"></div>
                        <div class="column has-text-right-desktop" v-if="ordenActiva.date_paid">
                            <strong class="primero">Fecha Pago:</strong> {{ordenActiva.date_paid}}
                        </div>
                        <!-- <div class="column has-text-right-desktop">
                            <strong class="primero ">24 Bolsas /</strong> Fecha  de entrega: 08 y 09 de Julio
                        </div> -->
                    </div>

                    <RastreoPedido :orden="ordenActiva"></RastreoPedido>


                </div>


            </div>
        </div>
        <CargandoSeccion v-if="cargando"></CargandoSeccion>
      </div>
  </main>
</template>

<script>
import RastreoPedido from '../components/carro/RastreoPedido.vue';
import CargandoSeccion from '/src/components/general/CargandoSeccion.vue';
export default {
    data() {
        return {
            cargando: false,
            orden: '',
            ordenActiva: false,
            mensajes:{},
        };
    },
    async mounted() {

    },
    methods: {
        async validar(){
            this.mensajes.error = '';
            if(!this.orden){
                this.mensajes.error = 'Debes indicar un número de orden';
                return false;
            }
            this.cargando = true;

            const respuesta = await this.obtenerPedido(
                this.orden
            );

            if (respuesta.status == 200 && respuesta.data){ this.ordenActiva = respuesta.data}
            else  this.mensajes.error = "No existe el pedido";

            console.log(this.ordenActiva);
            this.cargando = false;


        }
    },
    components: { CargandoSeccion, RastreoPedido }
};
</script>
