<template>
  <div class="wrapper wrapper-fullm">
    <header>
      <div class="top">
        <div class="columns is-vcentered is-mobile">
          <div class="column logo is-narrow-desktop">
            <router-link to="/">
              <img src="/img/Ecomas-Logo-r_2.png" alt="" width="228" height="67" />
            </router-link>
          </div>
          <!-- <div
            class="column rrss is-1-fullhd is-narrow-desktop is-hidden-mobile has-text-centered"
            v-if="!store_opciones_generales.cargando"
          >
            <a
              :href="store_opciones_generales.rrss.facebook"
              target="_blank"
              v-if="store_opciones_generales.rrss.facebook"
            >
              <i class="fa-brands is-size-5 fa-square-facebook"></i>
            </a>
            <a
              :href="store_opciones_generales.rrss.instagram"
              target="_blank"
              v-if="store_opciones_generales.rrss.instagram"
            >
              <i class="fa-brands is-size-5 fa-instagram"></i>
            </a>

            <a
              :href="store_opciones_generales.rrss.whatsapp"
              target="_blank"
              v-if="store_opciones_generales.rrss.whatsapp"
            >
              <i class="fa-brands is-size-5 fa-whatsapp"></i>
            </a>
          </div> -->
          <CargandoSeccion v-if="store_opciones_generales.cargando" class="small column is-narrow is-hidden-mobile">
          </CargandoSeccion>

          <div class="column buscador is-3-desktop is-narrow-tablet is-hidden-mobile">
            <form action="#" @submit.prevent="enviarBuscador()">
              <input type="text" class="input is-small" placeholder="¿Qué estás buscando?" v-model="buscar" />
              <button type="submit" class="bg-blanco">
                <i class="fa-solid fa-magnifying-glass primero"></i>
              </button>
            </form>
          </div>
          <div class="column menu" :class="{ active: mostrarMenu }" ref="menuMovil" v-if="menuPrincipal">
            <ul>
              <li v-for="menu in buscarMenusPricipales()" :key="menu.ID" :class="menu.classes">
                <div class="dropdown is-hoverable" v-if="buscarSubmenus(menu).length > 0">
                  <div class="dropdown-trigger">
                    <a>
                      <span>{{ menu.title }}</span>
                      <span class="icon is-small ml-1">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                  <div class="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <router-link v-for="submenu in buscarSubmenus(menu)" class="dropdown-item"
                        :to="obtenerSlug(submenu.url)">{{ submenu.title }}</router-link>
                    </div>
                  </div>
                </div>
                <router-link :to="obtenerSlug(menu.url)" v-else>{{
                  menu.title
                }}</router-link>
              </li>
              <!-- <li><router-link to="/quienes-somos">SOMOS</router-link></li>
              <li><router-link to="/noticias">NOTICIAS</router-link></li>
              <li><router-link to="/sucursales">SUCURSALES</router-link></li>
              <li><router-link to="/contacto">CONTACTO</router-link></li> -->
            </ul>
          </div>
          <div
            class="column datos-carro columns is-mobile is-justify-content-flex-end is-vcentered is-narrow-desktop mb-0">
            <div class="column is-narrow comuna">
              <SeleccionarUbicacionHeader v-if="!store_opciones_generales.cargando"></SeleccionarUbicacionHeader>
            </div>
            <!-- <div class="column is-narrow is-hidden-mobile" v-if="false">
              <router-link to="/pedidos/" class="has-text-white">
                <i class="has-text-white mr-1 fa-solid fa-truck-fast"></i>
                Pedido
              </router-link>
            </div> -->
            <div class="column is-narrow ingresar" v-if="!usuarioCarroCompra()">
              <router-link to="/ingresar">
                <i class="mr-2 fa-solid fa-circle-user primero"></i>
                <span>Ingresar</span>
              </router-link>
            </div>
            <div class="column is-narrow ingresar" v-if="usuarioCarroCompra()">
              <router-link to="/ingresar">
                <i class="mr-2 fa-solid fa-circle-user primero"></i>
                <span>{{ nombreUsuario }}</span>
              </router-link>
            </div>
            <div class="column is-narrow icono-carro active">
              <router-link to="/carro">
                <i class="fa-solid fa-cart-shopping is-size-5 primero"></i>
                <span class="contador-carro" v-if="cantidadProductos">{{
                  cantidadProductos
                }}</span>
              </router-link>
            </div>
          </div>
          <div class="column menu-movil is-hidden-desktop has-text-right is-narrow">
            <a href="#" id="btn-menu" @click.prevent="toggleMenu()" ref="menuMovil">
              <i class="fa-solid fa-bars primero is-block"></i>
            </a>
          </div>
        </div>
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
    buscarMenusPricipales() {
      return this.menuPrincipal.filter((item) => item.menu_item_parent == "0");
    },
    buscarSubmenus(menu) {
      return this.menuPrincipal.filter((item) => item.menu_item_parent == menu.object_id);
    },
  },
  components: { SeleccionarUbicacionHeader, CargandoSeccion },
};
</script>
