<template>
  <div class="container">
    <div class="form-container">
      
      <h1>ID Information</h1>
      <form @submit.prevent="submitIDInformation">
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
            <div class="input-container">
              <label for="secondIdType">Type of ID</label>
              <select v-model="secondIdType" id="secondIdType">
                <option value="" disabled>Select ID Type</option>
                <option v-for="option in secondIdOptions" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
            <div class="input-container">
              <label for="secondIdNumber">ID Number</label>
              <input type="text" v-model="secondIdNumber" id="secondIdNumber" placeholder="Enter 12-digit ID number" maxlength="12" />
            </div>
            <div class="input-container">
              <label for="secondExpiryDate">Expiry Date</label>
              <input type="date" v-model="secondExpiryDate" id="secondExpiryDate" :min="minDate" />
            </div>
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
            <div class="input-container">
              <select v-model="maritalStatus" id="maritalStatus" required>
                <option value="" disabled>Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Single">Single</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { useDateValidation } from '@/composables/useDateValidation';
import { ref } from 'vue';
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';

export default {
  name: 'IDInformation',
  components: {
    FormInput,
    FileUpload
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
    const firstIdDocument = ref(null);
    const secondIdType = ref('');
    const secondIdNumber = ref('');
    const secondExpiryDate = ref('');
    const secondIdDocument = ref(null);
    const secondIdOptions = ref(['National ID', "Driver's Permit", 'Passport']);
    const maritalStatus = ref('');

    const submitIDInformation = () => {
      let isValid = true;

      // Validate first form of ID
      isValid = validateRequired('firstIdType', firstIdType.value) && isValid;
      isValid = validateLength('firstIdNumber', firstIdNumber.value, 12, 12) && isValid;
      isValid = validateExpiryDate(firstExpiryDate.value) && isValid;

      // Validate second form of ID
      isValid = validateRequired('secondIdType', secondIdType.value) && isValid;
      isValid = validateLength('secondIdNumber', secondIdNumber.value, 12, 12) && isValid;
      isValid = validateExpiryDate(secondExpiryDate.value) && isValid;

      if (isValid) {
        // Proceed with form submission
        console.log('Form submitted successfully');
      } else {
        console.log('Validation failed');
      }
    };

    return {
      firstIdType,
      firstIdNumber,
      firstExpiryDate,
      firstIdDocument,
      secondIdType,
      secondIdNumber,
      secondExpiryDate,
      secondIdDocument,
      secondIdOptions,
      maritalStatus,
      minDate,
      validateExpiryDate,
      dob,
      dobError,
      submitIDInformation,
    };
  },
  computed: {
    maxExpiryDate() {
      const today = new Date();
      const maxDate = new Date(today.setFullYear(today.getFullYear() + 20));
      return maxDate.toISOString().split('T')[0];
    }
  },
  methods: {
    updateSecondIdOptions() {
      if (this.firstIdType === 'National ID') {
        this.secondIdOptions = ["Driver's Permit", 'Birthpaper', 'Passport'];
      } else {
        this.secondIdOptions = ['National ID', "Driver's Permit", 'Birthpaper', 'Passport'];
      }
    },
    handleFileUpload(event, idType) {
      const file = event.target.files[0];
      if (idType === 'first') {
        this.firstIdDocument = file;
      } else {
        this.secondIdDocument = file;
      }
    },
    triggerFileInput(id) {
      document.getElementById(id).click();
    },
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async submitIDInformation() {
      if (!this.validateIdType()) {
        console.error('Invalid ID Type');
        return;
      }

      try {
        const idInfoData = {
          firstIdType: this.firstIdType,
          firstIdNumber: this.firstIdNumber,
          firstExpiryDate: this.firstExpiryDate,
          firstIdDocument: this.firstIdDocument,
          secondIdType: this.secondIdType,
          secondIdNumber: this.secondIdNumber,
          secondExpiryDate: this.secondExpiryDate,
          secondIdDocument: this.secondIdDocument,
          maritalStatus: this.maritalStatus
        };

        console.log('ID Info Data:', idInfoData);

        const response = await axios.post('http://localhost:3000/id-information', idInfoData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('ID info submitted:', response.data);

        const store = useDemoStore();
        if (store.isExistingCustomer) {
          this.$router.push('/account-number');
        } else {
          this.$router.push('/due-diligence');
        }
      } catch (error) {
        console.error('Error submitting ID info:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    },
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
  background-color: #ffffff;
  background-image: url('@/assets/back.jpg');
  background-size: cover;
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

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #800080;
  border-radius: 8px;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #4b0082;
  outline: none;
  box-shadow: 0 0 5px rgba(128, 0, 128, 0.2);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
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
  background-color: #7838dd;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
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

.id-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.id-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.browse-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #800080;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background-color: #4b0082;
}
</style>