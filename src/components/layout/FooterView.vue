<template lang="">
    <footer class="mt-6">
      <div class="wrapper">
          <div class="columns is-centered">
            <div class="column is-narrow-desktop has-text-centered">
              <a href="index.html">
                <img src="/img/logo-ecomas-blanco.png" alt="">
              </a>

              <div class="has-text-centered rrss is-narrow mt-4">
                <a href="#" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-instagram"></i></a>
                <a href="#" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-square-facebook"></i></a>
                <a href="#" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-square-youtube"></i></a>
              </div>
            </div>
            <div class="column is-narrow-desktop px-6 has-text-centered-mobile">
              <nav>
                <li><router-link to="/quienes-somos">Sobre Nosotros</router-link></li>
                <li><a href="#">Únete a Nuestro Equipo</a></li>
                <li><router-link to="/preguntas-frecuentes">Preguntas Frecuentes</router-link></li>
                <li><router-link to="/sucursales">Sucursales</router-link></li>
                <li><a href="#">Contacto</a></li>

              </nav>
            </div>
            <div class="column is-narrow-desktop px-6 has-text-centered-mobile">
              <nav>
                <li><a href="#">Productos</a></li>
                <li><router-link to="/bases-promocionales">Bases Promocionales</router-link></li>
                <li><router-link to="/terminos-y-condiciones">Terminos y Condiciones</router-link></li>
                <li><router-link to="/politicas-y-devoluciones">Politicas y Devoluciones</router-link></li>
                <li><router-link to="/distribuidores/">Distribuidores</router-link></li>
              </nav>
            </div>
            <div class="column is-narrow-desktop is-align-self-center has-text-centered-mobile">
              <a href="#" class="button is-rounded button-fono has-text-white">
                <b><i class="fa-solid fa-phone-volume primero"></i> <span class="primero">FONO:</span> 600 401 0606</b>
              </a>
            </div>
          </div>
      </div>
    </footer>
</template>