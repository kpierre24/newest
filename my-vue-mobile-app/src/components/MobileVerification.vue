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
                  src="@/assets/Logo1.png"
                  alt="Cathedral Engage"
                  class="mx-auto mb-4"
                  width="80"
                />
                
                <h1 class="text-h1 font-weight-bold mb-2">Mobile [SMS] Verification</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter the verification code sent as an SMS to your mobile phone</p>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';

const router = useRouter();
const store = useDemoStore();
const verificationCode = ref('');
const isLoading = ref(false);
const formError = ref('');

const formatInput = (event) => {
  verificationCode.value = verificationCode.value.replace(/[^0-9]/g, '').slice(0, 6);
};

const handleSubmit = async () => {
  if (verificationCode.value.length !== 6) {
    formError.value = 'Please enter a 6-digit code.';
    return;
  }

  isLoading.value = true;
  formError.value = '';

  try {
    store.setVerificationCode(verificationCode.value);
    router.push('/mobile-verification-successful');
  } catch (error) {
    console.error('Error submitting verification code:', error);
    formError.value = 'An error occurred while verifying the code';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/email-verification-successful');
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

.brand-section {
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.brand-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.brand-logo {
  width: 240px;
  height: auto;
  z-index: 2;
  filter: brightness(1.2);
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