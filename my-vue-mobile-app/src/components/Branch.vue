<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Branch</h1>
      <h2>Choose which branch you would like your account managed at</h2>
      <div class="input-container">
        <select v-model="selectedBranch" required>
          <option value="" disabled>Select Branch</option>
          <option value="Port of Spain">Port of Spain</option>
          <option value="Milford Rd, Tobago">Milford Rd, Tobago</option>
        </select>
      </div>
      <div class="contact-method-container">
        <p>Choose which is your preferred method of contact</p>
        <hr />
        <div class="radio-container">
          <input type="radio" id="phone" value="phone" v-model="preferredContactMethod" />
          <label for="phone">Phone</label>
        </div>
        <div class="radio-container">
          <input type="radio" id="email" value="email" v-model="preferredContactMethod" />
          <label for="email">Email</label>
        </div>
      </div>
      <div class="contact-time-container">
        <p>Please choose the best time to contact you</p>
        <hr />
        <div class="radio-container">
          <input type="radio" id="morning" value="8:00am to 12:00pm" v-model="bestContactTime" />
          <label for="morning">8:00am to 12:00pm</label>
        </div>
        <div class="radio-container">
          <input type="radio" id="afternoon" value="12:00pm to 4:00pm" v-model="bestContactTime" />
          <label for="afternoon">12:00pm to 4:00pm</label>
        </div>
      </div>
      <div class="buttons">
        <button type="button" class="back-button" @click="goBack">Back</button>
        <button type="button" class="next-button" @click="handleSubmit">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Branch',
  data() {
    return {
      selectedBranch: '',
      preferredContactMethod: '',
      bestContactTime: ''
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        selectedBranch: this.selectedBranch,
        preferredContactMethod: this.preferredContactMethod,
        bestContactTime: this.bestContactTime
      };
      axios.post('http://localhost:3000/branch', payload)
        .then(response => {
          console.log('Success:', response.data);
          // Navigate to the next screen
          this.$router.push('/success'); // Replace with actual route
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error response
        });
    },
    goBack() {
      this.$router.go(-1);
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
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
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

.contact-method-container,
.contact-time-container {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-bottom: 20px;
}

.contact-method-container p,
.contact-time-container p {
  margin: 0 0 10px;
  font-size: 16px;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.radio-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-container input[type="radio"] {
  margin-right: 10px;
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

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}
</style>