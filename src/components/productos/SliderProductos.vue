

<template>
    <section class="mt-6">
        <div class="titulo bg-tercero mb-4">
            <h3 class="primero has-text-weight-bold px-4">{{titulo}}</h3>
        </div>
        <div class="slider-productos">
            <div class="item" v-for="(producto, index) in productos">
                <Producto  :key="producto.id" :producto="producto" formato="vertical"></Producto>
            </div>
        </div>

    </section>
</template>

<script>
import "/src/assets/libs/jquery.min.js";
import "/src/assets/libs/slick/slick.min.js";
import "/src/assets/libs/slick/slick.min.css";
import "/src/assets/libs/slick/slick-theme.min.css";
import Producto from './producto/producto.vue';
export default{
    props: {
        titulo: String,
        productos: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {};
    },
    mounted() {
        $(".slider-productos").slick({
            slidesToShow:4,
            dots:false,
            arrows:true,
            prevArrow:'<a class="slick-prev-ecomas"><i class="primero fa-solid fa-angle-left"></i></a>',
            nextArrow:'<a class="slick-next-ecomas"><i class="primero fa-solid fa-angle-right"></i></a>',
            responsive: [
                            {
                                breakpoint: 1240,
                                settings: {
                                    slidesToShow: 3,
                                }
                            },
                            {
                                breakpoint: 1000,
                                settings: {
                                    slidesToShow: 2,
                                }
                            },
                             {
                                breakpoint:768,
                                settings: {
                                    slidesToShow: 1
                                }
                            },
                        ]

        });
    },
    computed: {},
    methods: {},
    components: { Producto }
}
</script>

