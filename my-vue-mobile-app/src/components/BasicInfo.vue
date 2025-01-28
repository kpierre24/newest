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
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" placeholder="Password" maxlength="50" required @input="validatePassword" />
            <small v-if="passwordError" class="error">{{ passwordError }}</small>
          </div>
          <div class="input-container">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" v-model="confirmPassword" id="confirmPassword" placeholder="Confirm Password" maxlength="50" required />
          </div>
          <div class="input-container">
            <label>
              <input type="checkbox" v-model="viewedTerms" disabled />
              <a href="#" @click.prevent="showTermsAndConditions">Terms and Conditions</a>
            </label>
          </div>
          <div class="input-container">
            <label>
              <input type="checkbox" v-model="viewedFinancial" disabled />
              <a href="#" @click.prevent="showFinancialDeclaration">Financial Declaration Agreement</a>
            </label>
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="next-button">Next</button>
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
      viewedFinancial: false
    };
  },
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async navigateToNext() {
      console.log('navigateToNext called');
      if (!this.passwordError) {
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
    }
  }
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
  padding: 20px;
  text-align: center;
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 90vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  width: 100%;
  margin-bottom: 15px;
}

.input-container {
  position: relative;
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px 40px; /* Adjust padding to make space for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

input::placeholder, select::placeholder {
  color: #aaa;
  padding: 20px;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.gender-select {
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  padding-left: 45px; /* Adjust padding to move text to the right */
}

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.date-picker {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-image: none; /* Remove default calendar icon */
}

.password-requirements {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}

.error {
  color: red;
  font-size: 12px;
}

.links {
  margin: 15px 0;
}

.links a {
  margin-right: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:hover:enabled {
  background-color: #0056b3;
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
</style>