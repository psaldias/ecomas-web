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
                    placeHolder='ej:16777555-0'
                    type="rut"
                    v-model="dataFormulario.rut"
                    :error="false"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Nombre"
                    placeHolder='ej:Pedro'
                    type="text"
                    v-model="dataFormulario.nombre"
                />
              </div>
              <div class="column is-6">
                <InputBase
                    label="Apellido Paterno"
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
                <div class="field" >
                  <label for="" class="label" >Teléfono/Celular</label>
                  <div class="control">
                    <input
                      class="input"
                      placeHolder="ej:+56912345678"
                      type="text"
                      v-model="dataFormulario.telefono.data"
                      :class="[{'is-danger':dataFormulario.telefono.error}]"
                      maxlength="12"
                      @keypress="validarInputTelefono"
                      @focus="moverCursor"
                    />
                  </div>
                </div>
              </div>
              <div class="column is-6">
                <InputSelect
                    label="Región"
                    placeHolder='Selecciona una Región'
                    inputClass="is-fullwidth"
                    :values=" regiones "
                    v-model="dataFormulario.region"
                    @change="this.dataFormulario.comuna = {data:'',error:false,requerido:true}"
                />
              </div>
              <div class="column is-6">
                <InputSelect
                    label="Comuna/Ciudad"
                    placeHolder='Selecciona una Comuna/Ciudad'
                    inputClass="is-fullwidth"
                    :values="comunas "
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
                <div class="column is-12">
                    <InputBase
                        label="Email"
                        placeHolder='nombre@contacto.cl'
                        type="email"
                        v-model="dataFormulario.email"
                    />
                </div>
                <div class="column is-12">
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
                        helpText="Mínimo 6 caracteres"
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
                                        <InputSelect
                                            label=""
                                            placeHolder='Día'
                                            inputClass="is-fullwidth"
                                            :values="dias"
                                            v-model="dataFormulario.fecha_nacimiento_dia"
                                        />

                                </div>
                                <div class="column mr-4">
                                  <InputSelect
                                        label=""
                                        placeHolder='Mes'
                                        inputClass="is-fullwidth"
                                        :values="meses"
                                        v-model="dataFormulario.fecha_nacimiento_mes"
                                    />
                                </div>
                                <div class="column">
                                  <InputSelect
                                      label=""
                                      placeHolder='Año'
                                      inputClass="is-fullwidth"
                                      :values="anios"
                                      v-model="dataFormulario.fecha_nacimiento_anio"
                                  />
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
                      v-model="dataFormulario.boletin.data"
                      type="checkbox"
                    >
                    Suscribirme al boletín de noticias
                </label>
            </div>
            <div class="field">
                <label class="checkbox">
                    <input
                      v-model="dataFormulario.ofertas.data"
                      type="checkbox"
                    >
                    Recibir ofertas especiales
                </label>
            </div>
            <div class="field">
              <Mensajes :mensajes="mensajes"></Mensajes>
            </div>
            <div class="field">
                <CargandoSeccion v-if="cargando"></CargandoSeccion>
                <button
                    v-if="!cargando"
                    type="submit"
                    class="
                    button button-1
                    bg-primero
                    has-text-white
                    mt-4
                    is-fullwidth
                    "
                    @click.prevent="submitFormulario()"
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
import {useUsuarioRegistroStore} from '/src/stores/usuarioRegistro'

import  RegionesYComunas  from '/src/utils/regionesComunas'
import helperFechas from '/src/utils/diasMesesAnios.ts'
import helpers from '../utils/helpers';

import InputBase from "../components/formulario/InputBase.vue";
import InputSelect from "../components/formulario/InputSelect.vue";
import Mensajes from '/src/components/general/Mensajes.vue';
import CargandoSeccion from '../components/general/CargandoSeccion.vue';

