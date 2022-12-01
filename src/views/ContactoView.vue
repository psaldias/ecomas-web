

<template>
  <main class="contacto">
    <div class="wrapper" v-if="!cargando">

        <BannerSeccion :titulo="data.title.rendered" :imagen="data.acf.imagen_banner.sizes['2048x2048']" />

        <div class="columns is-centered mt-6 is-gapless">
            <div class="column is-8">

                <h2 class="has-text-centered primero is-size-4" v-html="data.acf.titulo_formulario"></h2>
                <form v-on:submit.prevent="enviarFormulario" ref="formularioContacto">
                <div class="columns is-multiline mt-5">

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
                            label="Apellido"
                            placeHolder='ej:Perez'
                            type="text"
                            v-model="dataFormulario.apellido"
                        />
                    </div>

                    <div class="column is-6">
                        <InputBase
                            label="Email"
                            placeHolder='ej:email@ecomas.cl'
                            type="email"
                            v-model="dataFormulario.email"
                        />
                    </div>
                    <div class="column is-6">
                        <div class="field" >
                            <label for="" class="label" >Teléfono</label>
                            <div class="control">
                                <input
                                    class="input"
                                    :class="[{'is-danger':dataFormulario.telefono.error}]"
                                    placeHolder="ej:+56912341234"
                                    type="text"
                                    v-model="dataFormulario.telefono.data"
                                    @focus="moverCursor"
                                    @keypress="validarInputTelefono"
                                    maxlength="12"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="column is-12">
                        <InputSelect
                            label="Asunto"
                            placeHolder='Selecciona un asunto'
                            inputClass="is-fullwidth"
                            :values=" valoresAsunto "
                            v-model="dataFormulario.asunto"
                        />
                    </div>
                    <div class="column is-6">
                        <InputSelect
                            label="Comuna"
                            placeHolder='Selecciona una Comuna'
                            inputClass="is-fullwidth"
                            :values=" valoresComuna "
                            v-model="dataFormulario.comuna"
                        />
                    </div>
                    <div class="column is-6">
                        <InputFile
                            label="Cargar Archivo (jpg, png, jpeg, pdf, doc, docx)"
                            placeHolder='Seleccionar Archivo'
                            type="text"
                            v-model="dataFormulario.archivo"
                            permitidos="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                        />
                    </div>
                    <div class="column is-12">
                        <InputTextarea
                            label="Comentario"
                            placeHolder='Texto...'
                            inputClass="is-fullwidth"
                            v-model="dataFormulario.comentario"
                        />
                    </div>
                    <div class="column is-12">

                        <article class="message is-success" v-if="mensaje_exito">
                            <div class="message-body ">
                                {{mensaje_exito}}
                            </div>
                        </article>

                        <article class="message is-danger" v-if="errores.error_general">
                            <div class="message-body">
                                {{errores.error_general}}
                            </div>
                        </article>


                        <div class="columns is-centered">
                            <div class="column is-4">
                                <div class="field" v-if="!cargando_formulario">
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
                                <CargandoSeccion v-if="cargando_formulario"></CargandoSeccion>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>

        <div class="columns is-centered mt-5 is-gapless">
            <div class="column is-10">
                <div class="columns is-multiline mt-4 listado-contacto">

                    <div class="column is-4" v-for="cuadro in data.acf.cuadros">
                        <div class="card is-height-100 has-text-centered">
                            <div class="imagen telefono">
                                <img :src="cuadro.icono.sizes.medium" />
                            </div>
                            <div class="content">
                                <b>{{cuadro.titulo}}</b>
                                <span v-html="cuadro.descripcion"></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <CargandoSeccion v-if="cargando"></CargandoSeccion>
  </main>

</template>



<script>
import helpers from '/src/utils/helpers';
import { useOpcionesGeneralesStore } from "/src/stores/opcionesGenerales";

