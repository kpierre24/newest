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
                <h1 class="text-h4 font-weight-bold mb-2">Email Verification</h1>
                <p class="text-subtitle-1 text-medium-emphasis">
                  Enter the verification code sent to {{ store.email }}
                </p>
              </div>

              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                class="mb-4"
              >
                {{ errorMessage }}
              </v-alert>

              <v-form @submit.prevent="handleSubmit">
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
                  <v-col cols="12" class="text-center mb-4">
                    <v-btn
                      variant="text"
                      color="primary"
                      :loading="isResending"
                      @click="requestVerificationCode"
                    >
                      {{ isResending ? 'Sending...' : 'Resend Code' }}
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      variant="tonal"
                      size="large"
                      @click="router.go(-1)"
                      :disabled="isLoading"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      variant="elevated"
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
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const verificationCode = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const isResending = ref(false);

// Function to request a new verification code
const requestVerificationCode = async () => {
  isResending.value = true;
  errorMessage.value = '';
  
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/device-verifications/send/`, {
      identifier_type: 'email',
      operation: 'signup',
      signup_id: store.signupId
    });
    
    if (response.data) {
      console.log('Verification code sent successfully');
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
    errorMessage.value = error.response?.data?.detail || 'Failed to send verification code';
  } finally {
    isResending.value = false;
  }
};

// Function to verify the code
const verifyCode = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    console.log('Sending verification code:', {
      signup_id: store.signupId,
      identifier_type: 'email',
      operation: 'signup',
      code: verificationCode.value
    });

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/device-verifications/verify/`, {
      signup_id: store.signupId,
      identifier_type: 'email',
      operation: 'signup',
      code: verificationCode.value
    });

    if (response.data) {
      // Update store with verification status
      store.$patch({
        isEmailVerified: true,
        emailVerifiedOn: response.data.verified_on || new Date().toISOString()
      });

      console.log('Email verification successful, navigating to success page');
      
      // Navigate to success component
      await router.push({ name: 'EmailVerSuccessful' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    errorMessage.value = error.response?.data?.detail || 'Invalid verification code';
  } finally {
    isLoading.value = false;
  }
};

const formatInput = () => {
  // Remove non-numeric characters
  verificationCode.value = verificationCode.value.replace(/[^0-9]/g, '');
  // Limit to 6 digits
  if (verificationCode.value.length > 6) {
    verificationCode.value = verificationCode.value.slice(0, 6);
  }
};

const handleSubmit = async () => {
  if (verificationCode.value.length !== 6) {
    errorMessage.value = 'Please enter a valid 6-digit code';
    return;
  }
  await verifyCode();
};

// Request verification code when component mounts
onMounted(async () => {
  if (!store.signupId || !store.email) {
    router.push('/basic-info');
    return;
  }
  await requestVerificationCode();
});
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