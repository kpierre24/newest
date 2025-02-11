<template>
  <div class="container">
    <div class="form-container">
      <h1>Employment Information</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="employerName">Employer Name</label>
          <input type="text" v-model="employerName" id="employerName" placeholder="Enter employer name" required />
        </div>
        <div class="input-container">
          <label for="employerAddressLine1">Employer Address Line 1</label>
          <input type="text" v-model="employerAddressLine1" id="employerAddressLine1" placeholder="Enter address line 1" required />
        </div>
        <div class="input-container">
          <label for="employerCity">City</label>
          <input type="text" v-model="employerCity" id="employerCity" placeholder="Enter city" required />
        </div>
        <div class="input-container">
          <label for="employerCountry">Country</label>
          <select v-model="employerCountry" id="employerCountry" required>
            <option value="" disabled>Select country</option>
            <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="workNumber">Work Number</label>
          <input type="text" v-model="workNumber" id="workNumber" placeholder="Enter work number" required />
        </div>
        <div class="input-container">
          <label for="employmentStatus">Employment Status</label>
          <select v-model="employmentStatus" id="employmentStatus" required>
            <option value="" disabled>Select employment status</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
            <option value="retired">Retired</option>
          </select>
        </div>
        <div class="input-container">
          <label for="employmentType">Employment Type</label>
          <select v-model="employmentType" id="employmentType" required>
            <option value="" disabled>Select employment type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
          </select>
        </div>
        <div class="input-container">
          <label for="proofOfEmploymentFile">Proof of Employment</label>
          <input type="file" id="proofOfEmploymentFile" @change="handleFileUpload" required />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="goBack">Back</button>
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

    const employerName = ref('');
    const employerAddressLine1 = ref('');
    const employerCity = ref('');
    const employerCountry = ref('');
    const workNumber = ref('');
    const employmentStatus = ref('');
    const employmentType = ref('');
    const proofOfEmploymentFile = ref(null);
    const countryList = ref(Object.values(countries).map(country => country.name));

    onMounted(() => {
      employerName.value = store.employerName;
      employerAddressLine1.value = store.employerAddressLine1;
      employerCity.value = store.employerCity;
      employerCountry.value = store.employerCountry;
      workNumber.value = store.workNumber;
      employmentStatus.value = store.employmentStatus;
      employmentType.value = store.employmentType;
    });

    const handleFileUpload = (event) => {
      proofOfEmploymentFile.value = event.target.files[0];
    };

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('employerName', employerName.value);
        formData.append('employerAddressLine1', employerAddressLine1.value);
        formData.append('employerCity', employerCity.value);
        formData.append('employerCountry', employerCountry.value);
        formData.append('workNumber', workNumber.value);
        formData.append('employmentStatus', employmentStatus.value);
        formData.append('employmentType', employmentType.value);
        formData.append('proofOfEmploymentFile', proofOfEmploymentFile.value);

        // Save employment info to the store
        store.setEmploymentInfo({
          employerName: employerName.value,
          employerAddressLine1: employerAddressLine1.value,
          employerCity: employerCity.value,
          employerCountry: employerCountry.value,
          workNumber: workNumber.value,
          employmentStatus: employmentStatus.value,
          employmentType: employmentType.value,
          proofOfEmploymentFile: proofOfEmploymentFile.value
        });

        // Debugging logs to check form data
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await axios.post('http://localhost:3000/employment-information', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Employment information submitted:', response.data);

        // Navigate to the next page
        router.push('/designation-of-beneficiary'); // Replace with the actual next page route
      } catch (error) {
        console.error('Error submitting employment information:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      employerName,
      employerAddressLine1,
      employerCity,
      employerCountry,
      workNumber,
      employmentStatus,
      employmentType,
      proofOfEmploymentFile,
      countryList,
      handleFileUpload,
      handleSubmit,
      goBack
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