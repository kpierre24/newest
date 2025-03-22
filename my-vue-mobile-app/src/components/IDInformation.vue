<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="start">
            <v-col cols="12" sm="8" md="10" lg="8">
              <!-- Header Section -->
              <div class="text-center mb-6">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-4"
                  width="80"
                />
                
                <h1 class="text-h1 font-weight-bold mb-1">ID Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your identification details</p>
              </div>

              <!-- Form Content -->
              <div class="form-content">
                <v-form @submit.prevent="submitIDInformation">
                  <v-alert
                    v-if="formError"
                    type="error"
                    variant="tonal"
                    class="mb-4"
                    density="compact"
                  >
                    {{ formError }}
                  </v-alert>

                  <!-- First Form of ID -->
                  <v-card class="mb-4" elevation="3">
                    <v-card-text class="pa-4">
                      <h3 class="text-h6 mb-3">First Form of ID</h3>
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
                        placeholder="Enter 12-digit ID number"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-pound"
                        :maxlength="12"
                        :rules="[v => !!v || 'ID number is required']"
                        required
                        class="mb-3"
                      />

                      <v-text-field
                        v-model="formData.firstExpiryDate"
                        label="Expiry Date"
                        type="date"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-calendar"
                        :min="minDate"
                        :max="maxExpiryDate"
                        :error-messages="firstExpiryDateError"
                        :disabled="formData.firstIdType === 'Birth Certificate'"
                        @update:model-value="validateFirstExpiryDate"
                        required
                        class="mb-3"
                      />

                      <v-file-input
                        v-model="formData.firstIdDocument"
                        label="Upload ID"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-upload"
                        accept=".pdf,.jpg,.png"
                        :rules="[v => !!v || 'ID document is required']"
                        @change="(file) => handleFileUpload(file, 'first')"
                        required
                        class="mb-2"
                        truncate-length="25"
                      />
                    </v-card-text>
                  </v-card>

                  <!-- Second Form of ID -->
                  <v-card class="mb-4" elevation="3">
                    <v-card-text>
                      <h3 class="text-h6 mb-4">Second Form of ID</h3>
                      <v-select
                        v-model="formData.secondIdType"
                        label="Type of ID"
                        :items="secondIdTypeOptions"
                        variant="outlined"
                        prepend-inner-icon="mdi-card-account-details"
                        :rules="[v => !!v || 'ID type is required']"
                        required
                      />

                      <v-text-field
                        v-model="formData.secondIdNumber"
                        label="ID Number"
                        placeholder="Enter 12-digit ID number"
                        variant="outlined"
                        prepend-inner-icon="mdi-pound"
                        :maxlength="12"
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
                        @update:model-value="validateSecondExpiryDate"
                        required
                      />

                      <v-file-input
                        v-model="formData.secondIdDocument"
                        label="Upload ID"
                        variant="outlined"
                        prepend-inner-icon="mdi-upload"
                        accept=".pdf,.jpg,.png"
                        :rules="[v => !!v || 'ID document is required']"
                        @change="(file) => handleFileUpload(file, 'second')"
                        required
                      />
                    </v-card-text>
                  </v-card>
                </v-form>
              </div>

              <!-- Navigation Buttons - Fixed at bottom -->
              
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      variant="elevated"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
                      height="44"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      @click="submitIDInformation"
                      :loading="isLoading"
                      height="44"
                    >
                      {{ isLoading ? 'Processing...' : 'Next' }}
                    </v-btn>
                  </v-col>
                </v-row>
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { useDateValidation } from '@/composables/useDateValidation';
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const { minDate, validateExpiryDate } = useDateValidation();

const formData = ref({
  firstIdType: '',
  firstIdNumber: '',
  firstExpiryDate: '',
  firstIdDocument: null,
  secondIdType: '',
  secondIdNumber: '',
  secondExpiryDate: '',
  secondIdDocument: null
});

const formError = ref('');
const isLoading = ref(false);
const firstExpiryDateError = ref('');
const secondExpiryDateError = ref('');

// Computed properties
const maxExpiryDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
});

// Computed property for second ID type options
const secondIdTypeOptions = computed(() => {
  if (formData.value.firstIdType === 'National ID') {
    return ["Driver's Permit", 'Birthpaper', 'Passport'];
  }
  return ['National ID', "Driver's Permit", 'Birthpaper', 'Passport'];
});

