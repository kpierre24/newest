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
                        v-model="firstIdType"
                        label="Type of ID"
                        :items="['ID Card', 'Passport', 'Driver\'s Permit', 'Birthpaper']"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-card-account-details"
                        @update:model-value="updateSecondIdOptions"
                        :rules="[v => !!v || 'ID type is required']"
                        required
                        class="mb-3"
                      />

                      <v-text-field
                        v-model="firstIdNumber"
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
                        v-model="firstExpiryDate"
                        label="Expiry Date"
                        type="date"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-calendar"
                        :min="minDate"
                        :max="maxExpiryDate"
                        :error-messages="firstExpiryDateError"
                        :disabled="firstIdType === 'Birthpaper'"
                        @update:model-value="validateFirstExpiryDate"
                        required
                        class="mb-3"
                      />

                      <v-file-input
                        v-model="firstIdDocument"
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
                        v-model="secondIdType"
                        label="Type of ID"
                        :items="secondIdOptions"
                        variant="outlined"
                        prepend-inner-icon="mdi-card-account-details"
                        :rules="[v => !!v || 'ID type is required']"
                        required
                      />

                      <v-text-field
                        v-model="secondIdNumber"
                        label="ID Number"
                        placeholder="Enter 12-digit ID number"
                        variant="outlined"
                        prepend-inner-icon="mdi-pound"
                        :maxlength="12"
                        :rules="[v => !!v || 'ID number is required']"
                        required
                      />

                      <v-text-field
                        v-model="secondExpiryDate"
                        label="Expiry Date"
                        type="date"
                        variant="outlined"
                        prepend-inner-icon="mdi-calendar"
                        :min="minDate"
                        :max="maxExpiryDate"
                        :error-messages="secondExpiryDateError"
                        :disabled="secondIdType === 'Birthpaper'"
                        @update:model-value="validateSecondExpiryDate"
                        required
                      />

                      <v-file-input
                        v-model="secondIdDocument"
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

// Form data refs
const firstIdType = ref('');
const firstIdNumber = ref('');
const firstExpiryDate = ref('');
const firstExpiryDateError = ref('');
const firstIdDocument = ref(null);
const secondIdType = ref('');
const secondIdNumber = ref('');
const secondExpiryDate = ref('');
const secondExpiryDateError = ref('');
const secondIdDocument = ref(null);
const secondIdOptions = ref(['National ID', "Driver's Permit", 'Birthpaper', 'Passport']);
const maritalStatus = ref('');
const isLoading = ref(false);
const formError = ref('');

// Computed properties
const maxExpiryDate = computed(() => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() + 20, today.getMonth(), today.getDate());
  return maxDate.toISOString().split('T')[0];
});

// Methods
const validateFirstExpiryDate = () => {
  if (firstIdType.value === 'Birthpaper') {
    firstExpiryDateError.value = '';
    return true;
  }

  if (!firstExpiryDate.value) {
    firstExpiryDateError.value = 'Expiry date is required';
    return false;
  }

  if (!validateExpiryDate(firstExpiryDate.value)) {
    firstExpiryDateError.value = 'Expiry date must be today or in the future';
    return false;
  }

  firstExpiryDateError.value = '';
  return true;
};

const validateSecondExpiryDate = () => {
  if (secondIdType.value === 'Birthpaper') {
    secondExpiryDateError.value = '';
    return true;
  }

  if (!secondExpiryDate.value) {
    secondExpiryDateError.value = 'Expiry date is required';
    return false;
  }

  if (!validateExpiryDate(secondExpiryDate.value)) {
    secondExpiryDateError.value = 'Expiry date must be today or in the future';
    return false;
  }

  secondExpiryDateError.value = '';
  return true;
};

const handleFileUpload = (file, idType) => {
  if (idType === 'first') {
    firstIdDocument.value = file;
  } else if (idType === 'second') {
    secondIdDocument.value = file;
  }
};

const updateSecondIdOptions = () => {
  if (firstIdType.value === 'National ID') {
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
    // Create FormData for file upload
    const firstIdFormData = new FormData();
    const secondIdFormData = new FormData();

    // First ID submission
    const firstIdData = {
      signup_id: store.signupId,
      id_type: firstIdType.value,
      id_number: firstIdNumber.value,
      id_expiry_date: new Date(firstExpiryDate.value).toISOString(),
      is_primary_id: true
    };

    // Second ID submission
    const secondIdData = {
      signup_id: store.signupId,
      id_type: secondIdType.value,
      id_number: secondIdNumber.value,
      id_expiry_date: new Date(secondExpiryDate.value).toISOString(),
      is_primary_id: false
    };

    // Submit first ID
    const firstIdResponse = await axios.post('http://127.0.0.1:8000/identifications/', firstIdData);
    
    if (firstIdDocument.value) {
      firstIdFormData.append('file', firstIdDocument.value);
      firstIdFormData.append('identification_id', firstIdResponse.data.id);
      await axios.post('http://127.0.0.1:8000/identification-files/', firstIdFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    // Submit second ID
    const secondIdResponse = await axios.post('http://127.0.0.1:8000/identifications/', secondIdData);
    
    if (secondIdDocument.value) {
      secondIdFormData.append('file', secondIdDocument.value);
      secondIdFormData.append('identification_id', secondIdResponse.data.id);
      await axios.post('http://127.0.0.1:8000/identification-files/', secondIdFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    // Store the data
    store.$patch((state) => {
      state.firstIdType = firstIdType.value;
      state.firstIdNumber = firstIdNumber.value;
      state.firstExpiryDate = firstExpiryDate.value;
      state.secondIdType = secondIdType.value;
      state.secondIdNumber = secondIdNumber.value;
      state.secondExpiryDate = secondExpiryDate.value;
    });

    // Navigate based on customer type
    if (store.isExistingCustomer) {
      router.push('/account-number');
    } else {
      router.push('/due-diligence');
    }

  } catch (error) {
    console.error('Error submitting ID information:', error);
    if (error.response?.data) {
      console.log('Detailed error:', error.response.data);
    }
    formError.value = error.response?.data?.detail || 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const validateForm = () => {
  formError.value = '';

  if (!firstIdType.value || !firstIdNumber.value || !firstExpiryDate.value || !firstIdDocument.value) {
    formError.value = 'Please complete all fields for the first ID';
    return false;
  }

  if (!secondIdType.value || !secondIdNumber.value || !secondExpiryDate.value || !secondIdDocument.value) {
    formError.value = 'Please complete all fields for the second ID';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (validateForm()) {
    await submitIDInformation();
  }
};
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