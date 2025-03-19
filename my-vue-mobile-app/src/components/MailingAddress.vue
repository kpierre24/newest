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
                      v-model="formData.address_line_1"
                      label="Address Line 1"
                      placeholder="Enter mailing address"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      :error-messages="errors.address_line_1"
                      :disabled="formData.sameAsResidential"
                      :required="!formData.sameAsResidential"
                    />

                    <v-text-field
                      v-model="formData.address_line_2"
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

                    <v-select
                      v-model="formData.dwelling_status"
                      label="Dwelling Status"
                      :items="dwellingStatusOptions"
                      variant="outlined"
                      prepend-inner-icon="mdi-home"
                      :error-messages="errors.dwelling_status"
                      :disabled="formData.sameAsResidential"
                      :required="!formData.sameAsResidential"
                    />

                    <v-file-input
                      v-model="formData.proof_of_address_file"
                      label="Proof of Address"
                      prepend-icon="mdi-file-document"
                      @change="handleFileUpload"
                      :error-messages="errors.proof_of_address_file"
                      :disabled="formData.sameAsResidential"
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
import axios from 'axios';
import { countries } from 'countries-list';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const formError = ref('');
const isLoading = ref(false);

const formData = ref({
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  dwelling_status: '',
  proof_of_address_file: null,
  sameAsResidential: false
});

const errors = ref({});
const countryList = ref(Object.values(countries).map(country => country.name));
const dwellingStatusOptions = [
  'owned',
  'rented',
  'living-with-family'
];

const handleSubmit = async (event) => {
  event.preventDefault();
  isLoading.value = true;
  formError.value = '';

  try {
    if (formData.value.sameAsResidential) {
      // If same as residential, just store the flag and navigate
      store.$patch({
        mailingAddressInfo: {
          sameAsResidential: true
        }
      });
      router.push('/foreign-national-bank-information');
      return;
    }

    // Validate required fields
    if (!formData.value.address_line_1 || !formData.value.city || 
        !formData.value.country || !formData.value.dwelling_status ||
        !formData.value.proof_of_address_file) {
      formError.value = 'Please fill in all required fields';
      isLoading.value = false;
      return;
    }

    const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : `http://${window.location.hostname}:8000`;

    // Create FormData for file upload
    const addressFormData = new FormData();
    addressFormData.append('signup_id', store.signupId);
    addressFormData.append('address_line_1', formData.value.address_line_1);
    addressFormData.append('address_line_2', formData.value.address_line_2 || '');
    addressFormData.append('city', formData.value.city);
    addressFormData.append('country', formData.value.country);
    addressFormData.append('dwelling_status', formData.value.dwelling_status);
    addressFormData.append('address_type', 'mailing');
    addressFormData.append('proof_of_address_file', formData.value.proof_of_address_file);

    // Make API call
    const response = await axios.post(`${baseURL}/addresses/`, addressFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Store the data
    store.$patch({
      mailingAddressInfo: {
        addressLine1: formData.value.address_line_1,
        addressLine2: formData.value.address_line_2,
        city: formData.value.city,
        country: formData.value.country,
        dwellingStatus: formData.value.dwelling_status,
        sameAsResidential: false
      }
    });

    // Navigate to next page
    router.push('/foreign-national-bank-information');
  } catch (error) {
    console.error('Error submitting mailing address:', error);
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

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.proof_of_address_file = file;
  }
};

const useResidentialAddress = () => {
  if (formData.value.sameAsResidential) {
    formData.value.address_line_1 = store.residentialAddressInfo?.addressLine1 || '';
    formData.value.address_line_2 = store.residentialAddressInfo?.addressLine2 || '';
    formData.value.city = store.residentialAddressInfo?.city || '';
    formData.value.country = store.residentialAddressInfo?.country || '';
    formData.value.dwelling_status = store.residentialAddressInfo?.dwellingStatus || '';
  } else {
    formData.value.address_line_1 = '';
    formData.value.address_line_2 = '';
    formData.value.city = '';
    formData.value.country = '';
    formData.value.dwelling_status = '';
  }
};

const navigateToPrevious = () => {
  router.go(-1);
};

onMounted(() => {
  if (store.mailingAddressInfo) {
    formData.value = {
      address_line_1: store.mailingAddressInfo.addressLine1 || '',
      address_line_2: store.mailingAddressInfo.addressLine2 || '',
      city: store.mailingAddressInfo.city || '',
      country: store.mailingAddressInfo.country || '',
      dwelling_status: store.mailingAddressInfo.dwellingStatus || '',
      proof_of_address_file: null,
      sameAsResidential: store.mailingAddressInfo.sameAsResidential || false
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

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-card-text) {
  padding: 24px;
}
</style>