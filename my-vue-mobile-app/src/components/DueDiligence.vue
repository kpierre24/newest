<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container">
          <v-row justify="center" align="center">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-6">
                <v-img
                  src="@/assets/cathedral-engage-logo.png"
                  alt="Cathedral Engage"
                  class="mx-auto mb-4"
                  width="80"
                />
                <h1 class="text-h4 font-weight-bold text-primary mb-2">Due Diligence</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Due Diligence Information</p>
              </div>

              <v-card class="mb-6" variant="outlined">
                <v-card-text>
                  <p class="text-body-1 mb-4">
                    As part of our commitment to regulatory compliance and ensuring the security of our members, 
                    we may require all foreign nationals to complete additional due diligence procedures which may include:
                  </p>
                  
                  <v-list lines="one" class="bg-grey-lighten-4 rounded-lg mb-4">
                    <v-list-item
                      v-for="(item, index) in dueDiligenceItems"
                      :key="index"
                      :prepend-icon="'mdi-check-circle'"
                      :title="item"
                      class="text-primary"
                    ></v-list-item>
                  </v-list>

                  <v-btn
                    variant="text"
                    color="primary"
                    href="https://drive.google.com/drive/folders/1t8z2oRVvDwJwXGtKQ7JAQGdsK7-IuZIN"
                    target="_blank"
                    prepend-icon="mdi-link"
                    class="text-none"
                  >
                    Link to Laws and Regulations
                  </v-btn>
                </v-card-text>
              </v-card>

              <v-row class="mt-6">
                <v-col cols="12" sm="6">
                  <v-btn
                    block
                    color="primary"
                    variant="tonal"
                    @click="navigateToPrevious"
                  >
                    Back
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-btn
                    block
                    color="primary"
                    @click="navigateToNext"
                  >
                    Next
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <v-img
          src="@/assets/cathedral-engage-logo.png"
          alt="Cathedral Engage"
          class="brand-logo"
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

const dueDiligenceItems = [
  'Foreign bank information',
  'Source of funds',
  'Purpose of the account',
  'Anti-Money Laundering (AML) Compliance',
  'Foreign Account Tax Compliance Act (FATCA) Compliance',
  'Politically Exposed Persons Regulations'
];

const navigateToPrevious = () => {
  router.go(-1);
};

const navigateToNext = () => {
  router.push('/address');
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
  position: relative;
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  filter: brightness(1.2);
  z-index: 2;
}

:deep(.v-field) {
  border-radius: 8px !important;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}
</style>