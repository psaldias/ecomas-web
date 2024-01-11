<template lang="">

  <div class="item-comparador" >
    <div class="select is-fullwidth is-small mb-2">
        <select name="" id="" v-model="id_producto">
            <option value="">Selecciona un Producto</option>
            <option :value="producto.id" v-for="producto in productos">{{producto.name}}</option>
        </select>

    </div>
    <div v-if="producto">
        <div  class="producto-comparador">
            <Producto :producto="producto"></Producto>
        </div>
        <div class="detalle-comparador mt-5">
            <div class="block" v-for="categoria in categorias">
                <figure class="imagen has-text-centered">
                    <img :src="categoria.imagen" :alt="categoria.nombre">
                </figure>
                <div class="nombre is-size-7 gris3 has-text-centered">
                    {{categoria.nombre}}
                </div>
                <div class="valor has-text-centered gris3">
                    <strong v-html="obtenerValorDetalleProducto(categoria.nombre)"></strong>
                </div>
            </div>
        </div>
    </div>
   </div>
</template>

<script>
import Producto from "../productos/producto/producto.vue";
export default {
    props: ['productos'],
    components: {
        Producto
    },
    data() {
        return {
            id_producto: "",
            categorias: [
                { nombre: "Área de calefacción sugerida", imagen: '/img/comparador/area-calefaccion.jpg' },
                { nombre: "Dimensiones (A-A-P)mm", imagen: '/img/comparador/dimensiones.jpg' },
                { nombre: "Peso (kg)", imagen: '/img/comparador/peso.jpg' },
                { nombre: "Rendimiento", imagen: '/img/comparador/rendimiento.jpg' },
                { nombre: "Potencia nominal (Kw/h)", imagen: '/img/comparador/potencia-nominal.jpg' },
                { nombre: "Programador semanal", imagen: '/img/comparador/programador-semanal.jpg' },
                { nombre: "Consumo electrico (w)", imagen: '/img/comparador/consumo-electrico.jpg' },
                { nombre: "Termostato ambiente", imagen: '/img/comparador/termostato-ambiente.jpg' }
            ]
        };
    },
    async mounted() {
    },
    computed: {
        producto() {
            if (!this.id_producto) return false;

            return this.productos.find(producto => producto.id == this.id_producto)
        },
        tabla_ficha_tecnica() {
            return (this.producto.campos_adicionales.tabla_ficha_tecnica) ? this.producto.campos_adicionales.tabla_ficha_tecnica : false
        }
    },
    methods: {
        obtenerValorDetalleProducto(item) {
            //SI NO TIENE TABLA ENTONCES SE DEVUELVE FALSO
            if (!this.tabla_ficha_tecnica)
                return '<i class="fa-solid fa-minus primero"></i>';
            // BUSCAR DENTRO DE LA TABLA EL ITEM SOLICITADO
            const item_comparador = this.tabla_ficha_tecnica.find(caracteristica => caracteristica.id_comparador == item);
            if (!item_comparador) return '<i class="fa-solid fa-minus primero"></i>';
            // RETORNAR EL VALOR
            return item_comparador.valor;
        }
    },
};
</script>
