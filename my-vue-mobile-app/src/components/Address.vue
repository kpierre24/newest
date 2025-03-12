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
                  :error-messages="errors.addressLine1"
                />

                <v-text-field
                  v-model="formData.addressLine2"
                  label="Address Line 2"
                  placeholder="Enter address line 2"
                  variant="outlined"
                  prepend-inner-icon="mdi-map-marker"
                  :error-messages="errors.addressLine2"
                />

                <v-text-field
                  v-model="formData.city"
                  label="City"
                  :rules="[v => !!v || 'City is required']"
                  placeholder="Enter city"
                  variant="outlined"
                  prepend-inner-icon="mdi-city"
                  required
                  :error-messages="errors.city"
                />

                <v-select
                  v-model="formData.country"
                  label="Country"
                  :items="countryList"
                  :rules="[v => !!v || 'Country is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-earth"
                  required
                  :error-messages="errors.country"
                />

                <v-select
                  v-model="formData.dwellingStatus"
                  label="Dwelling Status"
                  :items="dwellingStatusOptions"
                  :rules="[v => !!v || 'Dwelling Status is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-home"
                  required
                  :error-messages="errors.dwellingStatus"
                />

                <v-select
                  v-model="formData.nationality"
                  label="Nationality"
                  :items="countryList"
                  :rules="[v => !!v || 'Nationality is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-flag"
                  required
                  :error-messages="errors.nationality"
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import axios from 'axios';
import { countries } from 'countries-list';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const isLoading = ref(false);
const formError = ref('');
const errors = ref({});

const formData = ref({
  addressLine1: '',
  addressLine2: '',
  city: '',
  country: '',
  dwellingStatus: '',
  nationality: '',
  proofOfAddress: null
});

const countryList = ref(Object.values(countries).map(country => country.name));
const dwellingStatusOptions = ref(['Rented', 'Owned', 'Subletting', 'Living with relative']);

onMounted(() => {
  if (store.AddressLine1) formData.value.addressLine1 = store.AddressLine1;
  if (store.AddressLine2) formData.value.addressLine2 = store.AddressLine2;
  if (store.City) formData.value.city = store.City;
  if (store.Country) formData.value.country = store.Country;
  if (store.Nationality) formData.value.nationality = store.Nationality;
  if (store.DwellingStatus) formData.value.dwellingStatus = store.DwellingStatus;
});

const handleFileUpload = (file) => {
  if (file) {
    formData.value.proofOfAddress = file;
  }
};

const validateForm = () => {
  errors.value = {};
  let isValid = true;

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
  if (!formData.value.dwellingStatus) {
    errors.value.dwellingStatus = 'Dwelling Status is required';
    isValid = false;
  }
  if (!formData.value.nationality) {
    errors.value.nationality = 'Nationality is required';
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    try {
      const response = await axios.post(`${baseURL}/address`, formData.value);
      console.log('Address info submitted:', response.data);
    } catch (apiError) {
      console.error('API error:', apiError);
    }

    store.$patch((state) => {
      Object.assign(state, formData.value);
    });

    router.push('/mailing-address');
  } catch (error) {
    console.error('Error submitting address information:', error);
    formError.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  if (validateForm()) {
    await submitForm();
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