<template>
  <main class="mt-6">
    <div class="wrapper">
      <h4 class="primero mb-2 px-4">REGISTRO</h4>
      <div class="has-text-centered">
        <h2 class="primero py-6">
          <strong>Hola {{ usuario.user_first_name }}!.</strong> te has registrado
          correctamente,<br />
          en unos segundos serás redireccionado a tu cuenta.
        </h2>

        <router-link to="/mi-cuenta/" class="button button-1 bg-primero has-text-white"
          >Ir a mi cuenta</router-link
        >
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {},
  beforeMount() {
    if (!this.usuarioCarroCompra()) this.$router.replace({ path: "/ingresar" });
  },
  mounted() {
    setTimeout(() => {
      this.$router.replace({ path: "/mi-cuenta/" });
    }, 2000);
  },
  computed: {
    usuario() {
      return this.usuarioCarroCompra();
    },
  },
};
</script>
