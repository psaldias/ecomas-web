

<template>

  <div class="field" >
    <label for="" class="label" v-if="label">{{ label }}</label>
    <div class="control">
      <textarea
        class="textarea"
        :placeHolder="placeHolder"
        :class="[{inputClass},{'is-danger':modelValue.error}]"
        :type="type"
        :value="modelValue.data"
        @input="$emit('update:modelValue',{data:$event.target.value,error:modelValue.error})"

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
    modelValue:{data:'',error:false},
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

