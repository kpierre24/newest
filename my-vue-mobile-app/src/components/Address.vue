<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-6">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
                <h1 class= font-weight-bold >Address</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter your residential address information</p>
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

                <v-text-field
                  v-model="formData.addressLine1"
                  label="Address Line 1"
                  :rules="[v => !!v || 'Address Line 1 is required']"
                  placeholder="Enter address line 1"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  required
                />

                <v-text-field
                  v-model="formData.addressLine2"
                  label="Address Line 2"
                  placeholder="Enter address line 2"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                />

                <v-text-field
                  v-model="formData.city"
                  label="City"
                  :rules="[v => !!v || 'City is required']"
                  placeholder="Enter city"
                  variant="outlined"
                  prepend-inner-icon="mdi-city"
                  required
                />

                <v-select
                  v-model="formData.country"
                  label="Country"
                  :items="countryList"
                  :rules="[v => !!v || 'Country is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-earth"
                  required
                />

                <v-select
                  v-model="formData.dwellingStatus"
                  label="Dwelling Status"
                  :items="dwellingStatusOptions"
                  :rules="[v => !!v || 'Dwelling Status is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-home"
                  required
                />

                <v-file-input
                  label="Upload Proof of Address"
                  variant="outlined"
                  prepend-inner-icon="mdi-upload"
                  required
                  @change="handleFileUpload"
                  accept="image/*,.pdf"
                  class="mt-4"
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
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import axios from 'axios';
import { countries } from 'countries-list';
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const formError = ref('');
const isLoading = ref(false);

const formData = ref({
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  dwellingStatus: '',
  proofOfAddress: null
});

const countryList = ref(Object.values(countries).map(country => country.name));
const dwellingStatusOptions = ref(['Rented', 'Owned',  'Living with family']);

const handleSubmit = async (event) => {
  event.preventDefault();
  isLoading.value = true;
  formError.value = '';

  try {
    if (!validateForm()) {
      isLoading.value = false;
      return;
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // Create FormData for the address submission
    const addressFormData = new FormData();
    addressFormData.append('signup_id', store.signupId);
    addressFormData.append('address_line_1', formData.value.addressLine1);
    addressFormData.append('address_line_2', formData.value.addressLine2 || '');
    addressFormData.append('city', formData.value.city);
    addressFormData.append('country', formData.value.country);
    addressFormData.append('dwelling_status', formData.value.dwellingStatus.toLowerCase());
    addressFormData.append('address_type', 'physical');
    addressFormData.append('proof_of_address_files', formData.value.proofOfAddress);

    // Submit address data
    const response = await axios.post(`${baseURL}/addresses/`, addressFormData, {
      headers: {
        'Content-Type': 'multipart/formdata',
      },
    });

    console.log('Address submission response:', response.data);

    // Store the address data
    store.$patch({
      addressInfo: {
        addressLine1: formData.value.addressLine1,
        addressLine2: formData.value.addressLine2,
        city: formData.value.city,
        country: formData.value.country,
        dwellingStatus: formData.value.dwellingStatus
      }
    });

    // Navigate to next page
    router.push('/mailing-address');
  } catch (error) {
    console.error('Error submitting address:', error);
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

const validateForm = () => {
  if (!formData.value.addressLine1) {
    formError.value = 'Address Line 1 is required';
    return false;
  }
  if (!formData.value.city) {
    formError.value = 'City is required';
    return false;
  }
  if (!formData.value.country) {
    formError.value = 'Country is required';
    return false;
  }
  if (!formData.value.dwellingStatus) {
    formError.value = 'Dwelling Status is required';
    return false;
  }
  if (!formData.value.proofOfAddress) {
    formError.value = 'Proof of Address is required';
    return false;
  }
  return true;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.proofOfAddress = file;
  }
};

const navigateToPrevious = () => {
  router.push('/parent-guardian-information');
};
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
}

.form-container {
  max-width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}

@media (max-width: 959px) {
  .brand-section {
    position: relative;
    width: 100%;
    min-height: 300px;
  }

  .brand-logo {
    width: 180px;
  }
}

.brand-logo {
  position: inherit;
  top: 50%;
  left: 50%;
  width: 180px;
  justify-content: center;
  align-items: center;
  z-index: 22;
}

:deep(.v-field) {
  border-radius: 8px !important;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}
</style>