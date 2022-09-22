<template>

  <div class="columns is-gapless is-centered">
    <div class="column is-6">
        <div class="card card-compra-rapida card-telefono">

            <div class="columns is-vcentered is-mobile">
              <div class="column imagen is-3 pl-0">
              </div>
              <div class="column is-1 is-hidden-mobile"></div>
              <div class="column contenido has-text-centered-mobile">
                <h2>Cual es tu teléfono</h2>
                <h3 class="mb-1">Ingresa tu número de teléfono</h3>

                <div class="field mb-5">
                  <input type="text" class="input input-2" >
                </div>

                <div class="block has-text-right-tablet">
                <router-link to="/compra-rapida/direccion" class="button is-rounded is-small button-icono px-5">
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
