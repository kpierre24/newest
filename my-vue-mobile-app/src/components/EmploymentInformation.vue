<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
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
            <button type="button" class="back-button" @click="$router.go(-1)">Back</button>
            <button type="submit" class="submit-button">Next</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="desktop-view">
      <div class="login-section">
        <div class="form-container">
          <div class="logo-container">
            <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
          </div>
          <h1>Employment Information</h1>
          <form @submit.prevent="handleSubmit">
            <FormInput
              label="Employer Name"
              type="text"
              id="employerName-desktop"
              v-model="employerName"
              placeholder="Enter employer name"
              :required="true"
              iconClass="icon fas fa-building"
            />
            <FormInput
              label="Address Line 1"
              type="text"
              id="employerAddressLine1-desktop"
              v-model="employerAddressLine1"
              placeholder="Enter address line 1"
              :required="true"
              iconClass="icon fas fa-map-marker-alt"
            />
            <FormInput
              label="City"
              type="text"
              id="employerCity-desktop"
              v-model="employerCity"
              placeholder="Enter city"
              :required="true"
              iconClass="icon fas fa-city"
            />
            <FormInput
              label="Country"
              type="select"
              id="employerCountry-desktop"
              v-model="employerCountry"
              :required="true"
              :selectOptions="countryList"
              iconClass="icon fas fa-globe"
            />
            <FormInput
              label="Work Number"
              type="text"
              id="workNumber-desktop"
              v-model="workNumber"
              placeholder="Enter work number"
              :required="true"
              iconClass="icon fas fa-phone"
            />
            <FormInput
              label="Employment Status"
              type="select"
              id="employmentStatus-desktop"
              v-model="employmentStatus"
              :required="true"
              :selectOptions="['Employed', 'Self-Employed', 'Unemployed', 'Student', 'Retired']"
              iconClass="icon fas fa-briefcase"
            />
            <FormInput
              label="Employment Type"
              type="select"
              id="employmentType-desktop"
              v-model="employmentType"
              :required="true"
              :selectOptions="['Full-Time', 'Part-Time', 'Contract', 'Temporary']"
              iconClass="icon fas fa-user-tie"
            />
            <div class="input-container">
              <label>Proof of Employment</label>
              <FileUpload
                id="proofOfEmploymentFile-desktop"
                buttonText="Upload Proof"
                accept=".pdf,.jpg,.png"
                @file-uploaded="handleFileUpload"
              />
            </div>
            <div class="button-group">
              <button type="button" class="back-button" @click="$router.go(-1)">Back</button>
              <button type="submit" class="submit-button">Next</button>
            </div>
          </form>
        </div>
      </div>
      <div class="brand-section">
        <div class="brand-content">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
        </div>
      </div>
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
      handleSubmit
    };
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Mobile View Styles */
.mobile-view {
  display: none;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .mobile-view {
    display: block;
  }
  .desktop-view {
    display: none;
  }
}

/* Desktop View Styles */
.desktop-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
}

.login-section {
  grid-column: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

.brand-section {
  grid-column: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  position: relative;
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.brand-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.brand-logo {
  width: 180px;
  filter: brightness(1.2);
}

.form-container {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-sizing: border-box;
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 120px;
  height: auto;
}

h1 {
  font-size: clamp(24px, 4vw, 32px);
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.button-group {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
}

.back-button,
.submit-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #5251d3;
}

.submit-button {
  background-color: #FFBC2D;
  color: white;
}

.submit-button:hover {
  background-color: #e6a928;
}

@media (max-width: 480px) {
  .form-container {
    padding: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .back-button,
  .submit-button {
    width: 100%;
  }
}
</style>