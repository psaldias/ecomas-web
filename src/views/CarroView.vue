<template>
  <main class="carro">
    <div class="wrapper">
      <PasosCarro :paso="paso" class="mb-6"></PasosCarro>

      <div class="columns is-centered is-gapless ">
        <div class="column is-12-fullhd is-12-desktop">
          <router-view :key="$route.path" ></router-view>
        </div>
      </div>
      <SliderProductos
            :productos="productos"
            titulo="Productos Relacionados"
          ></SliderProductos>
    </div>
  </main>
</template>

<script>
import PasosCarro from "/src/components/carro/PasosCarro.vue";
import SliderProductos from "/src/components/productos/SliderProductos.vue";
export default {
  components: { PasosCarro, SliderProductos },
  data() {
    return {
      paso:'paso-1',
      productos: [
        {
          id: 1,
          url: '/interior-producto/1',
          imagen: '/img/pellet-15-kg.webp',
          nombre: 'Pellet 15kg',
          descripcion:
            'Pellets ECOMAS, se caracteriza por ser un producto de alta calidad.',
          precios: {
            normal: 47880,
            // oferta:1290000
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 2,
          url: '/interior-producto/2',
          imagen: '/img/prod-2.jpg',
          nombre: 'WO 85 2',
          descripcion: 'lorem ipsum',
          precios: {
            normal: 1290000,
            oferta: 0,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 3,
          url: '/interior-producto/3',
          imagen: '/img/interior-producto.jpg',
          nombre: 'WO 85 3',
          descripcion: 'Rango de calefacción: aaxx asdas as das as dasd',
          precios: {
            normal: 850000,
            oferta: 759000,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 4,
          url: '/interior-producto/4',
          imagen: '/img/prod-1.jpg',
          nombre: 'WO 85',
          descripcion: 'Rango de calefacción: 70 a 90 metros cuadrados',
          precios: {
            normal: 1650000,
            oferta: 1290000,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 5,
          url: '/interior-producto/5',
          imagen: '/img/prod-2.jpg',
          nombre: 'WO 85 2',
          descripcion: 'lorem ipsum',
          precios: {
            normal: 1290000,
            oferta: 0,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 6,
          url: '/interior-producto/6',
          imagen: '/img/prod-3.jpg',
          nombre: 'WO 85 3',
          descripcion: 'Rango de calefacción: aaxx asdas as das as dasd',
          precios: {
            normal: 850000,
            oferta: 759000,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 7,
          url: '/interior-producto/7',
          imagen: '/img/prod-1.jpg',
          nombre: 'WO 85',
          descripcion: 'Rango de calefacción: 70 a 90 metros cuadrados',
          precios: {
            normal: 1650000,
            oferta: 1290000,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
        {
          id: 8,
          url: '/interior-producto/8',
          imagen: '/img/prod-2.jpg',
          nombre: 'WO 85 2',
          descripcion: 'lorem ipsum',
          precios: {
            normal: 1290000,
            oferta: 0,
          },
          categoria: {
            nombre: 'pellet',
            url: '#',
          },
          stock: 5,
          estado: 1,
        },
      ],
    };
  },
  created() {
    this.paso = this.$route.meta.paso;
  },
  computed: {},
  methods: {},
};
</script>
