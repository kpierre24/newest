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
                  src="@/assets/Logo1.png"
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
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';

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
    if (!formData.value.email || !formData.value.password) {
      formError.value = 'Please fill in all required fields';
      return;
    }

    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    const response = await axios.post(`${baseURL}/login`, {
      email: formData.value.email,
      password: formData.value.password
    });

    store.setUserEmail(formData.value.email);
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
    formError.value = 'Invalid email or password';
  } finally {
    isLoading.value = false;
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