<template>
  <div class="columns is-variable is-0-mobile">
    <div class="column ">
      <form action="#" @submit.prevent="submitFormulario()">
        <h4 class="primero mb-2">TUS DATOS / REGISTRO</h4>
        <Mensajes :mensajes="mensajes"></Mensajes>
        <div class="columns ">
          <div class="column">
            <InputBase
                label="Rut Compra"
                placeHolder='ej:16.777.555-0'
                type="rut"
                v-model="dataFormulario.rut"
                :error="false"
            />
            <InputBase
                label="Nombre"
                placeHolder='ej:Pedro'
                type="text"
                v-model="dataFormulario.nombre"
            />
            <InputBase
                label="Apellido Paterno"
                placeHolder='ej:Perez'
                type="text"
                v-model="dataFormulario.apellido_paterno"
            />
            <InputBase
                label="Apellido Materno"
                placeHolder='ej:Perez'
                type="text"
                v-model="dataFormulario.apellido_materno"
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

            <InputBase v-if="!this.storeCarroCompra.usuarioCarroCompra"
                label="Email"
                placeHolder='nombre@contacto.cl'
                type="email"
                v-model="dataFormulario.email"
            />

            <InputBase
                v-if="!this.storeCarroCompra.usuarioCarroCompra"
                label="Confirmar Email"
                placeHolder='nombre@contacto.cl'
                type="email"
                v-model="dataFormulario.confirmar_email"
            />

            <InputCheck
              v-if="!this.storeCarroCompra.usuarioCarroCompra"
              label="Crear una cuenta y disfrutar los beneficios de un cliente registrado."
              v-model="dataFormulario.crearCuenta"
              :error="false"
              class="mt-6"
            />

          </div>
        </div>

        <div class="columns" v-if="dataFormulario.crearCuenta.data">
          <div class="column">
              <InputBase
                  label="Contraseña"
                  placeHolder='******'
                  type="password"
                  helpText="Mínimo 6 caracteres"
                  v-model="dataFormulario.password"
              />
          </div>
          <div class="column ">
              <InputBase
                  label="Confirmar Contraseña"
                  placeHolder='******'
                  type="password"
                  v-model="dataFormulario.confirmar_password"
              />
          </div>
        </div>

        <div class="columns is-centered ">
          <div class="column is-5">
            <button type="submit" class="button button-icono is-fullwidth" v-if="!cargando"><b>Continuar</b></button>
            <CargandoSeccion v-else></CargandoSeccion>
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
import Mensajes from '/src/components/general/Mensajes.vue';
import BoxDespacho from './BoxDespacho.vue'
import BoxTotales from './BoxTotales.vue'
import InputBase from '../formulario/InputBase.vue'
import InputSelect from '../formulario/InputSelect.vue'
import InputCheck from '../formulario/InputCheck.vue'
import CargandoSeccion from '../general/CargandoSeccion.vue';
import helpers from '/src/utils/helpers.js'

import { useCarroCompraStore } from '/src/stores/carroCompra'
import {useUsuarioRegistroStore} from '/src/stores/usuarioRegistro'

export default {
  data() {
    return {
      storeUsuario: useUsuarioRegistroStore(),
      storeCarroCompra: useCarroCompraStore(),
      dataFormulario: {
        rut: {data:'',error:false,requerido:true},
        nombre: {data:'',error:false,requerido:true},
        apellido_paterno: {data:'',error:false,requerido:true},
        apellido_materno: {data:'',error:false,requerido:false},
        tipoDocumento: {data:'Boleta',error:false,requerido:true},
        email: {data:'',error:false,requerido:false},
        confirmar_email: {data:'',error:false,requerido:true},
        password: {data:'',error:false,requerido:false},
        confirmar_password: {data:'',error:false,requerido:false},
        crearCuenta:{data:false,requerido:false},
      },
      mensajes: {
        exito:'',
        error:'',
      },
      cargando:false,
      // dataFormulario: {
      //   rut: '',
      //   nombre: '',
      //   apellidoPaterno: '',
      //   apellidoMaterno: '',
      //   tipoDocumento: '',
      //   email: '',
      //   emailConfirmar: '',
      //   crearCuenta: true,
      // },
    }
  },
  mounted(){
    if(!this.storeCarroCompra.carro.validado)
      this.validarCompraNormal();

    Object.keys(this.dataFormulario).map(key => {
      this.dataFormulario[key].data = this.storeCarroCompra.carro.data.registro[key]
    });

  },
  computed: {},
  methods: {
    async submitFormulario(){
      this.limpiarMensajes();
      this.cargando = true;
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
        }else if(key == 'email' && !helpers.validateEmail(this.dataFormulario[key].data )){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(key == 'confirmar_email' && (this.dataFormulario[key].data != this.dataFormulario.email.data || !helpers.validateEmail(this.dataFormulario[key].data))){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(this.dataFormulario.crearCuenta.data == true && key == 'password' && this.dataFormulario[key].data.length < 6){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else if(this.dataFormulario.crearCuenta.data  == true && key == 'confirmar_password' && this.dataFormulario[key].data != this.dataFormulario.password.data){
          this.dataFormulario[key].error=true;
          errorGeneral = true;
        }else{
          this.dataFormulario[key].error=false;
        }
        dataFormularioPost[key] = this.dataFormulario[key].data;

      });

      if(!errorGeneral){
        if(this.dataFormulario.crearCuenta.data){
          let respuesta = await this.validarEmailRegistro(this.dataFormulario.email.data);
          if(respuesta.tipo == 'error'){
            this.mensajes = respuesta;
            this.cargando=false;
            return false;
          }
        }

        let dataCarro = this.storeCarroCompra.carro.data;
        dataCarro.registro = dataFormularioPost;

        this.storeCarroCompra.actualizarCarro(dataCarro,'data');
        this.$router.push({ path: '/carro/despacho' });
        return false;
      }
      this.cargando=false;
      // if(respuesta.tipo == 'exito'){
      //     this.storeUsuario.guardarDato('email',this.email);
      //     this.$router.push({ name: 'Registro' });
      // }
      // if(!errorGeneral){

      //   this.cargando = true;
      //   const respuesta = await this.registrar_usuario(dataFormularioPost);
      //   this.mensajes[respuesta.tipo] = respuesta.mensaje;
      //   if(respuesta.tipo == 'exito'){
      //     setTimeout(() => {
      //       this.$router.replace({ path: '/mi-cuenta/' });
      //     }, 2000);
      //   }
      //   this.cargando = false;
      // }
    },
    limpiarMensajes(){
      this.mensajes = {
          exito:'',
          error:'',
      }
    },
  },
  components: { BoxDespacho, BoxTotales, InputBase, InputSelect, InputCheck, Mensajes, CargandoSeccion },
}
</script>
