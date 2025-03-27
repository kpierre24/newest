<!-- filepath: /c:/Users/Administrator/Documents/newest/my-vue-mobile-app/src/components/ForeignNationalBankInformation.vue -->
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
              
                <h1 class="text-h4 font-weight-bold mb-2">Foreign National Bank Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your bank details</p>
              </div>

              <v-alert
                v-if="formError"
                type="error"
                variant="tonal"
                class="mb-4"
              >
                {{ formError }}
              </v-alert>

              <v-form @submit.prevent="handleSubmit">
                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <v-text-field
                      v-model="formData.bank_name"
                      label="Bank Name"
                      placeholder="Enter bank name"
                      variant="outlined"
                      prepend-inner-icon="mdi-bank"
                      required
                    />

                    <v-text-field
                      v-model="formData.address_line_1"
                      label="Bank Address Line 1"
                      placeholder="Enter bank address"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      required
                    />

                    <v-text-field
                      v-model="formData.address_line_2"
                      label="Bank Address Line 2"
                      placeholder="Enter additional address details (optional)"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                    />

                    <v-text-field
                      v-model="formData.city"
                      label="City"
                      placeholder="Enter city"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      required
                    />

                    <v-text-field
                      v-model="formData.country"
                      label="Country"
                      placeholder="Enter country"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      required
                    />

                    <v-text-field
                      v-model="formData.account_number"
                      label="Account Number"
                      placeholder="Enter account number"
                      variant="outlined"
                      prepend-inner-icon="mdi-credit-card"
                      required
                    />

                    <v-text-field
                      v-model="formData.phone"
                      label="Bank Telephone Number"
                      placeholder="Enter bank telephone number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                      required
                    />

                    <v-text-field
                      v-model="formData.swift_code"
                      label="SWIFT Code"
                      placeholder="Enter SWIFT code"
                      variant="outlined"
                      prepend-inner-icon="mdi-bank"
                      required
                    />

                    <v-row class="mt-6">
                      <v-col cols="12" sm="6">
                        <v-btn
                          block
                          color="primary"
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
                          color="secondary"
                          variant="flat"
                          size="large"
                          type="submit"
                          :loading="isLoading"
                        >
                          {{ isLoading ? 'Processing...' : 'Next' }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import axios from 'axios';
import logoImage from '@/assets/Logo1.png';
import { errorMessages } from '@/utils/errorMessages';
import { handleError, AppError, errorTypes } from '@/utils/errorHandler';

const router = useRouter();
const store = useDemoStore();
const isLoading = ref(false);
const formError = ref('');

const formData = ref({
  signup_id: null,
  bank_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  account_number: '',
  phone: '',
  swift_code: ''
});

const errors = ref({});

// Add validation for signup_id
const validateSignupId = () => {
  if (!store.signupId) {
    formError.value = 'Invalid session. Please start the signup process again.';
    return false;
  }
  return true;
};

const validateForm = () => {
  let isValid = true;
  errors.value = {};

  // Bank name validation
  if (!formData.value.bank_name?.trim()) {
    errors.value.bank_name = errorMessages.validation.required('Bank name');
    isValid = false;
  }

  // Address validation
  if (!formData.value.address_line_1?.trim()) {
    errors.value.address_line_1 = errorMessages.validation.required('Address');
    isValid = false;
  }

  // City validation
  if (!formData.value.city?.trim()) {
    errors.value.city = errorMessages.validation.required('City');
    isValid = false;
  }

  // Country validation
  if (!formData.value.country?.trim()) {
    errors.value.country = errorMessages.validation.required('Country');
    isValid = false;
  }

  // Account number validation
  const accountNumber = formData.value.account_number?.replace(/[\s\-]/g, '');
  if (!accountNumber || !/^[a-zA-Z0-9]{8,30}$/.test(accountNumber)) {
    errors.value.account_number = errorMessages.validation.accountNumber;
    isValid = false;
  }

  // Phone validation
  if (!formData.value.phone?.trim()) {
    errors.value.phone = errorMessages.validation.required('Phone number');
    isValid = false;
  } else if (!/^\+?1?\d{9,15}$/.test(formData.value.phone)) {
    errors.value.phone = errorMessages.validation.phone;
    isValid = false;
  }

  // SWIFT code validation
  if (!formData.value.swift_code?.trim()) {
    errors.value.swift_code = errorMessages.validation.required('SWIFT code');
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    formError.value = errorMessages.submission.validation;
    return;
  }

  isLoading.value = true;
  formError.value = '';

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    // Clean account number before submission
    const cleanedAccountNumber = formData.value.account_number.replace(/[\s\-]/g, '');
    
    // Prepare data for API submission
    const submitData = {
      signup_id: store.signupId,
      bank_name: formData.value.bank_name,
      address_line_1: formData.value.address_line_1,
      address_line_2: formData.value.address_line_2 || null,
      city: formData.value.city,
      country: formData.value.country,
      account_number: cleanedAccountNumber,
      phone: formData.value.phone,
      swift_code: formData.value.swift_code
    };

    console.log('Submitting foreign national data:', submitData);

    const response = await axios.post(`${baseURL}/foreign-nationals/`, submitData);

    if (response.data) {
      console.log('Foreign national data submitted successfully:', response.data);
      
      // Store the data in the store
      store.$patch({
        foreignNationalInfo: {
          bankName: formData.value.bank_name,
          addressLine1: formData.value.address_line_1,
          addressLine2: formData.value.address_line_2,
          city: formData.value.city,
          country: formData.value.country,
          accountNumber: cleanedAccountNumber,
          phone: formData.value.phone,
          swiftCode: formData.value.swift_code,
          signupId: store.signupId
        }
      });

      // Navigate to next page
      router.push('/employment-information');
    }
  } catch (error) {
    console.error('Error submitting foreign national bank info:', error);
    if (error.response && error.response.status !== 200) {
      formError.value = error.response.data.detail || 'An error occurred';
    } else {
      formError.value = 'An unexpected error occurred';
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch({
    foreignNationalInfo: {
      bankName: formData.value.bank_name,
      addressLine1: formData.value.address_line_1,
      addressLine2: formData.value.address_line_2,
      city: formData.value.city,
      country: formData.value.country,
      accountNumber: formData.value.account_number,
      phone: formData.value.phone,
      swiftCode: formData.value.swift_code,
      signupId: store.signupId
    }
  });
  router.push('/power-of-attorney');
};

// Initialize component with existing data if available
onMounted(() => {
  // Set signup_id from store
  formData.value.signup_id = store.signupId;
  
  if (store.foreignNationalInfo) {
    formData.value = {
      ...formData.value,
      bank_name: store.foreignNationalInfo.bankName || '',
      address_line_1: store.foreignNationalInfo.addressLine1 || '',
      address_line_2: store.foreignNationalInfo.addressLine2 || '',
      city: store.foreignNationalInfo.city || '',
      country: store.foreignNationalInfo.country || '',
      account_number: store.foreignNationalInfo.accountNumber || '',
      phone: store.foreignNationalInfo.phone || '',
      swift_code: store.foreignNationalInfo.swiftCode || ''
    };
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
}
</style>