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
                
                <h1 class="text-h1 font-weight-bold mb-2">Parent/Guardian Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter the parent or guardian's details</p>
              </div>

              <v-form @submit.prevent="submitForm">
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
                    <v-text-field
                      v-model="formData.first_name"
                      label="First Name"
                      placeholder="Parent First Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.middle_name"
                      label="Middle Name"
                      placeholder="Parent Middle Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.last_name"
                      label="Last Name"
                      placeholder="Parent Last Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.occupation"
                      label="Occupation"
                      placeholder="Parent Occupation"
                      variant="outlined"
                      prepend-inner-icon="mdi-briefcase"
                      required
                    />

                    <v-text-field
                      v-model="formData.workplace"
                      label="Workplace"
                      placeholder="Parent Workplace"
                      variant="outlined"
                      prepend-inner-icon="mdi-domain"
                      required
                    />

                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      type="email"
                      placeholder="Parent Email"
                      variant="outlined"
                      prepend-inner-icon="mdi-email"
                      required
                    />

                    <v-text-field
                      v-model="formData.mobile"
                      label="Phone Number"
                      type="tel"
                      placeholder="Parent Phone Number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                      required
                    />

                    <v-select
                      v-model="formData.relationship_to_child"
                      label="Relationship to Child"
                      :items="relationshipOptions"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-child"
                      required
                    />

                    <v-file-input
                      v-model="formData.RelationshipDocument"
                      label="Relationship Document"
                      placeholder="Upload document"
                      variant="outlined"
                      prepend-inner-icon="mdi-file-upload"
                      accept=".pdf,.jpg,.png"
                      @change="handleFileUpload"
                    />
                  </v-card-text>
                </v-card>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      variant="flat"
                      size="large"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
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
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const formError = ref('');
const isLoading = ref(false);

const formData = ref({
  first_name: '',
  last_name: '',
  middle_name: '',
  occupation: '',
  workplace: '',
  email: '',
  mobile: '',
  relationship_to_child: ''
});

const relationshipOptions = [
  'Mother',
  'Father',
  'Grandparent',
  'Related Guardian',
  'Unrelated Guardian'
];

const handleFileUpload = (file) => {
  formData.value.RelationshipDocument = file;
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!formData.value.first_name || !formData.value.last_name || 
        !formData.value.middle_name || !formData.value.occupation || 
        !formData.value.workplace || !formData.value.email || 
        !formData.value.mobile || !formData.value.relationship_to_child) {
      formError.value = 'Please fill in all required fields';
      isLoading.value = false;
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.value.email)) {
      formError.value = 'Please enter a valid email address';
      isLoading.value = false;
      return;
    }

    // Validate signup_id exists
    if (!store.signupId) {
      formError.value = 'Invalid session. Please start over.';
      isLoading.value = false;
      return;
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // Prepare the request data with explicit signup_id
    const guardianData = {
      signup_id: store.signupId,
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      middle_name: formData.value.middle_name,
      occupation: formData.value.occupation,
      workplace: formData.value.workplace,
      email: formData.value.email,
      mobile: formData.value.mobile,
      relationship_to_child: formData.value.relationship_to_child
    };

    console.log('Submitting guardian data:', guardianData); // Debug log

    // Make the API call
    const response = await axios.post(`${baseURL}/guardian-information/`, guardianData);

    // Store the data
    store.$patch({
      guardianInfo: {
        firstName: formData.value.first_name,
        lastName: formData.value.last_name,
        middleName: formData.value.middle_name,
        occupation: formData.value.occupation,
        workplace: formData.value.workplace,
        email: formData.value.email,
        mobile: formData.value.mobile,
        relationshipToChild: formData.value.relationship_to_child
      }
    });

    // Navigate to next page
    router.push('/address');
  } catch (error) {
    console.error('Error submitting guardian information:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      formError.value = Array.isArray(error.response.data) 
        ? error.response.data.map(err => err.msg).join(', ')
        : error.response.data.detail || 'An error occurred while submitting your information';
    } else {
      formError.value = 'An error occurred while submitting your information';
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/child-id-information');
};

// Initialize component with existing data if available
onMounted(() => {
  if (store.guardianInfo) {
    formData.value = {
      first_name: store.guardianInfo.firstName || '',
      last_name: store.guardianInfo.lastName || '',
      middle_name: store.guardianInfo.middleName || '',
      occupation: store.guardianInfo.occupation || '',
      workplace: store.guardianInfo.workplace || '',
      email: store.guardianInfo.email || '',
      mobile: store.guardianInfo.mobile || '',
      relationship_to_child: store.guardianInfo.relationshipToChild || ''
    };
  }
});
</script>

<style scoped>


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