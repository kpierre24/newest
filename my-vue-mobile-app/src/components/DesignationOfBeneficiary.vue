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
                      v-model="formData.beneficiaryFirstName"
                      label="First Name"
                      :rules="[v => !!v || 'First name is required']"
                      placeholder="Beneficiary First Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.beneficiaryLastName"
                      label="Last Name"
                      :rules="[v => !!v || 'Last name is required']"
                      placeholder="Beneficiary Last Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.beneficiaryEmail"
                      label="Email"
                      type="email"
                      :rules="[
                        v => !!v || 'Email is required',
                        v => /.+@.+\..+/.test(v) || 'Email must be valid'
                      ]"
                      placeholder="Beneficiary Email"
                      variant="outlined"
                      prepend-inner-icon="mdi-email"
                      required
                    />

                    <v-text-field
                      v-model="formData.beneficiaryPhone"
                      label="Phone Number"
                      type="tel"
                      :rules="[v => !!v || 'Phone number is required']"
                      placeholder="Beneficiary Phone Number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                      required
                    />

                    <!-- ID Information -->
                    <v-select
                      v-model="formData.idType"
                      label="Type of ID"
                      :items="['National ID', 'Passport', 'Driver\'s License']"
                      :rules="[v => !!v || 'ID type is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      required
                    />

                    <v-text-field
                      v-model="formData.idNumber"
                      label="ID Number"
                      :rules="[v => !!v || 'ID number is required']"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-identifier"
                      required
                    />

                    <v-text-field
                      v-model="formData.idExpiry"
                      label="ID Expiry Date"
                      type="date"
                      :rules="[
                        v => !!v || 'Expiry date is required',
                        v => new Date(v) > new Date() || 'ID must not be expired'
                      ]"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      required
                    />

                    <v-file-input
                      v-model="formData.idFile"
                      label="Upload ID"
                      accept="image/*,.pdf"
                      :rules="[v => !!v || 'ID upload is required']"
                      variant="outlined"
                      prepend-icon="mdi-upload"
                      required
                    />

                    <!-- Relationship and Percentage -->
                    <v-select
                      v-model="formData.relationship"
                      label="Relationship"
                      :items="['Parent', 'Spouse', 'Child', 'Sibling', 'Other']"
                      :rules="[v => !!v || 'Relationship is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-group"
                      required
                    />

                    <v-text-field
                      v-model="formData.percentage"
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
  beneficiaryFirstName: '',
  beneficiaryLastName: '',
  beneficiaryEmail: '',
  beneficiaryPhone: '',
  idType: '',
  idNumber: '',
  idExpiry: '',
  idFile: null,
  relationship: '',
  percentage: ''
});

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const handleFileUpload = (event) => {
  if (event && event.target && event.target.files && event.target.files.length > 0) {
    formData.value.idFile = event.target.files[0];
  }
};

const saveToStore = () => {
  store.$patch((state) => {
    state.beneficiaryInfo = {
      beneficiaryFirstName: formData.value.beneficiaryFirstName,
      beneficiaryLastName: formData.value.beneficiaryLastName,
      beneficiaryEmail: formData.value.beneficiaryEmail,
      beneficiaryPhone: formData.value.beneficiaryPhone,
      idType: formData.value.idType,
      idNumber: formData.value.idNumber,
      idExpiry: formData.value.idExpiry,
      relationship: formData.value.relationship,
      percentage: formData.value.percentage
    };
  });
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!formData.value.beneficiaryFirstName || !formData.value.beneficiaryLastName || 
        !formData.value.beneficiaryEmail || !formData.value.beneficiaryPhone ||
        !formData.value.idType || !formData.value.idNumber || 
        !formData.value.idExpiry || !formData.value.idFile ||
        !formData.value.relationship || !formData.value.percentage) {
      formError.value = 'Please fill in all required fields';
      return;
    }

    // Validate percentage is between 0 and 100
    const percentage = parseFloat(formData.value.percentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      formError.value = 'Percentage must be between 0 and 100';
      return;
    }

    // Validate ID expiry date
    if (new Date(formData.value.idExpiry) <= new Date()) {
      formError.value = 'ID must not be expired';
      return;
    }

    // Create FormData for file upload
    const apiFormData = new FormData();
    Object.keys(formData.value).forEach(key => {
      if (key === 'idFile' && formData.value[key]) {
        apiFormData.append(key, formData.value[key]);
      } else {
        apiFormData.append(key, formData.value[key].toString());
      }
    });

    // Save to store
    saveToStore();

    console.log('Submitting beneficiary information:', formData.value);

    // Make API call
    const baseURL = getBaseURL();
    const response = await axios.post(`${baseURL}/designation-of-beneficiary`, apiFormData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('API Response:', response.data);

    router.push('/power-of-attorney');
  } catch (error) {
    console.error('Error submitting beneficiary information:', error);
    formError.value = 'An error occurred while submitting your information';
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
  console.log('Initializing component with store data:', store.beneficiaryInfo);
  if (store.beneficiaryInfo) {
    formData.value = {
      ...formData.value,
      ...store.beneficiaryInfo,
      idFile: null // Reset file input as it can't be stored
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