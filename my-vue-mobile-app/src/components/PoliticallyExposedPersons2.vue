<template>
  <div class="pep-screen">
    <h1>Politically Exposed Person</h1>
    <form @submit.prevent="handleSubmit">
      <p>Are you a close associate of a PEP?</p>
      <div>
        <input type="radio" id="pep-yes" name="pep-associate" value="yes" v-model="pepAssociate">
        <label for="pep-yes">Yes</label>
        <input type="radio" id="pep-no" name="pep-associate" value="no" v-model="pepAssociate">
        <label for="pep-no">No</label>
      </div>
      <p v-if="errors.pepAssociate" class="error">{{ errors.pepAssociate }}</p>

      <p>Indicate the type of relationship to PEP</p>
      <input type="text" placeholder="Relationship to PEP" v-model="relationshipToPep">
      <p v-if="errors.relationshipToPep" class="error">{{ errors.relationshipToPep }}</p>

      <p>Name of PEP</p>
      <input type="text" placeholder="Name of PEP" v-model="nameOfPep">
      <p v-if="errors.nameOfPep" class="error">{{ errors.nameOfPep }}</p>

      <hr>
      <p>Based on my responses</p>
      <div>
        <input type="radio" id="i-am-pep" name="pep-status" value="i-am-pep" v-model="pepStatus">
        <label for="i-am-pep">I am a politically exposed person</label>
        <input type="radio" id="i-am-not-pep" name="pep-status" value="i-am-not-pep" v-model="pepStatus">
        <label for="i-am-not-pep">I am not a politically exposed person</label>
      </div>
      <p v-if="errors.pepStatus" class="error">{{ errors.pepStatus }}</p>

      <div class="buttons">
        <button type="button" class="back-button" @click="goBack">Back</button>
        <button type="submit" class="next-button">Next</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PoliticallyExposedPersons2',
  data() {
    return {
      pepAssociate: '',
      relationshipToPep: '',
      nameOfPep: '',
      pepStatus: '',
      errors: {},
      dateOfBirth: '' // Assuming you have a way to get this from BasicInfo screen
    };
  },
  methods: {
    validateForm() {
      this.errors = {};
      if (!this.pepAssociate) {
        this.errors.pepAssociate = 'Please select if you are a close associate of a PEP.';
      }
      if (!this.relationshipToPep) {
        this.errors.relationshipToPep = 'Please indicate the type of relationship to PEP.';
      }
      if (!this.nameOfPep) {
        this.errors.nameOfPep = 'Please provide the name of the PEP.';
      }
      if (!this.pepStatus) {
        this.errors.pepStatus = 'Please select your PEP status.';
      }
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (this.validateForm()) {
        // Make API call using Axios
        const payload = {
          pepAssociate: this.pepAssociate,
          relationshipToPep: this.relationshipToPep,
          nameOfPep: this.nameOfPep,
          pepStatus: this.pepStatus
        };
        axios.post('http://localhost:3000/politically-exposed-persons-2', payload)
          .then(response => {
            console.log('Success:', response.data);
            // Handle success response
            this.navigateBasedOnAge();
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle error response
          });
      }
    },
navigateBasedOnAge() {
  if (!this.dateOfBirth) {
    console.error("Date of birth is required!");
    return;
  }

  const age = this.calculateAge(this.dateOfBirth);
  if (age < 17) {
    this.$router.push('/child-id-information');
  } else {
    this.$router.push('/id-information');
  }
},
    calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    // Assuming you have a way to get the date of birth from the BasicInfo screen
    // For example, you might use Vuex or pass it as a prop
    this.dateOfBirth = '2005-01-01'; // Replace with actual date of birth
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

.error {
  color: red;
  font-size: 12px;
}

.buttons {
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
  width: 48%; /* Adjust width to fit two buttons side by side */
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

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
</style>