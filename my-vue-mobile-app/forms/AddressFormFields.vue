<template>
  <div>
    <v-text-field
      v-model="formData.addressLine1"
      label="Address Line 1"
      :rules="[v => !!v || 'Address Line 1 is required']"
      placeholder="Enter address line 1"
      variant="outlined"
      prepend-inner-icon="mdi-map-marker"
      required
      :error-messages="errors.addressLine1"
    />

    <!-- Other form fields... -->
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  },
  countryList: {
    type: Array,
    required: true
  },
  dwellingStatusOptions: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:formData', 'fileUpload']);
</script> 