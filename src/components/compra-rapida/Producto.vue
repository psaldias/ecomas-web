<template>

  <div class="columns is-gapless is-centered">
    <div class="column is-6">
        <div class="card card-compra-rapida card-producto">

            <div class="columns is-vcentered is-mobile">
              <div class="column imagen is-3 pl-0 is-hidden-mobile">
              </div>
              <div class="column is-1 is-hidden-mobile"></div>
              <div class="column contenido has-text-centered-mobile">
                <h2>Bolsas Pellets</h2>
                <h3 class="mb-4">¿Cuantas necesitas?</h3>

                <div class="field mb-5">
                    <div class="select select-2">
                        <select name="cantidad" id="">
                            <option value="12">12 Bolsas</option>
                            <option value="24">24 Bolsas</option>
                            <option value="48">48 Bolsas</option>
                        </select>
                    </div>
                </div>
                <div class="wrapper-imagen-descripcion-producto mx-auto-mobile ">
                    <img src="/img/pellet-15-kg.webp" alt="">

                    <p class="is-size-7">*Compra rápida desde 12 bolsas, si necesitas menos unidades te esperamos en nuestras tiendas</p>
                </div>


                <div class="block has-text-right-tablet">
                <router-link to="/compra-rapida/final" class="button is-rounded is-small button-icono px-5">
                  Continuar
                </router-link>
                </div>
              </div>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {},
  methods: {},
};
</script>
