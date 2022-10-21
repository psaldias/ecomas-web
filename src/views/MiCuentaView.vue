

<template>
  <main class="mi-cuenta">
    <div class="wrapper" v-if="usuarioCarroCompra()">

        <BannerSeccion titulo="Mi Cuenta" imagen="/img/banner-mi-cuenta.jpg" />


        <div class="columns is-variable is-4-tablet mt-4">
            <div class="column menu is-narrow">
                <a href="#" class="button button-3 active is-block mb-2">
                   <i class=" mr-2 fa-solid fa-circle-user"></i> Mi información Personal
                </a>
                <!-- <a href="#" class="button button-3 is-block mb-2">
                   <i class=" mr-2 fa-solid fa-location-dot"></i> Mis Direcciones
                </a> -->
                <RouterLink to="/pedidos/"  class="button button-3 is-block mb-2">
                   <i class=" mr-2 fa-solid fa-list-check"></i> Mis pedidos
                </RouterLink>
                <a @click.prevent="cerrarSesion()" class="button button-3 is-block">
                   <i class=" mr-2 fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión
                </a>
            </div>
            <div class="column">
                <h2 class="primero"><strong>Bienvenid@!.</strong> Aquí puedes gestionar tu información personal y pedidos.</h2>
                <div class="message  mt-4 is-ecomas">
                    <div class="message-header">
                        INFORMACIÓN PERSONAL
                        <a href="#" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                    </div>
                    <div class="message-body">
                        <div class="columns is-multiline is-variable is-6-desktop is-1-mobile">
                            <div class="column is-narrow">
                                <strong class="primero">Nombre: </strong> <strong>{{ usuarioCarroCompra().user_first_name }}</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Apellido: </strong> <strong>{{ usuarioCarroCompra().user_last_name }}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="message  mt-4 is-ecomas ">
                    <div class="message-header">
                        CONTACTO
                        <a href="#" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                    </div>
                    <div class="message-body">
                        <div class="columns is-multiline">
                            <div class="column is-narrow">
                                <strong class="primero">Teléfono: </strong> <strong>{{ usuarioCarroCompra().billing.phone }}</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Email: </strong> <strong>{{ usuarioCarroCompra().user_email }}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="message  mt-4 is-ecomas">
                    <div class="message-header">
                        CONTRASEÑA
                        <a href="#" class="has-text-weight-normal is-size-7"><i class="fa-regular fa-pen-to-square"></i> Editar</a>
                    </div>
                    <div class="message-body">
                        <div class="columns is-multiline">
                            <div class="column is-narrow">
                                <strong class="primero">Contraseña: </strong> <strong>xxxxxxxxx</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Confirmar Contraseña: </strong> <strong>xxxxxxx</strong>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  </main>
</template>



<script>
import { useCarroCompraStore } from "/src/stores/carroCompra";
import BannerSeccion from "../components/general/BannerSeccion.vue";

export default {
  components: {
    BannerSeccion
},
  data() {
    return {
        storeCarroCompra: useCarroCompraStore(),
    };
  },
  beforeMount() {
    if(!this.usuarioCarroCompra())
        this.$router.replace({ path: '/ingresar' })
  },
  async mounted() {
  },
};
</script>