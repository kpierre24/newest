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
                  src="@/assets/Logo1.png"
                  alt="Cathedral Engage"
                  class="mx-auto mb-4"
                  width="80"
                />
                
                <h1 class="text-h1 font-weight-bold mb-2">Employment Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your employment details</p>
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
                      v-model="formData.employerName"
                      label="Employer Name"
                      placeholder="Enter employer name"
                      variant="outlined"
                      prepend-inner-icon="mdi-domain"
                      :rules="[v => !!v || 'Employer name is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.employerAddressLine1"
                      label="Address Line 1"
                      placeholder="Enter address line 1"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[v => !!v || 'Address is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.employerCity"
                      label="City"
                      placeholder="Enter city"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      :rules="[v => !!v || 'City is required']"
                      required
                    />

                    <v-select
                      v-model="formData.employerCountry"
                      label="Country"
                      :items="countryList"
                      placeholder="Select country"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      :rules="[v => !!v || 'Country is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.workNumber"
                      label="Work Number"
                      placeholder="Enter work number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                      :rules="[v => !!v || 'Work number is required']"
                      required
                    />

                    <v-select
                      v-model="formData.employmentStatus"
                      label="Employment Status"
                      :items="['Employed', 'Self-Employed', 'Unemployed', 'Student', 'Retired']"
                      placeholder="Select employment status"
                      variant="outlined"
                      prepend-inner-icon="mdi-briefcase"
                      :rules="[v => !!v || 'Employment status is required']"
                      required
                    />

                    <v-select
                      v-model="formData.employmentType"
                      label="Employment Type"
                      :items="['Full-Time', 'Part-Time', 'Contract', 'Temporary']"
                      placeholder="Select employment type"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-tie"
                      :rules="[v => !!v || 'Employment type is required']"
                      required
                    />

                    <v-file-input
                      v-model="formData.proofOfEmploymentFile"
                      label="Proof of Employment"
                      accept=".pdf,.jpg,.png"
                      placeholder="Upload proof of employment"
                      variant="outlined"
                      prepend-icon="mdi-upload"
                      :rules="[v => !!v || 'Proof of employment is required']"
                      @change="handleFileUpload"
                      required
                    >
                      <template v-slot:selection="{ fileNames }">
                        <template v-for="fileName in fileNames" :key="fileName">
                          <v-chip
                            size="small"
                            label
                            color="primary"
                            class="me-2"
                          >
                            {{ fileName }}
                          </v-chip>
                        </template>
                      </template>
                    </v-file-input>

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

const router = useRouter();
const store = useDemoStore();

// Form data
const formData = ref({
  employerName: '',
  employerAddressLine1: '',
  employerCity: '',
  employerCountry: '',
  workNumber: '',
  employmentStatus: '',
  employmentType: '',
  proofOfEmploymentFile: null
});

// UI state
const isLoading = ref(false);
const formError = ref('');
const countryList = ref(Object.values(countries).map(country => country.name));

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const handleFileUpload = (event) => {
  if (event && event.target && event.target.files && event.target.files.length > 0) {
    formData.value.proofOfEmploymentFile = event.target.files[0];
  }
};

const handleSubmit = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!formData.value.employerName || !formData.value.employerAddressLine1 || 
        !formData.value.employerCity || !formData.value.employerCountry || 
        !formData.value.workNumber || !formData.value.employmentStatus || 
        !formData.value.employmentType || !formData.value.proofOfEmploymentFile) {
      formError.value = 'Please fill in all required fields';
      return;
    }

    // Create FormData for file upload
    const apiFormData = new FormData();
    Object.keys(formData.value).forEach(key => {
      apiFormData.append(key, formData.value[key]);
    });

    // Save to store (excluding file)
    store.$patch((state) => {
      state.employmentInfo = {
        employerName: formData.value.employerName,
        employerAddressLine1: formData.value.employerAddressLine1,
        employerCity: formData.value.employerCity,
        employerCountry: formData.value.employerCountry,
        workNumber: formData.value.workNumber,
        employmentStatus: formData.value.employmentStatus,
        employmentType: formData.value.employmentType
      };
    });

    console.log('Submitting employment information:', formData.value);

    // Make API call
    const baseURL = getBaseURL();
    const response = await axios.post(`${baseURL}/employment-information`, apiFormData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response.data);

    router.push('/designation-of-beneficiary');
  } catch (error) {
    console.error('Error submitting employment information:', error);
    formError.value = 'An error occurred while submitting your information. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    state.employmentInfo = {
      employerName: formData.value.employerName,
      employerAddressLine1: formData.value.employerAddressLine1,
      employerCity: formData.value.employerCity,
      employerCountry: formData.value.employerCountry,
      workNumber: formData.value.workNumber,
      employmentStatus: formData.value.employmentStatus,
      employmentType: formData.value.employmentType
    };
  });
  router.go(-1);
};

// Initialize component with stored data
onMounted(() => {
  console.log('Initializing component with store data:', store.employmentInfo);
  if (store.employmentInfo) {
    formData.value = {
      ...formData.value,
      ...store.employmentInfo
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