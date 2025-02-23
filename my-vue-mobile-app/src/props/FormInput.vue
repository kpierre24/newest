<template>
  <div class="input-container">
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
.input-container {
  margin-bottom: 20px;
  position: relative;
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.input-container .error-message {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
}

.input-container i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}
</style>
