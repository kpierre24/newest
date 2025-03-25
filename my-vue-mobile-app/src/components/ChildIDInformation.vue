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
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();

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
  holder_type: 'child', 
});

const formError = ref('');
const isLoading = ref(false);
const firstExpiryDateError = ref('');
const secondExpiryDateError = ref('');

// Computed properties
const minDate = computed(() => new Date().toISOString().split('T')[0]);
const maxExpiryDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
});
const defaultBirthCertificateExpiry = computed(() => '9999-12-31');
console.log(formData.value);

// ID types
const idTypes = ['Birth Certificate', 'Passport', 'National ID'];

// Methods
const handleIdTypeChange = (type) => {
  if (type === 'first') {
    if (formData.value.firstIdType === 'Birth Certificate') {
      formData.value.firstExpiryDate = defaultBirthCertificateExpiry.value;
      firstExpiryDateError.value = '';
    }
  } else {
    if (formData.value.secondIdType === 'Birth Certificate') {
      formData.value.secondExpiryDate = defaultBirthCertificateExpiry.value;
      secondExpiryDateError.value = '';
    }
  }
};

const validateExpiryDate = (type) => {
  if (formData.value[`${type}IdType`] === 'Birth Certificate') {
    formData.value[`${type}ExpiryDate`] = defaultBirthCertificateExpiry.value;
    if (type === 'first') {
      firstExpiryDateError.value = '';
    } else {
      secondExpiryDateError.value = '';
    }
    return true;
  }

  const expiry = new Date(formData.value[`${type}ExpiryDate`]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  if (!formData.value[`${type}ExpiryDate`]) {
    if (type === 'first') {
      firstExpiryDateError.value = 'Expiry date is required';
    } else {
      secondExpiryDateError.value = 'Expiry date is required';
    }
    return false;
  }

  if (expiry <= today) {
    if (type === 'first') {
      firstExpiryDateError.value = 'Expiry date must be in the future';
    } else {
      secondExpiryDateError.value = 'Expiry date must be in the future';
    }
    return false;
  }

  if (type === 'first') {
    firstExpiryDateError.value = '';
  } else {
    secondExpiryDateError.value = '';
  }
  return true;
};

const handleFileUpload = (event, type) => {
  const file = event?.target?.files?.[0] || event;
  if (file instanceof File) {
    formData.value[`${type}IdDocument`] = file;
  }
};

const navigateToPrevious = () => {
  saveToStore();
  router.go(-1);
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
      holder_type: 'child',

    },
  });
};

const submitChildIDInformation = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!formData.value.firstIdType || !formData.value.firstIdNumber || !formData.value.firstIdDocument ||
        !formData.value.secondIdType || !formData.value.secondIdNumber || !formData.value.secondIdDocument) {
      formError.value = 'Please fill in all required fields';
      isLoading.value = false;
      return;
    }

    // Validate expiry dates
    if (!validateExpiryDate('first') || !validateExpiryDate('second')) {
      formError.value = 'Please check the expiry dates';
      isLoading.value = false;
      return;
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // Format date to ISO string and handle timezone
    const formatDate = (dateString) => {
      if (!dateString) return null;
      const date = new Date(dateString);
      date.setHours(0, 0, 0, 0);
      return date.toISOString().split('T')[0];
    };

    // Create FormData for first ID
    const firstIdFormData = new FormData();
    firstIdFormData.append('signup_id', store.signupId);
    firstIdFormData.append('id_type', formData.value.firstIdType);
    firstIdFormData.append('holder_type', 'child');
    firstIdFormData.append('id_number', formData.value.firstIdNumber);
    firstIdFormData.append('id_expiry_date', formatDate(formData.value.firstExpiryDate));
    firstIdFormData.append('is_primary_id', 'true');
    
    // Handle file upload for first ID
    if (formData.value.firstIdDocument instanceof File) {
      firstIdFormData.append('id_files', formData.value.firstIdDocument);
    } else if (Array.isArray(formData.value.firstIdDocument) && formData.value.firstIdDocument.length > 0) {
      firstIdFormData.append('id_files', formData.value.firstIdDocument[0]);
    }

    // Create FormData for second ID
    const secondIdFormData = new FormData();
    secondIdFormData.append('signup_id', store.signupId);
    secondIdFormData.append('id_type', formData.value.secondIdType);
    secondIdFormData.append('holder_type', 'child');
    secondIdFormData.append('id_number', formData.value.secondIdNumber);
    secondIdFormData.append('id_expiry_date', formatDate(formData.value.secondExpiryDate));
    secondIdFormData.append('is_primary_id', 'false');
    
    // Handle file upload for second ID
    if (formData.value.secondIdDocument instanceof File) {
      secondIdFormData.append('id_files', formData.value.secondIdDocument);
    } else if (Array.isArray(formData.value.secondIdDocument) && formData.value.secondIdDocument.length > 0) {
      secondIdFormData.append('id_files', formData.value.secondIdDocument[0]);
    }

    
    
    for (let pair of firstIdFormData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    
    for (let pair of secondIdFormData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Submit first ID
    try {
      const firstResponse = await axios.post(`${baseURL}/identifications/`, firstIdFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('First ID Response:', firstResponse.data);
    } catch (firstError) {
      console.error('Error submitting first ID:', firstError.response?.data || firstError.message);
      throw firstError;
    }

    // Submit second ID
    try {
      const secondResponse = await axios.post(`${baseURL}/identifications/`, secondIdFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Second ID Response:', secondResponse.data);
    } catch (secondError) {
      console.error('Error submitting second ID:', secondError.response?.data || secondError.message);
      throw secondError;
    }

    // Save to store
    store.$patch({
      childIdInfo: {
        firstIdType: formData.value.firstIdType,
        firstIdNumber: formData.value.firstIdNumber,
        firstExpiryDate: formData.value.firstExpiryDate,
        secondIdType: formData.value.secondIdType,
        secondIdNumber: formData.value.secondIdNumber,
        secondExpiryDate: formData.value.secondExpiryDate,
        holder_type: 'child',
      },
    });

    router.push('/parent-guardian-information');
  } catch (error) {
    console.error('Error submitting child ID information:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      formError.value = error.response.data.detail || 'An error occurred while submitting your information';
    } else {
      formError.value = 'An error occurred while submitting your information';
    }
  } finally {
    isLoading.value = false;
  }
};

// Initialize component
onMounted(() => {
  if (store.childIdInfo) {
    formData.value = { ...store.childIdInfo };
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