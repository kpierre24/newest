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
                <h1 class="text-h1 font-weight-bold text-primary mb-2">Branch Selection</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Choose your preferred branch and contact preferences</p>
              </div>

              <v-form @submit.prevent="handleSubmit">
                <v-alert
                  v-if="errorMessage"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ errorMessage }}
                </v-alert>

                <v-select
                  v-model="selectedBranch"
                  label="Branch"
                  :items="['Port of Spain', 'Milford Rd, Tobago']"
                  :rules="[v => !!v || 'Branch selection is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-office-building"
                  required
                />

                <v-card class="mb-4 pa-4" variant="outlined">
                  <v-card-title class="text-subtitle-1 mb-2">Choose your preferred method of contact</v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-radio-group v-model="preferredContactMethod" :rules="[v => !!v || 'Contact method is required']">
                    <v-radio label="Phone" value="phone"></v-radio>
                    <v-radio label="Email" value="email"></v-radio>
                  </v-radio-group>
                </v-card>

                <v-card class="mb-6 pa-4" variant="outlined">
                  <v-card-title class="text-subtitle-1 mb-2">Please choose the best time to contact you</v-card-title>
                  <v-divider class="mb-4"></v-divider>
                  <v-radio-group v-model="bestContactTime" :rules="[v => !!v || 'Contact time is required']">
                    <v-radio label="8:00am to 12:00pm" value="8:00am to 12:00pm"></v-radio>
                    <v-radio label="12:00pm to 4:00pm" value="12:00pm to 4:00pm"></v-radio>
                    <v-radio label="4:00pm to 8:00pm" value="4:00pm to 8:00pm"></v-radio>
                  </v-radio-group>
                </v-card>

                <v-row class="mt-6">
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      variant="elevated"
                      @click="navigateToPrevious"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      type="submit"
                      :loading="isLoading"
                    >
                      <span v-if="isLoading">
                        <v-icon start icon="mdi-loading" class="rotate"></v-icon>
                        Processing...
                      </span>
                      <span v-else>Next</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
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
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';

const router = useRouter();
const store = useDemoStore();
const selectedBranch = ref('');
const preferredContactMethod = ref('');
const bestContactTime = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const handleSubmit = async () => {
  const formData = {
    selectedBranch: selectedBranch.value,
    preferredContactMethod: preferredContactMethod.value,
    bestContactTime: bestContactTime.value,
  };

  if (!formData.selectedBranch || !formData.preferredContactMethod || !formData.bestContactTime) {
    errorMessage.value = 'Please fill all required fields.';
    return;
  }

  store.setBranchInfo(formData);
  console.log('Branch info saved to store:', formData);

  try {
    isLoading.value = true;
    const baseURL = getBaseURL();
    const response = await axios.post(`${baseURL}/branch`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Branch information submitted:', response.data);
    router.push('/success');
  } catch (error) {
    console.error('Error submitting branch information:', error);
    errorMessage.value = 'An error occurred. Please try again later.';
    
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    router.push('/success');
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.go(-1);
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

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}

.rotate {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>