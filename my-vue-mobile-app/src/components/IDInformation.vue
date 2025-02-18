<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>ID Information</h1>
      <form @submit.prevent="submitIDInformation">
        <div class="id-box">
          <div class="id-container">
            <h2>First Form of ID</h2>
            <div class="input-container">
              <label for="firstIdType">Type of ID</label>
              <select v-model="firstIdType" id="firstIdType" @change="updateSecondIdOptions">
                <option value="" disabled>Select ID Type</option>
                <option value="id card">ID Card</option>
                <option value="passport">Passport</option>
                <option value="driver's permit">Driver's Permit</option>
                <option value="birthpaper">Birthpaper</option>
              </select>
            </div>
            <div class="input-container">
              <label for="firstIdNumber">ID Number</label>
              <input type="text" v-model="firstIdNumber" id="firstIdNumber" placeholder="Enter 12-digit ID number" maxlength="12" />
            </div>
            <div class="input-container">
              <label for="firstExpiryDate">Expiry Date</label>
              <input type="date" v-model="firstExpiryDate" id="firstExpiryDate" :min="minDate" />
            </div>
            <div class="input-container">
              <label for="firstIdDocument">Upload Document</label>
              <button class="browse-button" @click="triggerFileInput('firstIdDocument')">Browse</button>
              <input type="file" id="firstIdDocument" @change="handleFileUpload($event, 'first')" accept=".jpg, .png, .pdf" style="display: none;" />
            </div>
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
            <div class="input-container">
              <label for="secondIdDocument">Upload Document</label>
              <button class="browse-button" @click="triggerFileInput('secondIdDocument')">Browse</button>
              <input type="file" id="secondIdDocument" @change="handleFileUpload($event, 'second')" accept=".jpg, .png, .pdf" style="display: none;" />
            </div>
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
          <button type="submit" class="submit-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { useDateValidation } from '@/composables/useDateValidation';

export default {
  name: 'IDInformation',
  setup() {
    const { minDate, validateExpiryDate } = useDateValidation();

    return {
      minDate,
      validateExpiryDate
    };
  },
  data() {
    return {
      firstIdType: '',
      firstIdNumber: '',
      firstExpiryDate: '',
      firstIdDocument: null,
      secondIdType: '',
      secondIdNumber: '',
      secondExpiryDate: '',
      secondIdDocument: null,
      secondIdOptions: ['National ID', "Driver's Permit", 'Passport'],
      maritalStatus: ''
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