export default {
  components: { InputBase, InputSelect, Mensajes, CargandoSeccion },
  data() {
    return {
      dataFormulario: {
        rut: {data:'',error:false,requerido:true},
        nombre: {data:'',error:false,requerido:true},
        apellido_paterno: {data:'',error:false,requerido:true},
        apellido_materno: {data:'',error:false,requerido:true},
        telefono: {data:'+569',error:false,requerido:true},
        region: {data:'',error:false,requerido:true},
        comuna: {data:'',error:false,requerido:true},
        direccion: {data:'',error:false,requerido:true},
        direccion_numero: {data:'',error:false,requerido:false},
        email: {data:'',error:false,requerido:true},
        confirmar_email: {data:'',error:false,requerido:true},
        password: {data:'',error:false,requerido:true},
        confirmar_password: {data:'',error:false,requerido:true},
        fecha_nacimiento_dia: {data:'',error:false,requerido:true},
        fecha_nacimiento_mes: {data:'',error:false,requerido:true},
        fecha_nacimiento_anio: {data:'',error:false,requerido:true},
        boletin:{data:false,requerido:false},
        ofertas:{data:true,requerido:false},
      },
      dias:helperFechas.dias(),
      meses:helperFechas.meses(),
      anios:helperFechas.anios(),
      storeUsuario: useUsuarioRegistroStore(),
      mensajes: {
        exito:'',
        error:'',
      },
      cargando:false,
    };
  },
  beforeMount(){
    if(this.usuarioCarroCompra())
        this.$router.replace({ path: '/mi-cuenta' })
  },
  mounted(){
    this.dataFormulario.email.data = (this.storeUsuario.usuario.email)?this.storeUsuario.usuario.email:this.dataFormulario.email.data;

  },
  computed: {
    regiones(){
      let regiones = [];
      RegionesYComunas.map(region => {
        regiones.push({name:region.name,id:region.region_iso_3166_2})
      });
      return regiones;
    },
    comunas(){
      let comunas = [];
      let comunas_filtradas = [];

      const region_seleccionada = this.dataFormulario.region.data;
      const region = RegionesYComunas.find(region => region.region_iso_3166_2 == region_seleccionada);

      if(region){
        comunas = region.communes;
        comunas_filtradas = comunas.map( (comuna,index) => { return {id:comuna,name:comuna}})
      }
      return comunas_filtradas;
    },
    dataFormularioPost(){

    }
  },
  methods: {
    async submitFormulario(){

      this.limpiarMensajes();

      let errorGeneral = false;
      let dataFormularioPost = {};

      Object.keys(this.dataFormulario).map(key => {
        let error = false;
        if(this.dataFormulario[key].requerido && this.dataFormulario[key].data == ''){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(key == 'rut'){
          const rutValido = helpers.validaRut(this.dataFormulario[key].data);
          this.dataFormulario[key].error=!rutValido;
          errorGeneral = !rutValido;
        }else if(key == 'email' && !this.validateEmail(this.dataFormulario[key].data )){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(key == 'confirmar_email' && (this.dataFormulario[key].data != this.dataFormulario.email.data || !this.validateEmail(this.dataFormulario[key].data))){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(key == 'password' && this.dataFormulario[key].data.length < 6){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(key == 'confirmar_password' && this.dataFormulario[key].data != this.dataFormulario.password.data){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(key == 'telefono' && !helpers.validarTelefono(this.dataFormulario[key].data.toString())){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else{
          this.dataFormulario[key].error=false;
        }
        dataFormularioPost[key] = this.dataFormulario[key].data;

      });
      if(!errorGeneral){

        this.cargando = true;
        const respuesta = await this.registrar_usuario(dataFormularioPost);
        this.mensajes[respuesta.tipo] = respuesta.mensaje;
        if(respuesta.tipo == 'exito'){
          setTimeout(() => {
            this.$router.replace({ path: '/mi-cuenta/' });
          }, 2000);
        }
        this.cargando = false;
      }
    },
    validarInputTelefono ($event) {
      helpers.validarInputTelefono($event);
    },
    moverCursor($event){
      const largo = $event.target.value.toString().length;
      $event.target.setSelectionRange (largo,largo)
    },

    limpiarMensajes(){
      this.mensajes = {
          exito:'',
          error:'',
      }
    }
  },
};
</script>