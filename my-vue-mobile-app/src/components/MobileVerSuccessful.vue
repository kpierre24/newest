<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Congratulations</h1>
      <h6>Your mobile number has been verified</h6>
      <div class="image-placeholder">
        <img src="@/assets/Group 5.png" alt="Verification Image" />
      </div>
      <p>Mobile Verification Successful</p>
      <button class="next-button" @click="navigateToMembershipDeclaration">Next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const navigateToMembershipDeclaration = async () => {
      try {
        // Make an API call to verify the mobile number
        const baseURL = getBaseURL();
        await axios.post(`${baseURL}/mobile-verification-successful`, { status: 'success' });

        // Navigate to the membership declaration page
        router.push({ name: 'MembershipDeclarationAgreement' });
      } catch (error) {
        console.error('Error verifying mobile number:', error);
        // Continue with navigation even if API fails
        router.push({ name: 'MembershipDeclarationAgreement' });
      }
    };

    return {
      navigateToMembershipDeclaration,
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
  justify-content: space-between; /* Space items evenly */
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%; /* Adjusted to prevent overflow */
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
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
  margin-top: 70px;
}

.next-button:hover {
  background-color: #9e79da;
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

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #333;
  font-size: 20px;
  text-decoration: none;
}

.back-icon {
  font-size: 24px;
}
</style>