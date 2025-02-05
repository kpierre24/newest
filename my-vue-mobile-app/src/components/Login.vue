<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Login Page</h1>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" 
                 v-model="email" 
                 :error="emailError" 
                 id="email" 
                 required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" 
          v-model="password"
          :error="passwordError" 
          id="password" required />
        </div>
        <div class="button-group">
          <button class="back-button" @click="$router.go(-1)">Back</button>
          <button class="submit-button" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
  setup() {
    const router = useRouter();

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

        // Handle successful login
        console.log('Login successful:', response.data);
        router.push('/dashboard'); // Replace with the actual route after login
      } catch (error) {
        // Handle login error
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

.error {
  color: red;
  font-size: 12px;
}

.back-button,
.submit-button {
  margin-top: 20px;
}
</style>