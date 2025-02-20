<template>
  <div class="container">
    <div class="form-container">
      <h1>Child ID Information</h1>
      <div class="id-box">
        <div class="id-container">
          <h2>First Form of ID</h2>
          <div class="input-container">
            <label for="firstIdType">Type of ID</label>
            <select v-model="firstIdType" id="firstIdType" @change="updateSecondIdOptions">
              <option value="" disabled>Select ID Type</option>
              <option value="ID Card">ID Card</option>
              <option value="Passport">Passport</option>
              <option value="Birthpaper">Birthpaper</option>
            </select>
          </div>
          <div class="input-container">
            <label for="firstIdNumber">ID Number</label>
            <input type="text" v-model="firstIdNumber" id="firstIdNumber" placeholder="Enter ID number" />
          </div>
          <div class="input-container">
            <label for="firstExpiryDate">Expiry Date</label>
            <input type="date" v-model="firstExpiryDate" id="firstExpiryDate" :max="maxExpiryDate" :disabled="firstIdType === 'Birthpaper'" />
          </div>
          <div class="input-container">
            
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
            <input type="text" v-model="secondIdNumber" id="secondIdNumber" placeholder="Enter ID number" />
          </div>
          <div class="input-container">
            <label for="secondExpiryDate">Expiry Date</label>
            <input type="date" v-model="secondExpiryDate" id="secondExpiryDate" :max="maxExpiryDate" :disabled="secondIdType === 'Birthpaper'" />
          </div>
          <div class="input-container">
            
            <button class="browse-button" @click="triggerFileInput('secondIdDocument')">Browse</button>
            <input type="file" id="secondIdDocument" @change="handleFileUpload($event, 'second')" accept=".jpg, .png, .pdf" style="display: none;" />
          </div>
          <div class="id-box">
          <div class="input-container">
            <label for="schoolName">School Name</label>
            <input type="text" v-model="schoolName" id="schoolName" placeholder="Enter school name" />
          </div>
        </div>
      </div>
      </div>
      <div class="button-group">
        <button class="back-button" @click="navigateToBasicInformation">Back</button>
        <button class="next-button" @click="navigateToNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildIDInformation',
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
      secondIdOptions: ['ID Card', 'Passport', 'Birthpaper'],
      schoolName: '',
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
      if (this.firstIdType === 'Birthpaper') {
        this.secondIdOptions = ['ID Card', 'Passport'];
      } else {
        this.secondIdOptions = ['ID Card', 'Passport', 'Birthpaper'];
      }
      // Reset secondIdType if it is no longer a valid option
      if (!this.secondIdOptions.includes(this.secondIdType)) {
        this.secondIdType = '';
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
    handleBackNavigation() {
      this.$router.push('/politically-exposed-persons-2');
    },
    navigateToNext() 
    {
      this.$router.push('/parent-guardian-information');
    }
  }
};
</script>

<style scoped>
.container  {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f4f4f4;
  padding: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.form-container::-webkit-scrollbar {
  display: none;
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