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
                        @update:model-value="updateSecondIdOptions"
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
                        @change="handleFileUpload($event, 'first')"
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
                        :items="updateSecondIdOptions()"
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
                        @change="handleFileUpload($event, 'second')"
                        required
                      />
                    </v-card-text>
                  </v-card>

                  <!-- Marital Status -->
                  <v-card class="mb-6" elevation="3">
                    <v-card-text class="pa-4">
                      <h3 class="text-h6 mb-3">Marital Status</h3>
                      <v-select
                        v-model="maritalStatus"
                        label="Marital Status"
                        :items="['Married', 'Divorced', 'Single', 'Widowed']"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-heart"
                        :rules="[v => !!v || 'Marital status is required']"
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
const secondIdOptions = ref(['National ID', "Driver's Permit", 'Birthpaper', 'Passport']);
const maritalStatus = ref('');

// Computed properties
const maxExpiryDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
});

// Methods
const validateFirstExpiryDate = () => {
  if (formData.value.firstIdType === 'Birth Certificate') {
    formData.value.firstExpiryDateError = '';
    return true;
  }

  if (!formData.value.firstExpiryDate) {
    formData.value.firstExpiryDateError = 'Expiry date is required';
    return false;
  }

  if (!validateExpiryDate(formData.value.firstExpiryDate)) {
    formData.value.firstExpiryDateError = 'Expiry date must be today or in the future';
    return false;
  }

  formData.value.firstExpiryDateError = '';
  return true;
};

const validateSecondExpiryDate = () => {
  if (formData.value.secondIdType === 'Birth Certificate') {
    formData.value.secondExpiryDateError = '';
    return true;
  }

  if (!formData.value.secondExpiryDate) {
    formData.value.secondExpiryDateError = 'Expiry date is required';
    return false;
  }

  if (!validateExpiryDate(formData.value.secondExpiryDate)) {
    formData.value.secondExpiryDateError = 'Expiry date must be today or in the future';
    return false;
  }

  formData.value.secondExpiryDateError = '';
  return true;
};

const handleFileUpload = (file, idType) => {
  if (idType === 'first') {
    formData.value.firstIdDocument = file;
  } else {
    formData.value.secondIdDocument = file;
  }
};

const updateSecondIdOptions = () => {
  if (formData.value.firstIdType === 'National ID') {
    secondIdOptions.value = ["Driver's Permit", 'Birthpaper', 'Passport'];
  } else {
    secondIdOptions.value = ['National ID', "Driver's Permit", 'Birthpaper', 'Passport'];
  }
};

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ?
    'http://localhost:3000' :
    `http://${window.location.hostname}:3000`;
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

    const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : `http://${window.location.hostname}:8000`;
    const holderType = calculateHolderType();

    // Format expiry dates properly
    const formatExpiryDate = (date) => {
      if (!date) return new Date().toISOString();
      return new Date(date).toISOString();
    };

    // Create FormData for first ID (National ID - Primary ID)
    const firstIdFormData = new FormData();
    firstIdFormData.append('signup_id', store.signupId);
    firstIdFormData.append('id_type', formData.value.firstIdType);
    firstIdFormData.append('holder_type', holderType);
    firstIdFormData.append('id_number', formData.value.firstIdNumber);
    firstIdFormData.append('id_expiry_date', formatExpiryDate(formData.value.firstExpiryDate));
    firstIdFormData.append('is_primary_id', 'true');
    firstIdFormData.append('id_file', formData.value.firstIdDocument);

    // Create FormData for second ID
    const secondIdFormData = new FormData();
    secondIdFormData.append('signup_id', store.signupId);
    secondIdFormData.append('id_type', formData.value.secondIdType);
    secondIdFormData.append('holder_type', holderType);
    secondIdFormData.append('id_number', formData.value.secondIdNumber);
    secondIdFormData.append('id_expiry_date', formatExpiryDate(formData.value.secondExpiryDate));
    secondIdFormData.append('is_primary_id', 'false');
    secondIdFormData.append('id_file', formData.value.secondIdDocument);

    console.log('Submitting with holder type:', holderType);

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

    // Navigate to next page
    router.push('/pep-information');
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
  const dob = new Date(store.basicInfo?.dob);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
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