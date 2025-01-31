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
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const firstName = ref('');
    const lastName = ref('');
    const otherName = ref('');
    const email = ref('');
    const mobileNumber = ref('');
    const gender = ref('');
    const dob = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const termsViewed = ref(false);
    const financialAgreementViewed = ref(false);
    const passwordError = ref('');

    onMounted(() => {
      firstName.value = store.firstName;
      lastName.value = store.lastName;
      otherName.value = store.otherName;
      email.value = store.email;
      mobileNumber.value = store.mobileNumber;
      gender.value = store.gender;
      dob.value = store.dob;
      password.value = store.password;
      confirmPassword.value = store.confirmPassword;
      termsViewed.value = store.termsViewed;
      financialAgreementViewed.value = store.financialAgreementViewed;
    });

    const validatePassword = () => {
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password.value)) {
        passwordError.value = 'Password must be at least 8 characters long, contain one capital letter, one number, and one special character.';
      } else {
        passwordError.value = '';
      }
    };

    const navigateToNext = () => {
      store.setBasicInfo({
        firstName: firstName.value,
        lastName: lastName.value,
        otherName: otherName.value,
        email: email.value,
        mobileNumber: mobileNumber.value,
        gender: gender.value,
        dob: dob.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        termsViewed: termsViewed.value,
        financialAgreementViewed: financialAgreementViewed.value
      });

      router.push("/email-verification");
    };

    const navigateToPrevious = () => {
      router.push("/new-or-existing");
    };

    const navigateToPEP = () => {
      store.setBasicInfo({
        firstName: firstName.value,
        lastName: lastName.value,
        otherName: otherName.value,
        email: email.value,
        mobileNumber: mobileNumber.value,
        gender: gender.value,
        dob: dob.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        termsViewed: termsViewed.value,
        financialAgreementViewed: financialAgreementViewed.value
      });

      router.push({ name: 'PoliticallyExposedPersons2' });
    };

    const showTermsAndConditions = () => {
      // Show terms and conditions
    };

    const showFinancialDeclaration = () => {
      // Show financial declaration
    };

    return {
      firstName,
      lastName,
      otherName,
      email,
      mobileNumber,
      gender,
      dob,
      password,
      confirmPassword,
      termsViewed,
      financialAgreementViewed,
      passwordError,
      validatePassword,
      navigateToNext,
      navigateToPrevious,
      navigateToPEP,
      showTermsAndConditions,
      showFinancialDeclaration
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

.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.input-container .icon {
  position: absolute;
  left: 15px;  /* Align icon to the left */
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
  background: #f9f9f9;
  transition: 0.3s ease;
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}/* Adds space between the icons */
</style>