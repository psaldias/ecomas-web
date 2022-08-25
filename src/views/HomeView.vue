<script setup>
import CompraRapida from "../components/home/CompraRapida.vue";
import SucursalesHome from "../components/home/SucursalesHome.vue";
import NoticiasDestacada from "../components/general/NoticiasDestacadas.vue";
import Marcas from "../components/general/Marcas.vue";
</script>

<template>
  <main>
    <div class="wrapper">
      <section class="columns compra-rapida is-vcentered is-gapless">
        <div class="column is-narrow mr-6">
          <h2>
            Aquí haz tu<br />
            compra rápida<br />
            <b>en un solo click!</b>
          </h2>
        </div>

        <CompraRapida />
      </section>

      <section class="banner-principal mt-6">
        <div class="imagen">
          <img data-src="img/banner-1.jpg" class="is-block" />
        </div>
      </section>

      <SucursalesHome titulo="Sucursales"></SucursalesHome>

      <marcas titulo="Nuestras Marcas"></marcas>

      <section class="quienes-somos-home my-6">
        <div class="wrapper">
          <div class="columns p-0 contenedor is-vcentered">
            <div class="column p-0 is-4 is-offset-2 contenido">
              <div class="wrap">
                <img class="mb-4" src="/img/logo-ecomas.png" alt="" />

                <h1 class="mb-4"><b>¿Por qué elegir Ecomas?</b></h1>
                <div class="content is-fullwidth">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque eum
                  qui eius accusantium! Culpa quis veritatis, quos amet sequi molestiae
                  voluptatem. Animi placeat, laborum numquam molestiae repellendus totam
                  debitis possimus?
                </div>
                <div class="block">
                  <a href="#" class="button button-2 bg-verde is-rounded"
                    >QUIENES SOMOS
                    <i class="has-text-white ml-2 fa-solid fa-arrow-pointer"></i
                  ></a>
                </div>
              </div>
            </div>
            <div class="column p-0 is-6">
              <img src="/img/bg-home-quienes-somos-planta.jpg" class="mt-6 is-block" />
            </div>
          </div>
        </div>
      </section>

      <NoticiasDestacada titulo="Noticias" />
    </div>
  </main>
</template>
