<template>
  <div class="field">
    <div class="control primero has-text-weight-bold" :class="[{ 'is-danger': error }]">
      <label class="checkbox">
        <input
          type="checkbox"
          v-model="modelValue"
          @input="$emit('update:modelValue', !modelValue)"
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
    modelValue: {
      type: Boolean,
      default: false,
    },
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
