<template>
  <main class="carro">
    <div class="wrapper">

      <div class="pasos-carro columns is-gapless is-justify-content-space-between	mb-4">
        <div class="column paso is-narrow">
          <a href="#" class="button button-1 is-rounded is-block active">
            <i class="fa-solid fa-cart-shopping mr-2"></i> CARRO
            DE COMPRAS
          </a>
        </div>
        <div class="column paso is-narrow">
          <a href="#" class="button button-1 is-rounded is-block ">
            <i class="fa-solid fa-file-invoice mr-2"></i> REGISTRO
          </a>
        </div>
        <div class="column paso is-narrow">
          <a href="#" class="button button-1 is-rounded is-block ">
          <i class="fa-solid fa-truck-fast  mr-2"></i> DESPACHO
          </a>
        </div>
        <div class="column paso is-narrow">
          <a href="#" class="button button-1 is-rounded is-block ">
            <i class="fa-solid fa-money-check-dollar  mr-2"></i> PAGO
          </a>
        </div>
      </div>

      <div class="columns is-centered is-gapless mt-6">
        <div class="column is-11-fullhd is-12-desktop">

                <div class="columns ">

                    <div class="column productos-carro is-8">

                            <ProductoCarro v-for="(producto, index) in productos"  :key="producto.id" :producto="producto" ></ProductoCarro>


                    </div>
                    <div class="column">
                        <div class="box has-text-centered">
                            <img src="/public/img/despacho-ecomas.jpg" alt="" class="mb-2">
                            <p class="primero mb-0"><b>TIEMPO DE DESPACHO</b></p>
                            <p class="">3 Días aproximado Concepción</p>
                        </div>

                        <div class="box has-text-centered">
                            <p class="primero mb-4"><b>Si tienes un cupón de descuento, ingresa el código aquí:</b></p>
                            <div class="field mb-4">
                                <input type="text" name="codigo" value="" class="input">
                            </div>
                            <div class="field">
                                <button class="button bg-primero has-text-white is-rounded px-6"><b>Activar Código</b></button>
                            </div>
                        </div>

                        <div class="box has-text-centered">
                            <p class="primero mb-4"><b>RESUMEN TOTAL DE TU ORDEN</b></p>
                            <table class="table is-borderless has-text-left	 is-narrow mx-auto">
                                <tr class="is-size-6">
                                    <td class=""><b>SUBTOTAL</b></td>
                                    <td><b>$3.200.156</b></td>
                                </tr>
                                <tr class="is-size-6">
                                    <td class=""><b>DESPACHO</b></td>
                                    <td><b>$16.990</b></td>
                                </tr>
                                <tr class="is-size-5">
                                    <td class=" primero"><b>TOTAL</b></td>
                                    <td class="primero"><b>$3.217.146</b></td>
                                </tr>
                            </table>
                            <div class="field">
                                <button class="button bg-primero has-text-white is-rounded px-6"><b>Ir a Pagar</b></button>
                            </div>
                        </div>
                    </div>

                </div>



        </div>
    </div>
    </div>
  </main>
</template>

<script>
import ProductoCarro from '../components/productos/producto/productoCarro.vue';
export default {
  components: {  ProductoCarro },
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
            oferta:35980
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
