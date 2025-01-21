<template>
  <div class="container">
    <div class="form-container">
      <h1>Signup Page</h1>
      <form @submit.prevent="submitSignup">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" v-model="firstName" id="firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" v-model="lastName" id="lastName" required />
        </div>
        <div class="form-group">
          <label for="otherName">Other Name:</label>
          <input type="text" v-model="otherName" id="otherName" />
        </div>
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="mobileNumber">Mobile Number:</label>
          <input type="tel" v-model="mobileNumber" id="mobileNumber" required />
        </div>
        <div class="form-group">
          <label for="gender">Gender:</label>
          <select v-model="gender" id="gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required />
        </div>
        <div class="button-group">
          <button class="back-button" @click="$router.go(-1)">Back</button>
          <button class="submit-button" type="submit">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      firstName: '',
      lastName: '',
      otherName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    submitSignup() {
      // Handle signup submission
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