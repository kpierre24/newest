<template>
  <div class="container">
    <div class="form-container">
      <h1>Power of Attorney</h1>
      <div class="text-content">
        <p>"Authorize a trusted individual to manage your banking activities 
        under a Power of Attorney (POA). You can revoke this authorization 
        anytime through your account settings."</p>
      </div>
      <form @submit.prevent="handleSubmit('next')">
        <div class="input-container">
          <input type="text" v-model="firstName" placeholder="First Name of Authorized Person" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="lastName" placeholder="Last Name of Authorized Person" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="otherName" placeholder="Other Name of Authorized Person" />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine1" placeholder="Address Line 1 of Authorized Person" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine2" placeholder="Address Line 2 of Authorized Person" />
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
          <input type="text" v-model="relationshipToPrincipal" placeholder="Relationship to Principal" required />
        </div>
        <div class="input-container">
          <input type="email" v-model="email" placeholder="Email Address" required />
        </div>
        <div class="input-container">
          <input type="tel" v-model="contactNumber" placeholder="Contact Number" required />
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
          <label for="idDocument">Upload ID Document</label>
          <input type="file" @change="handleFileUpload('idDocument', $event)" id="idDocument" />
        </div>
        <div class="input-container">
          <label for="poaDocument">Upload Power of Attorney Document</label>
          <input type="file" @change="handleFileUpload('poaDocument', $event)" id="poaDocument" />
        </div>
        <div class="additional-actions">
          <button type="button" class="add-button" @click="skipAddingPowerOfAttorney">Add Power of Attorney Later</button>
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
  name: 'PowerOfAttorney',
  data() {
    return {
      description: '',
      firstName: '',
      lastName: '',
      otherName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      dob: '',
      gender: '',
      relationshipToPrincipal: '',
      email: '',
      contactNumber: '',
      typeOfId: '',
      idDocument: null,
      poaDocument: null,
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
      if (!this.relationshipToPrincipal) {
        this.errors.relationshipToPrincipal = 'Relationship to Principal is required.';
      }
      if (!this.email) {
        this.errors.email = 'Email Address is required.';
      }
      if (!this.contactNumber) {
        this.errors.contactNumber = 'Contact Number is required.';
      }
      if (!this.typeOfId) {
        this.errors.typeOfId = 'Type of ID is required.';
      }
      if (!this.idDocument) {
        this.errors.idDocument = 'ID Document is required.';
      }
      if (!this.poaDocument) {
        this.errors.poaDocument = 'Power of Attorney Document is required.';
      }
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit(action) {
      if (this.validateForm()) {
        // Make API call using Axios
        const formData = new FormData();
        formData.append('firstName', this.firstName);
        formData.append('lastName', this.lastName);
        formData.append('otherName', this.otherName);
        formData.append('addressLine1', this.addressLine1);
        formData.append('addressLine2', this.addressLine2);
        formData.append('city', this.city);
        formData.append('country', this.country);
        formData.append('dob', this.dob);
        formData.append('gender', this.gender);
        formData.append('relationshipToPrincipal', this.relationshipToPrincipal);
        formData.append('email', this.email);
        formData.append('contactNumber', this.contactNumber);
        formData.append('typeOfId', this.typeOfId);
        formData.append('idDocument', this.idDocument);
        formData.append('poaDocument', this.poaDocument);

        axios.post('http://localhost:3000/power-of-attorney', formData)
          .then(response => {
            console.log('Success:', response.data);
            // Handle success response
            if (action === 'next') {
              this.$router.push('/branch'); // Navigate to Branch screen
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error response
          });
      }
    },
    handleFileUpload(field, event) {
      if (field === 'idDocument') {
        this.idDocument = event.target.files[0];
      } else if (field === 'poaDocument') {
        this.poaDocument = event.target.files[0];
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    skipAddingPowerOfAttorney() {
      this.$router.push('/branch'); // Navigate to Branch screen
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

.text-content {
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"],
input[type="number"],
input[type="email"],
input[type="tel"],
input[type="file"],
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
</style>