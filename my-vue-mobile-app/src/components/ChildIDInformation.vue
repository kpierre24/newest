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
                
                <h1 class="text-h1 font-weight-bold mb-2">Child ID Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide the child's identification details</p>
              </div>

              <v-form @submit.prevent="submitChildIDInformation">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formError }}
                </v-alert>

                <!-- Child's First Form of ID -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <h3 class="text-h6 mb-4">Child's First Form of ID</h3>
                    <v-select
                      v-model="formData.firstIdType"
                      label="Type of ID"
                      :items="idTypes"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      @update:model-value="updateSecondIdOptions"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.firstIdNumber"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-pound"
                      :rules="[v => !!v || 'ID number is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.firstExpiryDate"
                      label="Expiry Date"
                      type="date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      :min="minDate"
                      :max="maxExpiryDate"
                      :error-messages="firstExpiryDateError"
                      :disabled="formData.firstIdType === 'Birth Certificate'"
                      @update:model-value="validateFirstExpiryDate"
                      required
                    />

                    <v-file-input
                      v-model="formData.firstIdDocument"
                      label="Upload ID"
                      variant="outlined"
                      append-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'ID document is required']"
                      @change="handleFileUpload($event, 'first')"
                      required
                      :show-size="true"
                      :multiple="true"
                      clearable
                    />
                  </v-card-text>
                </v-card>

                <!-- Child's Second Form of ID -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <h3 class="text-h6 mb-4">Child's Second Form of ID</h3>
                    <v-select
                      v-model="formData.secondIdType"
                      label="Type of ID"
                      :items="idTypes.filter(type => type !== formData.firstIdType)"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.secondIdNumber"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-pound"
                      :rules="[v => !!v || 'ID number is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.secondExpiryDate"
                      label="Expiry Date"
                      type="date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      :min="minDate"
                      :max="maxExpiryDate"
                      :error-messages="secondExpiryDateError"
                      :disabled="formData.secondIdType === 'Birth Certificate'"
                      @update:model-value="validateSecondExpiryDate"
                      required
                    />

                    <v-file-input
                      v-model="formData.secondIdDocument"
                      label="Upload ID"
                      variant="outlined"
                      append-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'ID document is required']"
                      @change="handleFileUpload($event, 'second')"
                      required
                      :show-size="true"
                      :multiple="true"
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import logoImage from '../assets/Logo1.png';
const router = useRouter();
const store = useDemoStore();

// Form data refs
const formData = ref({
  firstIdType: '',
  firstIdNumber: '',
  firstExpiryDate: '',
  firstIdDocument: null,
  secondIdType: '',
  secondIdNumber: '',
  secondExpiryDate: '',
  secondIdDocument: null
});

const formError = ref('');
const isLoading = ref(false);
const firstExpiryDateError = ref('');
const secondExpiryDateError = ref('');
const secondIdOptions = ref(['Birth Certificate', 'Passport', 'Student ID']);

// Computed properties
const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const maxExpiryDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
});

// Methods
const updateSecondIdOptions = () => {
  if (formData.value.secondIdType === formData.value.firstIdType) {
    formData.value.secondIdType = '';
  }
};

const validateFirstExpiryDate = () => {
  const today = new Date();
  const expiry = new Date(formData.value.firstExpiryDate);
  if (expiry <= today) {
    firstExpiryDateError.value = 'Expiry date must be in the future';
  } else {
    firstExpiryDateError.value = '';
  }
};

const validateSecondExpiryDate = () => {
  const today = new Date();
  const expiry = new Date(formData.value.secondExpiryDate);
  if (expiry <= today) {
    secondExpiryDateError.value = 'Expiry date must be in the future';
  } else {
    secondExpiryDateError.value = '';
  }
};

const handleFileUpload = (event, type) => {
  const file = event?.target?.files?.[0] || event;
  console.log(`Handling file upload for ${type}:`, file);

  if (file instanceof File) {
    if (type === 'first') {
      formData.value.firstIdDocument = file;
    } else if (type === 'second') {
      formData.value.secondIdDocument = file;
    }
  }
};

const API_BASE_URL = 'http://127.0.0.1:8000'  ; 

const navigateToPrevious = () => {
  // Save current state before navigating
  saveToStore();
  router.go(-1);
};



const saveToStore = () => {
  store.$patch((state) => {
    state.childIdInfo = {
      firstIdType: formData.value.firstIdType,
      firstIdNumber: formData.value.firstIdNumber,
      firstExpiryDate: formData.value.firstExpiryDate,
      secondIdType: formData.value.secondIdType,
      secondIdNumber: formData.value.secondIdNumber,
      secondExpiryDate: formData.value.secondExpiryDate
    };
  });
};

const submitChildIDInformation = async (event) => {
  event.preventDefault();
  isLoading.value = true;
  formError.value = '';

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${baseURL}/child-identifications/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Save to store and navigate
    store.$patch({
      childIdInfo: {
        firstIdType: formData.value.firstIdType,
        firstIdNumber: formData.value.firstIdNumber,
        firstExpiryDate: formData.value.firstExpiryDate,
        secondIdType: formData.value.secondIdType,
        secondIdNumber: formData.value.secondIdNumber,
        secondExpiryDate: formData.value.secondExpiryDate
      }
    });

    router.push('/parent-guardian-information');

  } catch (error) {
    console.error('Error submitting child ID information:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Full error object:', JSON.stringify(error, null, 2));

    if (error.response?.data?.detail) {
      formError.value = Array.isArray(error.response.data.detail)
        ? error.response.data.detail[0]?.msg
        : error.response.data.detail;
    } else {
      formError.value = 'An error occurred while submitting your information';
    }
  } finally {
    isLoading.value = false;
  }
};

// Initialize component
onMounted(() => {
  // Load any existing data from store
  if (store.childIdInfo) {
    formData.value.firstIdType = store.childIdInfo.firstIdType || '';
    formData.value.firstIdNumber = store.childIdInfo.firstIdNumber || '';
    formData.value.firstExpiryDate = store.childIdInfo.firstExpiryDate || '';
    formData.value.secondIdType = store.childIdInfo.secondIdType || '';
    formData.value.secondIdNumber = store.childIdInfo.secondIdNumber || '';
    formData.value.secondExpiryDate = store.childIdInfo.secondExpiryDate || '';
  }
});

// Update the ID type options to match the schema
const idTypes = [
  'Birth Certificate',
  'Passport',
  'National ID'
];
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