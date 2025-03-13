<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="start">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-4">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
                
                <h1 class="text-h1 font-weight-bold mb-1">Power of Attorney</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter the Power of Attorney's details and upload required documents</p>
              </div>

              <v-form @submit.prevent="submitForm">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                  density="compact"
                >
                  {{ formError }}
                </v-alert>

                <!-- Attorney Information -->
                <v-card class="mb-4" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Power of Attorney Information</h3>
                    <v-text-field
                      v-model="formData.powerOfAttorneyFirstName"
                      label="First Name"
                      placeholder="Power of Attorney First Name"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'First name is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyLastName"
                      label="Last Name"
                      placeholder="Power of Attorney Last Name"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'Last name is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyDob"
                      label="Date of Birth"
                      type="date"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-calendar"
                      :min="minDate"
                      :max="maxDate"
                      :rules="[v => !!v || 'Date of birth is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyEmail"
                      label="Email"
                      type="email"
                      placeholder="Power of Attorney Email"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-email"
                      :rules="[v => !!v || 'Email is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyPhone"
                      label="Phone Number"
                      type="tel"
                      placeholder="Power of Attorney Phone Number"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-phone"
                      :rules="[v => !!v || 'Phone number is required']"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- Attorney Address -->
                <v-card class="mb-4" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Power of Attorney Address</h3>
                    <v-text-field
                      v-model="formData.powerOfAttorneyAddressLine1"
                      label="Address Line 1"
                      placeholder="Street address"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[v => !!v || 'Address is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyAddressLine2"
                      label="Address Line 2"
                      placeholder="Apt, Suite, Unit, etc. (optional)"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-map-marker-plus"
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyCity"
                      label="City"
                      placeholder="City"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-city"
                      :rules="[v => !!v || 'City is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyCountry"
                      label="Country"
                      placeholder="Country"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-earth"
                      :rules="[v => !!v || 'Country is required']"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- Attorney ID -->
                <v-card class="mb-4" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Power of Attorney Identification</h3>
                    <v-select
                      v-model="formData.powerOfAttorneyIdType"
                      label="Type of ID"
                      :items="idTypes"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.powerOfAttorneyIdNumber"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-identifier"
                      :rules="[v => !!v || 'ID number is required']"
                      required
                      class="mb-3"
                    />

                    <v-file-input
                      v-model="formData.powerOfAttorneyIdDocument"
                      label="Upload ID Document"
                      placeholder="Upload ID"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'ID document is required']"
                      @change="handleIdUpload"
                      required
                      truncate-length="25"
                      hint="Please upload a clear copy of the ID"
                      persistent-hint
                    />
                  </v-card-text>
                </v-card>

                <!-- Document Upload -->
                <v-card class="mb-6" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Document Upload</h3>
                    <v-file-input
                      v-model="formData.poaDocument"
                      label="Power of Attorney Document"
                      placeholder="Upload Document"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'Document is required']"
                      @change="handleFileUpload"
                      required
                      truncate-length="25"
                      hint="Please upload a signed copy of the Power of Attorney"
                      persistent-hint
                    />
                  </v-card-text>
                </v-card>

                <!-- Navigation Buttons -->
                <v-row class="mt-4">
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      variant="flat"
                      size="large"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
                      height="44"
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
                      height="44"
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();

// Add computed properties for date validation
const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100); // Allow dates up to 100 years ago
  return date.toISOString().split('T')[0];
});

const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18); // Must be at least 18 years old
  return date.toISOString().split('T')[0];
});

const formData = ref({
  powerOfAttorneyFirstName: '',
  powerOfAttorneyLastName: '',
  powerOfAttorneyEmail: '',
  powerOfAttorneyPhone: '',
  powerOfAttorneyDob: '',
  powerOfAttorneyAddressLine1: '',
  powerOfAttorneyAddressLine2: '',
  powerOfAttorneyCity: '',
  powerOfAttorneyCountry: '',
  powerOfAttorneyIdType: '',
  powerOfAttorneyIdNumber: '',
  powerOfAttorneyIdDocument: null,
  poaDocument: null
});

const formError = ref('');
const isLoading = ref(false);

const idTypes = [
  'National ID',
  'Passport',
  'Driver\'s License',
  'Other Government ID'
];

const handleFileUpload = (file) => {
  formData.value.poaDocument = file;
};

const handleIdUpload = (file) => {
  formData.value.powerOfAttorneyIdDocument = file;
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    if (!formData.value.powerOfAttorneyFirstName || !formData.value.powerOfAttorneyLastName || 
        !formData.value.powerOfAttorneyEmail || !formData.value.powerOfAttorneyPhone) {
      formError.value = 'Please fill in all required fields';
      isLoading.value = false;
      return;
    }

    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    try {
      await axios.post(`${baseURL}/power-of-attorney`, formData.value);
    } catch (apiError) {
      console.error('API error:', apiError);
    }

    const storeData = { ...formData.value };
    delete storeData.poaDocument;
    delete storeData.powerOfAttorneyIdDocument;
    store.$patch((state) => {
      Object.assign(state, storeData);
    });

    router.push('/branch');
  } catch (error) {
    console.error('Error submitting power of attorney information:', error);
    formError.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/branch');
};

onMounted(() => {
  if (store) {
    formData.value.powerOfAttorneyFirstName = store.powerOfAttorneyFirstName || '';
    formData.value.powerOfAttorneyLastName = store.powerOfAttorneyLastName || '';
    formData.value.powerOfAttorneyEmail = store.powerOfAttorneyEmail || '';
    formData.value.powerOfAttorneyPhone = store.powerOfAttorneyPhone || '';
    formData.value.powerOfAttorneyDob = store.powerOfAttorneyDob || '';
    formData.value.powerOfAttorneyAddressLine1 = store.powerOfAttorneyAddressLine1 || '';
    formData.value.powerOfAttorneyAddressLine2 = store.powerOfAttorneyAddressLine2 || '';
    formData.value.powerOfAttorneyCity = store.powerOfAttorneyCity || '';
    formData.value.powerOfAttorneyCountry = store.powerOfAttorneyCountry || '';
    formData.value.powerOfAttorneyIdType = store.powerOfAttorneyIdType || '';
    formData.value.powerOfAttorneyIdNumber = store.powerOfAttorneyIdNumber || '';
  }
});
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  height: 100vh;
  overflow-y: auto;
}

.form-container {
  max-width: 100%;
  padding: 2rem 1.5rem;
}



:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.v-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
}

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .form-section {
    height: calc(100vh - 60px);
  }

  :deep(.v-card-text) {
    padding: 16px !important;
  }
}
</style>