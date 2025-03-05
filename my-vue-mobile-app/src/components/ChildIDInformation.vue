<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Child ID Information</h1>
      <div v-if="formError" class="error-message">{{ formError }}</div>
      <div class="id-box">
        <div class="id-container">
          <h2>First Form of ID</h2>
          <FormInput
            label="Type of ID"
            type="select"
            id="firstIdType"
            v-model="firstIdType"
            @change="updateSecondIdOptions"
            :selectOptions="['ID Card', 'Passport', 'Birthpaper']"
            iconClass="icon fas fa-id-card"
          />
          <FormInput
            label="ID Number"
            type="text"
            id="firstIdNumber"
            v-model="firstIdNumber"
            placeholder="Enter ID number"
            iconClass="icon fas fa-hashtag"
          />
          <FormInput
            label="Expiry Date"
            type="date"
            id="firstExpiryDate"
            v-model="firstExpiryDate"
            :min="minDate"
            :max="maxExpiryDate"
            :error="firstExpiryDateError"
            :disabled="firstIdType === 'Birthpaper'"
            @validation="validateFirstExpiryDate"
            iconClass="icon fas fa-calendar-alt"
          />
          <FileUpload
            id="firstIdDocument"
            buttonText="Upload ID"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleFileUpload($event, 'first')"
          />
        </div>
      </div>
      <div class="id-box">
        <div class="id-container">
          <h2>Second Form of ID</h2>
          <FormInput
            label="Type of ID"
            type="select"
            id="secondIdType"
            v-model="secondIdType"
            :selectOptions="secondIdOptions"
            iconClass="icon fas fa-id-card"
          />
          <FormInput
            label="ID Number"
            type="text"
            id="secondIdNumber"
            v-model="secondIdNumber"
            placeholder="Enter ID number"
            iconClass="icon fas fa-hashtag"
          />
          <FormInput
            label="Expiry Date"
            type="date"
            id="secondExpiryDate"
            v-model="secondExpiryDate"
            :min="minDate"
            :max="maxExpiryDate"
            :error="secondExpiryDateError"
            :disabled="secondIdType === 'Birthpaper'"
            @validation="validateSecondExpiryDate"
            iconClass="icon fas fa-calendar-alt"
          />
          <FileUpload
            id="secondIdDocument"
            buttonText="Upload ID"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleFileUpload($event, 'second')"
          />
          <div class="id-box">
            <FormInput
              label="School Name"
              type="text"
              id="schoolName"
              v-model="schoolName"
              placeholder="Enter school name"
              iconClass="icon fas fa-school"
            />
          </div>
        </div>
      </div>
      <div class="button-group">
        <button type="button" class="back-button" @click="navigateToBasicInformation">Back</button>
        <button type="button" class="next-button" @click="navigateToNext" :disabled="isLoading">
          <span v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i> Processing...
          </span>
          <span v-else>Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDateValidation } from '@/composables/useDateValidation';
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'ChildIDInformation',
  components: {
    FormInput,
    FileUpload
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const { 
      minDate, 
      validateExpiryDate, 
      validateDOB, 
      dob, 
      dobError 
    } = useDateValidation();

    // Calculate max expiry date (today + 10 years)
    const maxExpiryDate = computed(() => {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() + 10, today.getMonth(), today.getDate());
      return maxDate.toISOString().split('T')[0];
    });

    const firstIdType = ref('');
    const firstIdNumber = ref('');
    const firstExpiryDate = ref('');
    const firstExpiryDateError = ref('');
    const firstIdDocument = ref(null);
    const secondIdType = ref('');
    const secondIdNumber = ref('');
    const secondExpiryDate = ref('');
    const secondExpiryDateError = ref('');
    const secondIdDocument = ref(null);
    const secondIdOptions = ref(['ID Card', 'Passport', 'Birthpaper']);
    const schoolName = ref('');
    const isLoading = ref(false);
    const formError = ref('');

    const validateFirstExpiryDate = () => {
      if (firstIdType.value === 'Birthpaper') {
        firstExpiryDateError.value = '';
        return true;
      }
      
      if (!firstExpiryDate.value) {
        firstExpiryDateError.value = 'Expiry date is required';
        return false;
      }
      
      if (!validateExpiryDate(firstExpiryDate.value)) {
        firstExpiryDateError.value = 'Expiry date must be today or in the future';
        return false;
      }
      
      firstExpiryDateError.value = '';
      return true;
    };

    const validateSecondExpiryDate = () => {
      if (secondIdType.value === 'Birthpaper') {
        secondExpiryDateError.value = '';
        return true;
      }
      
      if (!secondExpiryDate.value) {
        secondExpiryDateError.value = 'Expiry date is required';
        return false;
      }
      
      if (!validateExpiryDate(secondExpiryDate.value)) {
        secondExpiryDateError.value = 'Expiry date must be today or in the future';
        return false;
      }
      
      secondExpiryDateError.value = '';
      return true;
    };

    const updateSecondIdOptions = () => {
      if (firstIdType.value === 'Birthpaper') {
        secondIdOptions.value = ['ID Card', 'Passport'];
      } else {
        secondIdOptions.value = ['ID Card', 'Passport', 'Birthpaper'];
      }
      if (!secondIdOptions.value.includes(secondIdType.value)) {
        secondIdType.value = '';
      }
    };

    const handleFileUpload = (file, idType) => {
      if (idType === 'first') {
        firstIdDocument.value = file;
      } else {
        secondIdDocument.value = file;
      }
    };

    const navigateToNext = async () => {
      isLoading.value = true;
      formError.value = '';
      
      try {
        // Validate all required fields
        if (!firstIdType.value || !firstIdNumber.value || !firstExpiryDate.value || 
            !secondIdType.value || !secondIdNumber.value || !secondExpiryDate.value || 
            !schoolName.value) {
          formError.value = 'Please fill in all required fields';
          return;
        }
        
        // Validate expiry dates
        if (!validateFirstExpiryDate() || !validateSecondExpiryDate()) {
          return;
        }
        
        const childIdInfo = {
          firstIdType: firstIdType.value,
          firstIdNumber: firstIdNumber.value,
          firstExpiryDate: firstExpiryDate.value,
          firstIdDocument: firstIdDocument.value,
          secondIdType: secondIdType.value,
          secondIdNumber: secondIdNumber.value,
          secondExpiryDate: secondExpiryDate.value,
          secondIdDocument: secondIdDocument.value,
          schoolName: schoolName.value,
        };

        // Save to store first
        store.setChildIdInfo(childIdInfo);

        // Get the base URL dynamically
        const baseURL = getBaseURL();
        
        try {
          const response = await axios.post(`${baseURL}/child-id-information`, childIdInfo, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Child ID Info submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

        // Navigate to parent/guardian information
        router.push('/parent-guardian-information');
      } catch (error) {
        console.error('Error submitting child ID info:', error);
        formError.value = 'An error occurred while submitting your information';
      } finally {
        isLoading.value = false;
      }
    };

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const navigateToBasicInformation = () => {
      router.push('/politically-exposed-persons-2');
    };

    return {
      maxExpiryDate,
      minDate,
      validateExpiryDate,
      validateDOB,
      dob,
      dobError,
      firstIdType,
      firstIdNumber,
      firstExpiryDate,
      firstExpiryDateError,
      firstIdDocument,
      secondIdType,
      secondIdNumber,
      secondExpiryDate,
      secondExpiryDateError,
      secondIdDocument,
      secondIdOptions,
      schoolName,
      validateFirstExpiryDate,
      validateSecondExpiryDate,
      updateSecondIdOptions,
      handleFileUpload,
      navigateToNext,
      navigateToBasicInformation,
      isLoading,
      formError
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

h2 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
}

.id-box {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  width: 100%;
}

.id-container {
  width: 100%;
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

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  border-left: 4px solid #d32f2f;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover {
  background-color: #cccccc;
}
</style>