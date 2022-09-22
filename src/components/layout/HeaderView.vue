<template>
  <div class="wrapper wrapper-fullm">
    <header>
      <div class="top bg-segundo">
        <div class="columns is-vcentered is-mobile">
          <div class="column rrss is-narrow is-hidden-mobile">
            <a href="https://www.instagram.com/ecomascl/" class="ml-2" target="_blank">
              <i class="has-text-white fa-brands is-size-5 fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/EcomasChile" class="ml-2" target="_blank">
              <i
                class="has-text-white fa-brands is-size-5 fa-square-facebook"
              ></i>
            </a>
            <a href="https://www.youtube.com/channel/UC6ad6RxmUSQ-uMo-W8TDKxw" class="ml-2" target="_blank">
              <i
                class="has-text-white fa-brands is-size-5 fa-square-youtube"
              ></i>
            </a>
            <span class="ml-4 has-text-white whatsapp">
              <a href="#">
                <b>WHATSAPP</b>
                <i
                  class="has-text-white fa-brands fa-whatsapp is-size-4 ml-1 is-vcentered"
                ></i>
              </a>
            </span>
          </div>
          <div class="column buscador">
            <form action="#">
              <input
                type="text"
                class="input is-small"
                placeholder="¿Que estás buscando?"
              />
              <button type="submit" class="bg-blanco">
                <i class="fa-solid fa-magnifying-glass primero"></i>
              </button>
            </form>
          </div>
          <div class="column menu is-narrow" :class="{'active':mostrarMenu}" ref="menuMovil">
            <ul>
              <li><router-link to="/productos" class="is-hidden-tablet">PELLET</router-link></li>
              <li><router-link to="/quienes-somos">SOMOS</router-link></li>
              <li><router-link to="/noticias">NOTICIAS</router-link></li>
              <li><router-link to="/sucursales">SUCURSALES</router-link></li>
              <li><router-link to="/contacto">CONTACTO</router-link></li>
            </ul>
          </div>
          <div
            class="column datos-carro columns is-mobile is-justify-content-flex-end is-vcentered is-narrow"
          >
            <div class="column is-narrow comuna">

              <SeleccionarUbicacionHeader></SeleccionarUbicacionHeader>
            </div>
            <div class="column is-narrow is-hidden-mobile">
              <router-link to="/pedidos/" class="has-text-white">
                  <i class="has-text-white mr-1 fa-solid fa-truck-fast"></i>
                  Pedido
              </router-link>
            </div>
            <div class="column is-narrow ingresar">
              <router-link to="/ingresar" class="has-text-white">
                <i class="has-text-white mr-2 fa-solid fa-circle-user"></i>
                Ingresar
              </router-link>
            </div>
            <div class="column is-narrow icono-carro active">
              <router-link to="/carro" class="has-text-white">
                <i
                  class="has-text-white fa-solid fa-cart-shopping is-size-5"
                ></i>
                <span class="contador-carro">1</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="principal columns is-mobile is-vcentered is-gapless">
        <div class="column logo is-narrow-mobile mr-2">
          <router-link to="/">
            <img src="/img/logo-ecomas.png" alt="" />
          </router-link>
        </div>
        <div class="column menu-movil is-hidden-tablet has-text-right">
          <a href="#" id="btn-menu" @click.prevent="toggleMenu()" ref="menuMovil">
            <i class="fa-solid fa-bars primero is-block"></i>
          </a>
        </div>
        <div class="column is-narrow is-hidden-mobile mr-6">
          <ul>
            <li><router-link to="/productos">PELLET</router-link></li>
          </ul>
        </div>
        <div class="column links-externos is-narrow is-hidden-mobile">
          <ul>
            <li>
              <a
                href="#"
                class="button button-1 is-rounded has-text-weight-medium"
              >
                CONOCE NUESTROS EQUIPOS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import SeleccionarUbicacionHeader from '../general/SeleccionarUbicacionHeader.vue';
  export default {
    data() {
        return {
            mostrarMenu: false,
        };
    },
    computed: {},
    mounted() {
        let self = this;
        document.addEventListener("click", (e) => {
            if (self.$refs.menuMovil && self.$refs.menuMovil !== undefined &&
                self.$refs.menuMovil.contains(e.target) === false) {
                self.mostrarMenu = false;
            }

        });
    },
    methods: {
        toggleMenu() {
            this.mostrarMenu = !this.mostrarMenu;
        },
        ocultarMenu() {
            this.mostrarMenu = false;
        }
    },
    components: { SeleccionarUbicacionHeader }
}
  </script>
