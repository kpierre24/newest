<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="start">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-4">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
                
                <h1 class="text-h1 font-weight-bold mb-1">Power of Attorney</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter the Power of Attorney's details and upload required documents</p>
              </div>

              <v-form @submit.prevent="submitForm">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                  density="compact"
                >
                  {{ formError }}
                </v-alert>

                <!-- Attorney Information -->
                <v-card class="mb-4" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Power of Attorney Information</h3>
                    <v-text-field
                      v-model="formData.first_name"
                      label="First Name"
                      placeholder="Power of Attorney First Name"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'First name is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.middle_name"
                      label="Middle Name"
                      placeholder="Power of Attorney Middle Name"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'Middle name is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.last_name"
                      label="Last Name"
                      placeholder="Power of Attorney Last Name"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'Last name is required']"
                      required
                      class="mb-3"
                    />

                    <v-select
                      v-model="formData.gender"
                      label="Gender"
                      :items="['Male', 'Female']"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-gender-male-female"
                      :rules="[v => !!v || 'Gender is required']"
                      required
                      class="mb-3"
                    />

                    <v-select
                      v-model="formData.relationship_to_principal"
                      label="Relationship to Principal"
                      :items="relationshipOptions"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-account-group"
                      :rules="[v => !!v || 'Relationship to principal is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.dob"
                      label="Date of Birth"
                      type="date"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-calendar"
                      :min="minDate"
                      :max="maxDate"
                      :rules="[v => !!v || 'Date of birth is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.email"
                      label="Email"
                      type="email"
                      placeholder="Power of Attorney Email"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-email"
                      :rules="[v => !!v || 'Email is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.phone"
                      label="Phone Number"
                      type="tel"
                      placeholder="Power of Attorney Phone Number"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-phone"
                      :rules="[v => !!v || 'Phone number is required']"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- Attorney Address -->
                <v-card class="mb-4" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Power of Attorney Address</h3>
                    <v-text-field
                      v-model="formData.address_line_1"
                      label="Address Line 1"
                      placeholder="Street address"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[v => !!v || 'Address is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.address_line_2"
                      label="Address Line 2"
                      placeholder="Apt, Suite, Unit, etc. (optional)"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-map-marker-plus"
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.city"
                      label="City"
                      placeholder="City"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-city"
                      :rules="[v => !!v || 'City is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.country"
                      label="Country"
                      placeholder="Country"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-earth"
                      :rules="[v => !!v || 'Country is required']"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- Attorney ID -->
                <v-card class="mb-4" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Power of Attorney Identification</h3>
                    <v-select
                      v-model="formData.id_type"
                      label="Type of ID"
                      :items="idTypes"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                      class="mb-3"
                    />

                    <v-text-field
                      v-model="formData.id_number"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-identifier"
                      :rules="[v => !!v || 'ID number is required']"
                      required
                      class="mb-3"
                    />
                  </v-card-text>
                </v-card>

                <!-- Document Upload -->
                <v-card class="mb-6" elevation="3">
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 mb-3">Document Upload</h3>
                    <v-file-input
                      v-model="formData.id_document"
                      label="Upload ID Document"
                      placeholder="Upload ID"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'ID document is required']"
                      @change="handleFileUpload"
                      required
                      truncate-length="25"
                      hint="Please upload a clear copy of the ID"
                      persistent-hint
                    />

                    <v-file-input
                      v-model="formData.power_of_attorney_document"
                      label="Power of Attorney Document"
                      placeholder="Upload Document"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-upload"
                      accept=".pdf,.jpg,.png"
                      :rules="[v => !!v || 'Document is required']"
                      @change="handleFileUpload"
                      required
                      truncate-length="25"
                      hint="Please upload a signed copy of the Power of Attorney"
                      persistent-hint
                    />
                  </v-card-text>
                </v-card>

                <!-- Navigation Buttons -->
                <v-row class="mt-4">
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      variant="flat"
                      size="large"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
                      height="44"
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
                      height="44"
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
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();

