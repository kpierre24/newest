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
              
                <h1 class="text-h1 font-weight-bold mb-2">Foreign National Bank Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your bank details</p>
              </div>

              <v-form @submit.prevent="handleSubmit">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formError }}
                </v-alert>

                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <v-text-field
                      v-model="bankName"
                      label="Bank Name"
                      placeholder="Enter bank name"
                      variant="outlined"
                      prepend-inner-icon="mdi-bank"
                      :rules="[v => !!v || 'Bank name is required']"
                      required
                    />

                    <v-text-field
                      v-model="bankAddressLine1"
                      label="Address Line 1"
                      placeholder="Enter bank address"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[v => !!v || 'Bank address is required']"
                      required
                    />

                    <v-text-field
                      v-model="bankCity"
                      label="City"
                      placeholder="Enter city"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      :rules="[v => !!v || 'City is required']"
                      required
                    />

                    <v-select
                      v-model="bankCountry"
                      label="Country"
                      :items="countryList"
                      placeholder="Select country"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      :rules="[v => !!v || 'Country is required']"
                      required
                    />

                    <v-text-field
                      v-model="bankAccountNumber"
                      label="Account Number"
                      placeholder="Enter account number"
                      variant="outlined"
                      prepend-inner-icon="mdi-credit-card"
                      :rules="[v => !!v || 'Account number is required']"
                      required
                    />

                    <v-text-field
                      v-model="swiftCode"
                      label="SWIFT Code"
                      placeholder="Enter SWIFT code"
                      variant="outlined"
                      prepend-inner-icon="mdi-code-brackets"
                      :rules="[v => !!v || 'SWIFT code is required']"
                      required
                    />

                    <v-text-field
                      v-model="bankTelephoneNumber"
                      label="Bank Telephone Number"
                      placeholder="Enter bank telephone number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                      :rules="[v => !!v || 'Telephone number is required']"
                      required
                    />

                    <v-row class="mt-6">
                      <v-col cols="12" sm="6">
                        <v-btn
                          block
                          color="primary"
                          variant="elevated"
                          @click="navigateToPrevious"
                        >
                          Back
                        </v-btn>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-btn
                          block
                          color="secondary"
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
import { countries } from 'countries-list';
import logoImage from '../assets/Logo1.png';
const router = useRouter();
const store = useDemoStore();

// Form data
const bankName = ref('');
const bankAddressLine1 = ref('');
const bankCity = ref('');
const bankCountry = ref('');
const bankAccountNumber = ref('');
const swiftCode = ref('');
const bankTelephoneNumber = ref('');
const countryList = ref(Object.values(countries).map(country => country.name));

// UI state
const isLoading = ref(false);
const formError = ref('');

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const handleSubmit = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!bankName.value || !bankAddressLine1.value || !bankCity.value || 
        !bankCountry.value || !bankAccountNumber.value || !swiftCode.value || 
        !bankTelephoneNumber.value) {
      formError.value = 'Please fill in all required fields';
      return;
    }

    const formData = {
      bankName: bankName.value,
      bankAddressLine1: bankAddressLine1.value,
      bankCity: bankCity.value,
      bankCountry: bankCountry.value,
      bankAccountNumber: bankAccountNumber.value,
      swiftCode: swiftCode.value,
      bankTelephoneNumber: bankTelephoneNumber.value
    };

    // Save to store
    store.$patch((state) => {
      state.bankInfo = formData;
    });

    // Make API call
    const baseURL = getBaseURL();
    await axios.post(`${baseURL}/foreign-national-bank-information`, formData);

    router.push('/employment-information');
  } catch (error) {
    console.error('Error submitting bank information:', error);
    formError.value = 'An error occurred while submitting your information. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    state.bankInfo = {
      bankName: bankName.value,
      bankAddressLine1: bankAddressLine1.value,
      bankCity: bankCity.value,
      bankCountry: bankCountry.value,
      bankAccountNumber: bankAccountNumber.value,
      swiftCode: swiftCode.value,
      bankTelephoneNumber: bankTelephoneNumber.value
    };
  });
  router.go(-1);
};

// Initialize component with stored data
onMounted(() => {
  if (store.bankInfo) {
    bankName.value = store.bankInfo.bankName || '';
    bankAddressLine1.value = store.bankInfo.bankAddressLine1 || '';
    bankCity.value = store.bankInfo.bankCity || '';
    bankCountry.value = store.bankInfo.bankCountry || '';
    bankAccountNumber.value = store.bankInfo.bankAccountNumber || '';
    swiftCode.value = store.bankInfo.swiftCode || '';
    bankTelephoneNumber.value = store.bankInfo.bankTelephoneNumber || '';
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

.brand-section {
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.brand-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.brand-logo {
  width: 240px;
  height: auto;
  z-index: 2;
  filter: brightness(1.2);
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