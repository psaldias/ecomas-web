<template>

  <div class="columns is-variable is-0-mobile">
    <div class="column productos-carro">
      <ProductoCarro
        v-for="(producto, index) in productos"
        :key="producto.id"
        :producto="producto"
      ></ProductoCarro>
    </div>
    <div class="column is-3-fullhd is-4-desktop box-carro">
      <BoxDespacho></BoxDespacho>
      <BoxCupon></BoxCupon>
      <BoxTotales></BoxTotales>
    </div>
  </div>
</template>

<script>
import ProductoCarro from "/src/components/productos/producto/productoCarro.vue";
import BoxDespacho from "/src/components/carro/BoxDespacho.vue";
import BoxCupon from "/src/components/carro/BoxCupon.vue";
import BoxTotales from "/src/components/carro/BoxTotales.vue";
export default {
  components: { ProductoCarro, BoxDespacho, BoxCupon, BoxTotales, ProductoCarro },
  data() {
    return {
      productos: [
        {
          id: 1,
          url: "/interior-producto/1",
          imagen: "/img/pellet-15-kg.webp",
          nombre: "Pellet 15kg",
          descripcion:
            "Pellets ECOMAS, se caracteriza por ser un producto de alta calidad.",
          precios: {
            normal: 47880,
            oferta: 35980,
          },
          categoria: {
            nombre: "pellet",
            url: "#",
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 2,
          url: "/interior-producto/2",
          imagen: "/img/prod-2.jpg",
          nombre: "WO 85 2",
          descripcion: "lorem ipsum",
          precios: {
            normal: 1290000,
            oferta: 119000,
          },
          categoria: {
            nombre: "pellet",
            url: "#",
          },
          stock: 5,
          estado: 1,
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>
