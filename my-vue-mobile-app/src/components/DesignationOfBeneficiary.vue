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
                
                <h1 class="text-h1 font-weight-bold mb-2">Designation of Beneficiary</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Enter your beneficiary's details</p>
              </div>

              <!-- Beneficiary List -->
              <div v-if="beneficiaries.length > 0" class="mb-6">
                <h3 class="text-h6 mb-3">Added Beneficiaries</h3>
                <v-list>
                  <v-list-item
                    v-for="(beneficiary, index) in beneficiaries"
                    :key="index"
                    :title="`${beneficiary.first_name} ${beneficiary.last_name}`"
                    :subtitle="`${beneficiary.relationship_to_beneficiary} - ${beneficiary.percent_of_beneficiary_interest}%`"
                  >
                    <template v-slot:append>
                      <v-btn
                        icon="mdi-delete"
                        variant="text"
                        color="error"
                        @click="removeBeneficiary(index)"
                      />
                    </template>
                  </v-list-item>
                </v-list>
              </div>

              <v-form @submit.prevent="handleSubmitAndNext">
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
                    <!-- Personal Information -->
                    <v-text-field
                      v-model="formData.first_name"
                      label="First Name"
                      placeholder="Enter first name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'First name is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.last_name"
                      label="Last Name"
                      placeholder="Enter last name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      :rules="[v => !!v || 'Last name is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.middle_name"
                      label="Middle Name"
                      placeholder="Enter middle name (optional)"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                    />

                    <v-text-field
                      v-model="formData.address_line_1"
                      label="Address Line 1"
                      placeholder="Enter address line 1"
                      variant="outlined"
                      prepend-inner-icon="mdi-map-marker"
                      :rules="[v => !!v || 'Address line 1 is required']"
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

                    <v-text-field
                      v-model="formData.dob"
                      label="Date of Birth"
                      type="date"
                      variant="outlined"
                      prepend-inner-icon="mdi-calendar"
                      :rules="[v => !!v || 'Date of birth is required']"
                      required
                    />

                    <v-select
                      v-model="formData.gender"
                      label="Gender"
                      :items="['Male', 'Female']"
                      placeholder="Select gender"
                      variant="outlined"
                      prepend-inner-icon="mdi-gender-male-female"
                      :rules="[v => !!v || 'Gender is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.relationship_to_beneficiary"
                      label="Relationship to Beneficiary"
                      placeholder="Enter relationship"
                      variant="outlined"
                      prepend-inner-icon="mdi-account-group"
                      :rules="[v => !!v || 'Relationship is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.id_number"
                      label="ID Number"
                      placeholder="Enter ID number"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[
                        v => !!v || 'ID number is required',
                        v => /^[a-zA-Z0-9]{8,30}$/.test(v.replace(/[\s\-]/g, '')) || 'ID number must be between 8 and 30 characters and contain only letters and numbers'
                      ]"
                      required
                    />

                    <v-select
                      v-model="formData.id_type"
                      label="ID Type"
                      :items="['Passport', 'National ID', 'Drivers License']"
                      placeholder="Select ID type"
                      variant="outlined"
                      prepend-inner-icon="mdi-card-account-details"
                      :rules="[v => !!v || 'ID type is required']"
                      required
                    />

                    <v-text-field
                      v-model="formData.percent_of_beneficiary_interest"
                      label="Percentage of Beneficiary Interest"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="Enter percentage"
                      variant="outlined"
                      prepend-inner-icon="mdi-percent"
                      :rules="[
                        v => !!v || 'Percentage is required',
                        v => v >= 0 && v <= 100 || 'Percentage must be between 0 and 100'
                      ]"
                      required
                    />
                  </v-card-text>
                </v-card>

                <!-- Add Another or Skip Options - Moved Above -->
                <v-row class="mb-4">
                  <v-col cols="12" class="d-flex justify-space-between align-center">
                    <v-btn
                      v-if="beneficiaries.length > 0"
                      color="primary"
                      variant="text"
                      @click="addAnotherBeneficiary"
                      class="text-none"
                      prepend-icon="mdi-plus"
                    >
                      Add Another Beneficiary
                    </v-btn>
                    <v-btn
                      v-else
                      color="primary"
                      variant="text"
                      @click="handleSubmit"
                      class="text-none"
                      prepend-icon="mdi-plus"
                    >
                      Add Beneficiary
                    </v-btn>
                    <v-btn
                      color="grey-darken-1"
                      variant="text"
                      @click="skipBeneficiary"
                      class="text-none"
                    >
                      Skip Adding Beneficiary
                    </v-btn>
                  </v-col>
                </v-row>

                <!-- Navigation Buttons -->
                <v-row>
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
                      :disabled="isLoading"
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
          src="@src\assets\Logo1.png"
          alt="Cathedral Engage"
          class="brand-logo"
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


