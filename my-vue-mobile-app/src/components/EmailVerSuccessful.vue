<template>
     <div class="container">
    <a href="/" class="back-icon-link">
    <i class="fas fa-arrow-left back-icon"></i>
  </a>
    <div class="form-container"> 
      
   </div>
      <div class="content">
        <h1>Congratulations</h1>
        <h6>Compared and verified your details</h6>
        <div class="image-placeholder">
          <!-- Placeholder for the image -->
          <img src="@/assets/Group 5.png" alt="Verification Image" />
        </div>
        <p>Verified Email Successfully</p>
        <button class="next-button" @click="mobileVerification">Next</button>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    setup() {
      const router = useRouter();

      const mobileVerification = async () => {
        try {
          // Make an API call to verify the email
          await axios.post('http://localhost:3000/email-verification-successful', { status: 'success' });

          // Navigate to the mobile verification page
          router.push({ name: 'MobileVerification' });
        } catch (error) {
          console.error('Error verifying email:', error);
        }
      };

      return {
        mobileVerification,
      };
    },
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for depth */
  border-radius: 20px; /* Optional: Rounded corners */
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space items evenly */
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 812px;
  overflow-y: auto;
  color: rgb(12, 12, 12);
}

.image-placeholder {
  width: 100%;
  height: 200px; /* Adjust height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.image-placeholder img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.next-button {
  width: 100%; /* Make the button span across the container */
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 70px; /* Push the button to the bottom */
}

.next-button:hover {
  background-color: #0056b3;
}

.p{
  font-size: 10px;
  color: rgba(0, 0, 0, 0.1)
}

.logo {
  width: 165px; /* Slightly larger for better visibility */
  height: auto;
  margin-bottom: 20px;
}
h5{
  font-size: 12px;
  margin-bottom: 10px;
  color: rgb(20, 42, 163);
}

h1 {
  font-size: 24px;
  position: relative;
  top: 10%;
  margin-bottom: 0;
}

h3 {
  font-size: 14px;
  margin-bottom: 10px;
  color: rgb(20, 42, 163);
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>