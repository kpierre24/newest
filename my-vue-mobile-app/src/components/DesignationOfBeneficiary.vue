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
                
                <h1 class="text-h1 font-weight-bold mb-2">Designation of Beneficiary</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter your beneficiary's details</p>
              </div>

              <v-form @submit.prevent="submitForm">
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
                    <!-- Personal Information -->
                    <v-text-field
                      v-model="formData.first_name"
                      label="First Name"
                      :rules="[v => !!v || 'First name is required']"
                      placeholder="Beneficiary First Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.last_name"
                      label="Last Name"
                      :rules="[v => !!v || 'Last name is required']"
                      placeholder="Beneficiary Last Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.middle_name"
                      label="Middle Name"
                      :rules="[v => !!v || 'Middle name is required']"
                      placeholder="Beneficiary Middle Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.address_line_1"
                      label="Address Line 1"
                      :rules="[v => !!v || 'Address line 1 is required']"
                      placeholder="Beneficiary Address Line 1"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      required
                    />

                    <v-text-field
                      v-model="formData.address_line_2"
                      label="Address Line 2"
                      :rules="[v => !!v || 'Address line 2 is required']"
                      placeholder="Beneficiary Address Line 2"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      required
                    />

                    <v-text-field
                      v-model="formData.city"
                      label="City"
                      :rules="[v => !!v || 'City is required']"
                      placeholder="Beneficiary City"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      required
                    />

                    <v-text-field
                      v-model="formData.country"
                      label="Country"
                      :rules="[v => !!v || 'Country is required']"
                      placeholder="Beneficiary Country"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      required
                    />

                    <v-text-field
                      v-model="formData.dob"
                      label="Date of Birth"
                      type="date"
                      :rules="[
                        v => !!v || 'Date of birth is required',
                        v => new Date(v) > new Date() || 'Date of birth must not be in the future'
                      ]"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      required
                    />

                    <v-select
                      v-model="formData.gender"
                      label="Gender"
                      :items="['Male', 'Female']"
                      :rules="[v => !!v || 'Gender is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-gender-male-female"
                      required
                    />

                    <v-text-field
                      v-model="formData.id_number"
                      label="ID Number"
                      :rules="[v => !!v || 'ID number is required']"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-identifier"
                      required
                    />

                    <v-select
                      v-model="formData.id_type"
                      label="Type of ID"
                      :items="['Passport', 'National ID', 'Drivers License']"
                      :rules="[v => !!v || 'ID type is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      required
                    />

                    <v-text-field
                      v-model="formData.percent_of_beneficiary_interest"
                      label="Percentage"
                      type="number"
                      :rules="[
                        v => !!v || 'Percentage is required',
                        v => (v >= 0 && v <= 100) || 'Percentage must be between 0 and 100'
                      ]"
                      placeholder="Percentage (0-100)"
                      variant="outlined"
                      prepend-inner-icon="mdi-percent"
                      min="0"
                      max="100"
                      required
                    />

                    <v-select
                      v-model="formData.relationship_to_beneficiary"
                      label="Relationship"
                      :items="['Parent', 'Spouse', 'Child', 'Sibling', 'Other']"
                      :rules="[v => !!v || 'Relationship is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-group"
                      required
                    />
                  </v-card-text>
                </v-card>

                <v-row class="mt-6">
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      variant="flat"
                      size="large"
                      @click="navigateToPrevious"
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
          src="@src\assets\Logo1.png"
          alt="Cathedral Engage"
          class="brand-logo"
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
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const isLoading = ref(false);
const formError = ref('');

const formData = ref({
  first_name: '',
  last_name: '',
  middle_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  dob: '',
  gender: '',
  relationship_to_beneficiary: '',
  id_number: '',
  id_type: '',
  percent_of_beneficiary_interest: 0
});

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:8000' 
    : `http://127.0.0.1:8000`;
};

const handleFileUpload = (event) => {
  if (event && event.target && event.target.files && event.target.files.length > 0) {
    formData.value.idFile = event.target.files[0];
  }
};

const saveToStore = () => {
  store.setBeneficiaryInfo({
    ...formData.value,
    signup_id: store.signupId
  });
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!formData.value.first_name || !formData.value.last_name || 
        !formData.value.address_line_1 || !formData.value.city ||
        !formData.value.country || !formData.value.dob || 
        !formData.value.gender || !formData.value.relationship_to_beneficiary ||
        !formData.value.id_number || !formData.value.id_type || 
        !formData.value.percent_of_beneficiary_interest) {
      formError.value = 'Please fill in all required fields';
      return;
    }

    // Validate percentage is between 0 and 100
    const percentage = parseFloat(formData.value.percent_of_beneficiary_interest);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      formError.value = 'Percentage must be between 0 and 100';
      return;
    }

    // Validate gender
    if (!['male', 'female'].includes(formData.value.gender.toLowerCase())) {
      formError.value = 'Gender must be either Male or Female';
      return;
    }

    // Validate ID type
    if (!['Passport', 'National ID', 'Drivers License'].includes(formData.value.id_type)) {
      formError.value = 'ID type must be either Passport, National ID, or Drivers License';
      return;
    }

    // Save to store
    saveToStore();

    // Make API call
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/beneficiaries/`, {
      ...formData.value,
      signup_id: store.signupId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data) {
      console.log('Beneficiary created successfully:', response.data);
      router.push('/power-of-attorney');
    }
  } catch (error) {
    console.error('Error submitting beneficiary information:', error);
    if (error.response?.data?.detail) {
      formError.value = error.response.data.detail;
    } else {
      formError.value = 'An error occurred while submitting your information';
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  saveToStore();
  router.push('/employment-information');
};

// Initialize component with stored data
onMounted(() => {
  if (store.beneficiary) {
    formData.value = {
      ...formData.value,
      ...store.beneficiary
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

:deep(.v-field) {
  border-radius: 8px !important;
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