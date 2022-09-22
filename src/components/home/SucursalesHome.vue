<template>
  <section class="sucursales bg-tercero mt-6 py-4">
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
        <router-link
          class="button btn-ver-sucursales is-rounded bg-primero has-text-white px-5"
          to="/sucursales"
        >
          Ver sucursales
        </router-link>
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
              {{ sucursal.nombre }}
            </a>
          </li>
        </ul>
        <div class="has-text-centered">
            <div class="select  is-hidden-tablet">
                <select name="" id="" class="select" v-model="sucursal_actual">
                    <option :value="sucursal.id" v-for="sucursal in sucursales" :key="sucursal.id" >{{ sucursal.nombre }}</option>
                </select>
            </div>
        </div>

        <div class="block data-sucursal is-size-6 mt-5 is-hidden-mobile">
          <p>
            <b class="primero is-block">Rancagua</b>
            Dirección: {{ sucursalActual.detalle.direccion }}
          </p>

          <p>
            <b class="is-block cuarto">Teléfono Celular:</b>
            {{ sucursalActual.detalle.telefono_celular }}
          </p>

          <p>
            <b class="is-block cuarto">Teléfono Fijo:</b>
            {{ sucursalActual.detalle.telefono_fijo }}
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
            <b class="primero is-block">Rancagua</b>
            Dirección: {{ sucursalActual.detalle.direccion }}
          </p>

          <p>
            <b class="is-block cuarto">Teléfono Celular:</b>
            {{ sucursalActual.detalle.telefono_celular }}
          </p>

          <p>
            <b class="is-block cuarto">Teléfono Fijo:</b>
            {{ sucursalActual.detalle.telefono_fijo }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    titulo: String,
  },
  data() {
    return {
      sucursal_actual: 1,
      sucursales: [
        {
          id: 1,
          nombre: 'Rancagua',
          detalle: {
            direccion: 'Javiera Carrera #1085 Local 2 Villa Caren',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 2,
          nombre: 'Chillán',
          detalle: {
            direccion: 'Avda. Ecuador #852',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 3,
          nombre: 'Concepción',
          detalle: {
            direccion: 'Pedro Aguirre Cerda #786',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 4,
          nombre: 'Los Angeles',
          detalle: {
            direccion: 'Avda. Las Industrias #1245',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 5,
          nombre: 'Temuco',
          detalle: {
            direccion: 'Avenida San Martín #0301',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 6,
          nombre: 'Valdivia',
          detalle: {
            direccion: 'Carlos Anwandter #782',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 7,
          nombre: 'Osorno',
          detalle: {
            direccion: 'Ramón Freire #303',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
        {
          id: 8,
          nombre: 'Puerto Montt',
          detalle: {
            direccion: 'Avda. Presidente Ibáñez #296',
            telefono_fijo: '+56 9 9448 8926',
            telefono_celular: '7 2241 8453',
          },
        },
      ],
    }
  },
  computed: {
    sucursalActual() {
      return this.sucursales.find(
        (sucursal) => sucursal.id == this.sucursal_actual,
      )
    },
    urlGoogle: function () {
      return (
        'https://maps.google.com/maps?q=ecomas ' +
        encodeURIComponent(this.sucursalActual.detalle.direccion) +
        ', ' +
        this.sucursalActual.nombre +
        '&t=&z=13&ie=UTF8&iwloc='
      )
    },
    urlWaze: function () {
      return (
        'https://waze.com/ul?q=ecomas ' +
        encodeURIComponent(this.sucursalActual.detalle.direccion) +
        ', ' +
        this.sucursalActual.nombre
      )
    },
    urlIframe: function () {
      return (
        'https://maps.google.com/maps?q=ecomas ' +
        encodeURIComponent(this.sucursalActual.detalle.direccion) +
        ', ' +
        this.sucursalActual.nombre +
        '&output=embed'
      )
    },
  },
  methods: {
    cambiarSucursal: function (id) {
      this.sucursal_actual = id
    },
  },
}
</script>
