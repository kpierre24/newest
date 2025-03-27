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
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
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
        <div class="brand-overlay"></div>
        
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import logoImage from '../assets/Logo1.png';
const router = useRouter();
const store = useDemoStore();
const selectedBranch = ref('');
const preferredContactMethod = ref('');
const bestContactTime = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const baseURL = import.meta.env.VITE_API_BASE_URL;
    
  

const handleSubmit = async () => {
  if (!selectedBranch.value || !preferredContactMethod.value || !bestContactTime.value) {
    errorMessage.value = 'Please fill all required fields.';
    return;
  }

  // Prepare data for API (only branch information)
  const apiData = {
    signup_id: store.signupId,
    home_branch: selectedBranch.value,
    branch_code: selectedBranch.value === 'Port of Spain' ? 'POS' : 'TOB',
    branch_location: selectedBranch.value
  };

  // Prepare data for store (all form values)
  const storeData = {
    branch_name: selectedBranch.value,
    branch_code: selectedBranch.value === 'Port of Spain' ? 'POS' : 'TOB',
    branch_location: selectedBranch.value,
    preferred_contact_method: preferredContactMethod.value,
    best_contact_time: bestContactTime.value
  };

  try {
    isLoading.value = true;
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    // Send only branch information to API
    const response = await axios.put(`${baseURL}/signups/home-branch`, apiData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Branch information submitted:', response.data);
    
    // Save all form data to store
    store.setBranchInfo(storeData);
    console.log('Branch info saved to store:', storeData);
    
    router.push('/success');
  } catch (error) {
    console.error('Error submitting branch information:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      errorMessage.value = error.response.data.detail || 'An error occurred. Please try again later.';
    } else if (error.request) {
      errorMessage.value = 'Network error. Please check your connection.';
    } else {
      errorMessage.value = 'An unexpected error occurred.';
    }
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