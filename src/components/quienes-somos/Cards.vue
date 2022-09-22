<script>
export default {

    props:{
        cards:{},
        numero:{
            type:Boolean,
            default:true,
        },
    },
    data() {
        return {

        }
    },
    computed:{
    },
    methods:{
    }
}
</script>

<template>
    <section class="listado-cards ">
        <div class="columns is-multiline is-mobile " >
            <div
                class="column is-3-desktop is-12-mobile  has-text-centered"
                v-for="(card, index) in cards"
                :key="index"
                >
                <div class="card " :class="card.estilo">
                    <div class="numero mb-5" v-if="numero">
                        <span>{{index+1}}</span>
                    </div>
                    <div class="content is-flex is-flex-direction-column is-justify-content-space-between	">
                        <main>
                            <div class="titulo-card primero mb-4 has-text-weight-bold" v-if="card.titulo"  v-html="card.titulo"></div>

                            <div class="descripcion"  v-html="card.descripcion"></div>

                            <div class="imagen has-text-centered" v-if="card.imagen">
                                <img :src="card.imagen" alt="">
                            </div>
                        </main>

                        <div class="descargar has-text-centered mt-4" v-if="card.archivo">
                            <img :src="card.imagen" alt="">
                            <a :href="card.archivo">
                                <img src="/img/descargar.png" alt="">
                                <div>Descargar</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>