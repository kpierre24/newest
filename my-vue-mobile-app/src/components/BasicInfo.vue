<template>
  <div class="container">
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
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  min-height: 600px;
  max-height: 90vh;
  color: rgb(12, 12, 12);
  position: relative;
  margin: auto;
}

.content h1 {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(2px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

.subheading {
  font-size: clamp(14px, 3vw, 18px);
  color: #333;
  margin: 10px 0 20px;
  text-align: center;
  padding: 0 20px;
}

form {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: 20px 15px 80px;
  margin-top: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  box-sizing: border-box;
}

form::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

form::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.input-group {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 10px;
  padding: 0 5px;
}

.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #FFBC2D;
  min-width: 16px;
}

.checkbox-container a {
  color: #007bff;
  text-decoration: none;
  font-size: clamp(12px, 2.5vw, 14px);
  cursor: pointer;
  transition: color 0.3s ease;
  flex: 1;
}

.checkbox-container a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 0 15px;
  box-sizing: border-box;
}

.back-button, .next-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #FF883F;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #FF883F;
}

.next-button:disabled, .back-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover, .back-button:disabled:hover {
  background-color: #cccccc;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 15px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

/* Media Queries */
@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .content {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .content h1 {
    border-radius: 0;
  }
  
  form {
    padding: 15px 10px 70px;
  }
  
  .input-group {
    padding: 0 10px;
  }
  
  .button-group {
    padding: 0 10px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .content {
    max-width: 450px;
  }
}

@media (min-width: 769px) {
  .content {
    max-width: 500px;
  }
}
</style>