

<template>
    <main class="productos">
        <div class="wrapper">
            <div class="columns is-vcentered mb-4">
                <div class="column is-3 py-0">
                    <h2 class="primero is-size-4"><b>ESTUFAS</b></h2>
                </div>
                <div class="column py-0">
                    <div class="opciones columns is-vcentered is-gapless  mb-0 px-3">
                        <div class="column">
                            <nav class="breadcrumb  is-small" aria-label="breadcrumbs">
                                <ul>
                                    <li ><a href="#">Estufas</a></li>
                                    <li><a href="#">Ecoheat</a></li>
                                    <li><a href="#">55  70m2</a></li>
                                    <li><a href="#">$500.000 - $1.000.000</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div class="column is-narrow">
                            <div class="columns is-mobile is-vcentered is-gapless">
                                    <AccionesGrilla  @cambiarGrilla="cambiarGrilla"></AccionesGrilla>
                                <div class="column">
                                    <Paginador></Paginador>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3 filtros">


                    <div class="card p-5 ">
                        <h6 class="primero mb-4"><b>FILTROS</b></h6>

                        <div class="filtro">
                            <div class="mb-2"><b>Marcas</b></div>
                            <ul>
                                <li><label class="radio"><input type="radio" name="marca"> Ecoheat (1)</label></li>
                                <li><label class="radio"><input type="radio" name="marca"> Paterno (4)</label></li>
                                <li><label class="radio"><input type="radio" name="marca"> Thermorossi (2)</label></li>
                                <li><label class="radio"><input type="radio" name="marca"> Winteröfen (3)</label></li>
                            </ul>
                        </div>

                        <div class="filtro">
                            <div class="mb-2"><b>M2 a Calefaccionar</b></div>
                            <ul>
                                <li><label class="radio"><input type="radio" name="m2"> 50 - 70m2 (2)</label></li>
                                <li><label class="radio"><input type="radio" name="m2"> 70 - 90m2 (4)</label></li>
                                <li><label class="radio"><input type="radio" name="m2"> 100  130m2 (2)</label></li>
                            </ul>
                        </div>

                        <div class="filtro">
                            <div class="mb-2"><b>Precio</b></div>
                            <ul>
                                <li><label class="radio"><input type="radio" name="precio"> $500.000 - $1.000.00</label></li>
                                <li><label class="radio"><input type="radio" name="precio"> $1.000.000  $1.500.000</label></li>
                                <li><label class="radio"><input type="radio" name="precio"> $1.500.000 - $2.000.000</label></li>
                            </ul>
                        </div>

                    </div>

                </div>

                <div class="column py-0">

                    <ListadoProductos :productos="productos" :grilla="grilla"></ListadoProductos>
                    <div class="columns is-justify-content-flex-end">
                        <div class="column is-narrow">
                            <Paginador></Paginador>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>

            </div>

        </div>
    </main>
</template>



<script>
import BannerSeccion from "../components/general/BannerSeccion.vue";
import ListadoProductos from "../components/productos/ListadoProductos.vue";
import Paginador from "../components/productos/Paginador.vue";
import AccionesGrilla from "../components/productos/AccionesGrilla.vue";

export default {
    components:{
    BannerSeccion,
    ListadoProductos,
    Paginador,
    AccionesGrilla
},
    data() {
        return {
            grilla:'grid',
            productos:[
                {
                    id:1,
                    url:'/interior-producto/1',
                    imagen:'/img/pellet-15-kg.webp',
                    nombre:'Pellet 15kg',
                    descripcion:'Pellets ECOMAS, se caracteriza por ser un producto de alta calidad.',
                    precios:{
                        normal:47880,
                        // oferta:1290000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:2,
                    url:'/interior-producto/2',
                    imagen:'/img/prod-2.jpg',
                    nombre:'WO 85 2',
                    descripcion:'lorem ipsum',
                    precios:{
                        normal:1290000,
                        oferta:0
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:3,
                    url:'/interior-producto/3',
                    imagen:'/img/prod-3.jpg',
                    nombre:'WO 85 3',
                    descripcion:'Rango de calefacción: aaxx asdas as das as dasd',
                    precios:{
                        normal:850000,
                        oferta:759000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:4,
                    url:'/interior-producto/4',
                    imagen:'/img/prod-1.jpg',
                    nombre:'WO 85',
                    descripcion:'Rango de calefacción: 70 a 90 metros cuadrados',
                    precios:{
                        normal:1650000,
                        oferta:1290000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:5,
                    url:'/interior-producto/5',
                    imagen:'/img/prod-2.jpg',
                    nombre:'WO 85 2',
                    descripcion:'lorem ipsum',
                    precios:{
                        normal:1290000,
                        oferta:0
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:6,
                    url:'/interior-producto/6',
                    imagen:'/img/prod-3.jpg',
                    nombre:'WO 85 3',
                    descripcion:'Rango de calefacción: aaxx asdas as das as dasd',
                    precios:{
                        normal:850000,
                        oferta:759000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:7,
                    url:'/interior-producto/7',
                    imagen:'/img/prod-1.jpg',
                    nombre:'WO 85',
                    descripcion:'Rango de calefacción: 70 a 90 metros cuadrados',
                    precios:{
                        normal:1650000,
                        oferta:1290000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:8,
                    url:'/interior-producto/8',
                    imagen:'/img/prod-2.jpg',
                    nombre:'WO 85 2',
                    descripcion:'lorem ipsum',
                    precios:{
                        normal:1290000,
                        oferta:0
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:9,
                    url:'/interior-producto/9',
                    imagen:'/img/prod-3.jpg',
                    nombre:'WO 85 3',
                    descripcion:'Rango de calefacción: aaxx asdas as das as dasd',
                    precios:{
                        normal:850000,
                        oferta:759000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:10,
                    url:'/interior-producto/10',
                    imagen:'/img/prod-1.jpg',
                    nombre:'WO 85',
                    descripcion:'Rango de calefacción: 70 a 90 metros cuadrados',
                    precios:{
                        normal:1650000,
                        oferta:1290000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:11,
                    url:'/interior-producto/11',
                    imagen:'/img/prod-2.jpg',
                    nombre:'WO 85 2',
                    descripcion:'lorem ipsum',
                    precios:{
                        normal:1290000,
                        oferta:0
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },{
                    id:12,
                    url:'/interior-producto/12',
                    imagen:'/img/prod-3.jpg',
                    nombre:'WO 85 3',
                    descripcion:'Rango de calefacción: aaxx asdas as das as dasd',
                    precios:{
                        normal:850000,
                        oferta:759000
                    },
                    categoria:{
                        nombre:'pellet',
                        url:'#'
                    },
                    stock:5,
                    estado:1,
                },
            ]
        };
    },
    computed: {},
    methods: {
        cambiarGrilla(grilla){
            this.grilla = grilla;
        }
    },
}
</script>