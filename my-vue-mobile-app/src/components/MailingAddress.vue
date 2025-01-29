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

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  text-align: left;
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

.back-button, .submit-button {
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

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>