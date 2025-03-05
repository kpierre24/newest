<template>
  <div class="container">
    <div class="content">
      <h1>Success</h1>
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <p>You have successfully signed up for mobile banking and will be contacted soon by one of our agents.</p>
      <div class="button-group">
        <button @click="navigateToLogin" class="login-button">Go to Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Success',
  setup() {
    const router = useRouter();
    
    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };
    
    const navigateToLogin = async () => {
      // Example form data
      const formData = {
        userId: '12345',
        message: 'User has successfully signed up'
      };
      
      try {
        // Try to submit to API but don't block navigation if it fails
        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/success`, formData);
        console.log('Success data submitted:', response.data);
      } catch (error) {
        console.error('Error submitting success data:', error);
        // Continue with navigation even if API fails
      }
      
      // Navigate to the login screen
      console.log('Navigating to /login');
      router.push('/login');
    };
    
    return {
      navigateToLogin
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #FFBC2D;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
  color: #333;
}

.success-icon {
  font-size: 80px;
  color: #4CAF50;
  margin: 20px 0;
}

.button-group {
  width: 100%;
  margin-top: 20px;
}

.login-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  background-color: #FFBC2D;
  color: white;
}

.login-button:hover {
  background-color: #9e79da;
}

/* Scrollbar styling */
.content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>