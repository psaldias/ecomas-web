<template lang="">
    <section class="banner-seccion ">
        <div className="imagen is-relative img-background" :style="{ backgroundImage: 'url(' + imagen + ')' }">
            <h1 v-html="tituloFormateado"></h1>
        </div>


    </section>
</template>

<script>
export default{
    template:`

    `,
     props:{
        titulo:String,
        imagen:String,
    },
    data() {
        return {
        }
    },
    computed:{
        tituloFormateado(){
            let titulo = this.titulo.split(' ');
            if(titulo.length > 0){
                titulo[0] = '<b>'+titulo[0]+'</b><br>';
                return titulo.join(' ');
            }return titulo;
        }
    },
    methods:{
    }
}
</script>