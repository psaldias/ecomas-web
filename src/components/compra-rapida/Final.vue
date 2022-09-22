<template>

  <div class="columns  is-centered">
    <div class="column ">
        <div class="card card-compra-rapida card-final height-100">

            <div class="columns is-vcentered is-mobile">
              <div class="column contenido has-text-centered-mobile">
                <h2>Código de descuento</h2>
                <h3 class="mb-2">si tienes un cupón de descuento, ingresa tu código aquí:  </h3>

                <div class="field mb-5">
                  <input type="text" class="input input-2" value="xxxxx">
                </div>
              </div>
            </div>

        </div>
    </div>
    <div class="column ">
        <div class="card card-compra-rapida card-final height-100">

            <div class="columns is-vcentered is-mobile">
              <div class="column contenido has-text-centered-mobile">
                <h2>Horario de Entrega</h2>
                <h3 class="mb-4">Horario seleccionado:</h3>

                <div class="field mb-5">
                    <div class="select select-2">
                        <select name="cantidad" id="">
                            <option value="12">12 Bolsas</option>
                            <option value="24">24 Bolsas</option>
                            <option value="48">48 Bolsas</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>

        </div>
    </div>
    <div class="column ">
        <div class="card card-compra-rapida  card-final height-100">

            <div class="columns is-vcentered is-mobile">
              <div class="column contenido ">
                <h2 class="has-text-centered-mobile">Resumen Compra</h2>

                <div class="resumen-compra is-size-6 my-5">
                    <div class="columns is-multiline is-gapless is-mobile ">
                        <div class="column is-8 border">
                            <span class="pr-2 is-block">
                                12 Bolsas Pellet
                            </span>
                        </div>
                        <div class="column is-4 has-text-right border">
                            $47.880
                        </div>
                        <div class="column is-8 primero has-text-weight-bold">
                            <span class="pr-2 is-block">
                                Total a Pagar:
                            </span>
                        </div>
                        <div class="column is-4 has-text-right has-text-weight-bold primero">
                            $47.880
                        </div>

                    </div>
                </div>



                <div class="block has-text-right-tablet has-text-centered-mobile">
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
