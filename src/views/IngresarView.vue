

<template>
  <main class="noticias">
    <div class="wrapper">
        <div class="columns is-centered is-gapless">
            <div class="column is-10-fullhd is-11-desktop is-12-mobbile">
                <div class="columns is-variable is-0-mobile">
                    <div class="column is-6">

                        <div class="card height-100 p-5">
                            <h4 class="primero mb-5">¿No tienes cuenta? Regístrate ahora </h4>

                            <form action="#" @submit.prevent="registrarse()">
                                <div class="block">
                                    <div class="field">
                                        <label for="" class="label">Email</label>
                                        <div class="control has-icons-left">
                                            <input type="text" class="input" placeHolder="nombre@contacto.cl">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-envelope gris2"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-text-right">
                                            <div class="columns is-gapless is-justify-content-flex-end">
                                                <div class="column is-5">
                                                    <button type="submit" class="button button-1 bg-primero has-text-white is-fullwidth">Continuar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div class="columns mt-6 py-0">
                                <div class="column py-0">
                                    <a href="#"><img src="/img/btn-facebook.jpg" alt="" class="is-block"></a>
                                </div>
                                <div class="column py-0">
                                    <a href="#"><img src="/img/btn-google.jpg" alt="" class="is-block"></a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="column is-6">

                        <div class="card height-100 p-5">
                            <h4 class="primero mb-5">Iniciar Sesión</h4>

                            <form action="#">
                                <div class="block">
                                    <div class="field">
                                        <label for="" class="label">Email</label>
                                        <div class="control has-icons-left">
                                            <input type="text" class="input" placeHolder="nombre@contacto.cl">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-envelope gris2"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label for="" class="label">Contraseña</label>
                                        <div class="control has-icons-left">
                                            <input type="text" class="input" placeHolder="******">
                                            <span class="icon is-small is-left">
                                                <i class="fas fa-lock gris2"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-text-right">
                                            <div class="columns is-gapless is-justify-content-flex-end">
                                                <div class="column is-5">
                                                <router-link to="/mi-cuenta/" class="button button-1 bg-primero has-text-white is-fullwidth">Continuar</router-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
  </main>
</template>



<script>
export default {
  components: {
},
  data() {
    return {

    };
  },
  computed: {
  },
  methods: {
    registrarse(){
        this.$router.push({ name: 'Registro' });
    }
  },
};
</script>