const router = useRouter();
const store = useDemoStore();
const formError = ref('');
const isLoading = ref(false);
const countryList = ref(Object.values(countries).map(country => country.name));
const beneficiaries = ref([]);

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
  relationship_to_beneficiary: '',
  id_number: '',
  id_type: '',
  percent_of_beneficiary_interest: 0
});



const handleFileUpload = (event) => {
  if (event && event.target && event.target.files && event.target.files.length > 0) {
    formData.value.idFile = event.target.files[0];
  }
};

const saveToStore = () => {
  store.setBeneficiaryInfo({
    ...formData.value,
    signup_id: store.signupId
  });
};

const validateBeneficiary = (beneficiary) => {
  const errors = [];

  // Required fields validation
  const requiredFields = {
    first_name: 'First name',
    last_name: 'Last name',
    address_line_1: 'Address line 1',
    city: 'City',
    country: 'Country',
    dob: 'Date of birth',
    gender: 'Gender',
    relationship_to_beneficiary: 'Relationship',
    id_number: 'ID number',
    id_type: 'ID type',
    percent_of_beneficiary_interest: 'Percentage'
  };

  for (const [field, label] of Object.entries(requiredFields)) {
    if (!beneficiary[field]) {
      errors.push(`${label} is required`);
    }
  }

  // ID number validation
  if (beneficiary.id_number) {
    const cleanedId = beneficiary.id_number.replace(/[\s\-]/g, '');
    if (!/^[a-zA-Z0-9]{8,30}$/.test(cleanedId)) {
      errors.push('ID number must be between 8 and 30 characters and contain only letters and numbers');
    }
  }

  // Gender validation
  if (beneficiary.gender && !['male', 'female'].includes(beneficiary.gender.toLowerCase())) {
    errors.push('Gender must be either Male or Female');
  }

  // ID type validation
  if (beneficiary.id_type && !['Passport', 'National ID', 'Drivers License'].includes(beneficiary.id_type)) {
    errors.push('ID type must be either Passport, National ID, or Drivers License');
  }

  // Percentage validation
  if (beneficiary.percent_of_beneficiary_interest) {
    const percentage = parseFloat(beneficiary.percent_of_beneficiary_interest);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      errors.push('Percentage must be between 0 and 100');
    }
  }

  return errors;
};

