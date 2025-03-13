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
                
                <h1 class="text-h1 font-weight-bold mb-2">Mailing Address</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your mailing address details</p>
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

                <v-card class="mb-6" elevation="3" style="border: none;">
                  <v-card-text>
                    <v-checkbox
                      v-model="formData.sameAsResidential"
                      label="Same as Residential Address"
                      @change="useResidentialAddress"
                      class="mb-4"
                    />

                    <v-text-field
                      v-model="formData.addressLine1"
                      label="Address Line 1"
                      placeholder="Enter mailing address"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      :error-messages="errors.addressLine1"
                      :disabled="formData.sameAsResidential"
                      :required="!formData.sameAsResidential"
                    />

                    <v-text-field
                      v-model="formData.addressLine2"
                      label="Address Line 2"
                      placeholder="Apartment, suite, etc."
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker-plus"
                      :disabled="formData.sameAsResidential"
                    />

                    <v-text-field
                      v-model="formData.city"
                      label="City"
                      placeholder="Enter city"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      :error-messages="errors.city"
                      :disabled="formData.sameAsResidential"
                      :required="!formData.sameAsResidential"
                    />

                    <v-select
                      v-model="formData.country"
                      label="Country"
                      :items="countryList"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      :error-messages="errors.country"
                      :disabled="formData.sameAsResidential"
                      :required="!formData.sameAsResidential"
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
                      variant="flat"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import { countries } from 'countries-list';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();

// Form data refs
const formData = ref({
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  sameAsResidential: false
});

const errors = ref({});
const formError = ref('');
const isLoading = ref(false);
const countryList = ref(Object.values(countries).map(country => country.name));

// Methods
const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.sameAsResidential) {
    if (!formData.value.addressLine1) {
      errors.value.addressLine1 = 'Address Line 1 is required';
      isValid = false;
    }
    if (!formData.value.city) {
      errors.value.city = 'City is required';
      isValid = false;
    }
    if (!formData.value.country) {
      errors.value.country = 'Country is required';
      isValid = false;
    }
  }

  return isValid;
};

const useResidentialAddress = () => {
  if (formData.value.sameAsResidential) {
    formData.value.addressLine1 = store.residentialAddressLine1 || '';
    formData.value.addressLine2 = store.residentialAddressLine2 || '';
    formData.value.city = store.residentialCity || '';
    formData.value.country = store.residentialCountry || '';
  } else {
    formData.value.addressLine1 = '';
    formData.value.addressLine2 = '';
    formData.value.city = '';
    formData.value.country = '';
  }
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isLoading.value = true;
  formError.value = '';

  try {
    // Update store with form data
    store.$patch((state) => {
      Object.assign(state, formData.value);
    });

    // Navigate to the next page
    router.push('/foreign-national-bank-information');
  } catch (error) {
    console.error('Error submitting mailing address:', error);
    formError.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.go(-1);
};

// Initialize component
onMounted(() => {
  if (store) {
    formData.value.addressLine1 = store.addressLine1 || '';
    formData.value.addressLine2 = store.addressLine2 || '';
    formData.value.city = store.city || '';
    formData.value.country = store.country || '';
    formData.value.sameAsResidential = store.sameAsResidential || false;
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

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-card-text) {
  padding: 24px;
}
</style>