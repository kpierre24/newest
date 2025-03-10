<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
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
            <button type="submit" class="submit-button" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin"></i> Processing...
              </span>
              <span v-else>Next</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="desktop-view">
      <section class="login-section">
        <div class="login-content">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="engage-logo" />
          <div class="brand-text">
            <h1>ID Information</h1>
            <p>Enter your identification details</p>
          </div>
          <form @submit.prevent="submitIDInformation" class="desktop-form">
            <div v-if="formError" class="error-message">{{ formError }}</div>
            <div class="id-box">
              <div class="id-container">
                <h2>First Form of ID</h2>
                <FormInput
                  label="Type of ID"
                  type="select"
                  id="firstIdType-desktop"
                  v-model="firstIdType"
                  @change="updateSecondIdOptions"
                  :selectOptions="['ID Card', 'Passport', 'Driver\'s Permit', 'Birthpaper']"
                  iconClass="icon fas fa-id-card"
                />
                <FormInput
                  label="ID Number"
                  type="text"
                  id="firstIdNumber-desktop"
                  v-model="firstIdNumber"
                  placeholder="Enter 12-digit ID number"
                  :maxlength="12"
                  iconClass="icon fas fa-hashtag"
                />
                <FormInput
                  label="Expiry Date"
                  type="date"
                  id="firstExpiryDate-desktop"
                  v-model="firstExpiryDate"
                  :min="minDate"
                  :max="maxExpiryDate"
                  :error="firstExpiryDateError"
                  :disabled="firstIdType === 'Birthpaper'"
                  @validation="validateFirstExpiryDate"
                  iconClass="icon fas fa-calendar-alt"
                />
                <FileUpload
                  id="firstIdDocument-desktop"
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
                  id="secondIdType-desktop"
                  v-model="secondIdType"
                  :selectOptions="secondIdOptions"
                  iconClass="icon fas fa-id-card"
                />
                <FormInput
                  label="ID Number"
                  type="text"
                  id="secondIdNumber-desktop"
                  v-model="secondIdNumber"
                  placeholder="Enter 12-digit ID number"
                  :maxlength="12"
                  iconClass="icon fas fa-hashtag"
                />
                <FormInput
                  label="Expiry Date"
                  type="date"
                  id="secondExpiryDate-desktop"
                  v-model="secondExpiryDate"
                  :min="minDate"
                  :max="maxExpiryDate"
                  :error="secondExpiryDateError"
                  :disabled="secondIdType === 'Birthpaper'"
                  @validation="validateSecondExpiryDate"
                  iconClass="icon fas fa-calendar-alt"
                />
                <FileUpload
                  id="secondIdDocument-desktop"
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
                  id="maritalStatus-desktop"
                  v-model="maritalStatus"
                  :required="true"
                  :selectOptions="['Married', 'Divorced', 'Single', 'Widowed']"
                  iconClass="icon fas fa-heart"
                />
              </div>
            </div>
            <div class="button-group">
              <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
              <button type="submit" class="submit-button" :disabled="isLoading">
                <span v-if="isLoading">
                  <i class="fas fa-spinner fa-spin"></i> Processing...
                </span>
                <span v-else>Next</span>
              </button>
            </div>
          </form>
        </div>
      </section>
      <section class="brand-section">
        <div class="overlay"></div>
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
      </section>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  height: 100vh;
  width: 100%;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

/* Mobile View */
.mobile-view {
  display: none;
}

/* Desktop View */
.login-section {
  width: 50vw;
  height: 100vh;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.login-content {
  height: 100%;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.login-content::-webkit-scrollbar {
  width: 6px;
}

.login-content::-webkit-scrollbar-track {
  background: transparent;
}

.login-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.login-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.engage-logo {
  width: 100px;
  height: auto;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.engage-logo:hover {
  transform: scale(1.05);
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
}

.brand-text h1 {
  font-size: clamp(24px, 2.2vw, 32px);
  color: #261C6B;
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.brand-text p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
  letter-spacing: 0.5px;
  max-width: 80%;
  line-height: 1.5;
}

.desktop-form {
  width: 100%;
  max-width: 600px;
  padding: 0 1.5rem 2rem;
  flex: 1;
  overflow-y: auto;
  position: relative;
  margin-top: 1rem;
}

.brand-section {
  position: relative;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  overflow: hidden;
  width: 50vw;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
}

.brand-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(99, 98, 248, 0.4) 0%, rgba(38, 28, 107, 0.4) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  filter: brightness(1.2) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

.id-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.id-container {
  width: 100%;
}

.id-container h2 {
  font-size: clamp(16px, 1.4vw, 18px);
  color: #261C6B;
  margin-bottom: 1.5rem;
  font-weight: 500;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.5rem 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 0;
}

.back-button,
.submit-button {
  flex: 1;
  padding: 0.75rem;
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-button {
  background-color: transparent;
  border: 1px solid #6362F8;
  color: #6362F8;
}

.back-button:hover {
  background-color: rgba(99, 98, 248, 0.05);
  transform: translateY(-1px);
}

.submit-button {
  background-color: #6362F8;
  border: none;
  color: white;
}

.submit-button:hover {
  background-color: #4b4ac0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Desktop Form Input Styles */
:deep(.form-input-container) {
  margin-bottom: 1rem;
}

:deep(label) {
  font-size: clamp(13px, 1.1vw, 15px);
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: visible;
}

:deep(input), 
:deep(select) {
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: clamp(14px, 1.2vw, 16px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}

:deep(select) {
  padding-right: 2.5rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

:deep(.file-upload-container) {
  width: 100%;
  margin-bottom: 1rem;
}

:deep(.browse-button) {
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: clamp(14px, 1.2vw, 16px);
}

:deep(input:focus), 
:deep(select:focus) {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 98, 248, 0.1);
}

/* Error Message Styling */
.error-message {
  font-size: clamp(11px, 0.9vw, 13px);
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 3px solid #dc3545;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
}

/* Mobile Styles */
@media (max-width: 767px) {
  .container {
    display: block;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .mobile-view {
    display: block;
    min-height: 100vh;
  }

  .desktop-view {
    display: none;
  }

  .content {
    min-height: 100vh;
    padding: 1.5rem;
    background: white;
  }

  .content h1 {
    font-size: clamp(24px, 2.2vw, 28px);
    color: #261C6B;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .id-box {
    padding: 1.5rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .back-button,
  .submit-button {
    width: 100%;
  }

  :deep(input), 
  :deep(select) {
    height: 3rem;
    font-size: 16px;
  }
}

/* Desktop Styles */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1920px;
  }

  .mobile-view {
    display: none;
  }

  .desktop-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
  }

  .login-section {
    padding: 1.5rem;
  }

  .login-content {
    padding: 2rem;
    max-height: 100vh;
    overflow-y: auto;
  }

  .id-box {
    margin-bottom: 1.5rem;
  }

  :deep(.form-input-container) {
    margin-bottom: 1.5rem;
  }
}
</style>