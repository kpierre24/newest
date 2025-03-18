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
                <h1 class="text-h1 font-weight-bold text-primary mb-2">Account Number</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please enter your account number</p>
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

                <v-text-field
                  v-model="accountNumber"
                  label="Account Number"
                  :rules="[v => !!v || 'Account number is required']"
                  placeholder="Enter your account number"
                  variant="outlined"
                  prepend-inner-icon="mdi-pound"
                  required
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
          src="@/assets/cathedral-engage-logo.png"
          alt="Cathedral Engage"
          class="brand-logo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const accountNumber = ref('');
const isLoading = ref(false);
const formError = ref('');

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    if (!accountNumber.value) {
      formError.value = 'Please enter your account number';
      isLoading.value = false;
      return;
    }

    // Get the base URL dynamically
    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:8000' 
      : `http://127.0.0.1:8000`;

    try {
      const response = await axios.post(`${baseURL}/account-number`, {
        accountNumber: accountNumber.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Account number submitted:', response.data);
    } catch (apiError) {
      console.error('API error:', apiError);
      // Continue with navigation even if API fails
    }

    // Update store
    store.$patch((state) => {
      state.accountNumber = accountNumber.value;
    });

    // Navigate to next page
    router.push('/due-diligence');
  } catch (error) {
    console.error('Error submitting account number:', error);
    formError.value = 'An error occurred while submitting your account number';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/id-information');
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



:deep(.v-field) {
  border-radius: 8px !important;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}
</style>