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
                
                <h1 class="text-h1 font-weight-bold mb-2">Employment/Source of Funds Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide your employment details</p>
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

                <v-card class="mb-6" variant="outlined">
                  <v-card-text>
                    <v-text-field
                      v-model="formData.employer_name"
                      label="Employer Name"
                      placeholder="Enter employer name"
                      variant="outlined"
                      prepend-inner-icon="mdi-domain"
                      :rules="[v => !!v || 'Employer name is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.occupation"
                      label="Occupation"
                      placeholder="Enter your occupation"
                      variant="outlined"
                      prepend-inner-icon="mdi-briefcase"
                      :rules="[v => !!v || 'Occupation is required']"
                      required
                    />
                  <v-text-field
                    v-model=formData.work_phone
                    label="Work Phone Number"
                    placeholder="Enter work phone number"
                    variant="outlined"
                    prepend-inner-icon="mdi-phone"
                    :rules="[v => !!v || 'Work phone number is required']"
                    required
                  />
                    <v-text-field
                      v-model="formData.address_line_1"
                      label="Address Line 1"
                      placeholder="Enter address line 1"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[v => !!v || 'Address is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.address_line_2"
                      label="Address Line 2"
                      placeholder="Enter address line 2 (optional)"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                    />

                    <v-text-field
                      v-model="formData.city"
                      label="City"
                      placeholder="Enter city"
                      variant="outlined"
                      prepend-inner-icon="mdi-city"
                      :rules="[v => !!v || 'City is required']"
                      required
                    />

                    <v-select
                      v-model="formData.country"
                      label="Country"
                      :items="countryList"
                      placeholder="Select country"
                      variant="outlined"
                      prepend-inner-icon="mdi-earth"
                      :rules="[v => !!v || 'Country is required']"
                      required
                    />

                    <v-select
                      v-model="formData.employment_status"
                      label="Employment Status"
                      :items="['Employed', 'Self-Employed', 'Unemployed', 'Student', 'Retired']"
                      placeholder="Select employment status"
                      variant="outlined"
                      prepend-inner-icon="mdi-briefcase"
                      :rules="[v => !!v || 'Employment status is required']"
                      required
                    />

                    <v-select
                      v-model="formData.employment_type"
                      label="Employment Type"
                      :items="['Full-Time', 'Part-Time', 'Contract', 'Temporary']"
                      placeholder="Select employment type"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-tie"
                      :rules="[v => formData.employment_status === 'Unemployed' || !!v || 'Employment type is required']"
                      :disabled="formData.employment_status === 'Unemployed'"
                      required
                    />

                    <v-file-input
                      v-model="formData.proof_of_employment_files"
                      label="Proof of Employment/Source of funds"
                      accept=".pdf,.jpg,.png"
                      placeholder="Upload proof of employment/source of funds"
                      variant="outlined"
                      prepend-icon="mdi-upload"
                      :rules="[v => formData.employment_status === 'Unemployed' || !!v || 'Proof of employment/source of funds is required']"
                      @change="handleFileUpload"
                      multiple
                      show-size
                      counter
                      required
                    >
                      <template v-slot:selection="{ fileNames }">
                        <template v-for="fileName in fileNames" :key="fileName">
                          <v-chip
                            size="small"
                            label
                            color="primary"
                            class="me-2"
                          >
                            {{ fileName }}
                          </v-chip>
                        </template>
                      </template>
                    </v-file-input>

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
                          {{ isLoading ? 'Processing...' : 'Next' }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
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
import { countries } from 'countries-list';
import logoImage from '@/assets/Logo1.png';
import { errorMessages } from '@/utils/errorMessages';
import { handleError, AppError, errorTypes } from '@/utils/errorHandler';


const router = useRouter();
const store = useDemoStore();
const isLoading = ref(false);
const formError = ref('');
const countryList = ref(Object.values(countries).map(country => country.name));

const formData = ref({
  signup_id: null,
  employer_name: '',
  occupation: '',
  work_phone: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  country: '',
  employment_status: '',
  employment_type: '',
  proof_of_employment_files: []
});

// UI state
const handleFileUpload = (event) => {
  const files = event?.target?.files || event;
  if (Array.isArray(files)) {
    formData.value.proof_of_employment_files = files;
  } else if (files instanceof File) {
    formData.value.proof_of_employment_files = [files];
  }
};

const submitForm = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate required fields
    if (!formData.value.employer_name || !formData.value.occupation || 
        !formData.value.address_line_1 || !formData.value.city || 
        !formData.value.country || !formData.value.employment_status) {
      formError.value = errorMessages.employment.requiredFields;
      isLoading.value = false;
      return;
    }

    // Validate employment status
    const validEmploymentStatuses = ['employed', 'self-employed', 'unemployed', 'student', 'retired'];
    if (!validEmploymentStatuses.includes(formData.value.employment_status.toLowerCase())) {
      formError.value = 'Invalid employment status';
      isLoading.value = false;
      return;
    }

    // Validate employment type if not unemployed
    if (formData.value.employment_status.toLowerCase() !== 'unemployed') {
      const validEmploymentTypes = ['full-time', 'part-time', 'contract', 'temporary'];
      if (!formData.value.employment_type || !validEmploymentTypes.includes(formData.value.employment_type.toLowerCase())) {
        formError.value = 'Invalid employment type';
        isLoading.value = false;
        return;
      }

      // Validate files for non-unemployed status
      if (!formData.value.proof_of_employment_files.length) {
        formError.value = 'Proof of employment files are required';
        isLoading.value = false;
        return;
      }

      // Validate file types and sizes
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/', 'application/pdf'];
      
      for (const file of formData.value.proof_of_employment_files) {
        if (file.size > maxFileSize) {
          formError.value = 'Each file must be less than 10MB';
          isLoading.value = false;
          return;
        }
        
        if (!allowedTypes.some(type => file.type.startsWith(type))) {
          formError.value = 'File must be an image or PDF document';
          isLoading.value = false;
          return;
        }
      }
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('signup_id', store.signupId);
    formDataToSubmit.append('employer_name', formData.value.employer_name);
    formDataToSubmit.append('occupation', formData.value.occupation);
    formDataToSubmit.append('work_phone', formData.value.work_phone);
    formDataToSubmit.append('address_line_1', formData.value.address_line_1);
    formDataToSubmit.append('address_line_2', formData.value.address_line_2 || '');
    formDataToSubmit.append('city', formData.value.city);
    formDataToSubmit.append('country', formData.value.country);
    formDataToSubmit.append('employment_status', formData.value.employment_status.toLowerCase());
    formDataToSubmit.append('employment_type', formData.value.employment_status.toLowerCase() === 'unemployed' ? null : formData.value.employment_type.toLowerCase());
    
    // Append files if not unemployed
    if (formData.value.employment_status.toLowerCase() !== 'unemployed') {
      formData.value.proof_of_employment_files.forEach(file => {
        formDataToSubmit.append('proof_of_employment_files', file);
      });
    }

    console.log('Submitting employment information:', Object.fromEntries(formDataToSubmit));

    const response = await axios.post(`${baseURL}/employments/`, formDataToSubmit, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log('Employment information submitted successfully:', response.data);

    // Save to store (excluding files)
    store.$patch((state) => {
      state.employmentInfo = {
        employer_name: formData.value.employer_name,
        occupation: formData.value.occupation,
        work_phone: formData.value.work_phone,
        address_line_1: formData.value.address_line_1,
        address_line_2: formData.value.address_line_2,
        city: formData.value.city,
        country: formData.value.country,
        employment_status: formData.value.employment_status,
        employment_type: formData.value.employment_type,
        proof_of_employment_files: formData.value.proof_of_employment_files
      };
    });

    router.push('/designation-of-beneficiary');
  } catch (error) {
    console.error('Error submitting employment information:', error);
    if (error.response && error.response.status !== 200) {
      formError.value = error.response.data.detail || 'An unexpected error occurred';
    } else {
      formError.value = 'An unexpected error occurred';
    }
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    state.employmentInfo = {
      employer_name: formData.value.employer_name,
      work_phone: formData.value.work_phone,
      occupation: formData.value.occupation,
      address_line_1: formData.value.address_line_1,
      address_line_2: formData.value.address_line_2,
      city: formData.value.city,
      country: formData.value.country,
      employment_status: formData.value.employment_status,
      employment_type: formData.value.employment_type,
      proof_of_employment_files: formData.value.proof_of_employment_files
    };
  });
  router.go(-1);
};

// Initialize component with stored data
onMounted(() => {
  console.log('Initializing component with store data:', store.employmentInfo);
  if (store.employmentInfo) {
    formData.value = {
      signup_id: store.signupId,
      employer_name: store.employmentInfo.employer_name,
      work_phone: store.employmentInfo.work_phone,
      occupation: store.employmentInfo.occupation,
      address_line_1: store.employmentInfo.address_line_1,
      address_line_2: store.employmentInfo.address_line_2,
      city: store.employmentInfo.city,
      country: store.employmentInfo.country,
      employment_status: store.employmentInfo.employment_status,
      employment_type: store.employmentInfo.employment_type,
      proof_of_employment_files: store.employmentInfo.proof_of_employment_files
    };
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