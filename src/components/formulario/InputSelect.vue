

<template>
  <div class="field">
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
      <div class="select" :class="[inputClass,{'is-danger':modelValue.error}]">
        <select
          :value="modelValue.data"
          @input="$emit('update:modelValue',{data:$event.target.value,error:modelValue.error,requerido:modelValue.requerido})"
          id=""
          name=""

        >
          <option value=""  v-if="placeHolder" >{{ placeHolder }}</option>
          <option v-if="!contieneObjetos()" :value="value" v-for="value in values" >
            {{ value }}
          </option>
          <option v-else :value="value.id" v-for="(value, index) in values" >
            {{ value.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: "",
    placeHolder: "",
    inputClass: "",
    modelValue:{data:'',error:false,requerido:false },
    values: {},
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    contieneObjetos(){
      return this.values.some( (value,id) => { return (typeof value === 'object')});
    }
  },
};
</script>

