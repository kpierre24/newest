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
                
                <h1 class="text-h1 font-weight-bold mb-2">Politically Exposed Persons - Part 2</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your PEP association details</p>
              </div>

              <v-form @submit.prevent="submitPepInfo">
                <v-alert
                  v-if="errorMessage"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ errorMessage }}
                </v-alert>

                <v-card class="mb-6" elevation="3">
                  <v-card-text>
                    <div class="input-container">
                      <label>Are you an associate of a politically exposed person?</label>
                      <div class="radio-group">
                        <label>
                          <input type="radio" v-model="formData.pepAssociate" value="yes" required/> Yes
                        </label>
                        <label>
                          <input type="radio" v-model="formData.pepAssociate" value="no" required/> No
                        </label>
                      </div>
                    </div>

                    <div class="input-container">
                      <label for="relationshipToPep">Relationship to PEP</label>
                      <input
                        type="text"
                        v-model="formData.pepAssociateDetails"
                        id="relationshipToPep"
                        placeholder="Enter relationship"
                        :disabled="formData.pepAssociate === 'no'"
                      />
                    </div>

                    <div class="input-container">
                      <label for="pepName">Name of PEP</label>
                      <input
                        type="text"
                        v-model="formData.pepName"
                        id="pepName"
                        placeholder="Enter name of PEP"
                        :disabled="formData.pepAssociate === 'no'"
                      />
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Navigation buttons -->
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      density="default"
                      variant="flat"
                      @click="navigateToPrevious"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      density="default"
                      variant="flat"
                      type="submit"
                    >
                      Next
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
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const formData = ref({
  pepAssociate: '',
  pepAssociateDetails: '',
  pepName: ''
});
const errorMessage = ref('');
const isLoading = ref(false);

// Calculate age based on DOB from store
const calculateAge = (dob) => {
  if (!dob) return 0;
  
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    console.error('Invalid date format:', dob);
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const submitPepInfo = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    if (!formData.value.pepAssociate) {
      errorMessage.value = 'Please select whether you are an associate of a PEP';
      return;
    }

    if (formData.value.pepAssociate === 'yes' && 
        (!formData.value.pepAssociateDetails || !formData.value.pepName)) {
      errorMessage.value = 'Please provide all PEP association details';
      return;
    }

    // Update store
    store.$patch((state) => {
      state.pepAssociate = formData.value.pepAssociate;
      state.pepAssociateDetails = formData.value.pepAssociateDetails;
      state.pepAssociateName = formData.value.pepName;
    });

    // Submit to API
    try {
      const baseURL = getBaseURL();
      await axios.post(`${baseURL}/politically-exposed-persons-2`, formData.value);
    } catch (apiError) {
      console.error('API error:', apiError);
      // Continue with navigation even if API fails
    }

    // Get DOB from store and calculate age
    const dob = store.basicInfo?.dob;
    console.log('DOB from store:', dob); // Debug log

    if (!dob) {
      console.error('Date of birth not found in store:', store.basicInfo);
      errorMessage.value = 'Unable to determine age. Please ensure basic information is complete.';
      isLoading.value = false;
      return;
    }

    const age = calculateAge(dob);
    console.log('Calculated age:', age); // Debug log

    // Navigate based on age
    if (age < 18) {
      console.log('Navigating to child ID information (age < 18)');
      router.push('/child-id-information');
    } else {
      console.log('Navigating to ID information (age >= 18)');
      router.push('/id-information');
    }

  } catch (error) {
    console.error('Error submitting PEP information:', error);
    errorMessage.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    state.pepAssociate = formData.value.pepAssociate;
    state.pepAssociateDetails = formData.value.pepAssociateDetails;
    state.pepAssociateName = formData.value.pepName;
  });
  router.push('/politically-exposed-persons');
};

// Initialize form with stored data
onMounted(() => {
  console.log('Store state on mount:', store.basicInfo); // Debug log
  if (store) {
    formData.value.pepAssociate = store.pepAssociate || '';
    formData.value.pepAssociateDetails = store.pepAssociateDetails || '';
    formData.value.pepName = store.pepAssociateName || '';
  }
});
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



:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-card-text) {
  padding: 24px;
}

.input-container {
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

input[type="text"]:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
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

/* Ensure form content is scrollable on mobile */
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
</style>