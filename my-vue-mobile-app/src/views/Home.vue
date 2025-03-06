<template>
  <div class="container">
    <div class="login-section">
      <div class="login-content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="engage-logo" />
        <div class="brand-text">
          <h1>Cathedral</h1>
          <h1>ENGAGE</h1>
          <p>Better Banking | Service</p>
        </div>
        <h2>Welcome to Cathedral Online</h2>
        <p class="subtitle">If you don't have an online account click, "Don't have an account?", to get started</p>
        <div class="button-group">
          <button class="signin-button" @click="$router.push('/login')">Sign In</button>
          <button class="create-account-button" @click="handleCreateAccount">Don't have an account?</button>
        </div>
      </div>
    </div>
    <div class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </div>
    <div class="powered-by-section">
      <span class="powered-by">powered by</span>
      <img src="@/assets/logo.png" alt="Cathedral Credit Union" class="cathedral-logo" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';

export default {
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const isLoading = ref(false);
    const loginError = ref('');

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const { handleSubmit } = useForm({
      validationSchema: yup.object({
        email: yup.string().email('Please enter a valid email address').required('This field is required'),
        password: yup.string().required('This field is required')
      })
    });

    const { value: email, errorMessage: emailError } = useField('email');
    const { value: password, errorMessage: passwordError } = useField('password');

    // Promise-based validation
    const validateCredentials = () => {
      return new Promise((resolve, reject) => {
        loginError.value = '';
        
        if (!email.value || !password.value) {
          reject(new Error('Please enter both email and password'));
          return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          reject(new Error('Please enter a valid email address'));
          return;
        }
        
        resolve({
          email: email.value,
          password: password.value
        });
      });
    };

    const submitLogin = handleSubmit(async () => {
      isLoading.value = true;
      loginError.value = '';
      
      try {
        // Validate credentials
        const credentials = await validateCredentials();
        
        // Make API call
        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/login`, credentials);

        console.log('Login successful:', response.data);
        store.setUserEmail(email.value);
        router.push('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        
        if (error.message) {
          loginError.value = error.message;
        } else if (error.response && error.response.data && error.response.data.message) {
          loginError.value = error.response.data.message;
        } else {
          loginError.value = 'Login failed. Please check your email and password.';
        }
      } finally {
        isLoading.value = false;
      }
    });

    // Handle create account button click
    const handleCreateAccount = () => {
      // Reset any existing customer state
      store.setNewCustomer(false);
      store.setExistingCustomer(false);
      // Navigate to new or existing customer selection
      router.push('/new-or-existing-customer');
    };

    return {
      email,
      emailError,
      password,
      passwordError,
      loginError,
      isLoading,
      submitLogin,
      handleCreateAccount
    };
  }
};
</script>
<style scoped>
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #F5F5F5;
}

.container {
  height: 100vh;
  margin-top: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('@/assets/gradient.png') center/cover no-repeat;
  opacity: 0.9;
  z-index: 1;
}

.login-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  background: white;
}

.login-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.engage-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: 42px;
  color: #6362F8;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.brand-text p {
  color: #261C6B;
  font-size: 14px;
  margin: 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

h2 {
  font-size: 32px;
  color: #261C6B;
  margin-bottom: 1rem;
  font-weight: 600;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
  max-width: 300px;
}

.button-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.signin-button {
  width: 100%;
  padding: 1rem;
  background: #6362F8;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.create-account-button {
  width: 100%;
  padding: 1rem;
  background: transparent;
  color: #6362F8;
  border: 2px solid #6362F8;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.brand-section {
  position: relative;
  background: url('@/assets/happy-person.png') center/cover no-repeat;
  display: none;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/gradient.png') center/cover no-repeat;
  opacity: 0.9;
  z-index: 1;
}

.brand-logo {
  position: relative;
  z-index: 2;
  width: 200px;
}

.powered-by-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  position: relative;
  z-index: 2;
}

.powered-by {
  color: #666;
  font-size: 14px;
}

.cathedral-logo {
  height: 24px;
  width: auto;
}

/* Mobile Styles */
@media (max-width: 767px) {
  .container {
    display: flex;
    flex-direction: column;
    background: white;
  }

  .container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45%;
    background: url('@/assets/happy-person.png') center/cover no-repeat;
  }

  .container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45%;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    z-index: 1;
  }

  .login-section {
    flex: 1;
    background: transparent;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
  }

  .login-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  .engage-logo {
    width: 60px;
    height: 60px;
    margin-bottom: 1rem;
  }

  .brand-text {
    margin-bottom: 2rem;
  }

  .brand-text h1 {
    font-size: 36px;
    color: #6362F8;
  }

  .brand-text p {
    color: #261C6B;
    font-size: 14px;
    margin-top: 0.5rem;
  }

  h2 {
    font-size: 28px;
    color: #261C6B;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 16px;
    color: #666;
    margin-bottom: 2rem;
    max-width: 300px;
    line-height: 1.5;
  }

  .button-group {
    width: 100%;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .powered-by-section {
    width: 100%;
    padding: 1rem;
    position: relative;
    z-index: 2;
  }
}

/* Desktop Styles */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: white;
    height: 100vh;
    max-width: 100%;
    width: 100%;
  }

  .container::before,
  .container::after {
    display: none;
  }

  .login-section {
    height: 100vh;
    width: 100%;
    background: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .login-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
  }

  .brand-section {
    position: relative;
    display: block;
    background: url('@/assets/happy-person.png') center/cover no-repeat;
    height: 100vh;
    width: 100%;
  }

  .brand-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url('@/assets/gradient.png') center/cover no-repeat;
    opacity: 0.7;
    z-index: 1;
  }

  .brand-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(99, 98, 248, 0.4) 0%, rgba(38, 28, 107, 0.4) 100%);
    mix-blend-mode: overlay;
    z-index: 1;
  }

  .brand-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 240px;
    filter: brightness(1.2);
    z-index: 2;
  }

  .engage-logo {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
  }

  .brand-text h1 {
    font-size: 42px;
  }

  .brand-text p {
    font-size: 14px;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 2rem;
    max-width: 320px;
  }

  .button-group {
    width: 100%;
    max-width: 320px;
    gap: 1rem;
  }

  .powered-by-section {
    padding: 1.5rem;
    background: white;
  }
}

@media (min-width: 1200px) {
  .login-content {
    max-width: 480px;
  }

  .brand-logo {
    width: 280px;
  }
}

@media (max-height: 700px) {
  .engage-logo {
    width: 50px;
    height: 50px;
  }

  .brand-text h1 {
    font-size: 32px;
  }

  .brand-text p {
    font-size: 12px;
  }

  .subtitle {
    margin-bottom: 1.5rem;
  }

  .button-group {
    gap: 0.75rem;
  }
}
</style>