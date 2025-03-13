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
               
                <h1 class="text-h1 font-weight-bold mb-2">Politically Exposed Persons</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide information about any political exposure</p>
              </div>

              <v-form @submit.prevent="handleSubmit">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formError }}
                </v-alert>

                <v-card class="mb-6" elevation="3">
                  <v-card-text>
                    <p class="text-body-1 mb-4">
                      A Politically Exposed Person (PEP) is someone who has been entrusted with a prominent public function, 
                      or an immediate family member or close associate of such a person.
                    </p>

                    <v-radio-group
                      v-model="formData.isPEP"
                      label="Are you a politically exposed person, or related to one?"
                      class="mb-4"
                      required
                    >
                      <v-radio
                        label="Yes"
                        :value="true"
                      />
                      <v-radio
                        label="No"
                        :value="false"
                      />
                    </v-radio-group>

                    <template v-if="formData.isPEP">
                      <v-select
                        v-model="formData.pepPosition"
                        label="Position/Office"
                        :items="pepPositions"
                        variant="outlined"
                        prepend-inner-icon="mdi-briefcase"
                        required
                      />

                      <v-select
                        v-model="formData.pepRelationship"
                        label="Relationship"
                        :items="pepRelationships"
                        variant="outlined"
                        prepend-inner-icon="mdi-account-group"
                        required
                      />

                      <v-text-field
                        v-model="formData.pepName"
                        label="Name of PEP"
                        placeholder="Enter the name of the politically exposed person"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                        required
                      />

                      <v-text-field
                        v-model="formData.pepCountry"
                        label="Country of Political Office"
                        placeholder="Enter the country of political office"
                        variant="outlined"
                        prepend-inner-icon="mdi-earth"
                        required
                      />
                    </template>
                  </v-card-text>
                </v-card>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      density="default"
                      size="large"
                      variant="flat"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
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
                      size="large"
                      type="submit"
                      :loading="isLoading"
                    >
                      {{ isLoading ? 'Processing...' : 'Next' }}
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
import { useDemoStore } from '@/store/demoStore';
import axios from 'axios';
import logoImage from '../assets/Logo1.png';
const router = useRouter();
const store = useDemoStore();

const formData = ref({
  isPEP: null,
  pepPosition: '',
  pepRelationship: '',
  pepName: '',
  pepCountry: ''
});

const formError = ref('');
const isLoading = ref(false);

const pepPositions = [
  'Head of State',
  'Senior Politician',
  'Senior Government Official',
  'Senior Judicial Official',
  'Senior Military Official',
  'Senior Executive of State-Owned Corporation',
  'High-Ranking Political Party Official',
  'Other'
];

const pepRelationships = [
  'Self',
  'Spouse',
  'Child',
  'Parent',
  'Sibling',
  'Close Associate'
];

const getBaseURL = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : `http://${window.location.hostname}:3000`;
};

const handleSubmit = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (formData.value.isPEP === null) {
      formError.value = 'Please indicate if you are a politically exposed person';
      return;
    }

    if (formData.value.isPEP === true) {
      if (!formData.value.pepPosition || !formData.value.pepRelationship || 
          !formData.value.pepName || !formData.value.pepCountry) {
        formError.value = 'Please fill in all required PEP details';
        return;
      }
    }

    // Make API call
    try {
      const baseURL = getBaseURL();
      await axios.post(`${baseURL}/politically-exposed-persons`, formData.value);
    } catch (apiError) {
      console.error('API error:', apiError);
      // Continue with state management even if API fails
    }

    // Update store with form data
    store.$patch((state) => {
      state.isPEP = formData.value.isPEP;
      state.pepPosition = formData.value.pepPosition;
      state.pepRelationship = formData.value.pepRelationship;
      state.pepName = formData.value.pepName;
      state.pepCountry = formData.value.pepCountry;
    });

    // Navigate to next page
    router.push('/politically-exposed-persons-2');
  } catch (error) {
    console.error('Error submitting PEP information:', error);
    formError.value = 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    state.isPEP = formData.value.isPEP;
    state.pepPosition = formData.value.pepPosition;
    state.pepRelationship = formData.value.pepRelationship;
    state.pepName = formData.value.pepName;
    state.pepCountry = formData.value.pepCountry;
  });
  router.go(-1);
};

// Initialize component with stored data
onMounted(() => {
  if (store) {
    formData.value.isPEP = store.isPEP;
    formData.value.pepPosition = store.pepPosition || '';
    formData.value.pepRelationship = store.pepRelationship || '';
    formData.value.pepName = store.pepName || '';
    formData.value.pepCountry = store.pepCountry || '';
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