// Methods
const validateFirstExpiryDate = () => {
  if (formData.value.firstIdType === 'Birth Certificate') {
    firstExpiryDateError.value = '';
    return true;
  }

  if (!formData.value.firstExpiryDate) {
    firstExpiryDateError.value = 'Expiry date is required';
    return false;
  }

  if (!validateExpiryDate(formData.value.firstExpiryDate)) {
    firstExpiryDateError.value = 'Expiry date must be today or in the future';
    return false;
  }

  firstExpiryDateError.value = '';
  return true;
};

const validateSecondExpiryDate = () => {
  if (formData.value.secondIdType === 'Birth Certificate') {
    secondExpiryDateError.value = '';
    return true;
  }

  if (!formData.value.secondExpiryDate) {
    secondExpiryDateError.value = 'Expiry date is required';
    return false;
  }

  if (!validateExpiryDate(formData.value.secondExpiryDate)) {
    secondExpiryDateError.value = 'Expiry date must be today or in the future';
    return false;
  }

  secondExpiryDateError.value = '';
  return true;
};

const handleFileUpload = (file, idType) => {
  if (file && file.length > 0) {
    if (idType === 'first') {
      formData.value.firstIdDocument = file[0];
    } else {
      formData.value.secondIdDocument = file[0];
    }
  }
};

const navigateToPrevious = () => {
  router.go(-1);
};

const submitIDInformation = async () => {
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
    if (!validateFirstExpiryDate() || !validateSecondExpiryDate()) {
      formError.value = 'Please check the expiry dates';
      isLoading.value = false;
      return;
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const holderType = calculateHolderType();

    // Format expiry dates properly
    const formatExpiryDate = (date) => {
      if (!date) return new Date().toISOString();
      return new Date(date).toISOString();
    };

    // Create FormData for first ID (National ID - Primary ID)
    const firstIdFormData = new FormData();
    firstIdFormData.append('signup_id', 'ed870fc3-f084-4be2-b3fe-f097064992ac');
    firstIdFormData.append('id_type', formData.value.firstIdType);
    firstIdFormData.append('holder_type', holderType);
    firstIdFormData.append('id_number', formData.value.firstIdNumber);
    firstIdFormData.append('id_expiry_date', formatExpiryDate(formData.value.firstExpiryDate));
    firstIdFormData.append('is_primary_id', 'true');
    firstIdFormData.append('id_files', formData.value.firstIdDocument);

    // Create FormData for second ID
    const secondIdFormData = new FormData();
    secondIdFormData.append('signup_id', 'ed870fc3-f084-4be2-b3fe-f097064992ac');
    secondIdFormData.append('id_type', formData.value.secondIdType);
    secondIdFormData.append('holder_type', holderType);
    secondIdFormData.append('id_number', formData.value.secondIdNumber);
    secondIdFormData.append('id_expiry_date', formatExpiryDate(formData.value.secondExpiryDate));
    secondIdFormData.append('is_primary_id', 'false');
    secondIdFormData.append('id_files', formData.value.secondIdDocument);
 
    for (let pair of firstIdFormData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    
    for (let pair of secondIdFormData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    
    // Submit both IDs
    await Promise.all([
      axios.post(`${baseURL}/identifications/`, firstIdFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      axios.post(`${baseURL}/identifications/`, secondIdFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    ]);

    // Save to store
    store.$patch({
      idInfo: {
        firstIdType: formData.value.firstIdType,
        firstIdNumber: formData.value.firstIdNumber,
        firstExpiryDate: formData.value.firstExpiryDate,
        secondIdType: formData.value.secondIdType,
        secondIdNumber: formData.value.secondIdNumber,
        secondExpiryDate: formData.value.secondExpiryDate
      }
    });

    // Navigate based on customer type
    if (store.isExistingCustomer) {
      router.push('/account-number');
    } else {
      router.push('/due-diligence');
    }
  } catch (error) {
    console.error('Error submitting ID information:', error);
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

// Calculate holder type based on age
const calculateHolderType = () => {
  const dob = new Date(store.dob);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age >= 18 ? 'self' : 'guardian';
};

// ID types that match the backend schema
const idTypes = [
  'National ID',
  'Passport',
  "Drivers License",
  'Birth Certificate'
];
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

.form-content {
  margin-bottom: 2rem;
}

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.v-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-field) {
  border-radius: 8px;
}

:deep(.v-input) {
  font-size: 0.95rem;
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
    display: none; /* Hide brand section on mobile */
  }
}

/* Ensure form content is scrollable on mobile */
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

  .navigation-buttons {
    padding: 0.75rem;
  }

  :deep(.v-card-text) {
    padding: 16px !important;
  }
}
</style>