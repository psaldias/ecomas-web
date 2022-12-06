<template>
    <div class="card seguimiento mb-4">
        <div class="columns is-gapless pasos has-text-centered is-centered" v-if="(!cargando && (seguimiento && seguimiento.code == 200))">
            <div class="column is-3-desktop is-12-mobile " :class="{'active':(!seguimiento || !seguimiento.data || parseInt(seguimiento.data.U_SEI_ESTADO) <= 2 )}">
                <div class="numero">
                    <span>1</span>
                </div>
                <h4>EN PREPARACIÓN</h4>
                <p>El vendedor esta preparando tu pedido</p>
            </div>
            <div class="column is-3-desktop is-12-mobile " :class="{'active':(seguimiento && seguimiento.data.U_SEI_ESTADO == '3')}">
                <div class="numero">
                    <span>2</span>
                </div>
                <h4>FACTURADO</h4>
                <!-- <p>El vendedor esta preparando tu pedido</p> -->
            </div>
            <div class="column is-3-desktop  is-12-mobile" :class="{'active':(seguimiento && seguimiento.data.U_SEI_ESTADO == '4')}" >
                <div class="numero">
                    <span>3</span>
                </div>
                <h4>EN VIAJE</h4>
                <div v-if="seguimiento && seguimiento.data.U_SEI_ESTADO == '4'">
                    <p>Última actualización <br>
                        {{seguimiento.data.UpdateDate}} a las {{seguimiento.data.UpdateTime}}</p>
                </div>
            </div>
            <div class="column is-3-desktop is-12-mobile " :class="{'active':(seguimiento && seguimiento.data.U_SEI_ESTADO == '5')}">
                <div class="numero">
                    <span>4</span>
                </div>
                <h4>ENTREGADO</h4>
                <div v-if="seguimiento && seguimiento.data.U_SEI_ESTADO == '5'">
                    <p>Tu pedido fue entregado con éxito<br>
                        {{seguimiento.data.UpdateDate}} a las {{seguimiento.data.UpdateTime}}</p>
                </div>
            </div>
        </div>
        <CargandoSeccion v-if="cargando"></CargandoSeccion>
    </div>

</template>

<script>
import CargandoSeccion from '../general/CargandoSeccion.vue';
export default {
    props: [
        "orden"
    ],
    data() {
        return {
          cargando:false,
          seguimiento:false,
          mensajes: {
            exito:'',
            error:'',
          },
        };
    },
    computed: {
    },
    methods: {
      async obtenerRastreo(){
        this.cargando = true;
        const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_SEGUIMIENTO+'?orden='+this.orden.number);
        this.seguimiento = respuesta.data;
        this.cargando = false;
      },
    },
    async mounted(){
      this.obtenerRastreo();
    },
    watch:{
        'orden.id':{
            handler(newValue, oldValue) {
                this.obtenerRastreo();
            },
        },
    },
    components: { CargandoSeccion }
};
</script>
