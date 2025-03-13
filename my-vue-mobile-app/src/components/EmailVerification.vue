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
                <h1 class="text-h1 font-weight-bold mb-2">Email Verification</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter the verification code sent to your email</p>
              </div>

              <v-form @submit.prevent="handleSubmit">
                <v-alert
                  v-if="errorMessage"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ errorMessage }}
                </v-alert>

                <v-text-field
                  v-model="verificationCode"
                  label="Verification Code"
                  placeholder="Enter 6-digit code"
                  :rules="[
                    v => !!v || 'Verification code is required',
                    v => v.length === 6 || 'Code must be 6 digits'
                  ]"
                  maxlength="6"
                  variant="outlined"
                  prepend-inner-icon="mdi-shield-lock"
                  @input="formatInput"
                  required
                />

                <v-row class="mt-6">
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      density="default"
                      size="large"
                      variant="flat"
                      @click="navigateToPrevious"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      density="default"
                      variant="flat"
                      size="large"
                      type="submit"
                      :loading="isLoading"
                    >
                      {{ isLoading ? 'Verifying...' : 'Verify' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section  ">
        <div class="brand-overlay"></div>
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
import { useDemoStore } from '@/store/demoStore';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const verificationCode = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const formatInput = (event) => {
  // Remove non-numeric characters
  verificationCode.value = verificationCode.value.replace(/[^0-9]/g, '');
};

const handleSubmit = async () => {
  if (verificationCode.value.length !== 6) {
    errorMessage.value = 'Please enter a valid 6-digit code';
    return;
  }

  isLoading.value = true;
  try {
    store.setVerificationCode(verificationCode.value);
    await router.push('/email-verification-successful');
  } catch (error) {
    errorMessage.value = 'An error occurred during verification';
    console.error('Verification error:', error);
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.go(-1);
};
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
}

.form-container {
  max-width: 100%;
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
    display: none; /* Hide brand section on mobile */
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