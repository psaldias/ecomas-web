

<template>
  <div class="field">
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
      <div class="select" :class="[inputClass,{'is-danger':error}]">
        <select
          :value="modelValue"
          @input="$emit('update:modelValue',$event.target.value)"
          id=""
          name=""
        >
          <option value=""  v-if="placeHolder" >{{ placeHolder }}</option>
          <option :value="value" v-for="(value, index) in values" :key="index">
            {{ value }}
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
    modelValue:{
      type:String,
      default:''
    },
    error:false,
    values: {},
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

