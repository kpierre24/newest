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
                <h1 class="text-h4 font-weight-bold text-primary mb-3">Basic Information</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please enter your personal details</p>
              </div>

              <v-form @submit.prevent="navigateToNext">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formError }}
                </v-alert>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="store.firstName"
                      label="First Name"
                      :rules="[v => !!v || 'First name is required']"
                      placeholder="Enter first name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="store.lastName"
                      label="Last Name"
                      :rules="[v => !!v || 'Last name is required']"
                      placeholder="Enter last name"
                      variant="outlined"
                      prepend-inner-icon="mdi-account"
                      required
                    />
                  </v-col>
                </v-row>

                <v-text-field
                  v-model="store.otherName"
                  label="Other Names"
                  placeholder="Enter other names (optional)"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-plus"
                />

                <v-text-field
                  v-model="store.email"
                  label="Email"
                  :rules="[
                    v => !!v || 'Email is required',
                    v => /.+@.+\..+/.test(v) || 'Email must be valid'
                  ]"
                  placeholder="Enter email address"
                  variant="outlined"
                  prepend-inner-icon="mdi-email"
                  required
                />

                <v-text-field
                  v-model="store.mobileNumber"
                  label="Mobile Number"
                  :rules="[
                    v => !!v || 'Mobile number is required',
                    v => /^\d{7,15}$/.test(v) || 'Please enter a valid mobile number'
                  ]"
                  placeholder="Enter mobile number"
                  variant="outlined"
                  prepend-inner-icon="mdi-phone"
                  required
                />

                <v-select
                  v-model="store.gender"
                  label="Gender"
                  :items="['Male', 'Female', 'Other']"
                  :rules="[v => !!v || 'Gender is required']"
                  variant="outlined"
                  prepend-inner-icon="mdi-gender-male-female"
                  required
                />

                <v-text-field
                  v-model="store.dob"
                  label="Date of Birth"
                  type="date"
                  :rules="[v => !!v || 'Date of birth is required']"
                  :error-messages="dobError"
                  variant="outlined"
                  prepend-inner-icon="mdi-calendar"
                  :max="today"
                  required
                  @input="validateDateOfBirth"
                />

                <v-text-field
                  v-model="store.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :rules="[v => !!v || 'Password is required']"
                  placeholder="Enter password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock"
                  :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showPassword = !showPassword"
                  required
                />

                <v-text-field
                  v-model="store.confirmPassword"
                  label="Confirm Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :rules="[
                    v => !!v || 'Password confirmation is required',
                    v => v === store.password || 'Passwords must match'
                  ]"
                  placeholder="Confirm password"
                  variant="outlined"
                  prepend-inner-icon="mdi-lock-check"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  required
                />

                <v-checkbox
                  v-model="store.termsViewed"
                  label="I agree to the Terms and Conditions"
                  :rules="[v => !!v || 'You must agree to continue']"
                  @click="handleTermsClick"
                />

                <v-checkbox
                  v-model="store.financialAgreementViewed"
                  label="I agree to the Financial Declaration"
                  :rules="[v => !!v || 'You must agree to continue']"
                  @click="handleFinancialClick"
                />

                <v-row class="mt-6">
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
        
      </v-col>
    </v-row>
  



    <!-- Terms Dialog -->
    <v-dialog
      v-model="showTerms"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Terms and Conditions
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeTerms"
            class="float-right"
          />
        </v-card-title>
        <v-card-text class="pa-4">
          <TermsAndConditions @close="closeTerms" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Financial Declaration Dialog -->
    <v-dialog
      v-model="showFinancialDeclaration"
      max-width="500"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Financial Declaration
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeFinancialDeclaration"
            class="float-right"
          />
        </v-card-title>
        <v-card-text class="pa-4">
          <FinancialDeclaration @close="closeFinancialDeclaration" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import TermsAndConditions from '@/components/TermsAndConditions.vue';
import FinancialDeclaration from '@/components/FinancialDeclaration.vue';
import logoImage from '../assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const showTerms = ref(false);
const showFinancialDeclaration = ref(false);
const dobError = ref('');
const formError = ref('');
const isLoading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const today = computed(() => {
  const date = new Date();
  return date.toISOString().split('T')[0];
});

const openTerms = () => {
  showTerms.value = true;
};

const closeTerms = () => {
  showTerms.value = false;
  store.termsViewed = true;
};

const openFinancialDeclaration = () => {
  showFinancialDeclaration.value = true;
};

const closeFinancialDeclaration = () => {
  showFinancialDeclaration.value = false;
  store.financialAgreementViewed = true;
};

const handleTermsClick = (event) => {
  event.preventDefault();
  openTerms();
};

const handleFinancialClick = (event) => {
  event.preventDefault();
  openFinancialDeclaration();
};

const validateDateOfBirth = () => {
  dobError.value = '';
  if (!store.dob) {
    dobError.value = 'Date of birth is required';
    return false;
  }
  const birthDate = new Date(store.dob);
  const today = new Date();
  if (birthDate > today) {
    dobError.value = 'Date of birth cannot be in the future';
    return false;
  }
  return true;
};

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const navigateToNext = async () => {
  isLoading.value = true;
  formError.value = '';
  
  try {
    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    const basicInfoData = {
      firstName: store.firstName,
      lastName: store.lastName,
      otherName: store.otherName,
      email: store.email,
      mobileNumber: store.mobileNumber,
      gender: store.gender,
      dob: store.dob,
      age: calculateAge(store.dob),
      password: store.password,
      confirmPassword: store.confirmPassword,
      termsViewed: store.termsViewed,
      financialAgreementViewed: store.financialAgreementViewed
    };

    await axios.post(`${baseURL}/basic-info`, basicInfoData);
    store.setBasicInfo(basicInfoData);
    router.push({ name: 'EmailVerification' });
  } catch (error) {
    console.error('Error submitting basic info:', error);
    formError.value = error.message || 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

const navigateToPrevious = () => {
  router.push('/getting-ready');
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

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}

.v-dialog {
  border-radius: 8px;
}

.v-card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.float-right {
  margin-left: auto;
}
</style>