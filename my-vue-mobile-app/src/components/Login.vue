<template>
  <div class="container">
    <div class="form-container">
      <h1>Sign In</h1>
      <p class="subtitle">Sign In using your Online Account</p>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
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
import { useDemoStore } from '@/store/demoStore';

export default {
  setup() {
    const router = useRouter();
    const store = useDemoStore();

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup.string().email('Please enter a valid email address').required('This field is required'),
        password: yup.string().required('This field is required')
      })
    });

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');

    const submitLogin = handleSubmit(async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: email.value,
          password: password.value
        });

        console.log('Login successful:', response.data);
        store.setUserEmail(email.value);
        router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your email and password.');
      }
    });

    return {
      email,
      emailError,
      password,
      passwordError,
      submitLogin
    };
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;  /* Adjusted height */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
   /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

.form-container {
  background: rgba(255, 255, 255, 0.541); /* Changed to plain white */
  background-image: url('@/assets/signin.jpg');
  background-size: cover;
  background-position: center;
  margin-top: 20px;
  position: relative;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  max-width: 400px;
  text-align: center;
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
    rgba(255, 255, 255, 0) 0%, /* Transparent at the top */
    rgba(255, 255, 255, 1) 100% /* White at the bottom */
  );
  z-index: 1;
}

.form-container > * {
  position: relative;
  z-index: 2;
}

.arrow {
  font-size: 2em;
  margin-bottom: 5px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
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
  background: #f9f9f9; /* Light gray background */
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
  background-color: #333; /* Dark color for the button */
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 10px;
}

.signin-button:hover {
  background-color: #555;
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

.credit-union-name {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}
</style>