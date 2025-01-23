<template>
  <div class="container">
    <div class="form-container">
      <h1>Address Information</h1>
      <form @submit.prevent="submitAddress">
        <div class="input-group">
          <div class="input-container">
            <input type="text" v-model="AddressLine1" id="AddressLine1" placeholder="Address line 1" required />
          </div>
          <div class="input-container">
            <input type="text" v-model="AddressLine2" id="AddressLine2" placeholder="Address Line 2" required />
          </div>
          <div class="input-container">
            <input type="text" v-model="City" id="City" placeholder="City" required />
          </div>
          <div class="input-container">
            <input type="text" v-model="Country" id="Country" placeholder="Country" required />
          </div>
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
export default {
  name: 'Address',
  data() {
    return {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      Country: ''
    };
  },
  methods: {
    submitAddress() {
      // Handle address submission
      this.$router.push('/email-verification');
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
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
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

.input-group {
  width: 100%;
  margin-bottom: 15px;
}

.input-container {
  position: relative;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

input::placeholder {
  color: #aaa;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button {
  padding: 15px 20px;
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

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>