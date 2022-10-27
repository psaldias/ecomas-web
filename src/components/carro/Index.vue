<template>
  <div>
    <div v-html="this.storeCarroCompra.carro.validado.mensajes"></div>
    <div class="columns is-variable is-0-mobile">
      <div class="column productos-carro" >
        <div v-if="!this.storeCarroCompra.carro.cargando">
          <ProductoCarro
            v-for="producto in productos"
            :key="producto.id"
            :producto="producto"
          ></ProductoCarro>
        </div>
        <CargandoSeccion v-else></CargandoSeccion>
      </div>
      <div class="column is-3-fullhd is-4-desktop box-carro">
        <BoxDespacho></BoxDespacho>
        <BoxCupon></BoxCupon>
        <BoxTotales>
          <a href="#" @click.prevent="continuar" to="/carro/registro/" class="button bg-primero has-text-white is-rounded px-6"><b>Ir a Pagar</b></a>
        </BoxTotales>
      </div>
    </div>
  </div>
</template>

<script>
import ProductoCarro from "/src/components/productos/producto/productoCarro.vue";
import BoxDespacho from "/src/components/carro/BoxDespacho.vue";
import BoxCupon from "/src/components/carro/BoxCupon.vue";
import BoxTotales from "/src/components/carro/BoxTotales.vue";
import CargandoSeccion from "../general/CargandoSeccion.vue";

import { useCarroCompraStore } from '/src/stores/carroCompra'
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import Mensajes from "../general/Mensajes.vue";

export default {
  components: { ProductoCarro, BoxDespacho, BoxCupon, BoxTotales, ProductoCarro, CargandoSeccion, Mensajes },
  data() {
    return {
      storeCarroCompra: useCarroCompraStore(),
      store_opciones_generales: useOpcionesGeneralesStore(),
    };
  },
  updated(){
    if(!this.dataCarro.productos.length){
      this.$router.push({ path: "/productos" });
      return false;
    }
  },
  mounted(){
      this.validarCarro();
  },
  computed: {
    productos(){
      return this.storeCarroCompra.carro.validado.productos;
    },
    dataCarro(){
      return this.storeCarroCompra.carro.data;
    },
    sucursalCarro(){
        return this.store_opciones_generales.sucursal_seleccionada.ID
    },
    conErrores(){
      return this.storeCarroCompra.carro.validado.con_errores;
    }
  },
  watch:{
    dataCarro:{
      handler(newValue, oldValue) {
        this.validarCarro();
      },
      deep: true
    },
    sucursalCarro(){
      this.validarCarro();
    }
  },
  methods: {
    validarCarro(){
      this.validarCompraNormal();
    },
    continuar(){
        this.$router.push({ path: "/carro/registro" });
        return false;
      let carroValidado = this.storeCarroCompra.carro.validado;
      carroValidado.mensajes = '<article class="message is-danger" ><div class="message-body" >Hay Productos que debes revisar.</div></article>';
      this.storeCarroCompra.actualizarCarro(carroValidado,'validado');
    }

  },
};
</script>
