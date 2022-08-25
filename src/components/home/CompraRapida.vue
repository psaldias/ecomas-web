
<template>
    <div class="column columns ">
        <div class="column py-0" v-for="producto in productos" :key="producto.id">
        <div class="card py-4 px-3 ">
            <div class="columns is-gapless is-vcentered mb-4">
            <div class="column is-narrow mr-2">
                <img  src="/img/icono-bolsa-ecomas.png" alt="">
            </div>
            <div class="column text-nowrap has-text-right">
                <b>{{producto.bolsas}}</b> Bolsas
            </div>
            </div>
            <div class="valor primero has-text-centered ">
            <b>{{producto.valor}}</b>
            </div>

            <div class="block mt-4">
            <a href="#" class="button is-rounded has-background-black is-toggle-rounded is-block has-text-centered has-text-white">
                <i class="has-text-white fa-solid fa-cart-shopping mr-1"></i>
                Comprar
            </a>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productos:[
                {id:1,bolsas:12,valor:"$47.880"},
                {id:2,bolsas:24,valor:"$95.760"},
                {id:3,bolsas:36,valor:"$143.640"},
                {id:4,bolsas:48,valor:"$191.520"},
                {id:5,bolsas:60,valor:"$233.400"},
                {id:6,bolsas:72,valor:"$280.080"},
            ]
        };
    },
    computed: {},
    methods: {},
}
</script>