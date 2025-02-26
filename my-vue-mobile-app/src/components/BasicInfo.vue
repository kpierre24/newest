<template>
  <div class="container">
    <div class="form-container">
      <h1>Basic Information</h1>
      <form @submit.prevent="navigateToNext" method="post">
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
            :maxlength="11"
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
            @input="validatePassword"
            :error="passwordError"
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
             <a href="#" @click.prevent="showTermsAndConditions">Terms and Conditions</a>
          </div>
          <div class="checkbox-container">
            <input type="checkbox" v-model="store.financialAgreementViewed" id="financialAgreementViewed" />
             <a href="#" @click.prevent="showFinancialDeclaration">Financial Declaration Agreement</a>
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button">Submit</button>
          </div>
        </div>
      </form>
    </div>
    <TermsAndConditions :visible="isTermsVisible" @close="handleCloseTerms" />
    <FinancialDeclaration :visible="isFinancialVisible" @close="handleCloseFinancial" />
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TermsAndConditions from './TermsAndConditions.vue';
import FinancialDeclaration from './FinancialDeclaration.vue';
import axios from 'axios';
import FormInput from '@/props/FormInput.vue';

export default {
  components: {
    TermsAndConditions,
    FinancialDeclaration,
    FormInput
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const isTermsVisible = ref(false);
    const isFinancialVisible = ref(false);
    const passwordError = ref('');

  const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
    const navigateToNext = async () => {
      if (!store.firstName || !store.lastName || !store.email || !store.mobileNumber || !store.gender || !store.dob || !store.password || !store.confirmPassword || !store.termsViewed || !store.financialAgreementViewed) {
        alert('Please fill all required fields and agree to the terms.');
        return;
      }

      if (store.password !== store.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      try {
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

        const response = await axios.post('http://localhost:3000/basic-info', basicInfoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Basic info submitted:', response.data);

        store.setBasicInfo(basicInfoData);

        router.push({ name: 'EmailVerification' });
      } catch (error) {
        console.error('Error submitting basic info:', error);
        alert('An error occurred while saving your information.');
      }
    };

    const validatePassword = () => {
      if (store.password !== store.confirmPassword) {
        passwordError.value = 'Passwords do not match';
      } else {
        passwordError.value = '';
      }
    };

    const handleCloseTerms = () => {
      isTermsVisible.value = false;
    };

    const handleCloseFinancial = () => {
      isFinancialVisible.value = false;
    };

    const showTermsAndConditions = () => {
      isTermsVisible.value = true;
    };

    const showFinancialDeclaration = () => {
      isFinancialVisible.value = true;
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      isTermsVisible,
      isFinancialVisible,
      passwordError,
      navigateToNext,
      validatePassword,
      handleCloseTerms,
      handleCloseFinancial,
      showTermsAndConditions,
      showFinancialDeclaration,
      navigateToPrevious,
      store
    };
  }
};
</script>

<style scoped>

.container {
    position: relative;
    margin-top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content; /* Add this line */
    min-height: calc(100vh - 40px);
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    backdrop-filter: blur(5px);
    animation: fadeIn 1s ease-in-out forwards;
    overflow-y: auto; /* Move overflow to container */
}

.form-container {
    background-image: url('@/assets/back.jpg');
    background-size: cover;
    background-position: center;
    padding: 30px;
    padding-top: 50px; /* add padding top */
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 420px;
    max-width: 420px;
    height: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
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
  left: 15px;
  color: #666;
  font-size: 16px;
  z-index: 1; /* Ensure the icon is above the input */
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px 12px 12px 40px; /* Add left padding for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  transition: 0.3s ease;
}
#gender {
  border: 2px solid mediumpurple;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2); /* Adds a 2px solid purple border */
}

#dob {
  border: 2px  mediumpurple; 
  box-shadow: 0 0 10px rgb(159 158 233);
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
  width: 100%;
  padding: 12px 12px 12px 40px; /* Add left padding for the icon */
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  transition: 0.3s ease;
  position: relative;
  display: flex;
  
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.input-container a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.input-container a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.button-group {
  display: flex;
  flex-direction: column; /* Arrange buttons vertically */
  gap: 10px; /* Add space between buttons */
  margin-top: 20px;
  width: 100%; /* Stretch to the width of the container */
}

.back-button, .next-button, .submit-button {
  width: 100%; /* Stretch buttons to full width */
  padding: 15px; /* Increase padding for better appearance */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea; /* Red background */
  color: white; /* White text */
}

.back-button:hover {
  background-color: #f38b79ea; /* Lighter red on hover */
}

.next-button , .submit-button {
  background-color: #FFBC2D ; /* Purple background */
  color: white; /* White text */
}

.next-button:hover, .submit-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
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
  accent-color: #007bff;
}

.checkbox-container label {
  font-size: 14px;
  color: white;
  cursor: pointer;
}

.logo {
  width: 157.5px;
  height: auto;
  margin-bottom: 20px;
}

.error {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 5px;
}
</style>