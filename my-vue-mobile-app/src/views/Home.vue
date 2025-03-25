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
                <div class="brand-text">
                  
                  <p class="text-subtitle-1 text-medium-emphasis">Better Banking | Service</p>
                </div>
                <h2 class="text-h4 font-weight-bold mb-2">Welcome to Cathedral Online</h2>
                <p class="text-subtitle-1 text-medium-emphasis mb-6">If you don't have an online account click, "Don't have an account?", to get started</p>
                
                <v-row class="button-group">
                  <v-col cols="12">
                    <v-btn
                      block
                      color="secondary"
                      size="large"
                      height="56"
                      variant="flat"
                      @click="$router.push('/login')"
                      class="mb-3"
                    >
                      Sign In
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      block
                      color="primary"
                      size="large"
                      variant="flat"
                      height="56"
                      @click="handleCreateAccount"
                    >
                      Don't have an account?
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <div class="brand-overlay"></div>
        <v-img
          src="@/assets/cathedral-engage-logo.png"
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
import logoImage from '@/assets/Logo1.png';
const router = useRouter();
const store = useDemoStore();

// Handle create account button click
const handleCreateAccount = () => {
  // Reset any existing customer state
  store.setNewCustomer(false);
  store.setExistingCustomer(false);
  // Navigate to new or existing customer selection
  router.push('/new-or-existing-customer');
};
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
}

.form-container {
  max-width: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.powered-by-section {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  z-index: 2;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
  text-transform: none;
  font-size: 1.1rem;
  letter-spacing: 0;
}

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .brand-section {
    display: none;
  }

  .powered-by-section {
    background-image: url('@/assets/poweredby.png');
    background-size: cover;
    background-position: center;
    width: 100%;
  }
}

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

@media (max-height: 700px) {
  .brand-text h1 {
    font-size: 32px;
  }

  .brand-text p {
    font-size: 12px;
  }
}
</style>