<template>
    <div class="acciones">
        <div class="columns is-vcentered is-gapless is-mobile">
            <div class="column  is-flex  cantidad">
                <button class="button is-small is-rounded50" @click="disminuirCantidad()">-</button>
                <input type="text" class="input is-rounded is-small is-inline-block" v-model="cantidad" readonly>
                <button class="button is-small is-rounded50 "  @click="this.aumentarCantidad()">+</button>
            </div>
            <div class="column is-narrow">
                <button class="button is-rounded is-small button-icono comprar" @click.prevent="agregarProducto()"><b><i class="fa-solid fa-cart-shopping"></i> Comprar</b></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            cantidad: 1,
            stock: 0,
            idProducto: 0,
        }
    },
    methods:{
        disminuirCantidad(){
            if(this.cantidad > 1){
                this.cantidad--;
            }
        },
        aumentarCantidad(){
            this.cantidad++;
        },
        agregarProducto(){
            this.$emit("agregarProducto",this.cantidad);
        }
    }
}
</script>