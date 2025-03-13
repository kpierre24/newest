<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section d-flex align-center justify-center">
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
                
                <h1 class="text-h1 font-weight-bold mb-2">Membership Declaration Agreement</h1>
              </div>

              <v-alert
                v-if="errorMessage"
                type="error"
                variant="tonal"
                class="mb-4"
              >
                {{ errorMessage }}
              </v-alert>

              <v-card class="mb-4" variant="outlined">
                <v-card-text>
                  <h2 class="text-body-1 mb-2">
                    I hereby make application for membership in <strong>CATHEDRAL CREDIT UNION CO-OPERATIVE SOCIETY LIMITED</strong> and if admitted, agree to abide by the Bye-Laws or amendments of the said Society. I am aware that I am not a bona fide member of the society until this application is approved by the Board of Directors. I further pledge to offer my skills towards the growth of the Society.
                  </h2>

                  <!-- Credit Union Membership -->
                  <v-radio-group
                    v-model="isMemberOfAnotherCreditUnion"
                    class="mb-4"
                  >
                    <label class="text-subtitle-1 mb-2">Are you a member of another credit union?</label>
                    <v-radio
                      label="Yes"
                      value="yes"
                    />
                    <v-radio
                      label="No"
                      value="no"
                    />
                  </v-radio-group>

                  <v-text-field
                    v-if="isMemberOfAnotherCreditUnion === 'yes'"
                    v-model="creditUnionName"
                    label="Name of Credit Union"
                    placeholder="Enter credit union name"
                    variant="outlined"
                    prepend-inner-icon="mdi-bank"
                    :rules="[v => !isMemberOfAnotherCreditUnion || !!v || 'Credit union name is required']"
                  />

                  <!-- Board Service -->
                  <v-radio-group
                    v-model="isServingOnBoard"
                    class="mb-4"
                  >
                    <label class="text-subtitle-1 mb-2">Are you serving on another Credit Union/State Board of Directors/Committee?</label>
                    <v-radio
                      label="Yes"
                      value="yes"
                    />
                    <v-radio
                      label="No"
                      value="no"
                    />
                  </v-radio-group>

                  <v-text-field
                    v-if="isServingOnBoard === 'yes'"
                    v-model="creditUnionBoardName"
                    label="Name of Board"
                    placeholder="Enter board name"
                    variant="outlined"
                    prepend-inner-icon="mdi-account-group"
                    :rules="[v => !isServingOnBoard || !!v || 'Board name is required']"
                  />

                  <v-row class="mt-6">
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        color="tertiary"
                        variant="tonal"
                        size="large"
                        @click="disagree"
                        :disabled="isLoading"
                      >
                        Disagree
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-btn
                        block
                        color="primary"
                        size="large"
                        variant="elevated"
                        @click="goNext"
                        :loading="isLoading"
                      >
                        {{ isLoading ? 'Processing...' : 'Next' }}
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
      <v-col cols="12" md="6" class="brand-section  d-md-flex">
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
import logoImage from '@/assets/Logo1.png';
const router = useRouter();
const store = useDemoStore();

const isMemberOfAnotherCreditUnion = ref(store.isMemberOfAnotherCreditUnion || 'no');
const creditUnionName = ref(store.creditUnionName || '');
const isServingOnBoard = ref(store.isServingOnBoard || 'no');
const creditUnionBoardName = ref(store.creditUnionBoardName || '');
const errorMessage = ref('');
const isLoading = ref(false);

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const validateForm = () => {
  return new Promise((resolve, reject) => {
    errorMessage.value = '';
    
    if (isMemberOfAnotherCreditUnion.value === 'yes' && !creditUnionName.value.trim()) {
      errorMessage.value = 'Please enter the name of the credit union';
      reject(new Error(errorMessage.value));
      return;
    }
    
    if (isServingOnBoard.value === 'yes' && !creditUnionBoardName.value.trim()) {
      errorMessage.value = 'Please enter the name of the board';
      reject(new Error(errorMessage.value));
      return;
    }
    
    resolve({
      isMemberOfAnotherCreditUnion: isMemberOfAnotherCreditUnion.value,
      creditUnionName: creditUnionName.value,
      isServingOnBoard: isServingOnBoard.value,
      creditUnionBoardName: creditUnionBoardName.value
    });
  });
};

const goNext = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const formData = await validateForm();
    store.setMembershipInfo(formData);

    const baseURL = getBaseURL();
    await axios.post(`${baseURL}/membership-declaration-agreement`, formData);
    router.push('/politically-exposed-persons');
  } catch (error) {
    console.error('Error submitting membership declaration:', error);
    
    if (!errorMessage.value) {
      errorMessage.value = 'An error occurred. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
};

const disagree = () => {
  router.push('/');
};
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
  overflow-y: auto;
}

.form-container {
  max-width: 100%;
  width: 100%;
  padding: 2rem 1rem;
}

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding: 1rem;
    min-height: auto;
    margin-bottom: 2rem;
  }

  .form-section {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 2rem 0;
  }

  .brand-section {
    display: none; /* Hide brand section on mobile */
  }

  :deep(.v-card) {
    margin-bottom: 2rem;
  }

  :deep(.v-btn) {
    margin-bottom: 1rem;
  }
}

/* Additional mobile adjustments for smaller screens */
@media (max-width: 600px) {
  .text-h1 {
    font-size: 1.75rem !important;
    line-height: 2rem;
    margin-bottom: 1rem !important;
  }

  .v-img.mx-auto {
    margin-top: 1rem;
  }

  :deep(.v-card-text) {
    padding: 1rem;
  }

  :deep(.v-radio-group) {
    margin-bottom: 1rem;
  }
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}

:deep(.v-radio-group) {
  margin-bottom: 24px;
}

:deep(.v-input--radio-group) {
  margin-top: 12px;
}
</style>
