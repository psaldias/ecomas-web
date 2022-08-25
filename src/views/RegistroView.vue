

<template>
  <main class="mt-6">
    <div class="wrapper">
      <h4 class="primero mb-2 px-4">REGISTRO</h4>
      <div class="card">
        <div class="columns">

          <div class="column">

            <div class="columns is-multiline">
              <div class="column is-12">
                <InputBase
                    label="Rut Compra"
                    placeHolder='ej:16.777.555-0'
                    type="text"
                    v-model="dataFormulario.rut"
                    :error="false"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Nomre"
                    placeHolder='ej:Pedro'
                    type="text"
                    v-model="dataFormulario.nombre"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Apellido"
                    placeHolder='ej:Perez'
                    type="text"
                    v-model="dataFormulario.apellido_paterno"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Apellido Materno"
                    placeHolder='ej:Perez'
                    type="text"
                    v-model="dataFormulario.apellido_materno"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Teléfono/Celular"
                    placeHolder='ej:+569 1234 567'
                    type="text"
                    v-model="dataFormulario.telefono"
                />
              </div>
              <div class="column is-6">
                <InputSelect
                    label="Región"
                    placeHolder='Selecciona una Región'
                    inputClass="is-fullwidth"
                    :values=" ['Biobio','Los Lagos'] "
                    v-model="dataFormulario.region"
                />
              </div>
              <div class="column is-6">
                <InputSelect
                    label="Comuna/Ciudad"
                    placeHolder='Selecciona una Comuna/Ciudad'
                    inputClass="is-fullwidth"
                    :values=" ['Concepción','Los Ángeles'] "
                    v-model="dataFormulario.comuna"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Dirección"
                    placeHolder=''
                    type="text"
                    v-model="dataFormulario.direccion"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Número"
                    placeHolder='1024'
                    type="number"
                    v-model="dataFormulario.direccion_numero"
                />
              </div>
            </div>
          </div>

          <div class="column">
            <div class="columns is-multiline">
                <div class="column is-6">
                    <InputBase
                        label="Email"
                        placeHolder='nombre@contacto.cl'
                        type="email"
                        v-model="dataFormulario.email"
                    />
                </div>
                <div class="column is-6">
                    <InputBase
                        label="Confirmar Email"
                        placeHolder='nombre@contacto.cl'
                        type="email"
                        v-model="dataFormulario.confirmar_email"
                    />
                </div>
                <div class="column is-6">
                    <InputBase
                        label="Contraseña"
                        placeHolder='******'
                        type="password"
                        v-model="dataFormulario.password"
                    />
                </div>
                <div class="column is-6">
                    <InputBase
                        label="Confirmar Contraseña"
                        placeHolder='******'
                        type="password"
                        v-model="dataFormulario.confirmar_password"
                    />
                </div>
                <div class="column is-12">
                    <div class="field">
                        <label for="" class="label">Fecha Nacimiento</label>

                        <div class="control ">
                            <div class="columns is-gapless is-mobile">
                                <div class="column mr-4">
                                    <div class="select is-fullwidth">
                                        <select
                                          v-model="dataFormulario.fecha_nacimiento.dia"
                                          id=""
                                          name=""
                                        >
                                            <option value="" >Día</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="column mr-4">
                                    <div class="select is-fullwidth">
                                        <select
                                          v-model="dataFormulario.fecha_nacimiento.mes"
                                          id=""
                                          name=""
                                        >
                                            <option value="" >Mes</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="select is-fullwidth">
                                        <select
                                          v-model="dataFormulario.fecha_nacimiento.anio"
                                          id=""
                                          name=""
                                        >
                                            <option value="" >Año</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
                <label class="checkbox">
                    <input
                      v-model="dataFormulario.boletin"
                      type="checkbox"
                    >
                    Suscribirme al boletín de noticias
                </label>
            </div>
            <div class="field">
                <label class="checkbox">
                    <input
                      v-model="dataFormulario.ofertas"
                      type="checkbox"
                    >
                    Recibir ofertas especiales
                </label>
            </div>
            <div class="field">
                <button
                    type="submit"
                    class="
                    button button-1
                    bg-primero
                    has-text-white
                    mt-4
                    is-fullwidth
                    "
                >
                    Continuar
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
import InputBase from "../components/formulario/InputBase.vue";
import InputSelect from "../components/formulario/InputSelect.vue";

export default {
  components: { InputBase, InputSelect },
  data() {
    return {
      dataFormulario: {
        rut: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        telefono: "",
        region: "",
        comuna: "",
        direccion: "",
        direccion_numero: "",
        email: "",
        confirmar_email: "",
        password: "",
        confirmar_password: "",
        fecha_nacimiento:{
          mes:'',
          dia:'',
          anio:'',
        },
        boletin:false,
        ofertas:false,
      },
    };
  },
  computed: {},
  methods: {},
};
</script>