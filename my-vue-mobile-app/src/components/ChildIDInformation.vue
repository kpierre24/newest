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
            <input type="text" v-model="secondIdNumber" id="secondIdNumber" placeholder="Enter ID number" />
          </div>
          <div class="input-container">
            <label for="secondExpiryDate">Expiry Date</label>
            <input type="date" v-model="secondExpiryDate" id="secondExpiryDate" :max="maxExpiryDate" :disabled="secondIdType === 'Birthpaper'" />
          </div>
          <div class="input-container">
            <label for="secondIdDocument">Upload Document</label>
            <button class="browse-button" @click="triggerFileInput('secondIdDocument')">Browse</button>
            <input type="file" id="secondIdDocument" @change="handleFileUpload($event, 'second')" accept=".jpg, .png, .pdf" style="display: none;" />
          </div>
          <div class="input-container">
            <label for="schoolName">School Name</label>
            <input type="text" v-model="schoolName" id="schoolName" placeholder="Enter school name" />
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
    navigateToBasicInformation() {
      this.$router.push('/basic-info');
    },
    navigateToNext() {
      // Handle navigation to the next screen
      alert('Navigating to the next screen...');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
  padding: 20px;
  text-align: center;
}

.form-container {
  background-color: rgb(255, 255, 255);
  background: linear-gradient(to right, #bdbcbe, #7da4e7);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.id-box {
  width: 75%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #333;
}

.id-container {
  width: 100%;
}

.input-container {
  width: 100%;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

input[type="text"], input[type="date"], select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.browse-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background-color: #0056b3;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>