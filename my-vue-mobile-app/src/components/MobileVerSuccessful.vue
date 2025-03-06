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
  min-height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  min-height: 600px;
  max-height: 90vh;
  color: rgb(12, 12, 12);
  position: relative;
  margin: auto;
}

.content h1 {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(3px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

.success-content {
  flex: 1;
  width: 100%;
  padding: 20px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.success-icon {
  font-size: clamp(48px, 10vw, 64px);
  color: #4CAF50;
  margin-bottom: 20px;
}

.success-message {
  font-size: clamp(18px, 4vw, 24px);
  color: #333;
  margin-bottom: 15px;
}

.success-details {
  font-size: clamp(14px, 3vw, 16px);
  color: #666;
  margin-bottom: 30px;
  padding: 0 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.next-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  transition: background-color 0.3s ease;
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #FF883F;
}

/* Media Queries */
@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .content {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .content h1 {
    border-radius: 0;
  }
  
  .success-content {
    padding: 15px 10px;
  }
  
  .button-group {
    padding: 0 10px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .content {
    max-width: 450px;
  }
}

@media (min-width: 769px) {
  .content {
    max-width: 500px;
  }
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