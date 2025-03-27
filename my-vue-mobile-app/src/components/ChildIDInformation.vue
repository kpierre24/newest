<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="start">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-6">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
                <h1 class="text-h1 font-weight-bold mb-2">Child ID Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide the child's identification details</p>
              </div>

              <v-form @submit.prevent="submitChildIDInformation">
                <v-alert v-if="formError" type="error" variant="tonal" class="mb-4">
                  {{ formError }}
                </v-alert>

                <!-- Child's First Form of ID -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <h3 class="text-h6 mb-4">Child's First Form of ID</h3>
                    <v-select
                      v-model="formData.firstIdType"
                      label="Type of ID"
                      :items="idTypes"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.firstIdNumber"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-pound"
                      :rules="[v => !!v || 'ID number is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.firstExpiryDate"
                      label="Expiry Date"
                      type="date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      :min="minDate"
                      :max="maxExpiryDate"
                      :error-messages="firstExpiryDateError"
                      :disabled="formData.firstIdType === 'Birth Certificate'"
                      :value="formData.firstIdType === 'Birth Certificate' ? defaultBirthCertificateExpiry : formData.firstExpiryDate"
                      @update:model-value="validateExpiryDate('first')"
                      @change="handleIdTypeChange('first')"
                      required
                    />

                    <v-file-input
                      v-model="formData.firstIdDocument"
                      label="Upload ID"
                      variant="outlined"
                      append-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'ID document is required']"
                      @change="handleFileUpload($event, 'first')"
                      required
                      show-size
                      multiple
                      clearable
                    />
                  </v-card-text>
                </v-card>

                <!-- Child's Second Form of ID -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <h3 class="text-h6 mb-4">Child's Second Form of ID</h3>
                    <v-select
                      v-model="formData.secondIdType"
                      label="Type of ID"
                      :items="idTypes.filter(type => type !== formData.firstIdType)"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.secondIdNumber"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-pound"
                      :rules="[v => !!v || 'ID number is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.secondExpiryDate"
                      label="Expiry Date"
                      type="date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      :min="minDate"
                      :max="maxExpiryDate"
                      :error-messages="secondExpiryDateError"
                      :disabled="formData.secondIdType === 'Birth Certificate'"
                      :value="formData.secondIdType === 'Birth Certificate' ? defaultBirthCertificateExpiry : formData.secondExpiryDate"
                      @update:model-value="validateExpiryDate('second')"
                      @change="handleIdTypeChange('second')"
                      required
                    />

                    <v-file-input
                      v-model="formData.secondIdDocument"
                      label="Upload ID"
                      variant="outlined"
                      append-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'ID document is required']"
                      @change="handleFileUpload($event, 'second')"
                      required
                      show-size
                      multiple
                    />
                  </v-card-text>
                </v-card>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      variant="flat"
                      size="large"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      size="large"
                      type="submit"
                      :loading="isLoading"
                    >
                      {{ isLoading ? 'Processing...' : 'Next' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <div class="brand-overlay"></div>
        <v-img
          src="@/assets/Logo1.png"
          alt="Cathedral Engage"
          class="brand-logo"
          contain
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { handleError, AppError, errorTypes } from '@/utils/errorHandler';
import { errorMessages } from '@/utils/errorMessages';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const isLoading = ref(false);
const formError = ref('');
const firstExpiryDateError = ref('');
const secondExpiryDateError = ref('');

// Form data
const formData = ref({
  firstIdType: '',
  firstIdNumber: '',
  firstExpiryDate: '',
  firstIdDocument: null,
  secondIdType: '',
  secondIdNumber: '',
  secondExpiryDate: '',
  secondIdDocument: null,
  signup_id: store.signupId,
  holder_type: 'child'
});

// Computed properties
const minDate = computed(() => new Date().toISOString().split('T')[0]);
const maxExpiryDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
});
const defaultBirthCertificateExpiry = computed(() => '9999-12-31');

// ID types
const idTypes = ['Birth Certificate', 'Passport', 'National ID'];

const handleIdTypeChange = (type) => {
  const idType = type === 'first' ? 'firstIdType' : 'secondIdType';
  const expiryDate = type === 'first' ? 'firstExpiryDate' : 'secondExpiryDate';
  const errorRef = type === 'first' ? firstExpiryDateError : secondExpiryDateError;

  if (formData.value[idType] === 'Birth Certificate') {
    formData.value[expiryDate] = defaultBirthCertificateExpiry.value;
    errorRef.value = '';
  }
};

