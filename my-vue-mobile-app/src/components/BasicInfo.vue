<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Basic Information</h1>
      <form @submit.prevent="navigateToNext">
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
            <label for="dob">Date of Birth</label>
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
            <label>
              <a href="#" @click.prevent="showTermsAndConditions">Terms and Conditions</a>
            </label>
          </div>
          <div class="input-container">
            <label>
              <a href="#" @click.prevent="showFinancialDeclaration">Financial Declaration Agreement</a>
            </label>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" v-model="termsViewed" id="termsViewed" />
            <label for="termsViewed">I have viewed the Terms and Conditions</label>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" v-model="financialAgreementViewed" id="financialAgreementViewed" />
            <label for="financialAgreementViewed">I have viewed the Financial Agreement</label>
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button">Submit</button>
            <button type="button" @click="navigateToPEP">Next</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Terms and Conditions Modal -->
  <TermsAndConditions :visible="showTermsModal" @close="agreeTerms" />

  <!-- Financial Declaration Agreement Modal -->
  <FinancialDeclaration :visible="showFinancialModal" @close="agreeFinancial" />
</template>

<script>
import axios from 'axios';
import TermsAndConditions from './TermsAndConditions.vue';
import FinancialDeclaration from './FinancialDeclaration.vue';

export default {
  name: 'BasicInfo',
  components: {
    TermsAndConditions,
    FinancialDeclaration
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      otherName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      dob: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      showTermsModal: false,
      showFinancialModal: false,
      viewedTerms: false,
      viewedFinancial: false,
      termsViewed: false,
      financialAgreementViewed: false
    };
  },
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async navigateToNext() {
      console.log('navigateToNext called');
      if (!this.passwordError && this.termsViewed && this.financialAgreementViewed) {
        console.log('User has viewed terms and financial declaration. Navigating...');
        await this.submitBasicInfo(); // Call the API before navigating

        // Navigate to email verification page
        this.$router.push('/email-verification');
      } else {
        alert('Please view both the terms and financial declaration.');
      }
    },
    async submitBasicInfo() {
      try {
        const basicInfoData = {
          firstName: this.firstName,
          lastName: this.lastName,
          otherName: this.otherName,
          gender: this.gender,
          dob: this.dob,
          email: this.email,
          mobileNumber: this.mobileNumber,
          password: this.password,
          confirmPassword: this.confirmPassword,
          viewedTerms: this.viewedTerms,
          viewedFinancial: this.viewedFinancial,
          // Include other necessary data properties
        };

        // Debugging logs to check form data
        console.log('Basic Info Data:', basicInfoData);

        const response = await axios.post('http://localhost:3000/basic-info', basicInfoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Basic info submitted:', response.data);
      } catch (error) {
        console.error('Error submitting basic info:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    },
    showTermsAndConditions() {
      this.showTermsModal = true;
    },
    showFinancialDeclaration() {
      this.showFinancialModal = true;
    },
    agreeTerms() {
      this.showTermsModal = false;
      this.viewedTerms = true;
    },
    agreeFinancial() {
      this.showFinancialModal = false;
      this.viewedFinancial = true;
    },
    validatePassword() {
      const password = this.password;
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password)) {
        this.passwordError = 'Password must be at least 8 characters long, contain one capital letter, one number, and one special character.';
      } else {
        this.passwordError = '';
      }
    },
    navigateToPEP() {
      this.$router.push({ name: 'PoliticallyExposedPersons2', params: { dob: this.dob } });
    }
  }
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f4f4f4;
  padding: 20px;
}

.form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-group, .input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
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
  transition: 0.3s ease;
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

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: left;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
}

.agree-button, .disagree-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 5px;
}

.checkbox-container input[type="checkbox"] {
  width: 14px;
  height: 14px;
}

.agree-button {
  background-color: #007bff;
  color: white;
}

.agree-button:hover {
  background-color: #0056b3;
}

.disagree-button {
  background-color: #6c757d;
  color: white;
}

.disagree-button:hover {
  background-color: #5a6268;
}

.common-icon {
  /* Add your CSS adjustments here */
  width: 24px;
  height: 24px;
  color: #333;
}
.icon fas fa-user {
  width: 24px;
  height: 24px;
  color: #333;
  transform: translateY(-10px);
  display: inline-block;
  vertical-align: middle;
}
</style>