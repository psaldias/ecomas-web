<template>
    <teleport to='#modal' >
        <transition name="modal">

            <div class="toplayer toplayer-producto" v-if="data.mostrar" @click.self="cerrar($event)">
                <div class="toplayer_content card">
                    <div class="acciones-cabecera has-text-right pt-3 pr-3 ">
                        <a href="#" class="button is-rounded  button-icono mr-2"><i class="fa-solid fa-circle-user"></i> Iniciar Sesión</a>
                        <button class="delete ecomas is-large" @click.prevent="cerrar($event)"></button>
                    </div>

                    <div class=" producto horizontal">
                        <div class="columns is-vcentered ">
                            <div class="column is-narrow py-0">
                                <Imagen :imagen="producto.imagen" :alt="producto.nombre" :url="producto.url"></Imagen>
                            </div>
                            <div class="column py-0">
                                <div class="columns is-vcentered">
                                    <div class="column is-narrow">
                                        <div class="nombre mb-2">{{producto.nombre}}</div>
                                        <Precio :precios="producto.precios"></Precio>
                                    </div>
                                    <div class="column is-hidden-mobile is-1"></div>
                                    <div class="column">
                                        <div class="descripcion mb-0" v-html="producto.descripcion"></div>
                                    </div>
                                </div>
                                <div class="columns is-align-items-end	 ">
                                    <div class="column acciones  is-narrow pt-0 ">
                                        <div class=" cantidad mx-auto has-text-centered ">
                                            <b class="primero is-size-7">Cantidad</b>
                                            <div class="is-flex is-fullwidth is-justify-content-center">
                                                <button disabled class="button is-small is-rounded50" @click="disminuirCantidad()">-</button>
                                                <input type="text" class="input is-rounded is-small is-inline-block" :value="data.cantidad" readonly>
                                                <button disabled class="button is-small is-rounded50 "  @click="this.aumentarCantidad()">+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pt-0 column has-text-right-tablet has-text-centered-mobile botonera">
                                        <button class="button is-rounded is-7 button-icono mr-2" @click.prevent="cerrar($event)"><b><i class="fa-solid fa-cart-shopping"></i> Continuar Comprando</b></button>
                                        <button class="button is-rounded is-7 button-icono" @click.prevent="cerrar($event)"><b><i class="fa-solid fa-cart-shopping"></i> Ir a pagar</b></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </transition>
    </teleport>
</template>
<script>
import Imagen from './Imagen.vue';
import Precio from './Precio.vue';
import Acciones from './Acciones.vue';

export default {
    components: {
        Imagen,
        Precio,
        Acciones,
    },
    props:{
        producto:{
            id:false,
            url:false,
            imagen:false,
            nonbre:false,
            descripcion:false,
            precios:{
                normal:0,
                oferta:0
            },
            categoria:{
                nombre:false,
                url:'#'
            },
            stock:false,
            estado:false,
        },
        data:{
            mostrar:false,
        }
    },
    date(){
        return{}
    },
    methods:{
        cerrar(event){
            event.stopPropagation()
            this.data.mostrar = false;
        }
    }
}

</script>