<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="start">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-4">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="60"
                />
                <h1 class="text-h4 font-weight-bold mb-1">Verify Mobile</h1>
                <p class="text-subtitle-1 text-medium-emphasis">
                  Enter the verification code sent to {{ maskedMobile }}
                </p>
              </div>

              <v-card class="mb-6" elevation="3">
                <v-card-text class="pa-4">
                  <v-form @submit.prevent="verifyCode">
                    <v-alert
                      v-if="formError"
                      type="error"
                      variant="tonal"
                      class="mb-4"
                      density="compact"
                    >
                      {{ formError }}
                    </v-alert>

                    <v-text-field
                      v-model="verificationCode"
                      label="Verification Code"
                      type="text"
                      placeholder="Enter code"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-cellphone-message"
                      :rules="[v => !!v || 'Code is required']"
                      required
                      class="mb-3"
                    />

                    <v-btn
                      type="submit"
                      color="primary"
                      variant="elevated"
                      size="large"
                      block
                      :loading="isLoading"
                      height="44"
                      class="mb-3"
                    >
                      {{ isLoading ? 'Verifying...' : 'Verify' }}
                    </v-btn>

                    <div class="text-center">
                      <v-btn
                        variant="text"
                        color="primary"
                        :disabled="isResending"
                        @click="resendCode"
                        class="text-caption"
                      >
                        {{ isResending ? 'Sending...' : 'Resend Code' }}
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <div class="brand-overlay"></div>
        <v-img
          :src="frontImage"
          alt="Cathedral Engage"
          class="brand-img"
          contain
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
import frontImage from '@/assets/BG Pic.png';
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();

const verificationCode = ref('');
const formError = ref('');
const isLoading = ref(false);
const isResending = ref(false);

const maskedMobile = computed(() => {
  const mobile = store.mobileNumber;
  if (!mobile) return '';
  return `****${mobile.slice(-4)}`;
});

const verifyCode = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/auth/verify-mobile-code/`, {
      user_id: store.userId,
      code: verificationCode.value
    }, {
      headers: {
        'Authorization': `Bearer ${store.accessToken}`
      }
    });

    if (response.data) {
      // Update auth state with final token
      store.setFinalAuthToken(response.data.access_token);
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Verification failed:', error);
    formError.value = 'Invalid verification code';
  } finally {
    isLoading.value = false;
  }
};

const resendCode = async () => {
  isResending.value = true;
  formError.value = '';

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${baseURL}/auth/request-mobile-code/`, {
      user_id: store.userId
    }, {
      headers: {
        'Authorization': `Bearer ${store.accessToken}`
      }
    });
  } catch (error) {
    console.error('Failed to resend code:', error);
    formError.value = 'Failed to resend code';
  } finally {
    isResending.value = false;
  }
};
</script>

<style scoped>
/* Use the same styles as your Login.vue component */
</style> 