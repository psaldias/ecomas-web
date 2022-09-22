<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column ">
      <form action="#">
        <h4 class="primero mb-2">TUS DATOS / REGISTRO</h4>
        <div class="columns ">
          <div class="column">
            <InputBase
              label="Rut Compra"
              placeHolder="ej:16.777.555-0"
              type="text"
              v-model="dataFormulario.rut"
              :error="false"
            />
            <InputBase
              label="Nombre"
              placeHolder="ej:Pedro"
              type="text"
              v-model="dataFormulario.nombre"
              :error="false"
            />
            <InputBase
              label="Apellido Paterno"
              placeHolder="ej:Perez"
              type="text"
              v-model="dataFormulario.apellidoPaterno"
              :error="false"
            />
            <InputBase
              label="Apellido Materno"
              placeHolder="ej:Perez"
              type="text"
              v-model="dataFormulario.apellidoMaterno"
              :error="false"
            />

          </div>
          <div class="column">
            <InputSelect
              label="Tipo de Documento"
              placeHolder=""
              inputClass="is-fullwidth"
              :values="['Boleta', 'Factura']"
              v-model="dataFormulario.tipoDocumento"
            />

            <InputBase
              label="Correo Electrónico"
              placeHolder="ej:nombre@contacto.cl"
              type="text"
              v-model="dataFormulario.email"
              :error="false"
            />

            <InputBase
              label="Confirmar Correo Electrónico"
              placeHolder="ej:nombre@contacto.cl"
              type="text"
              v-model="dataFormulario.emailConfirmar"
              :error="false"
            />

            <InputCheck
              label="Crear una cuenta y disfrutar los beneficios de un cliente registrado."
              v-model="dataFormulario.crearCuenta"
              :error="false"
              class="mt-6"
            />

          </div>
        </div>

        <div class="columns is-centered ">
          <div class="column is-5">
            <router-link to="/carro/despacho" class="button button-icono is-fullwidth"><b>Continuar</b></router-link>
          </div>
        </div>

      </form>

    </div>
    <div class="column is-4">
      <BoxDespacho></BoxDespacho>
      <BoxTotales :boton="false"></BoxTotales>
    </div>
  </div>
  <div class="columns">
    <div class="column"></div>
  </div>
</template>

<script>
import BoxDespacho from './BoxDespacho.vue'
import BoxTotales from './BoxTotales.vue'
import InputBase from '../formulario/InputBase.vue'
import InputSelect from '../formulario/InputSelect.vue'
import InputCheck from '../formulario/InputCheck.vue'
export default {
  data() {
    return {
      dataFormulario: {
        rut: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        tipoDocumento: '',
        email: '',
        emailConfirmar: '',
        crearCuenta: true,
      },
    }
  },
  computed: {},
  methods: {},
  components: { BoxDespacho, BoxTotales, InputBase, InputSelect, InputCheck },
}
</script>
