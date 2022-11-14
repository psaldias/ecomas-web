

<template>

  <div class="field" >
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        :placeHolder="placeHolder"
        :class="[{inputClass},{'is-danger':modelValue.error}]"
        :type="type"
        :value="modelValue.data"
        @input="$emit('update:modelValue',{data:$event.target.value,error:modelValue.error,requerido:modelValue.requerido})"
        :maxlength="max"
      />
      <small v-if="helpText" class="is-size-7" v-html="helpText"></small>
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
    helpText:'',
    max:'',
    modelValue:{data:'',error:false,requerido:false },
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {},
};
</script>

