<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section d-flex align-center">
        <v-container class="form-container pa-4">
          <v-row justify="center">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-6">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
                
                <h1 class="text-h1 font-weight-bold mb-2">Mobile [SMS] Verification</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter the verification code sent as an SMS to your mobile phone</p>
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

                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
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
                          size="large"
                          variant="elevated"
                          @click="navigateToPrevious"
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
                          :disabled="!verificationCode"
                        >
                          {{ isLoading ? 'Processing...' : 'Verify' }}
                        </v-btn>
                      </v-col>
                    </v-row>

                    <v-btn
                      block
                      color="secondary"
                      class="mt-4"
                      @click="requestVerificationCode"
                      :disabled="countdown > 0 || resendCount >= maxResendAttempts"
                    >
                      {{ countdown > 0 ? `Resend code in ${countdown}s` : 'Resend Code' }}
                    </v-btn>
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
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const verificationCode = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const isResending = ref(false);
const countdown = ref(0);
const maxResendAttempts = 3;
const resendCount = ref(0);

// Function to request a new verification code
const requestVerificationCode = async () => {
  if (resendCount.value >= maxResendAttempts) {
    errorMessage.value = 'Maximum resend attempts reached';
    return;
  }

  isResending.value = true;
  errorMessage.value = '';
  
  try {
    const response = await axios.post('http://127.0.0.1:8000/device-verifications/send/', {
      identifier_type: 'mobile',
      operation: 'signup',
      signup_id: store.signupId
    });
    
    if (response.data) {
      console.log('Mobile verification code sent successfully');
      resendCount.value++;
      startCountdown();
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
    console.log('Verifying mobile code:', {
      signup_id: store.signupId,
      identifier_type: 'mobile',
      operation: 'signup',
      code: verificationCode.value
    });

    const response = await axios.post('http://127.0.0.1:8000/device-verifications/verify/', {
      signup_id: store.signupId,
      identifier_type: 'mobile',
      operation: 'signup',
      code: verificationCode.value
    });

    if (response.data) {
      // Update store with verification status
      store.$patch({
        isMobileVerified: true,
        mobileVerifiedOn: response.data.verified_on || new Date().toISOString()
      });

      console.log('Mobile verification successful');
      
      // Navigate to next step
      await router.push('/mobile-verification-successful');
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

const startCountdown = () => {
  countdown.value = 60;
  const timer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(timer);
    }
  }, 1000);
};

const handleSubmit = async () => {
  if (verificationCode.value.length !== 6) {
    errorMessage.value = 'Please enter a valid 6-digit code';
    return;
  }
  await verifyCode();
};

const navigateToPrevious = () => {
  router.push('/email-verification-successful');
};

// Request verification code when component mounts
onMounted(async () => {
  if (!store.signupId || !store.mobileNumber) {
    router.push('/signup');
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