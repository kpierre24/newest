<template>
  <div class="container">
    <section class="form-section">
      <div class="content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        <div class="brand-text">
          <h1>Child ID Information</h1>
          <p>Enter your child's identification details</p>
        </div>
        <form @submit.prevent="navigateToNext">
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
            </div>
          </div>
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
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToBasicInformation">Back</button>
            <button type="submit" class="next-button" :disabled="isLoading">
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-section {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  margin-bottom: 1.5rem;
}

.brand-text {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: 24px;
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.brand-text p {
  color: #666;
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    overflow: hidden;
  }

  .form-section {
    width: 50%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .form-section::-webkit-scrollbar {
    display: none;
  }

  .content {
    max-width: 450px;
    padding: 2rem;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
  }

  .brand-section {
    display: block;
    position: relative;
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
    overflow: hidden;
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

  .brand-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    filter: brightness(1.2);
    z-index: 2;
  }
}

/* Form field styles */
.id-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.id-container h2 {
  font-size: 18px;
  color: #261C6B;
  margin-bottom: 1.5rem;
}

:deep(.form-input-container) {
  margin-bottom: 1.25rem;
}

:deep(label) {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

:deep(input),
:deep(select) {
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s ease;
}

:deep(input:focus),
:deep(select:focus) {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 98, 248, 0.1);
}

/* File upload styling */
:deep(.upload-button) {
  width: 100%;
  height: 3rem;
  background-color: #f8f9fa;
  border: 1px dashed #6362F8;
  border-radius: 8px;
  color: #6362F8;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

:deep(.upload-button:hover) {
  background-color: rgba(99, 98, 248, 0.1);
}

/* Button group styling */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.back-button,
.next-button {
  flex: 1;
  height: 3rem;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
</style>