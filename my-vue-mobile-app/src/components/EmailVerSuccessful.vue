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
               
                <h1 class="text-h1 font-weight-bold mb-2">Congratulations</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Your email has been verified successfully</p>
              </div>

              <v-card class="mb-6 text-center" variant="outlined">
                <v-card-text>
                  <v-img
                    src="@/assets/Group 5.png"
                    alt="Verification Image"
                    class="mx-auto mb-4"
                    max-width="200"
                    contain
                  />
                  <p class="text-h6 mb-6">Verified Email Successfully</p>
                  
                  <v-btn
                    block
                    color="primary"
                    size="large"
                    :loading="isLoading"
                    @click="mobileVerification"
                  >
                    {{ isLoading ? 'Processing...' : 'Next' }}
                  </v-btn>
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
import logoImage from '../assets/Logo1.png';
const router = useRouter();
const isLoading = ref(false);

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const mobileVerification = async () => {
  isLoading.value = true;
  try {
    const baseURL = getBaseURL();
    await axios.post(`${baseURL}/email-verification-successful`, { status: 'success' });
    router.push({ name: 'MobileVerification' });
  } catch (error) {
    console.error('Error verifying email:', error);
    // Continue with navigation even if API fails
    router.push({ name: 'MobileVerification' });
  } finally {
    isLoading.value = false;
  }
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