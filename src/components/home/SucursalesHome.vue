<template>
  <main>
    <section class="sucursales bg-tercero mt-6 py-4" v-if="!cargando">
      <div class="columns is-vcentered is-mobile is-multiline">
        <div class="column">
          <h3 class="primero has-text-weight-bold">{{ titulo }}</h3>
        </div>
        <div class="column is-narrow columns is-vcentered">
          <a target="_blank" :href="urlGoogle" class="mr-4 is-hidden-mobile">
            <img src="/img/google-maps.png" alt="" />
          </a>
          <a target="_blank" :href="urlWaze" class="mr-4 is-hidden-mobile">
            <img src="/img/waze.png" alt="" />
          </a>
        </div>
      </div>

      <div class="columns listado-sucursales-mapa">
        <div class="column listado is-2">
          <ul class="is-hidden-mobile">
            <li class="mb-2" v-for="sucursal in sucursales" :key="sucursal.id">
              <a
                @click.prevent="cambiarSucursal(sucursal.id)"
                class="button button-2 is-block"
                :class="{ active: sucursal.id == sucursal_actual }"
              >
                {{ sucursal.title.rendered }}
              </a>
            </li>
          </ul>
          <div class="has-text-centered">
              <div class="select  is-hidden-tablet">
                  <select name="" id="" class="select" v-model="sucursal_actual">
                      <option :value="sucursal.id" v-for="sucursal in sucursales" :key="sucursal.id" >{{ sucursal.title.rendered }}</option>
                  </select>
              </div>
          </div>

          <div class="block data-sucursal is-size-6 mt-5 is-hidden-mobile">
            <p>
              <b class="primero is-block"> {{ sucursalActual.title.rendered }}</b>
              Dirección: {{ sucursalActual.acf.direccion }}
            </p>

            <p>
              <b class="is-block cuarto">Teléfono Celular:</b>
              {{ sucursalActual.acf.telefono_celular }}
            </p>

            <p>
              <b class="is-block cuarto">Teléfono Fijo:</b>
              {{ sucursalActual.acf.telefono_fijo }}
            </p>
          </div>
        </div>
        <div class="column">
          <figure class="image is-16by9">
            <iframe
              class="has-ratio"
              width="640"
              height="360"
              :src="urlIframe"
              style="border: 0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </figure>

          <div class="block data-sucursal is-size-6 mt-5 is-hidden-tablet">
            <p>
              <b class="primero is-block">{{ sucursalActual.title.rendered }}</b>
              Dirección: {{ sucursalActual.acf.direccion }}
            </p>

            <p>
              <b class="is-block cuarto">Teléfono Celular:</b>
              {{ sucursalActual.acf.telefono_celular }}
            </p>

            <p>
              <b class="is-block cuarto">Teléfono Fijo:</b>
              {{ sucursalActual.acf.telefono_fijo }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>
</template>

<script>
import CargandoSeccion from '../general/CargandoSeccion.vue';
export default {
    props: {
        titulo: String,
    },
    data() {
        return {
            data: {},
            cargando: true,
            sucursal_actual: 1,
            sucursales:{},
        };
    },
    async mounted() {
        const respuesta = await this.enviarGet("sucursales");
        this.sucursales = respuesta.data;
        this.sucursal_actual = this.sucursales[0].id;
        this.cargando = false;
    },
    computed: {
        sucursalActual() {
            return this.sucursales.find((sucursal) => sucursal.id == this.sucursal_actual);
        },
        urlGoogle: function () {
            return ("https://maps.google.com/maps?q=ecomas " +
                encodeURIComponent(this.sucursalActual.acf.direccion) +
                ", " +
                this.sucursalActual.title.rendered +
                "&t=&z=14&ie=UTF8&iwloc=");
        },
        urlWaze: function () {
            return ("https://waze.com/ul?q=ecomas " +
                encodeURIComponent(this.sucursalActual.acf.direccion) +
                ", " +
                this.sucursalActual.title.rendered);
        },
        urlIframe: function () {
            return ("https://maps.google.com/maps?q=ecomas " +
                encodeURIComponent(this.sucursalActual.acf.direccion) +
                ", " +
                this.sucursalActual.title.rendered +
                "&output=embed");
        },
    },
    methods: {
        cambiarSucursal: function (id) {
            this.sucursal_actual = id;
        },
    },
    components: { CargandoSeccion }
}
</script>
