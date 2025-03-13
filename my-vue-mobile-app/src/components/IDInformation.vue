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
    // Validate all required fields
    if (!firstIdType.value || !firstIdNumber.value || !firstExpiryDate.value ||
      !secondIdType.value || !secondIdNumber.value || !secondExpiryDate.value ||
      !maritalStatus.value) {
      formError.value = 'Please fill in all required fields';
      isLoading.value = false;
      return;
    }

    // Validate expiry dates
    if (!validateFirstExpiryDate() || !validateSecondExpiryDate()) {
      isLoading.value = false;
      return;
    }

    const idInfoData = {
      firstIdType: firstIdType.value,
      firstIdNumber: firstIdNumber.value,
      firstExpiryDate: firstExpiryDate.value,
      firstIdDocument: firstIdDocument.value,
      secondIdType: secondIdType.value,
      secondIdNumber: secondIdNumber.value,
      secondExpiryDate: secondExpiryDate.value,
      secondIdDocument: secondIdDocument.value,
      maritalStatus: maritalStatus.value
    };

    // Save to store
    try {
      store.$patch((state) => {
        state.firstIdType = idInfoData.firstIdType;
        state.firstIdNumber = idInfoData.firstIdNumber;
        state.firstExpiryDate = idInfoData.firstExpiryDate;
        state.firstIdDocument = idInfoData.firstIdDocument;
        state.secondIdType = idInfoData.secondIdType;
        state.secondIdNumber = idInfoData.secondIdNumber;
        state.secondExpiryDate = idInfoData.secondExpiryDate;
        state.secondIdDocument = idInfoData.secondIdDocument;
        state.maritalStatus = idInfoData.maritalStatus;
      });
    } catch (storeError) {
      console.error('Store error:', storeError);
      formError.value = 'Error saving data to application state';
      isLoading.value = false;
      return;
    }

    // API call
    try {
      const baseURL = getBaseURL();
      const response = await axios.post(`${baseURL}/id-information`, idInfoData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('ID info submitted:', response.data);
    } catch (apiError) {
      console.error('API error:', apiError);
      // Continue with navigation even if API fails
    }

    // Navigate based on customer type
    if (store.isExistingCustomer) {
      console.log('Navigating to account number (existing customer)');
      router.push('/account-number');
    } else {
      console.log('Navigating to due diligence (new customer)');
      router.push('/due-diligence');
    }
  } catch (error) {
    console.error('Error submitting ID information:', error);
    formError.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
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