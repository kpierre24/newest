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
                  src="@/assets/Logo1.png"
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
                      v-model="formData.ParentFirstName"
                      label="First Name"
                      placeholder="Parent First Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.ParentMiddleName"
                      label="Middle Name"
                      placeholder="Parent Middle Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                    />

                    <v-text-field
                      v-model="formData.ParentLastName"
                      label="Last Name"
                      placeholder="Parent Last Name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />

                    <v-text-field
                      v-model="formData.ParentOccupation"
                      label="Occupation"
                      placeholder="Parent Occupation"
                      variant="outlined"
                      prepend-inner-icon="mdi-briefcase"
                      required
                    />

                    <v-text-field
                      v-model="formData.ParentWorkplace"
                      label="Workplace"
                      placeholder="Parent Workplace"
                      variant="outlined"
                      prepend-inner-icon="mdi-domain"
                      required
                    />

                    <v-text-field
                      v-model="formData.ParentEmail"
                      label="Email"
                      type="email"
                      placeholder="Parent Email"
                      variant="outlined"
                      prepend-inner-icon="mdi-email"
                      required
                    />

                    <v-text-field
                      v-model="formData.ParentPhoneNumber"
                      label="Phone Number"
                      type="tel"
                      placeholder="Parent Phone Number"
                      variant="outlined"
                      prepend-inner-icon="mdi-phone"
                      required
                    />

                    <v-select
                      v-model="formData.RelationshipToChild"
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
                      variant="elevated"
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
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';

const router = useRouter();
const store = useDemoStore();

// Form data refs
const formData = ref({
  ParentFirstName: '',
  ParentMiddleName: '',
  ParentLastName: '',
  ParentOccupation: '',
  ParentWorkplace: '',
  ParentEmail: '',
  ParentPhoneNumber: '',
  RelationshipToChild: '',
  RelationshipDocument: null
});

const formError = ref('');
const isLoading = ref(false);

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
    if (!formData.value.ParentFirstName || !formData.value.ParentLastName || 
        !formData.value.ParentOccupation || !formData.value.ParentWorkplace || 
        !formData.value.ParentEmail || !formData.value.ParentPhoneNumber || 
        !formData.value.RelationshipToChild) {
      formError.value = 'Please fill in all required fields';
      isLoading.value = false;
      return;
    }

    // Get the base URL dynamically
    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    try {
      await axios.post(`${baseURL}/parent-guardian-info`, formData.value);
    } catch (apiError) {
      console.error('API error:', apiError);
    }

    // Update store with form data (excluding the file)
    const storeData = { ...formData.value };
    delete storeData.RelationshipDocument;
    store.$patch((state) => {
      Object.assign(state, storeData);
    });

    router.push('/id-information');
  } catch (error) {
    console.error('Error details:', error);
    formError.value = 'An error occurred while saving your information.';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/politically-exposed-persons-2');
};

// Initialize component
onMounted(() => {
  if (store) {
    Object.keys(formData.value).forEach(key => {
      if (key !== 'RelationshipDocument') {
        formData.value[key] = store[key] || '';
      }
    });
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

.brand-section {
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  min-height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.brand-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.brand-logo {
  width: 240px;
  height: auto;
  z-index: 2;
  filter: brightness(1.2);
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