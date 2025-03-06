<template>
  <div class="container">
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
  min-height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  min-height: 600px;
  max-height: 90vh;
  color: rgb(12, 12, 12);
  position: relative;
  margin: auto;
}

.content h1 {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(3px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

form {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: 20px 15px 80px;
  margin-top: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  box-sizing: border-box;
}

form::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

form::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.input-group {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 0 15px;
  box-sizing: border-box;
}

.back-button, .next-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
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

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 15px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover {
  background-color: #cccccc;
}

/* Media Queries */
@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .content {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .content h1 {
    border-radius: 0;
  }
  
  form {
    padding: 15px 10px 70px;
  }
  
  .input-group {
    padding: 0 10px;
  }
  
  .button-group {
    padding: 0 10px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .content {
    max-width: 450px;
  }
}

@media (min-width: 769px) {
  .content {
    max-width: 500px;
  }
}
</style>