<template>
  <div class="form-input-container">
    <label :for="id">{{ label }}</label>
    <template v-if="type === 'select'">
      <select
        :id="id"
        :name="name"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :class="{ 'is-invalid': error }"
      >
        <option value="" disabled>Select {{ label }}</option>
        <option v-for="option in selectOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </template>
    <template v-else>
      <input
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :maxlength="maxlength"
        :required="required"
        :class="{ 'is-invalid': error }"
      />
    </template>
    <i :class="iconClass"></i>
    <small v-if="error" class="error-message">{{ error }}</small>
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    id: String,
    name: String,
    placeholder: String,
    modelValue: [String, Number],
    maxlength: Number,
    required: Boolean,
    iconClass: String,
    error: String,
    selectOptions: Array
  }
};
</script>

<style scoped>
@import '@/assets/styles/form-input.css';
</style>
