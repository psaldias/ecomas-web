<template lang="">
    <footer class="mt-6">
      <div class="wrapper">
          <div class="columns is-centered is-mobile is-multiline">
            <div class="column is-narrow-desktop is-12-mobile has-text-centered">
              <router-link to="/">
                <img src="/img/logo-ecomas-blanco.png" alt="">
              </router-link>

              <div class="has-text-centered  rrss is-narrow mt-4">
                <a href="https://www.instagram.com/ecomascl/" target="blank" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-instagram"></i></a>
                <a href="https://www.facebook.com/EcomasChile" target="blank" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-square-facebook"></i></a>
                <a href="https://www.youtube.com/channel/UC6ad6RxmUSQ-uMo-W8TDKxw" target="blank" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-square-youtube"></i></a>
              </div>
            </div>
            <div class="column is-narrow-desktop is-12-mobile px-4 "></div>
            <div class="column is-narrow-desktop  is-6-mobile ">
              <nav>
                <li><router-link to="/quienes-somos">Sobre Nosotros</router-link></li>
                <li><a href="#">Únete a Nuestro Equipo</a></li>
                <li><router-link to="/preguntas-frecuentes">Preguntas Frecuentes</router-link></li>
                <li><router-link to="/sucursales">Sucursales</router-link></li>
                <li><router-link to="/contacto">Contacto</router-link></li>

              </nav>
            </div>
            <div class="column is-narrow px-4 is-hidden-mobile"></div>
            <div class="column is-narrow-desktop is-6-mobile ">
              <nav>
                <li><router-link to="/productos">Productos</router-link></li>
                <li><router-link to="/bases-promocionales">Bases Promocionales</router-link></li>
                <li><router-link to="/terminos-y-condiciones">Terminos y Condiciones</router-link></li>
                <li><router-link to="/politicas-y-devoluciones">Politicas y Devoluciones</router-link></li>
                <li><router-link to="/distribuidores/">Distribuidores</router-link></li>
              </nav>
            </div>
            <div class="column is-narrow-desktop is-12-mobile px-4 "></div>
            <div class="column is-narrow-desktop is-align-self-center has-text-centered-mobile">
              <a href="tel:6004010606" class="button is-rounded button-fono has-text-white">
                <b><i class="fa-solid fa-phone-volume primero"></i> <span class="primero">FONO:</span> 600 401 0606</b>
              </a>
            </div>
          </div>
      </div>
    </footer>
</template>