const handleSubmit = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Validate current beneficiary
    const validationErrors = validateBeneficiary(formData.value);
    if (validationErrors.length > 0) {
      formError.value = validationErrors.join(', ');
      isLoading.value = false;
      return;
    }

    // Validate total percentage
    const totalPercentage = beneficiaries.value.reduce((sum, b) => sum + parseFloat(b.percent_of_beneficiary_interest), 0) + 
                           parseFloat(formData.value.percent_of_beneficiary_interest);
    if (totalPercentage > 100) {
      formError.value = 'Total percentage of beneficiaries cannot exceed 100%';
      isLoading.value = false;
      return;
    }

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // Prepare data for API
    const beneficiaryData = {
      ...formData.value,
      signup_id: store.signupId,
      dob: new Date(formData.value.dob).toISOString().split('T')[0], // Format date as YYYY-MM-DD
      gender: formData.value.gender.toLowerCase(),
      percent_of_beneficiary_interest: parseFloat(formData.value.percent_of_beneficiary_interest)
    };

    // Make API call
    const response = await axios.post(`${baseURL}/beneficiaries/`, beneficiaryData);

    if (response.data) {
      // Add to beneficiaries list
      beneficiaries.value.push(response.data);

      // Store in Pinia store
      store.$patch((state) => {
        if (!state.beneficiaryInfo) {
          state.beneficiaryInfo = [];
        }
        state.beneficiaryInfo.push(response.data);
      });

      // Reset form
      resetForm();
    }
  } catch (error) {
    console.error('Error submitting beneficiary:', error);
    if (error.response) {
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

const resetForm = () => {
  formData.value = {
    signup_id: store.signupId,
    first_name: '',
    last_name: '',
    middle_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    country: '',
    dob: '',
    gender: '',
    relationship_to_beneficiary: '',
    id_number: '',
    id_type: '',
    percent_of_beneficiary_interest: 0
  };
};

const removeBeneficiary = (index) => {
  beneficiaries.value.splice(index, 1);
  // Update store
  store.$patch((state) => {
    if (state.beneficiaryInfo) {
      state.beneficiaryInfo.splice(index, 1);
    }
  });
};

const addAnotherBeneficiary = async () => {
  const currentTotal = beneficiaries.value.reduce(
    (sum, b) => sum + parseFloat(b.percent_of_beneficiary_interest),
    0
  );

  if (currentTotal >= 100) {
    formError.value = errorMessages.beneficiary.noMoreBeneficiaries;
    return;
  }

  const remainingPercentage = 100 - currentTotal;
  if (parseFloat(formData.value.percent_of_beneficiary_interest) > remainingPercentage) {
    formError.value = errorMessages.beneficiary.exceedsRemainingPercentage(remainingPercentage);
    return;
  }

  const success = await handleSubmit();
  if (success) {
    formError.value = '';
  }
};

const skipBeneficiary = () => {
  router.push('/power-of-attorney');
};

const navigateToPrevious = () => {
  saveToStore();
  router.push('/employment-information');
};

const handleSubmitAndNext = async () => {
  if (beneficiaries.value.length === 0) {
    // If no beneficiaries, try to add the current form data
    const validationErrors = validateBeneficiary(formData.value);
    if (validationErrors.length > 0) {
      formError.value = validationErrors.join(', ');
      return;
    }

    try {
      await handleSubmit();
      router.push('/power-of-attorney');
    } catch (error) {
      console.error('Error in handleSubmitAndNext:', error);
    }
  } else {
    // If there are already beneficiaries, just navigate
    router.push('/power-of-attorney');
  }
};

// Initialize component with existing data if available
onMounted(() => {
  // Set signup_id from store
  formData.value.signup_id = store.signupId;
  
  // Initialize with store data if available
  if (store.beneficiaryInfo && typeof store.beneficiaryInfo === 'object') {
    formData.value = {
      ...formData.value,
      first_name: store.beneficiaryInfo.firstName || '',
      last_name: store.beneficiaryInfo.lastName || '',
      middle_name: store.beneficiaryInfo.otherName || '',
      address_line_1: store.beneficiaryInfo.addressLine1 || '',
      address_line_2: store.beneficiaryInfo.addressLine2 || '',
      city: store.beneficiaryInfo.city || '',
      country: store.beneficiaryInfo.country || '',
      dob: store.beneficiaryInfo.dob || '',
      gender: store.beneficiaryInfo.gender || '',
      relationship_to_beneficiary: store.beneficiaryInfo.relationship || '',
      id_number: store.beneficiaryInfo.idNumber || '',
      id_type: store.beneficiaryInfo.idType || '',
      percent_of_beneficiary_interest: store.beneficiaryInfo.percentage || 0
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

:deep(.v-field) {
  border-radius: 8px !important;
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

.v-list-item {
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

.text-none {
  text-transform: none !important;
  letter-spacing: normal !important;
}

.error-text {
  color: #ff5252;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>