<template>
    
  <v-container class="fill-height pa-0" fluid>
   >
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="center" class="fill-height">
            <v-col cols="12" sm="8" md="10" lg="8">
                
              <v-card class="text-center pa-6">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-4"
                  width="80"
                />
                <v-icon
                  icon="mdi-alert-circle"
                  color="error"
                  size="64"
                  class="mb-4"
                />
               
                <h1 class="text-h3 font-weight-bold mb-4">404</h1>
                <h2 class="text-h5 mb-4">Page Not Found</h2>
                <p class="text-body-1 text-medium-emphasis mb-6">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <v-btn
                  color="secondary"
                  variant="elevated"
                  size="large"
                  @click="$router.push('/')"
                >
                  Return to Home
                </v-btn>
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
import logoImage from '@/assets/Logo1.png';
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
  justify-content: center;
  align-items: center;
}





.brand-logo {
  position: relative;
  z-index: 1;
  max-width: 80%;
  max-height: 80%;
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