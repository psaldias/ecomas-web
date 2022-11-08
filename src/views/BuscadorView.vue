<template>
  <main>
    <div class="quienes-somos" v-if="!cargando">
      <div class="wrapper">
        <div  v-if="contenidoInicial.length > 0">
            <h4>Resultados</h4>
            <nav class="panel mt-4">

                <router-link v-for="item in contenidoInicial" :key="item.id" :to="url(item.url)" class="panel-block">

                    <span class="panel-icon">
                        <i class="fa-solid fa-link"></i>
                    </span>
                    {{ item.title }}
                </router-link>


            </nav>
        </div>
        <div v-else>
            <h4>No hay resultados</h4>
        </div>



        </div>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>


  </main>
</template>

<script>
import CargandoSeccion from '../components/general/CargandoSeccion.vue'
export default {
  components: {
    CargandoSeccion,
},
  data() {
    return {
      cargando:true,
      contenidoInicial:{
      },
    }
  },
  async mounted (){
    const buscar = this.$route.params.q;
    const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_BUSCADOR+'?search='+buscar);
    if(respuesta){
        this.contenidoInicial = respuesta.data;
        this.cargando = false;
    }
    document.title = buscar || VUE_APP_DEFAULT_TITLE;

  },
  computed: {

  },
  methods: {
    url(post_url){
        return post_url.replace(import.meta.env.VITE_ENDPOINT_BACKEND,'/');

    }
  },
}
</script>
