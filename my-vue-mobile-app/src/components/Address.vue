<template>
  <div class="container">
    <div class="form-container">
      <h1>Address Page</h1>
      <form @submit.prevent="submitAddress">
        <div class="form-group">
          <label for="addressLine1">Address Line 1:</label>
          <input type="text" v-model="addressLine1" id="addressLine1" required />
        </div>
        <div class="form-group">
          <label for="addressLine2">Address Line 2:</label>
          <input type="text" v-model="addressLine2" id="addressLine2" />
        </div>
        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" v-model="city" id="city" required />
        </div>
        <div class="form-group">
          <label for="country">Country:</label>
          <country-select v-model="country" id="country" required />
        </div>
        <div class="button-group">
          <button class="back-button" @click="$router.go(-1)">Back</button>
          <button class="submit-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { CountrySelect } from 'vue-country-region-select';

export default {
  name: 'Address',
  components: {
    CountrySelect
  },
  data() {
    return {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: ''
    };
  },
  methods: {
    submitAddress() {
      // Handle form submission
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
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.back-button, .submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.submit-button {
  background-color: #007bff;
  color: white;
}
</style>