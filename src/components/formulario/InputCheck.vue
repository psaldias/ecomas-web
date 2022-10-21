<template>
  <div class="field">
    <div class="control primero has-text-weight-bold" :class="[{ 'is-danger': modelValue.error }]">
      <label class="checkbox">
        <input
          type="checkbox"
          v-model="modelValue.data"
          @input="$emit('update:modelValue',{data:!$event.target.value,error:modelValue.error,requerido:modelValue.requerido})"
        />
        {{label}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: '',
    type: '',
    modelValue:{data:'',error:false,requerido:false },
    error: false,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
  },
}
</script>
