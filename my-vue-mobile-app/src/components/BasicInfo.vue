<template>
  <div class="container">
    <section class="form-section">
      <div class="content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        <div class="brand-text">
          <h1>Basic Information</h1>
          <p>Enter your personal information</p>
        </div>
        <form @submit.prevent="navigateToNext">
          <div v-if="formError" class="error-message">{{ formError }}</div>
          <div class="form-row">
            <FormInput
              type="text"
              id="firstName"
              placeholder="First Name"
              v-model="store.firstName"
              :maxlength="50"
              :required="true"
              iconClass="icon fas fa-user"
            />
            <FormInput
              type="text"
              id="lastName"
              placeholder="Last Name"
              v-model="store.lastName"
              :maxlength="50"
              :required="true"
              iconClass="icon fas fa-user"
            />
          </div>
          <FormInput
            type="text"
            id="otherName"
            placeholder="Other Name"
            v-model="store.otherName"
            :maxlength="50"
            iconClass="icon fas fa-user"
          />
          <FormInput
            type="email"
            id="email"
            placeholder="Email Address"
            v-model="store.email"
            :maxlength="50"
            :required="true"
            iconClass="icon fas fa-envelope"
          />
          <FormInput
            type="tel"
            id="mobileNumber"
            placeholder="Mobile Number"
            v-model="store.mobileNumber"
            :maxlength="15"
            :required="true"
            iconClass="icon fas fa-phone"
          />
          <FormInput
            type="select"
            id="gender"
            v-model="store.gender"
            :required="true"
            iconClass="icon fas fa-venus-mars"
            :selectOptions="['male', 'female']"
          />
          <FormInput
            type="date"
            id="dob"
            v-model="store.dob"
            :required="true"
            :max="today"
            :error="dobError"
            @validation="validateDateOfBirth"
            iconClass="icon fas fa-calendar-alt"
          />
          <FormInput
            type="password"
            id="password"
            placeholder="Password"
            v-model="store.password"
            :maxlength="50"
            :required="true"
            iconClass="icon fas fa-lock"
          />
          <FormInput
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            v-model="store.confirmPassword"
            :maxlength="50"
            :required="true"
            iconClass="icon fas fa-lock"
          />
          <div class="checkbox-container">
            <input type="checkbox" v-model="store.termsViewed" id="termsViewed" />
            <a href="#" @click.prevent="openTerms">Terms and Conditions</a>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" v-model="store.financialAgreementViewed" id="financialAgreementViewed" />
            <a href="#" @click.prevent="openFinancialDeclaration">Financial Declaration Agreement</a>
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="next-button" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin"></i> Processing...
              </span>
              <span v-else>Next</span>
            </button>
          </div>
        </form>
      </div>
    </section>
    <section class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </section>

    <TermsAndConditions :visible="showTerms" @close="closeTerms" />
    <FinancialDeclaration :visible="showFinancialDeclaration" @close="closeFinancialDeclaration" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import FormInput from '@/props/FormInput.vue';
import TermsAndConditions from '@/components/TermsAndConditions.vue';
import FinancialDeclaration from '@/components/FinancialDeclaration.vue';
import { useDateValidation } from '@/composables/useDateValidation';

export default {
  name: 'BasicInfo',
  components: {
    FormInput,
    TermsAndConditions,
    FinancialDeclaration
  },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const showTerms = ref(false);
    const showFinancialDeclaration = ref(false);
    const dobError = ref('');
    const formError = ref('');
    const isLoading = ref(false);
    
    // Get today's date for max date attribute
    const today = computed(() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    });

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

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

    // Promise-based form validation
    const validateForm = () => {
      return new Promise((resolve, reject) => {
        formError.value = '';
        
        if (!store.firstName || !store.lastName || !store.email || !store.mobileNumber || 
            !store.gender || !store.dob || !store.password || !store.confirmPassword || 
            !store.termsViewed || !store.financialAgreementViewed) {
          reject(new Error('Please fill all required fields and agree to the terms.'));
        return;
      }

      if (store.password !== store.confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }

        // Validate date of birth
        if (!validateDateOfBirth()) {
          reject(new Error(dobError.value));
          return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(store.email)) {
          reject(new Error('Please enter a valid email address'));
          return;
        }

        // Validate mobile number (simple validation)
        if (!/^\d{7,15}$/.test(store.mobileNumber)) {
          reject(new Error('Please enter a valid mobile number'));
        return;
      }

        resolve({
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
        });
      });
    };

    const navigateToNext = async () => {
      isLoading.value = true;
      formError.value = '';
      
      try {
        // Validate form using Promise-based validation
        const basicInfoData = await validateForm();

        // Submit to API
        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/basic-info`, basicInfoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Basic info submitted:', response.data);

        // Update store
        store.setBasicInfo(basicInfoData);

        // Navigate to email verification page
        router.push({ name: 'EmailVerification' });
      } catch (error) {
        console.error('Error submitting basic info:', error);

        if (error.message) {
          formError.value = error.message;
      } else {
          formError.value = 'An error occurred while submitting your information';
          
          // Continue with navigation even if API fails
          setTimeout(() => {
            router.push({ name: 'EmailVerification' });
          }, 2000);
        }
      } finally {
        isLoading.value = false;
      }
    };

    const navigateToPrevious = () => {
      router.push('/getting-ready');
    };

    return {
      store,
      showTerms,
      showFinancialDeclaration,
      openTerms,
      closeTerms,
      openFinancialDeclaration,
      closeFinancialDeclaration,
      navigateToNext,
      navigateToPrevious,
      dobError,
      formError,
      isLoading,
      today,
      validateDateOfBirth
    };
  }
};
</script>

<style scoped>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-section {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  margin-bottom: 1.5rem;
}

.brand-text {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: 24px;
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.brand-text p {
  color: #666;
  font-size: 14px;
}

form {
  width: 100%;
}

.form-row {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-bottom: 0.75rem;
}

.form-row :deep(.form-input-container) {
  flex: 1;
  margin-bottom: 0;
}

/* Form styles */
:deep(.form-input-container) {
  margin-bottom: 0.75rem;
  width: 100%;
}

:deep(input) 
 {
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}
:deep(select) {
  width: 100%;
  height: 2.7rem;
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}

:deep(input:focus), 
:deep(select:focus) {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 98, 248, 0.1);
}

.checkbox-container {
  width: 100%;
  margin: 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-container a {
  color: #6362F8;
  text-decoration: none;
  font-size: 14px;
}

.checkbox-container a:hover {
  text-decoration: underline;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
}

.back-button,
.next-button {
  flex: 1;
  height: 2.5rem;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
  border: none;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
  border: none;
}

.error-message {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  font-size: 14px;
}

/* Mobile specific styles */
@media (max-width: 767px) {
  .form-section {
    padding: 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 0.75rem;
  }

  .button-group {
    flex-direction: column;
  }

  .content {
    padding: 0;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  .form-section {
    width: 50%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    overflow-y: auto;
  }

  .content {
    max-width: 450px;
    padding: 2rem;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
  }

  .brand-section {
    display: block;
    position: relative;
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
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

  .form-row {
    margin-bottom: 1rem;
  }

  :deep(.form-input-container) {
    margin-bottom: 1rem;
  }

  .button-group {
    margin-top: 2rem;
  }
}
</style>