

<template>
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
        <div class="file has-name is-right is-normal is-fullwidth " :class="[{inputClass},{'is-danger':error}]">
            <label class="file-label">
                <input class="file-input" type="file" name="resume">
                <span class="file-cta bg-blanco ">
                    <span class="file-icon mr-0">
                        <i class="fa-solid fa-upload primero"></i>
                    </span>
                </span>
                <span class="file-name" >
                    {{placeHolder}}
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
    modelValue:{
      type:String,
      default:false
    },
    error:false,
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {},
};
</script>

