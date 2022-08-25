

<template>
    <section class="marcas-home mt-6">
            <div class="titulo bg-tercero mb-4">
                <h3 class="primero has-text-weight-bold px-4">{{titulo}}</h3>
            </div>

            <div class="columns listado-marcas is-mobile is-multiline ">
                <div class="column is-4-mobile " v-for="marca in marcas" :key="marca.id">
                    <div class="card py-4 px-4 is-flex is-align-items-center is-justify-content-center ">
                        <a :href="marca.url">
                            <img :src="marca.imagen"  :alt="marca.nombre"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
export default{
     props:{
        titulo:String
    },
    data() {
        return {
            marcas:[
                {
                    id:1,
                    nombre:"ecoheat",
                    imagen:"/img/marcas/ecoheat.jpg",
                    url:"#"
                },{
                    id:2,
                    nombre:"winterofen",
                    imagen:"/img/marcas/winterofen.jpg",
                    url:"#"
                },{
                    id:3,
                    nombre:"thermorossi",
                    imagen:"/img/marcas/thermorossi.jpg",
                    url:"#"
                },{
                    id:4,
                    nombre:"paterno",
                    imagen:"/img/marcas/paterno.jpg",
                    url:"#"
                },{
                    id:4,
                    nombre:"easypell",
                    imagen:"/img/marcas/easypell.jpg",
                    url:"#"
                },{
                    id:4,
                    nombre:"okofen",
                    imagen:"/img/marcas/okofen.jpg",
                    url:"#"
                },{
                    id:4,
                    nombre:"zgrills",
                    imagen:"/img/marcas/zgrills.jpg",
                    url:"#"
                },
            ]
        }
    },
    computed:{
    },
    methods:{
    }
}
</script>

