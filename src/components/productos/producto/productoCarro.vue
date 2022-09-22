<template>
  <main>


    <div class="card  mb-4 min-h-250"  >
      <div class="producto horizontal carro">
        <button class="delete ecomas is-large" @click.prevent="eliminar()"></button>

        <div class="columns is-vcentered">
          <div class="column is-narrow py-0">
            <div class="imagen mx-auto">
              <Imagen
                :imagen="producto.imagen"
                :alt="producto.nombre"
                :url="producto.url"
              ></Imagen>
            </div>
          </div>
          <div class="column py-0">
            <div class="columns is-vcentered">
              <div class="column is-8">
                <div class="nombre">{{ producto.nombre }}</div>
                <Precio :precios="producto.precios"></Precio>
                <div class="content is-size-7" v-html="producto.descripcion">
                </div>
              </div>
              <div class="column is-narrow">

                    <div class=" acciones ">
                        <div class=" cantidad mx-auto has-text-centered ">
                            <b class="primero is-size-7">Cantidad</b>
                            <div class="is-flex is-fullwidth is-justify-content-center">
                                <button  class="button is-small is-rounded50">-</button>
                                <input type="text" class="input is-rounded is-small is-inline-block" value="1" readonly>
                                <button  class="button is-small is-rounded50 " >+</button>
                            </div>
                        </div>
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
import Imagen from './Imagen.vue'
import Precio from './Precio.vue'
import Acciones from './Acciones.vue'
import Toplayer from './Toplayer.vue'

export default {
  props: {
    formato: {
      type: String,
      default: 'vertical',
    },
    producto: {},
  },
  components: {
    Imagen,
    Precio,
    Acciones,
    Toplayer,
  },
  data() {
    return {
    }
  },
  computed: {},
  methods: {
    eliminar(){
      console.log("Eliminar producto")
    }
  },
}
</script>
