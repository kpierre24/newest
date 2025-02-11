<!-- filepath: /c:/Users/Administrator/Documents/newest/my-vue-mobile-app/src/components/ForeignNationalBankInformation.vue -->
<template>
  <div class="container">
    <div class="form-container">
      <h1>Foreign National Bank Information</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="bankName">Bank Name</label>
          <input type="text" v-model="bankName" id="bankName" placeholder="Enter bank name" required />
        </div>
        <div class="input-container">
          <label for="bankAddressLine1">Address Line 1</label>
          <input type="text" v-model="bankAddressLine1" id="bankAddressLine1" placeholder="Enter address line 1" required />
        </div>
        <div class="input-container">
          <label for="bankCity">City</label>
          <input type="text" v-model="bankCity" id="bankCity" placeholder="Enter city" required />
        </div>
        <div class="input-container">
          <label for="bankCountry">Country</label>
          <select v-model="bankCountry" id="bankCountry" required>
            <option value="" disabled>Select country</option>
            <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="bankAccountNumber">Account Number</label>
          <input type="text" v-model="bankAccountNumber" id="bankAccountNumber" placeholder="Enter account number" required />
        </div>
        <div class="input-container">
          <label for="swiftCode">SWIFT Code</label>
          <input type="text" v-model="swiftCode" id="swiftCode" placeholder="Enter SWIFT code" required />
        </div>
        <div class="input-container">
          <label for="bankTelephoneNumber">Bank Telephone Number</label>
          <input type="text" v-model="bankTelephoneNumber" id="bankTelephoneNumber" placeholder="Enter bank telephone number" required />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { countries } from 'countries-list';

export default {
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const bankName = ref('');
    const bankAddressLine1 = ref('');
    const bankCity = ref('');
    const bankCountry = ref('');
    const bankAccountNumber = ref('');
    const swiftCode = ref('');
    const bankTelephoneNumber = ref('');
    const countryList = ref(Object.values(countries).map(country => country.name));

    onMounted(() => {
      bankName.value = store.bankName;
      bankAddressLine1.value = store.bankAddressLine1;
      bankCity.value = store.bankCity;
      bankCountry.value = store.bankCountry;
      bankAccountNumber.value = store.bankAccountNumber;
      swiftCode.value = store.swiftCode;
      bankTelephoneNumber.value = store.bankTelephoneNumber;
    });

    const handleSubmit = async () => {
      if (validateForm()) {
        try {
          const formData = {
            bankName: bankName.value,
            bankAddressLine1: bankAddressLine1.value,
            bankCity: bankCity.value,
            bankCountry: bankCountry.value,
            bankAccountNumber: bankAccountNumber.value,
            swiftCode: swiftCode.value,
            bankTelephoneNumber: bankTelephoneNumber.value
          };

          // Save bank info to the store
          store.setBankInfo(formData);

          // Debugging logs to check form data
          console.log('Bank Information Data:', formData);

          const response = await axios.post('http://localhost:3000/foreign-national-bank-information', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Bank information submitted:', response.data);

          // Navigate to the employment information page after successful submission
          router.push('/employment-information');
        } catch (error) {
          console.error('Error submitting bank information:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    };

    const validateForm = () => {
      return bankName.value && bankAddressLine1.value && bankCity.value && bankCountry.value && bankAccountNumber.value && swiftCode.value && bankTelephoneNumber.value;
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      bankName,
      bankAddressLine1,
      bankCity,
      bankCountry,
      bankAccountNumber,
      swiftCode,
      bankTelephoneNumber,
      countryList,
      handleSubmit,
      validateForm,
      navigateToPrevious
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