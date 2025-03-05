<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
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
    
    // Get the base URL dynamically
    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

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
      if (event && event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        proofOfEmploymentFile.value = file;
      } else {
        console.warn('No file selected or file input event is invalid');
      }
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

        try {
          const response = await axios.post(`${baseURL}/employment-information`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Employment information submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

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
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #333;
  font-size: 20px;
  text-decoration: none;
  z-index: 10;
}

.back-icon {
  font-size: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #FFBC2D;
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

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
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

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

/* Scrollbar styling */
.content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>