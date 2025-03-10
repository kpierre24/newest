<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="content">
      <h1>Basic Information</h1>
        <h4 class="subheading">Enter your personal information</h4>
        <form @submit.prevent="navigateToNext">
          <div v-if="formError" class="error-message">{{ formError }}</div>
        <div class="input-group">
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
          </div>
        </form>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="login-section">
      <div class="login-content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="engage-logo" />
        <div class="brand-text">
          <h1>Basic Information</h1>
          <p>Enter your personal information</p>
        </div>
        <form @submit.prevent="navigateToNext" class="desktop-form">
          <div v-if="formError" class="error-message">{{ formError }}</div>
          <div class="input-group">
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
        </div>
      </form>
    </div>
    </div>
    <div class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </div>

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
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  width: 100%;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

/* Mobile View */
.mobile-view {
  display: none;
}

/* Desktop View */
.login-section {
  width: 50vw;
  height: 100vh;
  padding: 0.75rem;
    display: flex;
    flex-direction: column;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.login-content {
  height: 100vh;
  padding: 0.75rem 0;
  overflow-y: hidden;
}

.engage-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
}

.brand-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.brand-text h1 {
  font-size: clamp(24px, 2.2vw, 28px);
  color: #261C6B;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.brand-text p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
  letter-spacing: 0.5px;
}

.desktop-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-section {
  position: relative;
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

.brand-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(99, 98, 248, 0.4) 0%, rgba(38, 28, 107, 0.4) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  filter: brightness(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.checkbox-container {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-container input[type="checkbox"]:checked {
  background-color: #6362F8;
  border-color: #6362F8;
}

.checkbox-container a {
  color: #6362F8;
  font-size: clamp(12px, 1vw, 14px);
  text-decoration: none;
  transition: color 0.2s ease;
}

.checkbox-container a:hover {
  color: #4b4ac0;
  text-decoration: underline;
}

.button-group {
  margin-top: 1.5rem;
  gap: 0.75rem;
}

.button-group button {
  padding: 0.75rem;
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-button {
  background-color: transparent;
  border: 1px solid #6362F8;
  color: #6362F8;
}

.back-button:hover {
  background-color: rgba(99, 98, 248, 0.05);
  transform: translateY(-1px);
}

.next-button {
  background-color: #6362F8;
  border: none;
  color: white;
}

.next-button:hover {
  background-color: #4b4ac0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.next-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  font-size: clamp(11px, 0.9vw, 13px);
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 3px solid #dc3545;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* Mobile Styles */
@media (max-width: 767px) {
  .container {
    display: block;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .mobile-view {
    display: block;
    min-height: 100vh;
  }

  .login-section,
  .brand-section {
    display: none;
  }

  .content {
    min-height: 100vh;
    padding: 20px;
    background: white;
  display: flex;
    flex-direction: column;
  }

  .content form {
  width: 100%;
    max-width: 500px;
    margin: 0 auto;
    flex: 1;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  :deep(.form-input-container) {
    margin-bottom: 0.75rem;
  }

  .button-group {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
}

/* Desktop Styles */
@media (min-width: 768px) {
  .container {
    height: 100vh;
    overflow: hidden;
  }

  .login-section {
    width: 50vw;
    height: 100vh;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
  }

  .login-content {
    height: 100vh;
    padding: 0.75rem 0;
    overflow-y: hidden;
  }

  .desktop-form {
    width: 100%;
    padding: 0 1.5rem;
    gap: 0.75rem;
  }

  .input-group {
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .form-row {
    gap: 0.75rem;
  }

  .form-group {
    gap: 0.5rem;
  }

  .desktop-title {
    font-size: clamp(18px, 1.8vw, 22px);
    margin-bottom: 0.5rem;
  }

  .desktop-subheading {
    font-size: clamp(14px, 1.2vw, 16px);
    margin-bottom: 1rem;
  }

  :deep(.form-input-container) {
    margin-bottom: 0.5rem;
  }

  :deep(label) {
    font-size: clamp(12px, 1vw, 14px);
    margin-bottom: 0.25rem;
  }

  :deep(input), :deep(select) {
    height: 2.5rem;
    padding: 0.5rem 0.75rem;
    font-size: clamp(13px, 1.1vw, 15px);
  }

  :deep(input[type="checkbox"]) {
    height: 16px;
  width: 16px;
  }

  .checkbox-container {
    margin: 0.5rem 0;
  }

  .checkbox-label {
    font-size: clamp(12px, 1vw, 14px);
  }

  .error-message {
    font-size: clamp(11px, 0.9vw, 13px);
    margin-top: 0.25rem;
  }

  .button-group {
    margin-top: 1rem;
    gap: 0.75rem;
  }

  .button-group button {
    padding: 0.625rem;
    font-size: clamp(13px, 1.1vw, 15px);
  }

  .brand-section {
    width: 50vw;
    height: 100vh;
  }

  .brand-logo {
    width: 150px;
  }

  .brand-text h1 {
    font-size: clamp(24px, 2.2vw, 28px);
  }

  .brand-text p {
    font-size: clamp(14px, 1.2vw, 16px);
  }

  .engage-logo {
    width: 50px;
    height: 50px;
  }
}
</style>