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
                placeHolder='ej:16777555-0'
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
  async mounted(){
    if(!this.storeCarroCompra.carro.validado)
      await this.validarCompraNormal();

    // if(this.storeCarroCompra.carro.validado.con_errores)
    //   this.$router.replace({ path: '/carro/' });
    this.preLlenarDatos()



  },
  computed: {},
  methods: {
    /** RELLENA LOS DATOS DEL FORMULARIO  SI EXISTE INFORMACIÓN EN LOCALSTORA O SI ES UN USUARIO REGISTRADO TOMA SUS DATOS */
    preLlenarDatos(){
      this.dataFormulario.rut.data = (this.storeCarroCompra.carro.data.registro.rut)?this.storeCarroCompra.carro.data.registro.rut : ((this.usuarioCarroCompra())? this.storeCarroCompra.usuario.usuario_rut:'')
      this.dataFormulario.nombre.data = (this.storeCarroCompra.carro.data.registro.nombre)?this.storeCarroCompra.carro.data.registro.nombre : ((this.usuarioCarroCompra())? this.storeCarroCompra.usuario.user_first_name:'')
      this.dataFormulario.apellido_paterno.data = (this.storeCarroCompra.carro.data.registro.apellido_paterno)?this.storeCarroCompra.carro.data.registro.apellido_paterno : ((this.usuarioCarroCompra())? this.storeCarroCompra.usuario.user_last_name.split(' ')[0]:'')
      this.dataFormulario.apellido_materno.data = (this.storeCarroCompra.carro.data.registro.apellido_materno)?this.storeCarroCompra.carro.data.registro.apellido_materno : ((this.usuarioCarroCompra())? this.storeCarroCompra.usuario.user_last_name.split(' ')[1]:'')
      this.dataFormulario.tipoDocumento.data = this.storeCarroCompra.carro.data.registro.tipoDocumento
      this.dataFormulario.email.data = this.storeCarroCompra.carro.data.registro.email
      this.dataFormulario.confirmar_email.data = this.storeCarroCompra.carro.data.registro.confirmar_email
      this.dataFormulario.crearCuenta.data = this.storeCarroCompra.carro.data.registro.crearCuenta

    },
    async submitFormulario(){

      this.limpiarMensajes();

      this.cargando = true;
      let errorGeneral = false;
      let dataFormularioPost = {};

      /** VALIDAR CAMPOS */
      const rutValido = helpers.validaRut(this.dataFormulario.rut.data);
      this.dataFormulario.rut.error=!rutValido;
      this.dataFormulario.nombre.error = (this.dataFormulario.nombre.data == '') ? true : false;
      this.dataFormulario.apellido_paterno.error = (this.dataFormulario.apellido_paterno.data == '') ? true : false;
      this.dataFormulario.apellido_materno.error = (this.dataFormulario.apellido_materno.data == '') ? true : false;

      /** VALIDACIONES EN CASO DE NO ESTAR CONECTADO */
      if(!this.storeCarroCompra.usuarioCarroCompra){
        /** VALIDAR CAMPO EMAIL */
        this.dataFormulario.email.error = (!helpers.validateEmail(this.dataFormulario.email.data )) ? true : false

        /** VALIDAR CAMPO CONFIRMAR EMAIL */
        this.dataFormulario.confirmar_email.error = (this.dataFormulario.confirmar_email.data != this.dataFormulario.email.data) ? true : false

        /** VALIDAR CAMPO PASSWORD */
        this.dataFormulario.password.error = (this.dataFormulario.crearCuenta.data == true && this.dataFormulario.password.data.length < 6) ? true : false
        /** VALIDAR CONFIRMAR PASSWORD */
        this.dataFormulario.confirmar_password.error = (this.dataFormulario.crearCuenta.data == true && this.dataFormulario.confirmar_password.data !=  this.dataFormulario.password.data) ? true : false
      }
      /** GENERA OBJETO PARA GUARDAR EN LOCALSTORA CON LA INFORMACIÓN DEL FORMULARIO Y VALIDA SI HUBO ALGUN ERROR */
      Object.keys(this.dataFormulario).map(key => {
        dataFormularioPost[key] = this.dataFormulario[key].data;
        if(this.dataFormulario[key].error){
          errorGeneral = true;
        }
      });
      /** VALIDA QUE NO EXISTAN ERRORES */
      if(!errorGeneral){
        /** EN CASO DE CREAR UNA CUENTA VALIDA QUE EL EMAIL NO ESTÉ CREADO */
        if(this.dataFormulario.crearCuenta.data){
          let respuesta = await this.validarEmailRegistro(this.dataFormulario.email.data);
          if(respuesta.tipo == 'error'){
            this.mensajes = respuesta;
            this.cargando=false;
            return false;
          }
        }
        /** OBTENER INFORMACIÓN ACTUAL DEL CARRO */
        let dataCarro = this.storeCarroCompra.carro.data;
        /** AGREGAR LOS NUEVOS DATOS DEL FORMULARIO Y LUEGO ACTUALIZAR */
        dataCarro.registro = dataFormularioPost;
        this.storeCarroCompra.actualizarCarro(dataCarro,'data');

        this.$router.push({ path: '/carro/despacho' });
        return false;
      }
      this.cargando=false;

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
