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
                      v-model="bankName"
                      label="Bank Name"
                      placeholder="Enter bank name"
                      variant="outlined"
                      prepend-inner-icon="mdi-bank"
                      required
                    />

                    <v-text-field
                      v-model="bankAddressLine1"
                      label="Bank Address Line 1"
                      placeholder="Enter bank address"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      required
                    />

                    <v-text-field
                      v-model="bankAddressLine2"
                      label="Bank Address Line 2"
                      placeholder="Enter additional address details (optional)"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                    />

                    <v-text-field
                      v-model="bankCity"
                      label="City"
                      placeholder="Enter city"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      required
                    />

                    <v-text-field
                      v-model="bankCountry"
                      label="Country"
                      placeholder="Enter country"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      required
                    />

                    <v-text-field
                      v-model="bankAccountNumber"
                      label="Account Number"
                      placeholder="Enter account number"
                      variant="outlined"
                      prepend-inner-icon="mdi-credit-card"
                      required
                    />

                    <v-text-field
                      v-model="bankTelephoneNumber"
                      label="Bank Telephone Number"
                      placeholder="Enter bank telephone number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
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

const router = useRouter();
const store = useDemoStore();
const isLoading = ref(false);
const formError = ref('');

// Form data
const bankName = ref('');
const bankAddressLine1 = ref('');
const bankAddressLine2 = ref('');
const bankCity = ref('');
const bankCountry = ref('');
const bankAccountNumber = ref('');
const bankTelephoneNumber = ref('');

const submitBankInfo = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/foreign-bank-information/`, bankData);
    // ... rest of the code
  } catch (error) {
    // ... error handling
  }
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Format data to match API model
    const foreignNationalData = {
      signup_id: store.signupId,
      bank_name: bankName.value,
      bank_address_1: bankAddressLine1.value,
      bank_address_2: bankAddressLine2.value || null,
      city: bankCity.value,
      country: bankCountry.value,
      account_number: bankAccountNumber.value,
      bank_phone: bankTelephoneNumber.value
    };

    console.log('Sending foreign national bank data:', foreignNationalData);

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/foreign-bank-information/`, foreignNationalData);

    if (response.data) {
      console.log('Foreign national bank info submitted:', response.data);
      
      // Store the data
      store.$patch({
        bankName: bankName.value,
        bankAddressLine1: bankAddressLine1.value,
        bankAddressLine2: bankAddressLine2.value,
        bankCity: bankCity.value,
        bankCountry: bankCountry.value,
        bankAccountNumber: bankAccountNumber.value,
        bankTelephoneNumber: bankTelephoneNumber.value
      });

      router.push('/employment-information');
    }
  } catch (error) {
    console.error('Error submitting foreign national bank info:', error);
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

  if (!store.signupId) {
    formError.value = 'Invalid session. Please start the signup process again.';
    return false;
  }

  if (!bankName.value?.trim()) {
    formError.value = 'Bank name is required';
    return false;
  }

  if (!bankAddressLine1.value?.trim()) {
    formError.value = 'Bank address is required';
    return false;
  }

  if (!bankCity.value?.trim()) {
    formError.value = 'City is required';
    return false;
  }

  if (!bankCountry.value?.trim()) {
    formError.value = 'Country is required';
    return false;
  }

  if (!bankAccountNumber.value?.trim()) {
    formError.value = 'Account number is required';
    return false;
  }

  if (!bankTelephoneNumber.value?.trim()) {
    formError.value = 'Bank telephone number is required';
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (validateForm()) {
    await submitForm();
  }
};

const navigateToPrevious = () => {
  router.push('/identification-information');
};

// Initialize component with stored data if it exists
onMounted(() => {
  if (store.bankName) {
    bankName.value = store.bankName;
    bankAddressLine1.value = store.bankAddressLine1;
    bankAddressLine2.value = store.bankAddressLine2;
    bankCity.value = store.bankCity;
    bankCountry.value = store.bankCountry;
    bankAccountNumber.value = store.bankAccountNumber;
    bankTelephoneNumber.value = store.bankTelephoneNumber;
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