<template>
  <div class="container">
    <div class="form-container">
      <h1>Mailing Address</h1>
      <form @submit.prevent="submitMailingAddress">
        <div class="input-container">
          <input type="text" v-model="AddressLine1" id="AddressLine1" placeholder="Mailing Address line 1" :required="!sameAsHomeAddress" />
        </div>
        <div class="input-container">
          <input type="text" v-model="AddressLine2" id="AddressLine2" placeholder="Mailing Address line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="City" id="City" placeholder="Mailing City" :required="!sameAsHomeAddress" />
        </div>
        <div class="input-container">
          <label for="Country">Mailing Country</label>
          <select v-model="Country" id="Country" :required="!sameAsHomeAddress">
            <option value="" disabled>Select Country</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" v-model="sameAsHomeAddress" id="sameAsHomeAddress" />
          <label for="sameAsHomeAddress">Same as Home Address</label>
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { countries } from 'countries-list';
import axios from 'axios';

export default {
  name: 'MailingAddress',
  data() {
    return {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      Country: '',
      sameAsHomeAddress: false,
      countries: Object.values(countries).map(country => country.name)
    };
  },
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async submitMailingAddress() {
      if (this.validateForm() || this.sameAsHomeAddress) {
        try {
          const formData = {
            AddressLine1: this.AddressLine1,
            AddressLine2: this.AddressLine2,
            City: this.City,
            Country: this.Country
          };

          // Debugging logs to check form data
          console.log('Mailing Address Data:', formData);

          const response = await axios.post('http://localhost:3000/mailing-address', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Mailing address info submitted:', response.data);

          // Navigate to the appropriate page based on nationality
          const nationality = this.$route.query.nationality;
          if (nationality !== 'Trinidad and Tobago') {
            this.$router.push('/foreign-national-bank-information');
          } else {
            this.$router.push('/employment-information');
          }
        } catch (error) {
          console.error('Error submitting mailing address info:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    },
    validateForm() {
      return this.AddressLine1 && this.City && this.Country;
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