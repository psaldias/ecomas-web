

<template>
  <main class="contacto">
    <div class="wrapper">

        <BannerSeccion titulo="Contacto" imagen="/img/banner-contacto.jpg" />


        <div class="columns is-centered mt-5">
            <div class="column is-10">
                <div class="columns is-multiline mt-4 listado-contacto">

                    <div class="column is-4">
                        <div class="card is-height-100 has-text-centered">
                            <div class="imagen telefono">
                                <img src="/img/telefono.jpg" />
                            </div>
                            <div class="content">
                                <b>Teléfono</b><br>
                                600 401 0606
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="card is-height-100 has-text-centered">
                            <div class="imagen ">
                                <img src="/img/ubicacion.jpg" />
                            </div>
                            <div class="content">
                                <b>Casa matriz</b><br>
                                Avenida Las Industrias #1245, Los Ángeles, Chile
                            </div>
                        </div>
                    </div>
                    <div class="column is-4">
                        <div class="card is-height-100 has-text-centered">
                            <div class="imagen ">
                                <img src="/img/email.jpg" />
                            </div>
                            <div class="content">
                                <b>Email</b><br>
                                contacto@ecomas.cl
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="columns is-centered mt-6">
            <div class="column is-8">

                <h2 class="has-text-centered primero is-size-4"><b>Comunicate con nosotros,<br> ingrese sus datos en el siguiente formulario</b></h2>

                <div class="columns is-multiline mt-6">

                    <div class="column is-6">
                        <InputBase
                            label="Nombre"
                            placeHolder='ej:Pedro'
                            type="text"
                            v-model="dataFormulario.nombre"
                            :error="false"
                        />
                    </div>
                    <div class="column is-6">
                        <InputBase
                            label="apellido"
                            placeHolder='ej:Perez'
                            type="text"
                            v-model="dataFormulario.apellido"
                            :error="false"
                        />
                    </div>

                    <div class="column is-6">
                        <InputBase
                            label="Email"
                            placeHolder='ej:email@ecomas.cl'
                            type="email"
                            v-model="dataFormulario.email"
                            :error="false"
                        />
                    </div>
                    <div class="column is-6">
                        <InputBase
                            label="telefono"
                            placeHolder='ej:9 1234 1234'
                            type="text"
                            v-model="dataFormulario.telefono"
                            :error="false"
                        />
                    </div>
                    <div class="column is-12">
                        <InputSelect
                            label="Asunto"
                            placeHolder='Selecciona un asunto'
                            inputClass="is-fullwidth"
                            :values=" ['Asunto 1','Asunto 2'] "
                            v-model="dataFormulario.asunto"
                        />
                    </div>
                    <div class="column is-6">
                        <InputSelect
                            label="Comuna"
                            placeHolder='Selecciona una Comuna'
                            inputClass="is-fullwidth"
                            :values=" ['Concepción','Los Ángeles'] "
                            v-model="dataFormulario.comuna"
                        />
                    </div>
                    <div class="column is-6">
                        <InputFile
                            label="Cargar Archivo (jpg, png, doc, ...)"
                            placeHolder='Seleccionar Archivo'
                            type="text"
                            v-model="dataFormulario.archivo"
                            :error="false"
                        />
                    </div>
                    <div class="column is-12">
                        <InputTextarea
                            label="Comentario"
                            placeHolder='Texto...'
                            inputClass="is-fullwidth"
                            v-model="dataFormulario.asunto"
                        />
                    </div>
                    <div class="column is-12">
                        <div class="columns is-centered">
                            <div class="column is-4">
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
            </div>
        </div>

    </div>
  </main>
</template>



<script>
import Noticia from "../components/general/Noticia.vue";
import BannerSeccion from "../components/general/BannerSeccion.vue";
import InputBase from "../components/formulario/InputBase.vue";
import InputSelect from "../components/formulario/InputSelect.vue";
import InputTextarea from "../components/formulario/InputTextarea.vue";
import InputFile from "../components/formulario/InputFile.vue";

export default {
  components: {
    Noticia,
    BannerSeccion,
    InputBase,
    InputSelect,
    InputTextarea,
    InputFile
},
  data() {
    return {
      dataFormulario: {
        nombre:'',
        appelido:'',
        email:'',
        telefono:'',
        asunto:'',
        comuna:'',
        archivo:'',
        comentario:'',
      }
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>