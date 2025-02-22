<template>
  <div class="container">
    <div class="form-container">
      <h1>Email Verification</h1>
      <h4>Enter the verification code sent to your email</h4>
      <i class="fas fa-envelope common-icon"></i> <!-- Email icon -->
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="verificationCode">Verification Code</label>
          <input
            type="number"
            v-model="verificationCode"
            id="verificationCode"
            placeholder="Enter 6-digit code"
            maxlength="6"
            oninput="this.value = this.value.slice(0, 6)"
          />
          <p class="center-text">Enter the code received in your email</p>
          <ErrorMessage name="verificationCode" class="error-message" />
        </div>
        <h5 v-if="resendCount < 5">
          Didn't receive the code? 
          <br />
          <a href="#" @click.prevent="resendCode">Resend code</a>
        </h5>
        <h5 v-else class="error-message">You are locked out of your account.</h5>
        <div v-if="attemptsLeft > 0" class="attempts-container">
          <div class="attempts-circle">{{ attemptsLeft }}</div>
          <p class="center-text">Attempts remaining</p>
        </div>
        <div class="button-group">
          <button class="verify-button" type="submit">Verify</button>
          <button class="back-button" @click="navigateToBasicInfo">Back</button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message center-text">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useDemoStore } from '@/store/demoStore';
import { useField, useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'EmailVerification',
  components: {
    Field,
    ErrorMessage
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const errorMessage = ref('');
    const verificationCode = ref('');
    const resendCount = ref(0);
    const attemptsLeft = ref(5);

    const validationSchema = yup.object({
      verificationCode: yup
        .string()
        .matches(/^\d{6}$/, 'Verification code must be exactly 6 digits')
        .required('Verification code is required')
    });

    const { handleSubmit, errors } = useForm({
      validationSchema
    });
     

    const onSubmit = async (values) => {
      try {
        const verificationData = {
          verificationCode: verificationCode.value
        };

        // Save verification code to the store
        store.setVerificationCode(verificationCode.value);

        // Debugging logs to check form data
        console.log('Verification Data:', verificationData);

        

        // API call to verify the code
        const response = await axios.post('http://localhost:3000/email-verification-successful', verificationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Check if the verification was successful
        if (response.data.success) {
          console.log('Verification successful');
          router.push('/email-verification-successful'); // Navigate to the next page
        } else {
          throw new Error(response.data.message || 'Invalid verification code');
        }
      } catch (error) {
        console.error('Error verifying code:', error);
        errorMessage.value = error.message;
        console.error('Error details:', error.response ? error.response.data : error.message);
        if (attemptsLeft.value > 0) {
          attemptsLeft.value--;
        }
      }
    };

    const navigateToBasicInfo = () => {
      router.push('/email-verification-successful');
    };

    const resendCode = () => {
      if (resendCount.value < 5) {
        resendCount.value++;
        // Logic to resend the code
        console.log('Code resent');
      }
    };

    return {
      handleSubmit: handleSubmit(onSubmit),
      errors,
      errorMessage,
      navigateToBasicInfo,
      verificationCode,
      resendCount,
      resendCode,
      attemptsLeft
    };
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
  max-width: 375px; /* Standard mobile phone width */
  margin: 0 auto;
}

.form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  text-align: center;
  background-image: url('@/assets/back.jpg');
  background-size: cover;
  overflow-y: auto;
  max-width: 375px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 10px;
}

h4 {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.common-icon {
  font-size: 80px;
  color: #00008b;
  margin-bottom: 20px;
}

.input-container {
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

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.center-text {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #555;
}

.attempts-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.attempts-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00008b;
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .verify-button {
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.back-button {
  background-color: #ff9800; /* Orange color */
  color: white;
}

.back-button:hover {
  background-color: #e68900;
}

.verify-button {
  background-color: #007bff; /* Blue color */
  color: white;
}

.verify-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>