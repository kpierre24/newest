<template>
  <div class="form-input-container">
    <label v-if="label" :for="id" :class="{ 'required-label': required }">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>
    <template v-if="type === 'select'">
      <div class="input-wrapper">
        <select
          :id="id"
          :name="name"
          :value="modelValue"
          @input="updateValue($event)"
          :required="required"
          :disabled="disabled"
          :class="{ 'is-invalid': error, 'has-value': !!modelValue, 'is-disabled': disabled }"
        >
          <option value="" disabled selected>Select {{ placeholder || label }}</option>
          <option v-for="option in selectOptions" :key="option" :value="option">
            {{ option.charAt(0).toUpperCase() + option.slice(1) }}
          </option>
        </select>
        <i :class="iconClass"></i>
      </div>
    </template>
    <template v-else>
      <div class="input-wrapper">
        <input
          :type="type"
          :id="id"
          :name="name"
          :placeholder="placeholder"
          :value="modelValue"
          @input="updateValue($event)"
          :maxlength="maxlength"
          :min="min"
          :max="max"
          :required="required"
          :disabled="disabled"
          :class="{ 'is-invalid': error, 'has-value': !!modelValue, 'is-disabled': disabled }"
        />
        <i :class="iconClass"></i>
      </div>
    </template>
    <small v-if="error" class="error-message">{{ error }}</small>
    <small v-else-if="helperText" class="helper-text">{{ helperText }}</small>
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
    min: [String, Number],
    max: [String, Number],
    required: Boolean,
    disabled: Boolean,
    iconClass: String,
    error: String,
    helperText: String,
    selectOptions: Array
  },
  methods: {
    updateValue(event) {
      // For Vue 3 compatibility, use event.target.value
      this.$emit('update:modelValue', event.target.value);
      
      // Emit additional events for validation purposes
      if (this.required && !event.target.value.trim()) {
        this.$emit('validation', { field: this.id, valid: false, message: `${this.label || 'Field'} is required` });
      } else {
        this.$emit('validation', { field: this.id, valid: true });
      }
    }
  }
};
</script>

<style scoped>
.form-input-container {
  position: relative;
  margin-bottom: 20px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.form-input-container .icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
  z-index: 2;
}

.form-input-container input,
.form-input-container select {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input-container input:focus,
.form-input-container select:focus {
  border-color: #FFBC2D;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 188, 45, 0.3);
}

.form-input-container input.has-value,
.form-input-container select.has-value {
  border-color: #4CAF50;
  background-color: rgba(76, 175, 80, 0.05);
}

.form-input-container input.is-disabled,
.form-input-container select.is-disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Label styling */
.form-input-container label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.required-label {
  font-weight: 600;
}

.required-mark {
  color: #ff4d4d;
  margin-left: 3px;
}

/* Date input specific styles */
.form-input-container input[type="date"] {
  position: relative;
}

.form-input-container input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

/* Select dropdown specific styles */
.form-input-container select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

/* Error message styling */
.form-input-container .error-message {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-input-container .helper-text {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.is-invalid {
  border-color: #ff4d4d !important;
}
</style>
