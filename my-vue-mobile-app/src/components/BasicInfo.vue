<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Basic Information</h1>
      <form @submit.prevent="navigateToNext" method="post">
        <div class="input-group">
          <div class="input-container">
            <input type="text" v-model="firstName" id="firstName" placeholder="First Name" maxlength="50" required />
            <i class="icon fas fa-user"></i>
          </div>
          <div class="input-container">
            <input type="text" v-model="lastName" id="lastName" placeholder="Last Name" maxlength="50" required />
            <i class="icon fas fa-user"></i>
          </div>
          <div class="input-container">
            <input type="text" v-model="otherName" id="otherName" placeholder="Other Name" maxlength="50" />
            <i class="icon fas fa-user"></i>
          </div>
          <div class="input-container">
            <input type="email" v-model="email" id="email" placeholder="Email Address" maxlength="50" required />
            <i class="icon fas fa-envelope"></i>
          </div>
          <div class="input-container">
            <input type="tel" v-model="mobileNumber" id="mobileNumber" placeholder="Mobile Number" maxlength="11" required />
            <i class="icon fas fa-phone"></i>
          </div>
          <div class="input-container">
            <select v-model="gender" id="gender" class="gender-select" required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <i class="icon fas fa-venus-mars"></i>
          </div>
          <div class="input-container">
            <input type="date" v-model="dob" id="dob" required class="date-picker" placeholder="Date of Birth" />
            <i class="icon fas fa-calendar-alt"></i>
          </div>
          <div class="input-container">
            <input type="password" v-model="password" id="password" placeholder="Password" maxlength="50" required @input="validatePassword" />
            <small v-if="passwordError" class="error">{{ passwordError }}</small>
          </div>
          <div class="input-container">
            <input type="password" v-model="confirmPassword" id="confirmPassword" placeholder="Confirm Password" maxlength="50" required />
          </div>
          <div class="input-container">
            <div class="checkbox-link-container">
              <input type="checkbox" v-model="termsViewed" id="termsViewed" />
              <a href="#" @click.prevent="showTermsAndConditions">Terms and Conditions</a>
            </div>
          </div>
          <div class="input-container">
            <div class="checkbox-link-container">
              <input type="checkbox" v-model="financialAgreementViewed" id="financialAgreementViewed" />
              <a href="#" @click.prevent="showFinancialDeclaration">Financial Declaration Agreement</a>
            </div>
          </div>
          
          
         
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button">Submit</button>
          </div>
        </div>
      </form>
      <TermsAndConditions :visible="isTermsVisible" @close="handleCloseTerms"></TermsAndConditions>
      <FinancialDeclaration :visible="isFinancialVisible" @close="handleCloseFinancial"></FinancialDeclaration>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TermsAndConditions from './TermsAndConditions.vue';
import FinancialDeclaration from './FinancialDeclaration.vue';
import axios from 'axios';


export default {
  components: {
    TermsAndConditions,
    FinancialDeclaration
  },
  setup() {
    const demoStore = useDemoStore();
  },
  data() {
    return {
      isTermsVisible: false,
      isFinancialVisible: false,
      firstName: '',
      lastName: '',
      otherName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      dob: '',
      password: '',
      confirmPassword: '',
      termsViewed: false,
      financialAgreementViewed: false,
      passwordError: '',
      router: null
    };
  },
  created() {
    this.router = useRouter();
  },
  methods: {
    handleCloseTerms() {
      this.isTermsVisible = false;
    },
    handleCloseFinancial() {
      this.isFinancialVisible = false;
    },
    validatePassword() {
      if (this.password !== this.confirmPassword) {
        this.passwordError = 'Passwords do not match';
      } else {
        this.passwordError = '';
      }
    },
    async navigateToNext() {
      // Ensure all required fields are filled
      if (!this.firstName || !this.lastName || !this.email || !this.mobileNumber || !this.gender || !this.dob || !this.password || !this.confirmPassword || !this.termsViewed || !this.financialAgreementViewed) {
        alert('Please fill all required fields and agree to the terms.');
        return;
      }

      // Validate passwords match
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
        // Create the data object
        const basicInfoData = {
          firstName: this.firstName,
          lastName: this.lastName,
          otherName: this.otherName,
          email: this.email,
          mobileNumber: this.mobileNumber,
          gender: this.gender,
          dob: this.dob,
          password: this.password,
          termsViewed: this.termsViewed,
          financialAgreementViewed: this.financialAgreementViewed
        };

        // Save to store using Pinia
        const store = useDemoStore();
        store.setBasicInfo(basicInfoData);

        // Make API call if needed
        const response = await axios.post('http://localhost:3000/basic-info', basicInfoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Basic info submitted:', response.data);
        
        // Navigate to the next page
        this.router.push({ name: 'EmailVerification' });
      } catch (error) {
        console.error('Error submitting basic info:', error);
        alert('An error occurred while saving your information.');
      }
    },
    navigateToPrevious() {
      this.router.go(-1);
    },
    showTermsAndConditions() {
      this.isTermsVisible = true;
    },
    showFinancialDeclaration() {
      this.isFinancialVisible = true;
    }
  }

};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f4f4f4; /* Light background for the page */
  padding: 20px;
}

.form-container {
  background: linear-gradient(to right, #a8c0ff, #3f2b96); /* Light purple gradient */
  padding: 40px;
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px; /* Narrower width for consistency */
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
  color: white; /* White text for contrast */
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-group, .input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-container .icon {
  position: absolute;
  left: 15px; /* Align icon to the left */
  color: #666;
  font-size: 16px;
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px;
  padding-left: 40px; /* Add space on the left for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  transition: 0.3s ease;
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

/* Checkbox container styling */


/* Modal link styling */
.input-container a {
  color: #007bff; /* Blue for links */
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.input-container a:hover {
  color: #0056b3; /* Darker blue on hover */
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button, .next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.submit-button:hover, .next-button:hover {
  background-color: #0056b3;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 10px; /* Space between checkbox and label */
}

.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #007bff; /* Custom checkbox color */
}

.checkbox-container label {
  font-size: 14px;
  color: rgb(19, 16, 16); /* White text for contrast */
  cursor: pointer;
}

.logo {
  width: 157.5px;
  height: auto;
  margin-bottom: 20px;
}

.error {
  color: #ff4d4d; /* Red for error messages */
  font-size: 12px;
  margin-top: 5px;
}

.checkbox-link-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-link-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
}

.checkbox-link-container a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.checkbox-link-container a:hover {
  text-decoration: underline;
}

/* Modal Styles */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: left;
  color: #333; /* Dark text color for modal content */
}

.modal-content h2 {
  color: #333;
  margin-top: 0;
}

.modal-content p {
  color: #333; /* Dark text color for paragraphs */
  line-height: 1.6;
}

.modal-content ul, 
.modal-content ol {
  color: #333; /* Dark text color for lists */
}

.modal-content a {
  color: #007bff; /* Blue color for links in modal */
}
</style>