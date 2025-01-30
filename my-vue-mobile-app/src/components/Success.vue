<template>
  <div class="container">
    <div class="content">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Success</h1>
      <p>You have successfully signed up for mobile banking and will be contacted soon by one of our agents.</p>
      <button @click="navigateToLogin">Go to Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Success',
  data() {
    return {
      // Add any form input data here if needed
      formData: {
        // Example form data
        userId: '12345',
        message: 'User has successfully signed up'
      }
    };
  },
  methods: {
    navigateToLogin() {
      // Make API call with form input data
      axios.post('http://localhost:3000/success', this.formData)
        .then(response => {
          console.log('Success:', response.data);
          // Navigate to the login screen
          this.$router.push('/login'); // Replace with the actual login route
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error response
        });
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

.content {
  text-align: center;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>