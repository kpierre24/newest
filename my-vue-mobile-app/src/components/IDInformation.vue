<template>
  <div class="container">
    <div class="content">
      <h1>ID Information</h1>
      <form @submit.prevent="submitIDInformation">
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
              :selectOptions="['ID Card', 'Passport', 'Driver\'s Permit', 'Birthpaper']"
              iconClass="icon fas fa-id-card"
            />
            <FormInput
              label="ID Number"
              type="text"
              id="firstIdNumber"
              v-model="firstIdNumber"
              placeholder="Enter 12-digit ID number"
              :maxlength="12"
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
              placeholder="Enter 12-digit ID number"
              :maxlength="12"
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
          </div>
        </div>
        <div class="id-box">
          <div class="id-container">
            <h2>Marital Status</h2>
            <FormInput
              label="Marital Status"
              type="select"
              id="maritalStatus"
              v-model="maritalStatus"
              :required="true"
              :selectOptions="['Married', 'Divorced', 'Single', 'Widowed']"
              iconClass="icon fas fa-heart"
            />
          </div>
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button" :disabled="isLoading">
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i> Processing...
            </span>
            <span v-else>Next</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { useDateValidation } from '@/composables/useDateValidation';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue'; // Ensure this import is correct

export default {
  name: 'IDInformation',
  components: {
    FormInput,
    FileUpload // Ensure this component is registered
  },
  setup() {
    const { 
      minDate, 
      validateExpiryDate, 
      validateDOB, 
      dob, 
      dobError 
    } = useDateValidation();

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
    const secondIdOptions = ref(['National ID', "Driver's Permit", 'Passport']);
    const maritalStatus = ref('');
    const router = useRouter(); // Use useRouter
    const store = useDemoStore(); // Move store initialization to setup level
    const isLoading = ref(false);
    const formError = ref('');

    // Calculate max expiry date (today + 20 years)
    const maxExpiryDate = computed(() => {
      const today = new Date();
      const maxDate = new Date(today.getFullYear() + 20, today.getMonth(), today.getDate());
      return maxDate.toISOString().split('T')[0];
    });

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

    const validateIdType = () => {
      return firstIdType.value !== '' && secondIdType.value !== '';
    };

    const submitIDInformation = async () => {
      isLoading.value = true;
      formError.value = '';
      
      try {
        // Validate all required fields
        if (!firstIdType.value || !firstIdNumber.value || !firstExpiryDate.value || 
            !secondIdType.value || !secondIdNumber.value || !secondExpiryDate.value || 
            !maritalStatus.value) {
          formError.value = 'Please fill in all required fields';
          isLoading.value = false;
          return;
        }
        
        // Validate expiry dates
        if (!validateFirstExpiryDate() || !validateSecondExpiryDate()) {
          isLoading.value = false;
          return;
        }
        
        const idInfoData = {
          firstIdType: firstIdType.value,
          firstIdNumber: firstIdNumber.value,
          firstExpiryDate: firstExpiryDate.value,
          firstIdDocument: firstIdDocument.value,
          secondIdType: secondIdType.value,
          secondIdNumber: secondIdNumber.value,
          secondExpiryDate: secondExpiryDate.value,
          secondIdDocument: secondIdDocument.value,
          maritalStatus: maritalStatus.value
        };

        console.log('ID Info Data:', idInfoData);

        // Save to store first
        try {
          console.log('Store before update:', store);
          store.$patch((state) => {
            state.firstIdType = idInfoData.firstIdType;
            state.firstIdNumber = idInfoData.firstIdNumber;
            state.firstExpiryDate = idInfoData.firstExpiryDate;
            state.firstIdDocument = idInfoData.firstIdDocument;
            state.secondIdType = idInfoData.secondIdType;
            state.secondIdNumber = idInfoData.secondIdNumber;
            state.secondExpiryDate = idInfoData.secondExpiryDate;
            state.secondIdDocument = idInfoData.secondIdDocument;
            state.maritalStatus = idInfoData.maritalStatus;
          });
          console.log('Successfully saved to store');
        } catch (storeError) {
          console.error('Store error:', storeError);
          formError.value = 'Error saving data to application state';
          isLoading.value = false;
          return;
        }

        // Get the base URL dynamically
        const baseURL = getBaseURL();
        
        try {
          const response = await axios.post(`${baseURL}/id-information`, idInfoData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('ID info submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

        // Check if user is existing customer and navigate accordingly
        console.log('Store state after update:', store.$state);
        console.log('Customer status:', store.isExistingCustomer ? 'Existing' : 'New');
        if (store.isExistingCustomer) {
          console.log('Navigating to account number (existing customer)');
          router.push('/account-number');
        } else {
          console.log('Navigating to due diligence (new customer)');
          router.push('/due-diligence');
        }
      } catch (error) {
        console.error('Error submitting ID information:', error);
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

    const handleFileUpload = (file, idType) => {
      if (idType === 'first') {
        firstIdDocument.value = file;
      } else if (idType === 'second') {
        secondIdDocument.value = file;
      } else {
        console.error('Invalid idType:', idType);
      }
    };

    const updateSecondIdOptions = () => {
      if (firstIdType.value === 'National ID') {
        secondIdOptions.value = ["Driver's Permit", 'Birthpaper', 'Passport'];
      } else {
        secondIdOptions.value = ['National ID', "Driver's Permit", 'Birthpaper', 'Passport'];
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
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
      maritalStatus,
      minDate,
      maxExpiryDate,
      validateExpiryDate,
      validateFirstExpiryDate,
      validateSecondExpiryDate,
      dob,
      dobError,
      submitIDInformation,
      validateIdType,
      handleFileUpload,
      updateSecondIdOptions,
      navigateToPrevious,
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