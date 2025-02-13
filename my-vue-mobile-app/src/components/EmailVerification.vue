<template>
  <div class="container">
    <div class="form-container">
      <h1>Email Verification</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="verificationCode">Verification Code</label>
          <Field
            name="verificationCode"
            id="verificationCode"
            placeholder="Enter verification code"
            maxlength="5"
            :class="{ 'is-invalid': errors.verificationCode }"
            as="input"
          />
          <ErrorMessage name="verificationCode" class="error-message" />
        </div>
        <div class="button-group">
          <button class="back-button" @click="navigateToBasicInfo">Back</button>
          <button class="verify-button" type="submit">Verify</button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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

    const validationSchema = yup.object({
      verificationCode: yup
        .string()
        .matches(/^\d{5}$/, 'Verification code must be exactly 5 digits')
        .required('Verification code is required')
    });

    const { handleSubmit, errors } = useForm({
      validationSchema
    });

    const onSubmit = async (values) => {
      try {
        const verificationData = {
          verificationCode: values.verificationCode
        };

        // Save verification code to the store
        store.setVerificationCode(values.verificationCode);

        // Debugging logs to check form data
        console.log('Verification Data:', verificationData);

        const response = await axios.post('http://localhost:3000/verify-email', verificationData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Verification response:', response.data);

        // Navigate to mobile verification page
        router.push('/mobile-verification');
      } catch (error) {
        console.error('Error verifying code:', error);
        errorMessage.value = error.message;
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const navigateToBasicInfo = () => {
      router.push('/basic-info');
    };

    return {
      handleSubmit: handleSubmit(onSubmit),
      errors,
      errorMessage,
      navigateToBasicInfo
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
}

.form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
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
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button, .next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.submit-button:hover, .next-button:hover {
  background-color: #0056b3;
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
  gap: 10px; /* Space between checkbox and label */
}

.checkbox-container input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #007bff; /* Custom checkbox color */
}

.checkbox-container label {
  font-size: 14px;
  color: white; /* White text for contrast */
  cursor: pointer;
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