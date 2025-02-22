<template>
  <div class="container">
    <div class="form-container">
    <div class="content">
      <h1>Success</h1>
      <p>You have successfully signed up for mobile banking and will be contacted soon by one of our agents.</p>
      <div class="next-button">
        <button @click="navigateToLogin">Go to Login</button>
      </div>
    </div>
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

<<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f4f4f4;
  padding: 20px;
}

.form-container {
  background-image: url('@/assets/back.jpg');
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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



.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.back-button, .next-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button {
  background-color: #7838dd;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.stretch-button {
  background-color: #2d5ad4;
  color: white;
  font-size: 12px;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.stretch-button:hover {
  background-color: #9e79da;
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
  display: flex;
  align-items: center;
}

.input-container .icon {
  position: absolute;
  left: 15px;  /* Align icon to the left */
  color: #666;
  font-size: 16px;
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px;
  padding-left: 40px; /* Add space on the left for the icon */
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
}/* Adds space between the icons */

</style>