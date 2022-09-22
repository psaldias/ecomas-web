<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column ">
      <form action="#">
        <div class="columns ">
          <div class="column">
            <h4 class="primero mb-4">DIRECCIÓN DE ENVÍO</h4>
            <InputBase
              label="Comuna / Ciudad"
              placeHolder="ej:Concepción"
              type="text"
              :error="false"
            />
            <InputBase
              label="Dirección"
              placeHolder="ej:Chacabuco"
              type="text"
              :error="false"
            />
            <InputBase
              label="Número"
              placeHolder="ej:900"
              type="text"
              :error="false"
            />
            <InputBase
              label="Teléfono Móvil"
              placeHolder="ej:123456789"
              type="text"
              :error="false"
            />

          </div>
          <div class="column">
            <h4 class="primero mb-4">DIRECCIÓN DE FACTURACIÓN</h4>

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <InputBase
                  label="Rut Empresa"
                  placeHolder="ej:76.666.666-0"
                  type="text"
                  :error="false"
                />
              </div>
              <div class="column is-hidden-tablet"></div>
              <div class="column py-0">
                <InputBase
                  label="Razon Social"
                  placeHolder="ej:Transportinos Ltda"
                  type="text"
                  :error="false"
                />
              </div>
            </div>

            <InputBase
              label="Giro"
              placeHolder="ej: Transporte y Carga"
              type="text"
              :error="false"
            />

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <InputBase
                  label="Nombre"
                  placeHolder="ej:Pedro"
                  type="text"
                  :error="false"
                />
              </div>
              <div class="column is-hidden-tablet"></div>
              <div class="column py-0">
                <InputBase
                  label="Apellidos"
                  placeHolder="ej:Perez"
                  type="text"
                  :error="false"
                />
              </div>
            </div>

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <InputBase
                  label="Dirección"
                  placeHolder="ej:Chacabuco"
                  type="text"
                  :error="false"
                />
              </div>
              <div class="column is-hidden-tablet"></div>
              <div class="column py-0">
                <InputBase
                  label="Número"
                  placeHolder="ej:900"
                  type="text"
                  :error="false"
                />
              </div>
            </div>

            <div class="columns is-variable is-2-desktop is-3-mobile">
              <div class="column py-0">
                <InputBase
                  label="Comuna / Ciudad"
                  placeHolder="ej:Concepción"
                  type="text"
                  :error="false"
                />
              </div>
              <div class="column is-hidden-tablet"></div>
              <div class="column py-0">
                <InputBase
                  label="Teléfono Móvil"
                  placeHolder="ej:123456789"
                  type="text"
                  :error="false"
                />
              </div>
            </div>

          </div>
        </div>

        <div class="content is-size-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare elit auctor turpis pretium tempus. Duis volutpat quam sit amet nunc tincidunt vestibulum. Curabitur feugiat, tortor ut euismod pharetra, erat metus tempus turpis, sit amet accumsan ipsum ex at orci. Integer pellentesque ullamcorper risus, <router-link to="/terminos-y-condiciones/" class="primero">Terminos y Condiciones</router-link>
          <InputCheck
              label="Aceptar Texto terminos y condiciones."
              :error="false"
              class="mt-4"
            />
        </div>

        <div class="columns is-centered">
          <div class="column is-5">
            <router-link to="/carro/pago" class="button button-icono is-fullwidth"><b>Continuar</b></router-link>
          </div>
        </div>

      </form>

    </div>
    <div class="column is-4">
      <BoxDespacho></BoxDespacho>
      <BoxTotales :boton="false"></BoxTotales>
    </div>
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
