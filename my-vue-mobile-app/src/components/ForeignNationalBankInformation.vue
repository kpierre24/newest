<!-- filepath: /c:/Users/Administrator/Documents/newest/my-vue-mobile-app/src/components/ForeignNationalBankInformation.vue -->
<template>
  <div class="container">
    <div class="form-container">
      <h1>Foreign National Bank Information</h1>
      <form @submit.prevent="submitBankInformation">
        <div class="input-container">
          <input type="text" v-model="bankName" id="bankName" placeholder="Name of Bank" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine1" id="addressLine1" placeholder="Address Line 1" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine2" id="addressLine2" placeholder="Address Line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="city" id="city" placeholder="City" required />
        </div>
        <div class="input-container">
          <label for="country">Country</label>
          <select v-model="country" id="country" required>
            <option value="" disabled>Select Country</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <input type="text" v-model="accountNumber" id="accountNumber" placeholder="Account Number" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="swiftCode" id="swiftCode" placeholder="SWIFT Code" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="bankTelephoneNumber" id="bankTelephoneNumber" placeholder="Bank Telephone Number" required />
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
import { countries } from 'countries-list';
import axios from 'axios';

export default {
  name: 'ForeignNationalBankInformation',
  data() {
    return {
      bankName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      accountNumber: '',
      swiftCode: '',
      bankTelephoneNumber: '',
      countries: Object.values(countries).map(country => country.name)
    };
  },
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async submitBankInformation() {
      if (this.validateForm()) {
        try {
          const formData = {
            bankName: this.bankName,
            addressLine1: this.addressLine1,
            addressLine2: this.addressLine2,
            city: this.city,
            country: this.country,
            accountNumber: this.accountNumber,
            swiftCode: this.swiftCode,
            bankTelephoneNumber: this.bankTelephoneNumber
          };

          // Debugging logs to check form data
          console.log('Bank Information Data:', formData);

          const response = await axios.post('http://localhost:3000/foreign-national-bank-information', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Bank information submitted:', response.data);

          // Navigate to the next page after successful submission
          this.$router.push('/next-page');
        } catch (error) {
          console.error('Error submitting bank information:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    },
    validateForm() {
      return this.bankName && this.addressLine1 && this.city && this.country && this.accountNumber && this.swiftCode && this.bankTelephoneNumber;
    }
  }
};
</script>

<style scoped>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
}

.input-container {
  width: 100%;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

input[type="text"], select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
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

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>