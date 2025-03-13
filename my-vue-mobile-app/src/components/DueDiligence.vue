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
                  :src="LogoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="100"
                />
                <h1 class="text-h4 font-weight-bold text-primary mb-1">Due Diligence</h1>
                <h2 class="text-h5 font-weight-bold mb-1">Due Diligence Information</h2>
              </div>

              <v-card class="mb-6" elevation="2">
                <v-card-text class="pa-4">
                  <p class="text-body-1 mb-4">
                    As part of our commitment to regulatory compliance and ensuring the security of our members, 
                    we may require all foreign nationals to complete additional due diligence procedures which may include:
                  </p>

                  <v-list class="mb-4 bg-grey-lighten-4 rounded-lg">
                    <v-list-item
                      v-for="(item, index) in dueDiligenceItems"
                      :key="index"
                      class="py-2"
                    >
                      <template v-slot:prepend>
                        <v-icon color="primary" class="mr-2">mdi-check-circle</v-icon>
                      </template>
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>

                  <v-btn
                    block
                    color="primary"
                    variant="flat"
                    size="large"
                    class="mb-3"
                    href="https://drive.google.com/drive/folders/1t8z2oRVvDwJwXGtKQ7JAQGdsK7-IuZIN"
                    target="_blank"
                    prepend-icon="mdi-file-document-outline"
                  >
                    Laws and Regulations
                  </v-btn>

                  <v-row class="mt-6">
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        color="secondary"
                        variant="flat"
                        size="large"
                        @click="navigateToPrevious"
                      >
                        Back
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        color="primary"
                        variant="flat"
                        size="large"
                        @click="navigateToNext"
                      >
                        Next
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
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import LogoImage from '@/assets/Logo1.png';
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
  height: 48px;
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