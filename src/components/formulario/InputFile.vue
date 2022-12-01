

<template>
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
        <div class="file has-name is-right is-normal is-fullwidth " :class="[{inputClass},{'is-danger':error}]" >
            <label class="file-label">
                <input class="file-input" type="file" name="resume" @input="actualizarArchivo($event)" :accept="permitidos">
                <span class="file-cta bg-blanco ">
                    <span class="file-icon mr-0">
                        <i class="fa-solid fa-upload primero"></i>
                    </span>
                </span>
                <span class="file-name" >
                    {{  nombreArchivo }}
                </span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    label: "",
    placeHolder: "",
    inputClass:"",
    type:'',
    modelValue:{data:'',error:false},
    error:false,
    permitidos:false,
  },
  data() {
    return {
      archivo:false
    };
  },
  mounted(){
  },
  computed: {
    nombreArchivo(){
      return this.archivo?this.archivo: this.placeHolder;
    }
  },
  methods: {
    actualizarArchivo($event){
      if($event.target.files.length){
        this.$emit('update:modelValue',{data:$event.target.files[0],error:this.modelValue.error})
        this.archivo = $event.target.files[0].name;
      }else{
        this.$emit('update:modelValue',{data:$event.target.value,error:this.modelValue.error})
        this.archivo = '';
      }
    }
  },
};
</script>

