<template>
  <div class="container">
    <div class="form-container">
      <h1>Employment Information</h1>
      <form @submit.prevent="handleSubmit">
        <FormInput
          label="Employer Name"
          type="text"
          id="employerName"
          v-model="employerName"
          placeholder="Enter employer name"
          :required="true"
          iconClass="icon fas fa-building"
        />
        <FormInput
          label="Address Line 1"
          type="text"
          id="employerAddressLine1"
          v-model="employerAddressLine1"
          placeholder="Enter address line 1"
          :required="true"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="City"
          type="text"
          id="employerCity"
          v-model="employerCity"
          placeholder="Enter city"
          :required="true"
          iconClass="icon fas fa-city"
        />
        <FormInput
          label="Country"
          type="select"
          id="employerCountry"
          v-model="employerCountry"
          :required="true"
          :selectOptions="countryList"
          iconClass="icon fas fa-globe"
        />
        <FormInput
          label="Work Number"
          type="text"
          id="workNumber"
          v-model="workNumber"
          placeholder="Enter work number"
          :required="true"
          iconClass="icon fas fa-phone"
        />
        <FormInput
          label="Employment Status"
          type="select"
          id="employmentStatus"
          v-model="employmentStatus"
          :required="true"
          :selectOptions="['Employed', 'Self-Employed', 'Unemployed', 'Student', 'Retired']"
          iconClass="icon fas fa-briefcase"
        />
        <FormInput
          label="Employment Type"
          type="select"
          id="employmentType"
          v-model="employmentType"
          :required="true"
          :selectOptions="['Full-Time', 'Part-Time', 'Contract', 'Temporary']"
          iconClass="icon fas fa-user-tie"
        />
        <div class="input-container">
          <label>Proof of Employment</label>
          <FileUpload
            id="proofOfEmploymentFile"
            buttonText="Upload Proof"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleFileUpload"
          />
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
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';

export default {
  components: {
    FormInput,
    FileUpload
  },
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

    const triggerFileUpload = () => {
      document.getElementById('proofOfEmploymentFile').click();
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
      goBack,
      triggerFileUpload
    };
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;  /* Adjusted height */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
   /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

.form-container {
  background-image: url('@/assets/back.jpg');
  background-size: cover;
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
.form-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
}
.form-container {
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button, .submit-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button, .submit-button {
  background-color: #7838dd;
  color: white;
}

.next-button:hover , .submit-button:hover{
  background-color: #9e79da;
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

.browse-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #7838dd;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background-color: #9e79da;
}
</style>