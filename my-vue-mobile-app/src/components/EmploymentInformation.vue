<template>
  <div class="container">
    <div class="form-container">
      <h1>Employment Information</h1>
      <form @submit.prevent="submitEmploymentInformation">
        <div class="input-container">
          <input type="text" v-model="employerName" id="employerName" placeholder="Employer Name" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="employerAddressLine1" id="employerAddressLine1" placeholder="Employer Address Line 1" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="employerAddressLine2" id="employerAddressLine2" placeholder="Employer Address Line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="employerCity" id="employerCity" placeholder="City" required />
        </div>
        <div class="input-container">
          <label for="employerCountry">Country</label>
          <select v-model="employerCountry" id="employerCountry" required>
            <option value="" disabled>Select Country</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <input type="text" v-model="workNumber" id="workNumber" placeholder="Work Number" required />
        </div>
        <div class="input-container">
          <label for="employmentStatus">Employment Status</label>
          <select v-model="employmentStatus" id="employmentStatus" required>
            <option value="" disabled>Select Employment Status</option>
            <option value="permanent">Permanent</option>
            <option value="contract">Contract</option>
            <option value="part-time">Part-time</option>
            <option value="consultant">Consultant</option>
            <option value="self-employed">Self-employed</option>
          </select>
        </div>
        <div class="input-container">
          <label for="employmentType">Employment Type</label>
          <select v-model="employmentType" id="employmentType" required>
            <option value="" disabled>Select Employment Type</option>
            <option value="payslip">Payslip</option>
            <option value="bank-statement">Bank Statement</option>
            <option value="employment-letter">Employment Letter</option>
            <option value="self-employed">Self-employed</option>
          </select>
        </div>
        <div class="input-container">
          <label for="proofOfEmployment">Proof of Employment</label>
          <input type="file" id="proofOfEmployment" @change="handleFileUpload" required />
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
  name: 'EmploymentInformation',
  data() {
    return {
      employerName: '',
      employerAddressLine1: '',
      employerAddressLine2: '',
      employerCity: '',
      employerCountry: '',
      workNumber: '',
      employmentStatus: '',
      employmentType: '',
      proofOfEmploymentFile: null,
      countries: Object.values(countries).map(country => country.name)
    };
  },
  methods: {
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async submitEmploymentInformation() {
      if (this.validateForm()) {
        try {
          const formData = new FormData();
          formData.append('employerName', this.employerName);
          formData.append('employerAddressLine1', this.employerAddressLine1);
          formData.append('employerAddressLine2', this.employerAddressLine2);
          formData.append('employerCity', this.employerCity);
          formData.append('employerCountry', this.employerCountry);
          formData.append('workNumber', this.workNumber);
          formData.append('employmentStatus', this.employmentStatus);
          formData.append('employmentType', this.employmentType);
          formData.append('proofOfEmployment', this.proofOfEmploymentFile);

          // Debugging logs to check form data
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }

          const response = await axios.post('http://localhost:3000/employment-information', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Employment information submitted:', response.data);

          // Navigate to the next page after successful submission
          this.$router.push('/next-page');
        } catch (error) {
          console.error('Error submitting employment information:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    },
    validateForm() {
      return this.employerName && this.employerAddressLine1 && this.employerCity && this.employerCountry && this.workNumber && this.employmentStatus && this.employmentType && this.proofOfEmploymentFile;
    },
    handleFileUpload(event) {
      this.proofOfEmploymentFile = event.target.files[0];
      console.log('Proof of Employment File:', this.proofOfEmploymentFile);
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

input[type="text"], input[type="file"], select {
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