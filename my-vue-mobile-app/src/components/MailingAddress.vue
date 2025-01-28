<template>
    <div class="container">
      <div class="form-container">
        <h1>Mailing Address Information</h1>
        <div class="input-container">
          <input type="text" v-model="AddressLine1" id="AddressLine1" placeholder="Address line 1" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="AddressLine2" id="AddressLine2" placeholder="Address line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="City" id="City" placeholder="City" required />
        </div>
        <div class="input-container">
          <label for="Country">Country</label>
          <select v-model="Country" id="Country" required>
            <option value="" disabled>Select Country</option>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="button-group">
          <button class="back-button" @click="navigateToPrevious">Back</button>
          <button class="next-button" @click="navigateToNext">Next</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { countries } from 'countries-list';
  
  export default {
    name: 'Address',
    data() {
      return {
        AddressLine1: '',
        AddressLine2: '',
        City: '',
        Country: '',
        countries: Object.values(countries).map(country => country.name)
      };
    },
    methods: {
      navigateToPrevious() {
        this.$router.go(-1);
      },
      navigateToNext() {
        this.$router.push('/id-information');
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
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
    text-align: center;
  }
  
  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
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
  
  input[type="text"], select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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