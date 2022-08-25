<template lang="">
    <section class="banner-seccion noticia ">
        <div className="imagen is-relative img-background" :style="{ backgroundImage: 'url(' + imagen + ')' }">
            <div class="columns is-vcentered is-mobile">
                <div class="column is-8-desktop is-12-mobile">
                    <h1 v-html="titulo"></h1>
                </div>
            </div>
        </div>


    </section>
</template>

<script>
export default{
     props:{
        titulo:String,
        imagen:String,
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