<template>
  <div class="container">
    <div class="form-container">
      <h1>Email Verification</h1>
      <i class="icon fas fa-envelope email-icon"></i>
      <form @submit.prevent="verifyCode">
        <div class="input-group">
          <div class="input-container">
            <input type="text" v-model="verificationCode" id="verificationCode" placeholder="Enter 5-digit code" maxlength="5" required />
          </div>
        </div>
        <div class="button-group">
          <button class="back-button" @click="navigateToBasicInfo">Back</button>
          <button class="submit-button" type="submit">Verify</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmailVerification',
  data() {
    return {
      verificationCode: ''
    };
  },
  methods: {
    navigateToBasicInfo() {
      this.$router.push('/basic-info');
    },
    async verifyCode() {
      try {
        const verificationData = {
          verificationCode: this.verificationCode
        };

        // Debugging logs to check form data
        console.log('Verification Data:', verificationData);

        const response = await axios.post('http://localhost:3000/verify-email', verificationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Verification response:', response.data);

        // Navigate to mobile verification page
        this.$router.push('/mobile-verification');
      } catch (error) {
        console.error('Error verifying code:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

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

.email-icon {
  font-size: 200%; /* 200% bigger than a normal icon */
  color: #007bff;
  margin-bottom: 20px;
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
  font-size: 18px;
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
  font-size: 18px;
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