<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Basic Information</h1>
      <form @submit.prevent="navigateToNext" method="post">
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
              <span v-else>Submit</span>
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
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #333;
  font-size: 20px;
  text-decoration: none;
  z-index: 10;
}

.back-icon {
  font-size: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

form {
  width: 100%;
  padding-bottom: 20px;
}

.input-group {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 10px;
}

.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #FFBC2D;
}

.checkbox-container a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
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
}

.back-button, .next-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.error {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
}

/* Scrollbar styling */
.content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  border-left: 4px solid #d32f2f;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover {
  background-color: #cccccc;
}
</style>