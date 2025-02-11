<template>
  <div class="container">
    <div class="form-container">
      <h1>Designation of Beneficiary</h1>
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <form @submit.prevent="handleSubmit('next')">
        <div class="input-container">
          <input type="text" v-model="firstName" placeholder="First Name" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="lastName" placeholder="Last Name" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="otherName" placeholder="Other Name" />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine1" placeholder="Address Line 1" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine2" placeholder="Address Line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="city" placeholder="City" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="country" placeholder="Country" required />
        </div>
        <div class="input-container">
          <label for="dob">Date of Birth</label>
          <input type="date" v-model="dob" id="dob" required />
        </div>
        <div class="input-container">
          <select v-model="gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="input-container">
          <input type="text" v-model="relationshipToBeneficiary" placeholder="Relationship to Beneficiary" required />
        </div>
        <div class="input-container">
          <select v-model="typeOfId" required>
            <option value="" disabled>Select Type of ID</option>
            <option value="id card">ID Card</option>
            <option value="driver's permit">Driver's Permit</option>
            <option value="passport">Passport</option>
            <option value="birthpaper">Birthpaper</option>
          </select>
        </div>
        <div class="input-container">
          <input type="text" v-model="idNumber" placeholder="ID Number" required />
        </div>
        <div class="input-container">
          <input type="number" v-model="percentageOfInterest" placeholder="Percentage of Beneficiary Interest" required />
        </div>
        <div class="additional-actions">
          <button type="button" class="add-button" @click="handleSubmit('add')">Add Another Beneficiary</button>
          <a href="#" @click.prevent="skipAddingBeneficiary">Skip Adding Beneficiary</a>
        </div>
        <div class="buttons">
          <button type="button" class="back-button" @click="goBack">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DesignationOfBeneficiary',
  data() {
    return {
      firstName: '',
      lastName: '',
      otherName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      dob: '',
      gender: '',
      relationshipToBeneficiary: '',
      typeOfId: '',
      idNumber: '',
      percentageOfInterest: '',
      errors: {}
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.firstName) {
        this.errors.firstName = 'First Name is required.';
      }
      if (!this.lastName) {
        this.errors.lastName = 'Last Name is required.';
      }
      if (!this.addressLine1) {
        this.errors.addressLine1 = 'Address Line 1 is required.';
      }
      if (!this.city) {
        this.errors.city = 'City is required.';
      }
      if (!this.country) {
        this.errors.country = 'Country is required.';
      }
      if (!this.dob) {
        this.errors.dob = 'Date of Birth is required.';
      }
      if (!this.gender) {
        this.errors.gender = 'Gender is required.';
      }
      if (!this.relationshipToBeneficiary) {
        this.errors.relationshipToBeneficiary = 'Relationship to Beneficiary is required.';
      }
      if (!this.typeOfId) {
        this.errors.typeOfId = 'Type of ID is required.';
      }
      if (!this.idNumber) {
        this.errors.idNumber = 'ID Number is required.';
      }
      if (!this.percentageOfInterest) {
        this.errors.percentageOfInterest = 'Percentage of Beneficiary Interest is required.';
      }
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit(action) {
      if (this.validateForm()) {
        // Make API call using Axios
        const payload = {
          firstName: this.firstName,
          lastName: this.lastName,
          otherName: this.otherName,
          addressLine1: this.addressLine1,
          addressLine2: this.addressLine2,
          city: this.city,
          country: this.country,
          dob: this.dob,
          gender: this.gender,
          relationshipToBeneficiary: this.relationshipToBeneficiary,
          typeOfId: this.typeOfId,
          idNumber: this.idNumber,
          percentageOfInterest: this.percentageOfInterest
        };
        axios.post('http://localhost:3000/designation-of-beneficiary', payload)
          .then(response => {
            console.log('Success:', response.data);
            // Handle success response
            if (action === 'next') {
              this.$router.push('/power-of-attorney'); // Navigate to Power of Attorney screen
            } else if (action === 'add') {
              this.clearForm();
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error response
          });
      }
    },
    clearForm() {
      this.firstName = '';
      this.lastName = '';
      this.otherName = '';
      this.addressLine1 = '';
      this.addressLine2 = '';
      this.city = '';
      this.country = '';
      this.dob = '';
      this.gender = '';
      this.relationshipToBeneficiary = '';
      this.typeOfId = '';
      this.idNumber = '';
      this.percentageOfInterest = '';
    },
    goBack() {
      this.$router.go(-1);
    },
    skipAddingBeneficiary() {
      this.$router.push('/power-of-attorney'); // Navigate to Power of Attorney screen
    }
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

.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.input-container .icon {
  position: absolute;
  left: 15px;  /* Align icon to the left */
  color: #666;
  font-size: 16px;
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px;
  padding-left: 40px; /* Add space on the left for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}/* Adds space between the icons */

</style>