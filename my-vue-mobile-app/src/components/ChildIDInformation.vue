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
                <v-alert v-if="formError" type="error" variant="tonal" class="mb-4">
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
                      @update:model-value="validateExpiryDate('first')"
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
                      show-size
                      multiple
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
                      @update:model-value="validateExpiryDate('second')"
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
                      show-size
                      multiple
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

// Form data
const formData = ref({
  firstIdType: '',
  firstIdNumber: '',
  firstExpiryDate: '',
  firstIdDocument: null,
  secondIdType: '',
  secondIdNumber: '',
  secondExpiryDate: '',
  secondIdDocument: null,
});

const formError = ref('');
const isLoading = ref(false);
const firstExpiryDateError = ref('');
const secondExpiryDateError = ref('');

// Computed properties
const minDate = computed(() => new Date().toISOString().split('T')[0]);
const maxExpiryDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 10);
  return date.toISOString().split('T')[0];
});

// ID types
const idTypes = ['Birth Certificate', 'Passport', 'National ID'];

// Methods
const validateExpiryDate = (type) => {
  const expiry = new Date(formData.value[`${type}ExpiryDate`]);
  const today = new Date();
  const errorField = `${type}ExpiryDateError`;

  if (expiry <= today) {
    formData.value[errorField] = 'Expiry date must be in the future';
  } else {
    formData.value[errorField] = '';
  }
};

const handleFileUpload = (event, type) => {
  const file = event?.target?.files?.[0] || event;
  if (file instanceof File) {
    formData.value[`${type}IdDocument`] = file;
  }
};

const navigateToPrevious = () => {
  saveToStore();
  router.go(-1);
};

const saveToStore = () => {
  store.$patch({
    childIdInfo: {
      firstIdType: formData.value.firstIdType,
      firstIdNumber: formData.value.firstIdNumber,
      firstExpiryDate: formData.value.firstExpiryDate,
      secondIdType: formData.value.secondIdType,
      secondIdNumber: formData.value.secondIdNumber,
      secondExpiryDate: formData.value.secondExpiryDate,
    },
  });
};

const submitChildIDInformation = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${baseURL}/child-identifications/`, formData.value, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    saveToStore();
    router.push('/parent-guardian-information');
  } catch (error) {
    console.error('Error submitting child ID information:', error);
    formError.value = error.response?.data?.detail || 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

// Initialize component
onMounted(() => {
  if (store.childIdInfo) {
    formData.value = { ...store.childIdInfo };
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