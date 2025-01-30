<template>
  <div class="container">
    <div class="form-container">
      <h1>Address Information</h1>
      <form @submit.prevent="submitAddress">
        <div class="input-container">
          <input type="text" v-model="AddressLine1" id="AddressLine1" placeholder="Address line 1" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="AddressLine2" id="AddressLine2" placeholder="Address line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="City" id="City" placeholder="City" required />
        </div>
        <div class="input-container">
          <label for="Country">Country</label>
          <select v-model="Country" id="Country" required>
            <option value="" disabled>Select Country</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="Nationality">Nationality</label>
          <select v-model="Nationality" id="Nationality" required>
            <option value="" disabled>Select Nationality</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="DwellingStatus">Dwelling Status</label>
          <select v-model="DwellingStatus" id="DwellingStatus" required>
            <option value="" disabled>Select Dwelling Status</option>
            <option value="rented">Rented</option>
            <option value="subletting">Subletting</option>
            <option value="owned">Owned</option>
            <option value="living_with_relative">Living with Relative</option>
          </select>
        </div>
        <div class="input-container">
          <label for="ProofOfAddress">Proof of Address</label>
          <input type="file" id="ProofOfAddress" @change="handleFileUpload" required />
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
  name: 'Address',
  data() {
    return {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      Country: '',
      Nationality: '',
      DwellingStatus: '',
      proofOfAddressFile: null,
      countries: Object.values(countries).map(country => country.name)
    };
  },
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async submitAddress() {
      if (this.validateForm()) {
        try {
          const formData = new FormData();
          formData.append('AddressLine1', this.AddressLine1);
          formData.append('AddressLine2', this.AddressLine2);
          formData.append('City', this.City);
          formData.append('Country', this.Country);
          formData.append('Nationality', this.Nationality);
          formData.append('DwellingStatus', this.DwellingStatus);
          formData.append('ProofOfAddress', this.proofOfAddressFile);

          // Debugging logs to check form data
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

          const response = await axios.post('http://localhost:3000/address', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Address info submitted:', response.data);

          // Navigate to the mailing address page after successful submission
          this.$router.push({ path: '/mailing-address', query: { nationality: this.Nationality } });
        } catch (error) {
          console.error('Error submitting address info:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    },
    validateForm() {
      return this.AddressLine1 && this.City && this.Country && this.Nationality && this.DwellingStatus && this.proofOfAddressFile;
    },
    handleFileUpload(event) {
      this.proofOfAddressFile = event.target.files[0];
      console.log('Proof of Address File:', this.proofOfAddressFile);
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
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
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

input[type="text"], input[type="file"], select {
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

.back-button, .next-button {
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

.next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>