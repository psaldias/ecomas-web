<template>
  <div class="wrapper wrapper-fullm">
    <header>
      <div class="top bg-segundo">
        <div class="columns is-vcentered is-mobile">
          <div
            class="column rrss is-narrow is-hidden-mobile"
            v-if="!store_opciones_generales.cargando"
          >
            <a
              :href="store_opciones_generales.rrss.instagram"
              class="ml-2"
              target="_blank"
              v-if="store_opciones_generales.rrss.instagram"
            >
              <i class="has-text-white fa-brands is-size-5 fa-instagram"></i>
            </a>
            <a
              :href="store_opciones_generales.rrss.facebook"
              class="ml-2"
              target="_blank"
              v-if="store_opciones_generales.rrss.facebook"
            >
              <i class="has-text-white fa-brands is-size-5 fa-square-facebook"></i>
            </a>
            <a
              :href="store_opciones_generales.rrss.youtube"
              class="ml-2"
              target="_blank"
              v-if="store_opciones_generales.rrss.youtube"
            >
              <i class="has-text-white fa-brands is-size-5 fa-square-youtube"></i>
            </a>
            <span class="ml-4 has-text-white whatsapp">
              <a
                :href="store_opciones_generales.rrss.whatsapp"
                v-if="store_opciones_generales.rrss.whatsapp"
                target="_blank"
              >
                <b>WHATSAPP</b>
                <i
                  class="has-text-white fa-brands fa-whatsapp is-size-4 ml-1 is-vcentered"
                ></i>
              </a>
            </span>
          </div>
          <CargandoSeccion
            v-if="store_opciones_generales.cargando"
            class="small column is-narrow is-hidden-mobile"
          ></CargandoSeccion>

          <div class="column buscador">
            <form action="#" @submit.prevent="enviarBuscador()">
              <input
                type="text"
                class="input is-small"
                placeholder="??Qu?? est??s buscando?"
                v-model="buscar"
              />
              <button type="submit" class="bg-blanco">
                <i class="fa-solid fa-magnifying-glass primero"></i>
              </button>
            </form>
          </div>
          <div
            class="column menu is-narrow"
            :class="{ active: mostrarMenu }"
            ref="menuMovil"
            v-if="menuPrincipal"
          >
            <ul>
              <li>
                <router-link to="/productos" class="is-hidden-tablet"
                  >COMPRAR PELLET</router-link
                >
              </li>
              <li v-for="menu in menuPrincipal" :key="menu.ID" :class="menu.classes">
                <router-link :to="obtenerSlug(menu.url)">{{ menu.title }}</router-link>
              </li>
              <!-- <li><router-link to="/quienes-somos">SOMOS</router-link></li>
              <li><router-link to="/noticias">NOTICIAS</router-link></li>
              <li><router-link to="/sucursales">SUCURSALES</router-link></li>
              <li><router-link to="/contacto">CONTACTO</router-link></li> -->
            </ul>
          </div>
          <div
            class="column datos-carro columns is-mobile is-justify-content-flex-end is-vcentered is-narrow"
          >
            <div class="column is-narrow comuna">
              <SeleccionarUbicacionHeader
                v-if="!store_opciones_generales.cargando"
              ></SeleccionarUbicacionHeader>
            </div>
            <div class="column is-narrow is-hidden-mobile">
              <router-link to="/pedidos/" class="has-text-white">
                <i class="has-text-white mr-1 fa-solid fa-truck-fast"></i>
                Pedido
              </router-link>
            </div>
            <div class="column is-narrow ingresar" v-if="!usuarioCarroCompra()">
              <router-link to="/ingresar" class="has-text-white">
                <i class="has-text-white mr-2 fa-solid fa-circle-user"></i>
                Ingresar
              </router-link>
            </div>
            <div class="column is-narrow ingresar" v-if="usuarioCarroCompra()">
              <router-link to="/ingresar" class="has-text-white">
                <i class="has-text-white mr-2 fa-solid fa-circle-user"></i>
                {{ nombreUsuario }}
              </router-link>
            </div>
            <div class="column is-narrow icono-carro active">
              <router-link to="/carro" class="has-text-white">
                <i class="has-text-white fa-solid fa-cart-shopping is-size-5"></i>
                <span class="contador-carro" v-if="cantidadProductos">{{
                  cantidadProductos
                }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="principal columns is-mobile is-vcentered is-gapless">
        <div class="column logo is-narrow-mobile mr-2">
          <router-link to="/">
            <img src="/img/logo-ecomas.v2.png" alt="" width="228" height="71" />
          </router-link>
        </div>
        <div class="column menu-movil is-hidden-tablet has-text-right">
          <a href="#" id="btn-menu" @click.prevent="toggleMenu()" ref="menuMovil">
            <i class="fa-solid fa-bars primero is-block"></i>
          </a>
        </div>
        <div class="column is-narrow is-hidden-mobile mr-4">
          <ul>
            <li>
              <router-link
                to="/productos"
                class="button button-1 is-rounded has-text-weight-medium"
                >COMPRAR PELLET</router-link
              >
            </li>
          </ul>
        </div>
        <div
          class="column links-externos is-narrow is-hidden-mobile"
          v-if="store_opciones_generales.url_pagina_equipos.activo"
        >
          <ul>
            <li>
              <router-link
                :to="store_opciones_generales.url_pagina_equipos.url_boton"
                class="button button-1 is-rounded has-text-weight-medium"
                >{{
                  store_opciones_generales.url_pagina_equipos.texto_boton
                }}</router-link
              >
            </li>
          </ul>
        </div>
        <!-- <div class="column links-externos is-narrow is-hidden-mobile" v-if="store_opciones_generales.url_pagina_equipos.activo">
          <ul>
            <li>
              <a :href="store_opciones_generales.url_pagina_equipos.url_boton" class="button button-1 is-rounded has-text-weight-medium" target="_blank">
                {{store_opciones_generales.url_pagina_equipos.texto_boton}}
              </a>
            </li>
          </ul>
        </div> -->
      </div>
    </header>
  </div>
</template>

<script>
import SeleccionarUbicacionHeader from "../general/SeleccionarUbicacionHeader.vue";
import CargandoSeccion from "../general/CargandoSeccion.vue";
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";
import { useCarroCompraStore } from "/src/stores/carroCompra";

export default {
  data() {
    return {
      store_opciones_generales: useOpcionesGeneralesStore(),
      storeCarroCompra: useCarroCompraStore(),
      data: {},
      cargando: true,
      mostrarMenu: false,
      buscar: "",
    };
  },
  mounted() {
    let self = this;
    document.addEventListener("click", (e) => {
      if (
        self.$refs.menuMovil &&
        self.$refs.menuMovil !== undefined &&
        self.$refs.menuMovil.contains(e.target) === false
      ) {
        self.mostrarMenu = false;
      }
    });
  },
  // mounted() {
  //     let self = this;
  //     document.addEventListener("click", (e) => {
  //         if (self.$refs.menuMovil && self.$refs.menuMovil !== undefined &&
  //             self.$refs.menuMovil.contains(e.target) === false) {
  //             self.mostrarMenu = false;
  //         }

  //     });
  // },
  computed: {
    menuPrincipal() {
      return this.store_opciones_generales.menus["menu-principal"];
    },
    cantidadProductos() {
      return this.storeCarroCompra.carro.data.productos.length;
    },
    nombreUsuario() {
      return this.usuarioCarroCompra().user_first_name;
    },
  },
  methods: {
    obtenerSlug(url) {
      url = url.replace(/^.*\/\/[^\/]+/, "");
      return url;
    },
    toggleMenu() {
      this.mostrarMenu = !this.mostrarMenu;
    },
    ocultarMenu() {
      this.mostrarMenu = false;
    },
    enviarBuscador() {
      this.$router.push("/buscador/" + this.buscar);
    },
  },
  components: { SeleccionarUbicacionHeader, CargandoSeccion },
};
</script>
