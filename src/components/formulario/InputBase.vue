

<template>

  <div class="field" >
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        :placeHolder="placeHolder"
        :class="[{inputClass},{'is-danger':error}]"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue',$event.target.value)"

      />
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
      default:''
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

