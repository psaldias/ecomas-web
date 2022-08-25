<template lang="">
    <div class="wrapper">
    <header >
          <div class="top bg-segundo">
            <div class="columns is-vcentered">
              <div class="column rrss is-narrow">
                <a href="#" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-instagram"></i></a>
                <a href="#" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-square-facebook"></i></a>
                <a href="#" class="ml-2"><i class="has-text-white fa-brands is-size-5 fa-square-youtube"></i></a>
                <span class="ml-4 has-text-white whatsapp ">
                  <a href="#"><b>WHATSAPP</b> <i class="has-text-white fa-brands fa-whatsapp is-size-4 ml-1 is-vcentered"></i></a>
                </span>
              </div>
              <div class="column buscador ">
                <form action="#">
                  <input type="text" class="input is-small " placeholder="¿Que estás buscando?">
                  <button type="submit" class="bg-blanco">
                    <i class="fa-solid fa-magnifying-glass primero"></i>
                  </button>
                </form>
              </div>
              <div class="column menu is-narrow">
                <ul>
                  <li><router-link to="/quienes-somos" >SOMOS</router-link></li>
                  <li><router-link to="/noticias" >NOTICIAS</router-link></li>
                  <li><router-link to="/sucursales" >SUCURSALES</router-link></li>
                  <li><router-link to="/contacto" >CONTACTO</router-link></li>
                </ul>
              </div>
              <div class="column datos-carro columns is-justify-content-flex-end is-vcentered is-narrow">
                <div class="column is-narrow">
                  <a href="#" class="primero ubicacion"><i class="primero mr-1 fa-solid fa-location-dot"></i> MI UBICACIÓN</a>
                </div>
                <div class="column is-narrow">
                  <a href="#" class="has-text-white"><i class="has-text-white mr-1 fa-solid fa-truck-fast"></i> Pedido</a>
                </div>
                <div class="column is-narrow">
                  <router-link to="/ingresar" class="has-text-white"><i class="has-text-white mr-2 fa-solid fa-circle-user"></i>Ingresar</router-link>
                </div>
                <div class="column is-narrow icono-carro active">
                <router-link to="carro" class="has-text-white ">
                  <i class="has-text-white fa-solid fa-cart-shopping is-size-5"></i>
                  <span class="contador-carro">1</span>
                </router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="principal columns is-mobile is-vcentered">
            <div class="column logo">
              <router-link to="/" ><img src="/img/logo-ecomas.png" alt=""></router-link>
            </div>
            <div class="column menu is-narrow">
              <ul>
                <li><router-link to="/productos">PELLET</router-link></li>
              </ul>
            </div>
            <div class="column links-externos is-narrow">
              <ul>
                <li><a href="#" class="button button-1 is-rounded has-text-weight-medium">CONOCE NUESTROS EQUIPOS</a></li>
              </ul>
            </div>
          </div>
      </header>
    </div>
</template>