const validateExpiryDate = (type) => {
  try {
    const idType = `${type}IdType`;
    const expiryDate = `${type}ExpiryDate`;
    const errorRef = type === 'first' ? firstExpiryDateError : secondExpiryDateError;

    if (formData.value[idType] === 'Birth Certificate') {
      formData.value[expiryDate] = defaultBirthCertificateExpiry.value;
      errorRef.value = '';
      return true;
    }

    if (!formData.value[expiryDate]) {
      throw new AppError(errorMessages.validation.required('Expiry date'), errorTypes.VALIDATION_ERROR);
    }

    const expiry = new Date(formData.value[expiryDate]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    if (expiry <= today) {
      throw new AppError('Expiry date must be in the future', errorTypes.VALIDATION_ERROR);
    }

    errorRef.value = '';
    return true;
  } catch (error) {
    const handledError = handleError(error);
    if (type === 'first') {
      firstExpiryDateError.value = handledError.message;
    } else {
      secondExpiryDateError.value = handledError.message;
    }
    return false;
  }
};

const handleFileUpload = (event, type) => {
  try {
    const file = event?.target?.files?.[0] || event;
    if (!(file instanceof File)) {
      throw new AppError(errorMessages.file.invalidFormat, errorTypes.FILE_ERROR);
    }

    const maxSize = parseInt(import.meta.env.VITE_MAX_FILE_SIZE);
    if (file.size > maxSize) {
      throw new AppError(errorMessages.file.sizeLimit(maxSize), errorTypes.FILE_ERROR);
    }

    const allowedTypes = import.meta.env.VITE_ALLOWED_FILE_TYPES.split(',');
    if (!allowedTypes.includes(file.type)) {
      throw new AppError(errorMessages.file.invalidFormat, errorTypes.FILE_ERROR);
    }

    formData.value[`${type}IdDocument`] = file;
  } catch (error) {
    const handledError = handleError(error);
    formError.value = handledError.message;
  }
};

// Add formatDate function
const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date.toISOString().split('T')[0];
};

const submitChildIDInformation = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate form data
    validateForm();

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // Submit first ID
    const firstIdFormData = createIdFormData('first', true);
    const secondIdFormData = createIdFormData('second', false);

    try {
      const [firstResponse, secondResponse] = await Promise.all([
        submitId(firstIdFormData),
        submitId(secondIdFormData)
      ]);

      // Save to store
      saveToStore();

      router.push('/parent-guardian-information');
    } catch (error) {
      throw new AppError(errorMessages.submission.general, errorTypes.API_ERROR);
    }
  } catch (error) {
    console.error('Error submitting child ID information:', error);
    
    if (error.response && error.response.status !== 200) {
      formError.value = error.response.data.detail || 'An error occurred';
    } else {
      formError.value = 'An unexpected error occurred';
    }
  } finally {
    isLoading.value = false;
  }
};

const createIdFormData = (type, isPrimary) => {
  const formDataObj = new FormData();
  formDataObj.append('signup_id', store.signupId);
  formDataObj.append('id_type', formData.value[`${type}IdType`]);
  formDataObj.append('holder_type', 'child');
  formDataObj.append('id_number', formData.value[`${type}IdNumber`]);
  formDataObj.append('id_expiry_date', formatDate(formData.value[`${type}ExpiryDate`]));
  formDataObj.append('is_primary_id', isPrimary.toString());
  
  const idDocument = formData.value[`${type}IdDocument`];
  if (idDocument instanceof File) {
    formDataObj.append('id_files', idDocument);
  }
  
  return formDataObj;
};

const submitId = async (formDataObj) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.post(`${baseURL}/identifications/`, formDataObj, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT)
  });
};

const validateForm = () => {
  const requiredFields = [
    { field: 'firstIdType', message: errorMessages.validation.required('First ID type') },
    { field: 'firstIdNumber', message: errorMessages.validation.required('First ID number') },
    { field: 'firstIdDocument', message: errorMessages.validation.required('First ID document') },
    { field: 'secondIdType', message: errorMessages.validation.required('Second ID type') },
    { field: 'secondIdNumber', message: errorMessages.validation.required('Second ID number') },
    { field: 'secondIdDocument', message: errorMessages.validation.required('Second ID document') }
  ];

  for (const { field, message } of requiredFields) {
    if (!formData.value[field]) {
      throw new AppError(message, errorTypes.VALIDATION_ERROR);
    }
  }

  if (!validateExpiryDate('first') || !validateExpiryDate('second')) {
    throw new AppError(errorMessages.validation.required('Valid expiry dates'), errorTypes.VALIDATION_ERROR);
  }
};

const saveToStore = () => {
  store.$patch({
    childIdInfo: {
      firstIdType: formData.value.firstIdType,
      firstIdNumber: formData.value.firstIdNumber,
      firstExpiryDate: formData.value.firstExpiryDate,
      secondIdType: formData.value.secondIdType,
      secondIdNumber: formData.value.secondIdNumber,
      secondExpiryDate: formData.value.secondExpiryDate,
      holder_type: 'child'
    }
  });
};

const navigateToPrevious = () => {
  saveToStore();
  router.go(-1);
};

onMounted(() => {
  if (store.childIdInfo) {
    formData.value = { ...formData.value, ...store.childIdInfo };
  }
});
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
  overflow-y: auto;
}

.form-container {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .brand-section {
    position: relative;
    width: 100%;
    min-height: 300px;
  }

  .brand-logo {
    width: 180px;
  }
}

@media (max-width: 600px) {
  .form-section {
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .form-container {
    min-height: auto;
    padding: 1rem;
  }
}
</style>