// Add computed properties for date validation
const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100); // Allow dates up to 100 years ago
  return date.toISOString().split('T')[0];
});

const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18); // Must be at least 18 years old
  return date.toISOString().split('T')[0];
});

const formData = ref({
  signup_id: null,
  first_name: '',
  last_name: '',
  middle_name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  dob: '',
  gender: '',
  relationship_to_principal: '',
  email: '',
  phone: '',
  id_number: '',
  id_type: '',
  id_document: null,
  power_of_attorney_document: null
});

const formError = ref('');
const isLoading = ref(false);

const idTypes = [
  'National ID',
  'Passport',
  'Driver\'s License',
  'Other Government ID'
];

const relationshipOptions = [
  'Spouse',
  'Child',
  'Parent',
  'Sibling',
  'Friend',
  'Other'
];

const handleFileUpload = (event) => {
  const files = event?.target?.files || event;
  if (Array.isArray(files)) {
    // Handle multiple files if needed
    console.log('Multiple files uploaded:', files);
  } else if (files instanceof File) {
    // Single file upload
    console.log('Single file uploaded:', files);
  }
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Debug log to see what's in the form data
    console.log('Form data before validation:', formData.value);

    // Validate required fields
    const requiredFields = {
      first_name: 'First name',
      last_name: 'Last name',
      middle_name: 'Middle name',
      address_line_1: 'Address line 1',
      city: 'City',
      country: 'Country',
      dob: 'Date of birth',
      gender: 'Gender',
      relationship_to_principal: 'Relationship to principal',
      email: 'Email',
      phone: 'Phone number',
      id_number: 'ID number',
      id_type: 'ID type',
      id_document: 'ID document',
      power_of_attorney_document: 'Power of Attorney document'
    };

    const missingFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData.value[field]) {
        missingFields.push(label);
      }
    }

    if (missingFields.length > 0) {
      formError.value = `Please fill in the following required fields: ${missingFields.join(', ')}`;
      console.log('Missing fields:', missingFields);
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

    // Validate phone number
    if (!/^\+?1?\d{9,15}$/.test(formData.value.phone.replace(/[\s\-]/g, ''))) {
      formError.value = 'Please enter a valid phone number';
      isLoading.value = false;
      return;
    }

    // Validate file sizes
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/', 'application/pdf'];
    
    // Check ID document
    if (formData.value.id_document instanceof File) {
      if (formData.value.id_document.size > maxFileSize) {
        formError.value = 'ID document must be less than 10MB';
        isLoading.value = false;
        return;
      }
      if (!allowedTypes.some(type => formData.value.id_document.type.startsWith(type))) {
        formError.value = 'ID document must be an image or PDF';
        isLoading.value = false;
        return;
      }
    }

    // Check Power of Attorney document
    if (formData.value.power_of_attorney_document instanceof File) {
      if (formData.value.power_of_attorney_document.size > maxFileSize) {
        formError.value = 'Power of Attorney document must be less than 10MB';
        isLoading.value = false;
        return;
      }
      if (!allowedTypes.some(type => formData.value.power_of_attorney_document.type.startsWith(type))) {
        formError.value = 'Power of Attorney document must be an image or PDF';
        isLoading.value = false;
        return;
      }
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    // Create FormData for submission
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('signup_id', store.signupId);
    formDataToSubmit.append('first_name', formData.value.first_name);
    formDataToSubmit.append('last_name', formData.value.last_name);
    formDataToSubmit.append('middle_name', formData.value.middle_name);
    formDataToSubmit.append('address_line_1', formData.value.address_line_1);
    formDataToSubmit.append('address_line_2', formData.value.address_line_2 || '');
    formDataToSubmit.append('city', formData.value.city);
    formDataToSubmit.append('country', formData.value.country);
    formDataToSubmit.append('dob', formData.value.dob);
    formDataToSubmit.append('gender', formData.value.gender.toLowerCase());
    formDataToSubmit.append('relationship_to_principal', formData.value.relationship_to_principal);
    formDataToSubmit.append('email', formData.value.email);
    formDataToSubmit.append('phone', formData.value.phone.replace(/[\s\-]/g, ''));
    formDataToSubmit.append('id_number', formData.value.id_number);
    formDataToSubmit.append('id_type', formData.value.id_type);
    
    // Append files separately
    if (formData.value.id_document instanceof File) {
      formDataToSubmit.append('power_of_attorney_files', formData.value.id_document);
    }
    if (formData.value.power_of_attorney_document instanceof File) {
      formDataToSubmit.append('power_of_attorney_files', formData.value.power_of_attorney_document);
    }

    console.log('Submitting power of attorney data:', Object.fromEntries(formDataToSubmit));

    const response = await axios.post(`${baseURL}/power-of-attorneys/`, formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Power of attorney data submitted successfully:', response.data);

    // Save to store
    store.$patch((state) => {
      state.poaInfo = {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        middle_name: formData.value.middle_name,
        address_line_1: formData.value.address_line_1,
        address_line_2: formData.value.address_line_2,
        city: formData.value.city,
        country: formData.value.country,
        dob: formData.value.dob,
        gender: formData.value.gender,
        relationship_to_principal: formData.value.relationship_to_principal,
        email: formData.value.email,
        phone: formData.value.phone,
        id_number: formData.value.id_number,
        id_type: formData.value.id_type,
        id_document: formData.value.power_of_attorney_files,
        power_of_attorney_document: formData.value.power_of_attorney_files
      };
    });

    router.push('/branch');
  } catch (error) {
    console.error('Error submitting power of attorney information:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      formError.value = Array.isArray(error.response.data) 
        ? error.response.data.map(err => err.msg).join(', ')
        : error.response.data.detail || errorMessages.submission.server;
    } else if (error.request) {
      formError.value = errorMessages.network.connection;
    } else {
      formError.value = errorMessages.submission.general;
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    state.poaInfo = {
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      middle_name: formData.value.middle_name,
      address_line_1: formData.value.address_line_1,
      address_line_2: formData.value.address_line_2,
      city: formData.value.city,
      country: formData.value.country,
      dob: formData.value.dob,
      gender: formData.value.gender,
      relationship_to_principal: formData.value.relationship_to_principal,
      email: formData.value.email,
      phone: formData.value.phone,
      id_number: formData.value.id_number,
      id_type: formData.value.id_type,
      id_document: formData.value.power_of_attorney_files,
      power_of_attorney_document: formData.value.power_of_attorney_files
    };
  });
  router.go(-1);
};

// Initialize component with stored data
onMounted(() => {
  console.log('Initializing component with store data:', store.poaInfo);
  if (store.poaInfo) {
    formData.value = {
      signup_id: store.signupId,
      first_name: store.poaInfo.first_name,
      last_name: store.poaInfo.last_name,
      middle_name: store.poaInfo.middle_name,
      address_line_1: store.poaInfo.address_line_1,
      address_line_2: store.poaInfo.address_line_2,
      city: store.poaInfo.city,
      country: store.poaInfo.country,
      dob: store.poaInfo.dob,
      gender: store.poaInfo.gender,
      relationship_to_principal: store.poaInfo.relationship_to_principal,
      email: store.poaInfo.email,
      phone: store.poaInfo.phone,
      id_number: store.poaInfo.id_number,
      id_type: store.poaInfo.id_type,
      id_document: store.poaInfo.power_of_attorney_files,
      power_of_attorney_document: store.poaInfo.power_of_attorney_files
    };
  }
});
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  height: 100vh;
  overflow-y: auto;
}

.form-container {
  max-width: 100%;
  padding: 2rem 1.5rem;
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

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .form-section {
    height: calc(100vh - 60px);
  }

  :deep(.v-card-text) {
    padding: 16px !important;
  }
}
</style>