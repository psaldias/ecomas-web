<template>
  <main class="pedidos">
    <div class="wrapper">

      <div class="columns is-centered is-gapless mt-6">
        <div class="column is-10-fullhd is-12-desktop">
          <h2 class="primero"><strong>SEGUIMIENTO DE ENVIO</strong></h2>

            <div class="columns is-gapless mt-4">
                <div class="column is-narrow">
                    <strong class="primero">N° Pedido:</strong> 525128143
                </div>
                <div class="column is-1"></div>
                <div class="column">

                    <strong class="primero">Fecha Despacho:</strong> 04/07/2022
                </div>
                <div class="column has-text-right-desktop">
                    <strong class="primero ">24 Bolsas /</strong> Fecha  de entrega: 08 y 09 de Julio
                </div>
            </div>

            <div class="card seguimiento">

                <div class="columns is-gapless pasos has-text-centered is-centered">
                    <div class="column is-3-desktop is-12-mobile ">
                        <div class="numero active">
                            <span>1</span>
                        </div>
                        <h4>EN PREPARACIÓN</h4>
                        <p>El vendedor esta preparando tus bolsas de pellets</p>
                    </div>
                    <div class="column is-3-desktop  is-12-mobile active">
                        <div class="numero">
                            <span>2</span>
                        </div>
                        <h4>EN CAMINO</h4>
                        <p>El vendedor despachó tu paquete.</p>
                    </div>
                    <div class="column is-3-desktop  is-12-mobile">
                        <div class="numero">
                            <span>3</span>
                        </div>
                        <h4>EN VIAJE</h4>
                        <p>04/07/2022<br>Llega entre el 08 y 09 de Julio</p>
                    </div>
                    <div class="column is-3-desktop is-12-mobile">
                        <div class="numero">
                            <span>4</span>
                        </div>
                        <h4>ENTREGA</h4>
                        <p>Tu pedido fue entregado con éxito</p>
                    </div>
                </div>
            </div>

            <h2 class="primero mt-6 mb-4"><strong>HISTORIAL DE PEDIDOS</strong></h2>
            <div class="table-container">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th class="primero has-text-centered" width="8%">N°</th>
                            <th class="primero">Pedido</th>
                            <th class="has-text-centered">FECHA</th>
                            <th class="has-text-centered">PRECIO</th>
                            <th class="primero has-text-centered" width="10%">ESTADO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="has-text-centered">1</td>
                            <td class="primero">525128143</td>
                            <td class="has-text-centered">04/07/2022</td>
                            <td class="has-text-centered">120.000</td>
                            <td><div class="button button-2 ">En Preparación</div></td>
                        </tr>
                        <tr>
                            <td class="has-text-centered">2</td>
                            <td class="primero">525128143</td>
                            <td class="has-text-centered">04/07/2022</td>
                            <td class="has-text-centered">120.000</td>
                            <td><div class="button button-3 active is-fullwidth is-justify-content-center">Entregado</div></td>
                        </tr>
                        <tr>
                            <td class="has-text-centered">3</td>
                            <td class="primero">525128143</td>
                            <td class="has-text-centered">04/07/2022</td>
                            <td class="has-text-centered">120.000</td>
                            <td><div class="button button-3 active is-fullwidth is-justify-content-center">Entregado</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
import SliderProductos from "@/components/productos/SliderProductos.vue";
export default {
  components: { SliderProductos },
  data() {
    return {
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
  computed: {},
  methods: {},
};
</script>
