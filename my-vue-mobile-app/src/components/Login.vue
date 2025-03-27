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
                  width="60"
                />
               
                <h1 class="text-h1 font-weight-bold mb-1">Sign In</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Sign in using your Online Account</p>
              </div>

              <v-card class="mb-6" elevation="3">
                <v-card-text class="pa-4">
                  <v-form @submit.prevent="submitLogin">
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
                      v-model="formData.email"
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-email"
                      :rules="[v => !!v || 'Email is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.password"
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-lock"
                      :rules="[v => !!v || 'Password is required']"
                      required
                      class="mb-4"
                    />

                    <v-btn
                      type="submit"
                      color="primary"
                      variant="elevated"
                      size="large"
                      block
                      :loading="isLoading"
                      height="44"
                      class="mb-1"
                    >
                      {{ isLoading ? 'Signing in...' : 'Sign In' }}
                    </v-btn>

                    <div class="text-center">
                      <v-btn
                        variant="text"
                        color="primary"
                        @click="navigateToRecovery"
                        class="text-caption"
                      >
                        Recover your account
                      </v-btn>
                    </div>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <div class="brand-overlay"></div>
        <v-img
          
          alt="Cathedral Engage"
          class="brand-img"
          contain
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
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();

const formData = ref({
  email: '',
  password: ''
});

const formError = ref('');
const isLoading = ref(false);

const submitLogin = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.post(`${baseURL}/auth/login/`, {
      email: formData.value.email,
      password: formData.value.password
    });

    if (response.data) {
      // Store the initial auth data
      store.setAuthData({
        email: formData.value.email,
        accessToken: response.data.access_token,
        userId: response.data.user_id,
        mobileNumber: response.data.mobile_number
      });

      // Request mobile verification code
      await requestMobileCode();

      // Navigate to mobile verification
      router.push('/verify-mobile');
    }
  } catch (error) {
    console.error('Login failed:', error);
    formError.value = error.response?.data?.detail || 'Invalid email or password';
  } finally {
    isLoading.value = false;
  }
};

const requestMobileCode = async () => {
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
    console.error('Failed to request mobile code:', error);
    throw error;
  }
};

const navigateToRecovery = () => {
  router.push('/recover-account');
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


:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
}

:deep(.v-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-field) {
  border-radius: 8px;
}

:deep(.v-btn) {
  border-radius: 8px;
}

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding: 1rem;
  }

  .brand-section {
    display: none;
  }
}

@media (max-width: 600px) {
  .form-section {
    min-height: calc(100vh - 60px);
  }

  :deep(.v-card-text) {
    padding: 16px !important;
  }
}
</style>