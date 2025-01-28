<template>
  <div class="container">
    <div class="form-container">
      <h1>Mobile Verification</h1>
      <form @submit.prevent="verifyCode">
        <div class="input-group">
          <div class="input-container">
            <input type="text" v-model="verificationCode" id="verificationCode" placeholder="Enter 5-digit code" maxlength="5" required />
          </div>
        </div>
        <div class="button-group">
          <button class="back-button" @click="navigateToEmailVerification">Back</button>
          <button class="submit-button" type="submit">Verify</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MobileVerification',
  data() {
    return {
      verificationCode: ''
    };
  },
  methods: {
    navigateToEmailVerification() {
      this.$router.push('/email-verification');
    },
    async verifyCode() {
      try {
        const verificationData = {
          verificationCode: this.verificationCode
        };

        // Debugging logs to check form data
        console.log('Verification Data:', verificationData);

        const response = await axios.post('http://localhost:3000/verify-mobile', verificationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Verification response:', response.data);

        // Navigate to membership declaration agreement page
        this.$router.push('/membership-declaration-agreement');
      } catch (error) {
        console.error('Error verifying code:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
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
  background: white;
  padding: 20px;
  text-align: center;
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 90vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
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
  padding: 10px 20px;
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