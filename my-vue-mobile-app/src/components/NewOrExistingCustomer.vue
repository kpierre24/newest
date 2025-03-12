<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section d-flex align-center">
        <v-container class="form-container pa-4 d-flex flex-column">
          <v-row justify="center" class="flex-grow-1">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-4">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
                
                <h2 class="text-h5 font-weight-bold mb-1">Welcome!</h2>
                <p class="text-subtitle-1 text-medium-emphasis">Choose whether you're a new or existing customer</p>
              </div>

              <v-card class="mb-6" elevation="3">
                <v-card-text class="pa-4">
                  <v-row>
                    <v-col cols="12">
                      <v-btn
                        block
                        color="primary"
                        size="large"
                        height="56"
                        variant="flat"
                        class="mb-4"
                        @click="handleNewCustomer"
                        :loading="loading && isNewCustomer"
                        :disabled="loading"
                      >
                        <v-icon start icon="mdi-account-plus" class="mr-2" />
                        {{ loading && isNewCustomer ? 'Processing...' : 'New Customer' }}
                      </v-btn>

                      <v-btn
                        block
                        color="secondary"
                        size="large"
                        height="56"
                        variant="flat"
                        @click="handleExistingCustomer"
                        :loading="loading && !isNewCustomer"
                        :disabled="loading"
                      >
                        <v-icon start icon="mdi-account" class="mr-2" />
                        {{ loading && !isNewCustomer ? 'Processing...' : 'Existing Customer' }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          
          <!-- Powered By Logo -->
          <v-row justify="center" class="mt-auto">
            <v-col cols="12" sm="8" md="10" lg="8" class="text-center">
              <v-img
                :src="poweredByLogo"
                alt="Powered By"
                class="mx-auto"
                width="120"
                height="40"
                contain
                @error="console.error('Powered by logo failed to load')"
                @load="console.log('Powered by logo loaded successfully')"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <div class="brand-overlay"></div>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import axios from 'axios';
import logoImage from '../assets/Logo1.png';
import poweredByLogo from '../assets/poweredby.png';  // Fixed import path

const router = useRouter();
const store = useDemoStore();
const loading = ref(false);
const isNewCustomer = ref(false);

const handleApiCall = async (endpoint, customerType) => {
  try {
    // Mock a successful response (temporary fix)
    return { data: { success: true } };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const handleNewCustomer = async () => {
  console.log('New Customer clicked');
  loading.value = true;
  isNewCustomer.value = true;
  try {
    await handleApiCall('new', 'new_customer');
    store.setExistingCustomer(false);
    console.log('Store state:', store.isExistingCustomer);
  } catch (error) {
    console.error('Error handling new customer:', error);
  } finally {
    loading.value = false;
    navigateToGettingReady();
  }
};

const handleExistingCustomer = async () => {
  console.log('Existing Customer clicked');
  loading.value = true;
  isNewCustomer.value = false;
  try {
    await handleApiCall('existing', 'existing_customer');
    store.setExistingCustomer(true);
    console.log('Store state:', store.isExistingCustomer);
  } catch (error) {
    console.error('Error handling existing customer:', error);
  } finally {
    loading.value = false;
    navigateToGettingReady();
  }
};

const navigateToGettingReady = () => {
  console.log('Navigating to Getting Ready');
  router.push('/getting-ready').catch((err) => {
    console.error('Navigation error:', err);
  });
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
  background: url('../assets/woman background.jpg') center/cover no-repeat;
  min-height: 100vh;
  position: absolute;
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
  background: linear-gradient(135deg, rgba(99, 98, 248, 0.9) 0%, rgba(38, 28, 107, 0.9) 100%);
  opacity: 0.85;
  mix-blend-mode: multiply;
  pointer-events: none;
}

.brand-logo {
  
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

:deep(.v-btn) {
  border-radius: 8px;
  text-transform: none;
  font-size: 1.1rem;
  letter-spacing: 0;
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
