<template>
  <main class="sucursales">
    <div class="wrapper" v-if="!cargando">
      <BannerSeccion
        :titulo="data.title.rendered"
        :imagen="data.acf.imagen_banner.sizes['2048x2048']"
      />
      <!-- <pre>{{data.title.rendered}}</pre> -->

      <div class="wrapper wrapper-fullm">
        <SucursalesHome titulo="Sucursales"></SucursalesHome>
      </div>

      <!-- <div class="columns is-centered mt-4 is-size-6">
        <div class="column is-3">
          <div class="select is-fullwidth">
            <select
              @change="cambioRegion()"
              v-model="region"
              id=""
              class="has-text-weight-bold"
            >
              <option value="">Todos</option>
              <option v-for="(region, index) in regiones" :key="index" :value="region">
                {{ region }}
              </option>
            </select>
          </div>
        </div>
        <div class="column is-3">
          <div class="select is-fullwidth">
            <select v-model="comuna" id="" class="has-text-weight-bold">
              <option value="">Todos</option>
              <option v-for="(comuna, index) in comunas" :key="index" :value="comuna">
                {{ comuna }}
              </option>
            </select>
          </div>
        </div>
      </div> -->

      <!-- <div class="columns is-centered is-gapless">
        <div class="column is-11">
          <div class="listado-sucursales">
            <div class="columns is-multiline is-mobile ">
              <div
                class="column is-4-fullhd is-6-desktop is-12-mobile"
                v-for="sucursal in sucursalesFiltradas"
                :key="sucursal.id"
              >
                <div class="card p-4 pb-0">
                  <div class="contenido">
                    <h4 class="primero">{{ sucursal.nombre }}</h4>
                    <figure class="image is-16by9 mt-3">
                      <iframe
                        class="has-ratio"
                        width="640"
                        height="360"
                        :src="urlIframe(sucursal)"
                        frameborder="0"
                        allowfullscreen
                      ></iframe>
                    </figure>
                    <div class="datos-contacto content mt-4">
                      <b>Dirección:</b> {{ sucursal.detalle.direccion }}<br />
                      <b>Teléfono Celular:</b>
                      {{ sucursal.detalle.telefono_celular }}<br />
                      <b>Teléfono Fijo:</b> {{ sucursal.detalle.telefono_fijo }}
                    </div>
                  </div>
                  <div class="links has-text-right mt-4">
                    <a target="_blank" :href="urlGoogle(sucursal)" class="mr-4"
                      ><img src="/img/google-maps.png" alt=""
                    /></a>
                    <a target="_blank" :href="urlWaze(sucursal)" class="mr-4"
                      ><img src="/img/waze.png" alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
</template>

<script>
import BannerSeccion from "../components/general/BannerSeccion.vue";
import SucursalesHome from "/src/components/home/SucursalesHome.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
import Seo from "/src/components/general/Seo.vue";
export default {
  components: {
    BannerSeccion,
    SucursalesHome,
    CargandoSeccion,
  },
  data() {
    return {
      data: {},
      cargando: true,
    };
  },
  async mounted() {
    const respuesta = await this.enviarGet(
      import.meta.env.VITE_ENDPOINT_PAGINA_SUCURSALES
    );
    if (respuesta) {
      this.data = respuesta.data;
      this.cargando = false;

      if (this.data.title.rendered) document.title = this.data.title.rendered;
    }
  },
  computed: {},
  methods: {},
};
</script>
