<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section d-flex align-center">
        <v-container class="form-container pa-4">
          <v-row justify="center">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-4">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="60"
                />
                <h1 class="text-h4 font-weight-bold text-primary mb-1">Cathedral Engage</h1>
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
                        variant="flat"
                        height="56"
                        class="mb-4 gradient-btn1"
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
                        class="gradient-btn"
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
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const loading = ref(false);
const isNewCustomer = ref(false);

const handleNewCustomer = async () => {
  console.log('New Customer clicked');
  loading.value = true;
  isNewCustomer.value = true;
  try {
    store.setExistingCustomer(false);
    store.setNewCustomer(true);
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
    store.setExistingCustomer(true);
    store.setNewCustomer(false);
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

// Call this when the component mounts
onMounted(() => {
  // Reset customer state when component mounts
  store.setExistingCustomer(false);
  store.setNewCustomer(false);
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

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 12px !important;
}

:deep(.v-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-btn) {
  border-radius: 12px;
  text-transform: none;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.gradient-btn {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.gradient-btn1 {
  background: linear-gradient(45deg, #9bce58d8, #FFBC2D);
  color: white !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.gradient-btn:hover {
  background: linear-gradient(45deg, #2575fc, #6a11cb);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
.gradient-btn1:hover {
  background: linear-gradient(45deg, #FFBC2D, #9bce58d8);
  color: white !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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