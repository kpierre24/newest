<template>
  <div class="container">
    <div class="form-container">
      <h1>Sign In</h1>
      <p class="subtitle">Sign In using your Online Account</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="credentials.email" id="email" required />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="credentials.password" id="password" required />
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </div>
        <button type="submit" class="signin-button">Sign In</button>
        <p class="recover-account">Recover your account</p>
      </form>
      <p class="powered-by">powered by</p>
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useDemoStore } from '@/store/demoStore'; // Import your Pinia store
import axios from 'axios';

const credentials = ref({
  email: '',
  password: '',
});

export default {
  setup() {
    const router = useRouter();
    const store = useDemoStore(); // Use your Pinia store

    const handleLogin = async () => {
      try {
        await store.login(credentials.value);
        router.push('/dashboard'); // Redirect to dashboard after login 
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your email and password.');
      }
    }

    // Form validation with vee-validate
    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup.string().email('Please enter a valid email address').required('This field is required'),
        password: yup.string().required('This field is required'),
      }),
    });

    
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  padding: 20px;
}

.form-container {
  background: rgba(255, 255, 255, 0.9);
  background-image: url('@/assets/woman background.jpg');
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  backdrop-filter: blur(5px);
}

.form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.336),
    rgba(213, 197, 231, 0.61)
  );
  z-index: 1;
}

.form-container > * {
  position: relative;
  z-index: 2;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #333;
  margin-bottom: 6px;
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
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.signin-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
}

.signin-button:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.recover-account {
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  margin-bottom: 20px;
}

.powered-by {
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}

.logo {
  width: 100px;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>