

<template>
  <main class="mi-cuenta">
    <div class="wrapper">

        <BannerSeccion titulo="Mi Cuenta" imagen="/img/banner-mi-cuenta.jpg" />


        <div class="columns is-variable is-4-tablet mt-4">
            <div class="column menu is-narrow">
                <a href="#" class="button button-3 active is-block mb-2">
                   <i class=" mr-2 fa-solid fa-circle-user"></i> Mi información Personal
                </a>
                <a href="#" class="button button-3 is-block mb-2">
                   <i class=" mr-2 fa-solid fa-location-dot"></i> Mis Direcciones
                </a>
                <a href="#" class="button button-3 is-block mb-2">
                   <i class=" mr-2 fa-solid fa-list-check"></i> Mis pedidos
                </a>
                <a href="#" class="button button-3 is-block">
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
                                <strong class="primero">Nombre: </strong> <strong>Jorge</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Apellido: </strong> <strong>Araneda</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Apellido Materno: </strong> <strong>Ruiz</strong>
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
                                <strong class="primero">Teléfono: </strong> <strong>8191xxxx</strong>
                            </div>
                            <div class="column is-narrow">
                                <strong class="primero">Email: </strong> <strong>jaraneda@gmail.com</strong>
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
import Noticia from "../components/general/Noticia.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";

export default {
  components: {
    Noticia,
    BannerSeccion
},
  data() {
    return {
      noticias: [
            {
                id: 1,
                nombre: "Te asesoramos para que hagas la mejor elección en calefacción sustentable",
                imagen: "/img/noticia-1.jpg",
                descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen</p>",
                url: "/noticias/slug"
            },
            {
                id: 2,
                nombre: "Ecomas + Sustentable",
                imagen: "/img/noticia-2.jpg",
                descripcion: "<p>Para Ecomas es muy importante seguir impulsando un desarrollo sustentable, estamos preocupados de incorporar procesos para preservar, conservar y proteger</p>",
                url: "/noticias/slug"
            },
            {
                id: 3,
                nombre: "Ecomas + sustentable: Estufa a Pellet “Carbono Neutro”",
                imagen: "/img/noticia-3.jpg",
                descripcion: "<p>En Ecomas, nos comprometemos con el medio ambiente. Es por eso que a partir del año 2015 incorporamos la línea de estufas y calderas a pellet dentro de nuestra gama</p>",
                url: "/noticias/slug"
            },
            {
                id: 4,
                nombre: "Ahorro y energía: cuánto se puede ahorrar cambiando la leña”",
                imagen: "/img/noticia-4.jpg",
                descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen...</p>",
                url: "/noticias/slug"
            },
            {
                id: 5,
                nombre: "Bioenergía - El mercado del pellet en Chile sigue creciendo”",
                imagen: "/img/noticia-5.jpg",
                descripcion: "<p>Para Ecomas es muy importante seguir impulsando un desarrollo sustentable, estamos preocupados de incorporar procesos para preservar, conservar y proteger...</p>",
                url: "/noticias/slug"
            },
            {
                id: 6,
                nombre: "Tips para lograr un mayor ahorro energético en invierno”",
                imagen: "/img/noticia-6.jpg",
                descripcion: "<p>La selectiva selección de nuestra línea de estufas y calderas, ha sido uno de los pilares de nuestro éxito, hemos elegido asociarnos con los mejores, Thermorossi, Winterofen...</p>",
                url: "/noticias/slug"
            }
        ]
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>