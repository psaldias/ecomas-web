

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
                            :error="errores.nombre"
                        />
                    </div>
                    <div class="column is-6">
                        <InputBase
                            label="apellido"
                            placeHolder='ej:Perez'
                            type="text"
                            v-model="dataFormulario.apellido"
                            :error="errores.apellido"
                        />
                    </div>

                    <div class="column is-6">
                        <InputBase
                            label="Email"
                            placeHolder='ej:email@ecomas.cl'
                            type="email"
                            v-model="dataFormulario.email"
                            :error="errores.email"
                        />
                    </div>
                    <div class="column is-6">
                        <InputBase
                            label="telefono"
                            placeHolder='ej:9 1234 1234'
                            type="text"
                            v-model="dataFormulario.telefono"
                            :error="errores.telefono"
                        />
                    </div>
                    <div class="column is-12">
                        <InputSelect
                            label="Asunto"
                            placeHolder='Selecciona un asunto'
                            inputClass="is-fullwidth"
                            :values=" valoresAsunto "
                            v-model="dataFormulario.asunto"
                            :error="errores.asunto"
                        />
                    </div>
                    <div class="column is-6">
                        <InputSelect
                            label="Comuna"
                            placeHolder='Selecciona una Comuna'
                            inputClass="is-fullwidth"
                            :values=" valoresComuna "
                            v-model="dataFormulario.comuna"
                            :error="errores.comuna"
                        />
                    </div>
                    <div class="column is-6">
                        <InputFile
                            label="Cargar Archivo (jpg, png, doc, ...)"
                            placeHolder='Seleccionar Archivo'
                            type="text"
                            v-model="dataFormulario.archivo"
                            :error="errores.archivo"
                        />
                    </div>
                    <div class="column is-12">
                        <InputTextarea
                            label="Comentario"
                            placeHolder='Texto...'
                            inputClass="is-fullwidth"
                            v-model="dataFormulario.comentario"
                            :error="errores.comentario"
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
import Noticia from "../components/general/Noticia.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import InputBase from "../components/formulario/InputBase.vue";
import InputSelect from "../components/formulario/InputSelect.vue";
import InputTextarea from "../components/formulario/InputTextarea.vue";
import InputFile from "../components/formulario/InputFile.vue";
import CargandoSeccion from "@/components/general/CargandoSeccion.vue";

export default {
  components: {
    Noticia,
    BannerSeccion,
    InputBase,
    InputSelect,
    InputTextarea,
    InputFile,
    CargandoSeccion,
},
  data() {
    return {
        data:{},
        cargando:true,
        cargando_formulario: false,
        dataFormulario: {
            nombre:'',
            apellido:'',
            email:'',
            telefono:'',
            asunto:'',
            comuna:'',
            archivo:{},
            comentario:'',
        },
        errores: {
            nombre:false,
            apellido:false,
            email:false,
            telefono:false,
            asunto:false,
            comuna:false,
            archivo:false,
            comentario:false,
            error_general:'',
        },
        mensaje_exito:'',
        configuracionFormulario:{}
    };
  },
  async mounted (){
    const respuesta = await this.obtenerInfoInicial('pages/185');
    if(respuesta){
        this.data = respuesta.data;

    }
    const respuesta_formulario = await this.obtenerInfoInicial('contact-forms/223',{cache:true,baseUrl:'/contact-form-7/v1/'});
    this.configuracionFormulario = respuesta_formulario.data;
    console.log(this.configuracionFormulario);
    this.cargando = false;
  },
  computed: {
    valoresAsunto(){
        const campo = this.configuracionFormulario.properties.form.fields.find(field => { return field.name == 'asunto'});
        return campo.values
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
        /** enviar data de formulario al api rest */
        const respuesta_formulario = await this.enviarPost('contact-forms/223/feedback',this.dataFormulario,{baseUrl:'/contact-form-7/v1/'});

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
    resetErrores(){
        this.errores = {
            nombre:false,
            apellido:false,
            email:false,
            telefono:false,
            asunto:false,
            comuna:false,
            archivo:false,
            comentario:false,
            error_general:''
        }
    },
    resetFormulario(){
        this.dataFormulario = {
            nombre:'',
            apellido:'',
            email:'',
            telefono:'',
            asunto:'',
            comuna:'',
            archivo:{},
            comentario:'',
        }
    }
  },
};
</script>