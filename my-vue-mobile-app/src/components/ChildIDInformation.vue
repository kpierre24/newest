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
                  src="@/assets/cathedral-engage-logo.png"
                  alt="Cathedral Engage"
                  class="mx-auto mb-4"
                  width="80"
                />
                <h1 class="text-h4 font-weight-bold text-primary mb-2">Cathedral Engage</h1>
                <h2 class="text-h5 font-weight-bold mb-2">Child ID Information</h2>
                <p class="text-subtitle-1 text-medium-emphasis">Enter your child's identification details</p>
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

                <!-- School Information -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-title class="text-h6 pa-4">School Information</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="schoolName"
                      label="School Name"
                      :rules="[v => !!v || 'School name is required']"
                      placeholder="Enter school name"
                      variant="outlined"
                      prepend-inner-icon="mdi-school"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- First Form of ID -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-title class="text-h6 pa-4">First Form of ID</v-card-title>
                  <v-card-text>
                    <v-select
                      v-model="firstIdType"
                      label="Type of ID"
                      :items="['ID Card', 'Passport', 'Birthpaper']"
                      :rules="[v => !!v || 'Type of ID is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      @change="updateSecondIdOptions"
                      required
                    />

                    <v-text-field
                      v-model="firstIdNumber"
                      label="ID Number"
                      :rules="[v => !!v || 'ID Number is required']"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-identifier"
                      required
                    />

                    <v-text-field
                      v-model="firstIdExpiry"
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
                      v-model="firstIdFile"
                      label="Upload ID"
                      accept="image/*,.pdf"
                      :rules="[v => !!v || 'ID upload is required']"
                      variant="outlined"
                      prepend-icon="mdi-upload"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- Second Form of ID -->
                <v-card class="mb-6" variant="outlined">
                  <v-card-title class="text-h6 pa-4">Second Form of ID</v-card-title>
                  <v-card-text>
                    <v-select
                      v-model="secondIdType"
                      label="Type of ID"
                      :items="availableSecondIdOptions"
                      :rules="[v => !!v || 'Type of ID is required']"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      required
                    />

                    <v-text-field
                      v-model="secondIdNumber"
                      label="ID Number"
                      :rules="[v => !!v || 'ID Number is required']"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-identifier"
                      required
                    />

                    <v-text-field
                      v-model="secondIdExpiry"
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
                      v-model="secondIdFile"
                      label="Upload ID"
                      accept="image/*,.pdf"
                      :rules="[v => !!v || 'ID upload is required']"
                      variant="outlined"
                      prepend-icon="mdi-upload"
                      required
                    />
                  </v-card-text>
                </v-card>

                <v-row class="mt-6">
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      variant="tonal"
                      @click="navigateToPrevious"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
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
          src="@/assets/cathedral-engage-logo.png"
          alt="Cathedral Engage"
          class="brand-logo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';

const router = useRouter();
const store = useDemoStore();

const schoolName = ref('');
const firstIdType = ref('');
const firstIdNumber = ref('');
const firstIdExpiry = ref('');
const firstIdFile = ref(null);
const secondIdType = ref('');
const secondIdNumber = ref('');
const secondIdExpiry = ref('');
const secondIdFile = ref(null);
const formError = ref('');
const isLoading = ref(false);

const availableSecondIdOptions = computed(() => {
  const allOptions = ['ID Card', 'Passport', 'Birthpaper'];
  return allOptions.filter(option => option !== firstIdType.value);
});

const updateSecondIdOptions = () => {
  if (secondIdType.value === firstIdType.value) {
    secondIdType.value = '';
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  isLoading.value = true;
  formError.value = '';

  // Validate required fields
  if (!schoolName.value ||
      !firstIdType.value || !firstIdNumber.value || !firstIdExpiry.value || !firstIdFile.value ||
      !secondIdType.value || !secondIdNumber.value || !secondIdExpiry.value || !secondIdFile.value) {
    formError.value = 'Please fill in all required fields';
    isLoading.value = false;
    return;
  }

  // Validate expiry dates
  const today = new Date();
  const firstExpiry = new Date(firstIdExpiry.value);
  const secondExpiry = new Date(secondIdExpiry.value);

  if (firstExpiry <= today || secondExpiry <= today) {
    formError.value = 'IDs must not be expired';
    isLoading.value = false;
    return;
  }

  try {
    const formData = {
      schoolName: schoolName.value,
      firstIdType: firstIdType.value,
      firstIdNumber: firstIdNumber.value,
      firstIdExpiry: firstIdExpiry.value,
      firstIdFile: firstIdFile.value,
      secondIdType: secondIdType.value,
      secondIdNumber: secondIdNumber.value,
      secondIdExpiry: secondIdExpiry.value,
      secondIdFile: secondIdFile.value,
    };

    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    await axios.post(`${baseURL}/child-id`, formData);
    
    store.$patch((state) => {
      Object.assign(state, formData);
    });

    router.push('/parent-guardian-information');
  } catch (error) {
    console.error('Error submitting child ID information:', error);
    formError.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/basic-info');
};
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
  position: relative;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  filter: brightness(1.2);
  z-index: 2;
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