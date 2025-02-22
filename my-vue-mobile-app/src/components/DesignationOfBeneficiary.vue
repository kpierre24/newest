<template>
  <div class="container">
    <div class="form-container">
      <h1>Designation of Beneficiary</h1>
      <form @submit.prevent="handleSubmit('next')">
        <div class="input-container">
          <i class="fas fa-user icon"></i>
          <input type="text" v-model="firstName" placeholder="First Name" required />
        </div>
        <div class="input-container">
          <i class="fas fa-user icon"></i>
          <input type="text" v-model="lastName" placeholder="Last Name" required />
        </div>
        <div class="input-container">
          <i class="fas fa-user icon"></i>
          <input type="text" v-model="otherName" placeholder="Other Name" />
        </div>
        <div class="input-container">
          <i class="fas fa-map-marker-alt icon"></i>
          <input type="text" v-model="addressLine1" placeholder="Address Line 1" required />
        </div>
        <div class="input-container">
          <i class="fas fa-map-marker-alt icon"></i>
          <input type="text" v-model="addressLine2" placeholder="Address Line 2" />
        </div>
        <div class="input-container">
          <i class="fas fa-city icon"></i>
          <input type="text" v-model="city" placeholder="City" required />
        </div>
        <div class="input-container">
          <i class="fas fa-globe icon"></i>
          <input type="text" v-model="country" placeholder="Country" required />
        </div>
        <div class="input-container">
          <i class="fas fa-birthday-cake icon"></i>
          <input type="date" v-model="dob" placeholder="Date of Birth" id="dob" required />
        </div>
        <div class="input-container">
          <i class="fas fa-venus-mars icon"></i>
          <select v-model="gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="input-container">
          <i class="fas fa-users icon"></i>
          <input type="text" v-model="relationshipToBeneficiary" placeholder="Relationship to Beneficiary" required />
        </div>
        <div class="input-container">
          <i class="fas fa-id-card icon"></i>
          <select v-model="typeOfId" required>
            <option value="" disabled>Select Type of ID</option>
            <option value="id card">ID Card</option>
            <option value="driver's permit">Driver's Permit</option>
            <option value="passport">Passport</option>
            <option value="birthpaper">Birthpaper</option>
          </select>
        </div>
        <div class="input-container">
          <i class="fas fa-id-badge icon"></i>
          <input type="text" v-model="idNumber" placeholder="ID Number" required />
        </div>
        <div class="input-container">
          <i class="fas fa-percent icon"></i>
          <input type="number" v-model="percentageOfInterest" placeholder="Percentage of Beneficiary Interest" required />
        </div>
        <div class="button-container">
          <button type="button" class="add-button" @click="handleSubmit('add')">Add Another Beneficiary</button>
          <a href="#" class="skip-button" @click.prevent="skipAddingBeneficiary">Skip Adding Beneficiary</a>
          <div class="navigation-buttons">
            <button type="button" class="back-button" @click="goBack">Back</button>
            <button type="submit" class="next-button">Next</button>
          </div>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;
  max-height: 120vh;  /* Adjusted height */
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
  background-image: url('@/assets/back.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 420px;
  max-width: 420px;
  max-height: 120vh;
  height: 100%;
  text-align: center;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

.form-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
}
.form-container {
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between buttons */
  width: 100%;
  margin-top: 20px;
}

.add-button,
.skip-button,
.back-button,
.next-button {
  width: 100%; /* Stretch buttons to full width */
  padding: 15px; /* Increase padding for better appearance */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  text-align: center;
}

.add-button {
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.add-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}

.skip-button {
  background-color: transparent;
  color: #7838dd; /* Purple text */
  text-decoration: underline;
}

.skip-button:hover {
  color: #9e79da; /* Lighter purple on hover */
}

.navigation-buttons {
  display: flex;
  gap: 10px; /* Space between Back and Next buttons */
}

.back-button {
  background-color: #f15539ea; /* Red background */
  color: white; /* White text */
}

.back-button:hover {
  background-color: #f38b79ea; /* Lighter red on hover */
}

.next-button {
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.next-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
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
}

.icon {
  position: absolute;
  left: 10px; /* Position the icon to the left */
  top: 50%; /* Center the icon vertically */
  transform: translateY(-50%);
  color: #666; /* Icon color */
  font-size: 16px; /* Icon size */
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px 12px 12px 40px; /* Add padding to the left for the icon */
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
}
</style>