import BannerSeccion from "../components/general/BannerSeccion.vue";
import InputBase from "../components/formulario/InputBase.vue";
import InputSelect from "../components/formulario/InputSelect.vue";
import InputTextarea from "../components/formulario/InputTextarea.vue";
import InputFile from "../components/formulario/InputFile.vue";
import CargandoSeccion from "/src/components/general/CargandoSeccion.vue";
export default {
  components: {
    BannerSeccion,
    InputBase,
    InputSelect,
    InputTextarea,
    InputFile,
    CargandoSeccion,
},
  data() {
    return {
        store_opciones_generales: useOpcionesGeneralesStore(),
        data:{},
        cargando:true,
        cargando_formulario: false,
        dataFormulario: {
            nombre:{data:'',error:false},
            apellido:{data:'',error:false},
            email:{data:'',error:false},
            telefono:{data:'+569',error:false},
            asunto:{data:'',error:false},
            comuna:{data:'',error:false},
            archivo:{data:'',error:false},
            comentario:{data:'',error:false},
        },

        error_general:'',
        errores: {
            error_general:'',
        },
        mensaje_exito:'',
        configuracionFormulario:{}
    };
  },
  async mounted (){
    const respuesta = await this.enviarGet(import.meta.env.VITE_ENDPOINT_PAGINA_CONTACTO);
    if(respuesta){
        this.data = respuesta.data;

        if(this.data.title.rendered)
            document.title = this.data.title.rendered

    }
    const respuesta_formulario = await this.enviarGet(import.meta.env.VITE_ENDPOINT_CONTACTO_FORMULARIO,{
        cache:true,
        authorization:true
    });

    this.configuracionFormulario = respuesta_formulario.data;
    this.cargando = false;
  },
  computed: {
    valoresAsunto(){
        // const campo = this.store_opciones_generales.asuntos.form.fields.find(field => { return field.name == 'asunto'});
        return this.store_opciones_generales.asuntos
    },
    valoresComuna(){
        const campo = this.configuracionFormulario.properties.form.fields.find(field => { return field.name == 'comuna'});
        return campo.values
    }

  },
  methods: {
    async enviarFormulario(){
        this.cargando_formulario = true;
        /** reset errores */
        this.resetErrores();
        /** validar formulario */
        if(this.validarFormulario()){
            this.cargando_formulario = false;
            return false;
        }
        /** enviar data de formulario al api rest */
        const data_formulario = this.obtenerDataFormulario();
        const respuesta_formulario = await this.enviarPost(
            import.meta.env.VITE_ENDPOINT_CONTACTO_FORMULARIO_ENVIAR,
            data_formulario,
            {baseUrl:import.meta.env.VITE_ENDPOINT_CONTACTO_BASE_URL}
        );

        /** en caso de que hayan errores de validación */
        if(respuesta_formulario.data.status === "validation_failed"){

            /** asignar nuevos errores */
            respuesta_formulario.data.invalid_fields.forEach(field => {
                this.errores[field.field] = true;
            });
            /** asignar mensaje general de errores */
            this.errores.error_general = respuesta_formulario.data.message;

        }else if(respuesta_formulario.data.status === "mail_failed"){
            /** asigna mensaje general de exito */
            this.errores.error_general = respuesta_formulario.data.message;
            // this.resetFormulario();

            /** se envia ok */
        }else if(respuesta_formulario.data.status === "mail_sent"){
            /** asigna mensaje general de exito */
            this.mensaje_exito = respuesta_formulario.data.message;
            this.resetFormulario();
        }

        this.cargando_formulario = false;
    },
    obtenerDataFormulario(){
        const data_formulario  = {};
        Object.keys(this.dataFormulario).map(data => {
            data_formulario[data] =  this.dataFormulario[data].data;
        });
        return data_formulario;
    },
    resetErrores(){
        Object.keys(this.dataFormulario).map(data => {
            this.dataFormulario[data].error = false;
        });
    },
    resetFormulario(){
        Object.keys(this.dataFormulario).map(data => {
            this.dataFormulario[data].data = '';
            this.dataFormulario[data].error = false;
        });
    },
    validarFormulario(){
        let errorGeneral = false;
        if( !helpers.validarTelefono(this.dataFormulario.telefono.data.toString())){
            this.dataFormulario.telefono.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.telefono.error = false;

        if(!this.dataFormulario.email.data || !helpers.validateEmail(this.dataFormulario.email.data)){
            this.dataFormulario.email.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.email.error = false;

        if(!this.dataFormulario.nombre.data){
            this.dataFormulario.nombre.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.nombre.error = false;

        if(!this.dataFormulario.apellido.data){
            this.dataFormulario.apellido.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.apellido.error = false;

        if(!this.dataFormulario.asunto.data){
            this.dataFormulario.asunto.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.asunto.error = false;

        if(!this.dataFormulario.comuna.data){
            this.dataFormulario.comuna.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.comuna.error = false;

        if(!this.dataFormulario.comentario.data){
            this.dataFormulario.comentario.error = true;
            errorGeneral = true;
        }else
            this.dataFormulario.comentario.error = false;

        return errorGeneral;
    },
    validarInputTelefono ($event) {
      helpers.validarInputTelefono($event);
    },
    moverCursor($event){
      const largo = $event.target.value.toString().length;

    },
  },
};
</script>