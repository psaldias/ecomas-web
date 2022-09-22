<template>
  <main class="interior-producto">
    <div class="wrapper">
      <div class="px-3">
        <nav class="breadcrumb is-small" aria-label="breadcrumbs">
          <ul>
            <li><router-link to="/productos/">PRODUCTOS</router-link></li>
            <li><a href="#">PELLETS</a></li>
            <li class="is-active"><a href="#">WO85</a></li>
          </ul>
        </nav>
      </div>
      <div class="columns is-centered is-gapless mt-6">
        <div class="column is-11-fullhd is-12-desktop">
          <div
            class="columns is-multiline box px-1 py-1 no-shadow mb-6"
          >
            <div
              class="column is-7-fullhd is-8-desktop is-12-tablet detalle-producto"
            >
              <div class="card height-100 producto interior pb-6">
                <div
                  class="columns is-vcentered is-gapless px-2 mb-6 is-mobile"
                >
                  <div class="column">
                    <a class="link-categoria">
                      <div class="categoria">
                        {{ producto.categoria.nombre }}
                      </div>
                    </a>
                  </div>
                  <div class="column is-narrow">
                    <div class="disponible gris3">
                      Disponible
                      <span class="check ml-2">
                        <i class="fa-solid fa-check"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="columns">
                  <div class="column is-5">
                    <Imagen
                      :imagen="producto.imagen"
                      :alt="producto.nombre"
                      :url="producto.url"
                    ></Imagen>
                  </div>
                  <div class="column">
                    <div class="nombre">{{ producto.nombre }}</div>

                    <Precio :precios="producto.precios" class="mb-5"></Precio>

                    <div class="columns is-gapless is-mobile mb-5 caracteristicas ">
                      <div class="column is-6">
                        <div
                          class="columns is-mobile is-gapless envio-despacho is-vcentered"
                        >
                          <div class="column is-narrow mr-2">
                            <i class="fa-solid fa-truck primero"></i>
                          </div>
                          <div class="column gris3">
                            <b>
                              Envío a Domicio
                              <br />
                              COSTO ADICIONAL
                            </b>
                          </div>
                        </div>
                      </div>
                      <div class="column is-6">
                        <div
                          class="columns is-mobile is-gapless envio-despacho is-vcentered"
                        >
                          <div class="column is-narrow mr-2">
                            <i class="fa-solid fa-shop primero"></i>
                          </div>
                          <div class="column gris3">
                            <b>
                              Retiro en Sucursal
                              <br />
                              SIN COSTO ADICIONAL
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Acciones
                      :stock="producto.stock"
                      :idProducto="producto.id"
                      @agregarProducto="TopLayer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="column descripcion is-size-6">
              <div class="card height-100 p-6">
                <h2 class="primero mb-2"><b>CARACTERÍSTICAS</b></h2>
                <div class="content gris3" v-html="producto.descripcion"></div>
              </div>
            </div>
          </div>

          <div class="detalle-producto">
            <Tabs :tabs="tabs"></Tabs>
          </div>
          <SliderProductos
            :productos="productos"
            titulo="Productos Relacionados"
          ></SliderProductos>
        </div>
      </div>
    </div>

    <Toplayer
      :producto="producto"
      :data="datos_toplayer"
      :key="'toplayer_' + producto.id"
    ></Toplayer>
  </main>
</template>

<script>
import Imagen from '../components/productos/producto/Imagen.vue'
import Precio from '../components/productos/producto/Precio.vue'
import Acciones from '../components/productos/producto/Acciones.vue'
import Toplayer from '../components/productos/producto/Toplayer.vue'
import Tabs from '../components/general/Tabs.vue'
import SliderProductos from '../components/productos/SliderProductos.vue'

export default {
  components: {
    Imagen,
    Precio,
    Acciones,
    Toplayer,
    Tabs,
    SliderProductos,
  },
  data() {
    return {
      datos_toplayer: {
        cantidad: 1,
        mostrar: false,
      },
      tabs: [
        {
          id: 1,
          titulo: 'CARACTERÍSTICAS',
          descripcion:
            '<div class="columns"><div class="column"><figure class="image is-16by9 mx-0"><iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/eX83a6HRfSU" frameborder="0" allowfullscreen></iframe></figure><p><b class="primero">WO 85</b><br>Estufa a pellet<br>Salida de humos trasera<br>Cierre de sello en fibra de vidrio<br>Recuperación de las cenizas instantánea<br>Tarjeta electrónica con la programación semanal<br>Termostato de ambiente<br>Mando a distancia incluido</p></div><div class="column"><figure class="image is-16by9 mx-0"><iframe class="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/Tch4psovKlw" frameborder="0" allowfullscreen></iframe></figure><p><b class="primero">Datos Técnicos </b><br>Dimensiones (AxFxA)  51,5 x 53,3 x 98,7 cm<br>Potencia calorífica 7,5 kW<br>Rendimiento  91,6 %<br>Peso  61 kg<br>Tipo de combustible  Pellet Ø 6 mm<br>Capacidad del depósito  15 Kg<br>Salida de humos  Ø 8 cm<br>Consumo horario  Min. 0,7 kg/h – Max. 1,6 Kg/h<br>Consumo de energía  100 W<br>Autonomía  Min. 9,7 h – Max. 20,8 h</p></div></div>',
        },
        {
          id: 2,
          titulo: 'INFORMACIÓN',
          descripcion: '<h1>Información</h1>',
        },
        {
          id: 2,
          titulo: 'MANUAL DE EQUIPO',
          descripcion: '<h1>Manual</h1>',
        },
      ],
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
        {
          id: 9,
          url: '/interior-producto/9',
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
          id: 10,
          url: '/interior-producto/10',
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
          id: 11,
          url: '/interior-producto/11',
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
          id: 12,
          url: '/interior-producto/12',
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
      ],
    }
  },
  computed: {
    producto() {
      return this.productos.find(
        (producto) => producto.id == this.$route.params.slug,
      )
    },
  },
  methods: {
    TopLayer(cantidad) {
      this.datos_toplayer.cantidad = cantidad
      this.datos_toplayer.mostrar = true
    },
  },
}
</script>
