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
                  class="mx-auto mb-4"
                  width="80"
                />
                
                <h1 class="text-h1 font-weight-bold mb-2">Getting Ready</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Before going forward, here are some of the things you should have on hand that are required before going forward.</p>
              </div>

              <v-card class="mb-6" variant="flat" elevation="2">
                <v-card-text>
                  <!-- Accordion List -->
                  <v-expansion-panels>
                    <v-expansion-panel v-for="(item, index) in items" :key="index">
                      <v-expansion-panel-title>
                        <template v-slot:default="{ expanded }">
                          <v-row no-gutters>
                            <v-col cols="2" class="d-flex justify-start">
                              <v-icon :color="expanded ? 'primary' : 'grey'">{{ item.icon }}</v-icon>
                            </v-col>
                            <v-col cols="10">
                              <h3 class="text-h6">{{ item.title }}</h3>
                            </v-col>
                          </v-row>
                        </template>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <p class="text-body-1">{{ item.description }}</p>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>

                  <v-row class="mt-6">
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        color="secondary"
                        density="default"
                        variant="flat"
                        @click="handleCancel"
                      >
                        Cancel
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        color="primary"
                        density="default"
                        variant="flat"
                        @click="handleNext"
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
import logoImage from '@/assets/Logo1.png';
const router = useRouter();

const handleNext = () => {
  router.push('/basic-info');
};

const handleCancel = () => {
  router.push('/');
};

// Accordion items
const items = [
  {
    icon: 'mdi-card-account-details',
    title: '1. Personal Identification',
    description: 'Government-issued ID (e.g., driver\'s license, passport, ID card, birth paper (Under 16)). Social Security Number (SSN) or Taxpayer Identification Number (TIN) if you live in the United States of America.',
  },
  {
    icon: 'mdi-bank',
    title: '2. Foreign Bank Account Information',
    description: 'For non Trinidad and Tobago Citizens only: Bank account number, Address, Swift code, Routing Number, Contact Number.',
  },
  {
    icon: 'mdi-home',
    title: '3. Address',
    description: 'Utility Bill -Electricity, Phone, Water, Cable bill in your name. (Valid 3 months or less). If you do not have a utility bill for your abode in your name, an authorization letter for the current owner with a copy of their ID will suffice.',
  },
  {
    icon: 'mdi-briefcase',
    title: '4. Employment/Source of Funds',
    description: 'Job letter, Payslip, Business Owners or Self Employed-- Projected Income for 3 years (completed cash flow projection) or Audited Financial, Retirees – A letter from National Insurance Board (NIB).',
  },
  {
    icon: 'mdi-email-check',
    title: '5. Valid Email & Mobile',
    description: 'A valid email address and mobile number are required for verification and communication purposes.',
  },
  {
    icon: 'mdi-content-save',
    title: '6. Saved Progress',
    description: 'Your progress will be saved as you proceed to sign up with a continue link being sent to your email address. You have 48 hours to complete before sign up must be restarted.',
  },
  {
    icon: 'mdi-account-child',
    title: '7. Guardian Information',
    description: 'If the parent/guardian of the child has a different last name, it may be necessary to prove this relationship by uploading one of the following.',
  },
];
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
  overflow-y: auto;
}

.form-container {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
}


/* Accordion Customization */
:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
}

:deep(.v-card:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-expansion-panel) {
  box-shadow: none !important;
  border: none !important;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  border-radius: 8px !important;
}

:deep(.v-expansion-panel-title) {
  padding: 16px;
}

:deep(.v-expansion-panel-text) {
  padding: 0 16px 16px;
}

:deep(.v-list-item) {
  padding: 1.5rem;
  height: auto !important;
}

:deep(.v-list-item-title) {
  color: #261C6B;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  font-size: 1.25rem !important;
}

:deep(.v-list-item-subtitle) {
  color: #666;
  white-space: normal !important;
  height: auto !important;
  line-height: 1.6;
  margin-top: 0.5rem;
  overflow: visible;
  display: block;
  word-wrap: break-word;
  font-size: 3rem !important;
}

:deep(.v-list-item__content) {
  overflow: visible !important;
  white-space: normal !important;
}

:deep(.v-icon) {
  font-size: 1.5rem !important;
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

  :deep(.v-list-item) {
    padding: 1rem;
  }

  :deep(.v-list-item-title) {
    font-size: 1.15rem !important;
    margin-bottom: 0.5rem;
  }

  :deep(.v-list-item-subtitle) {
    font-size: 1rem !important;
  }

  :deep(.v-icon) {
    font-size: 1.25rem !important;
  }
}
</style>