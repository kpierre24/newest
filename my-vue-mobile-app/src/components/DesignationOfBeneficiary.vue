<template>
  <div class="container">
    <div class="form-container">
      <h1>Designation of Beneficiary</h1>
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

.input-container {
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button,
.next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  width: 48%;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}

.back-button:hover {
  background-color: #5a6268;
}

.additional-actions {
  margin-top: 20px;
  text-align: center;
}

.add-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  background-color: #28a745;
  color: white;
  margin-bottom: 10px;
}

.add-button:hover {
  background-color: #218838;
}

a {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>