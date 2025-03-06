<template>
  <div class="container">
    <div class="login-section">
      <div class="login-content">
        <h1>Sign In</h1>
        <p class="subtitle">Sign In using your Online Account</p>
        <form @submit.prevent="submitLogin" class="login-form">
          <div class="input-group">
            <div class="form-group">
              <div class="input-wrapper">
                <span class="input-icon">✉</span>
                <input type="email" v-model="email" placeholder="Email" required :disabled="isLoading" />
              </div>
              <p v-if="emailError" class="error-message">{{ emailError }}</p>
            </div>
            <div class="form-group">
              <div class="input-wrapper">
                <span class="input-icon">🔒</span>
                <input type="password" v-model="password" placeholder="Password" required :disabled="isLoading" />
                <span class="toggle-password">👁</span>
              </div>
              <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
            </div>
          </div>
          <button type="submit" class="signin-button" :disabled="isLoading">
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
          <a href="#" class="recover-link">Recover your account</a>
        </form>
        <div class="powered-by-section">
          <span class="powered-by">powered by</span>
          <img src="@/assets/logo.png" alt="Cathedral Credit Union" class="cathedral-logo" />
        </div>
      </div>
    </div>
    <div class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="engage-logo" />
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

    return {
      email,
      emailError,
      password,
      passwordError,
      loginError,
      isLoading,
      submitLogin
    };
  }
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
}

.login-section {
  background: white;
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 2vw, 2rem);
  position: relative;
  height: 100%;
  overflow-y: auto;
  justify-content: center;
}

.login-content {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  width: min(100%, 400px);
  margin: auto;
  padding: 0 clamp(0.5rem, 1vw, 1rem);
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.subtitle {
  color: #666;
  margin-bottom: 32px;
  font-size: 16px;
}

.login-form {
  width: 100%;
}

.input-group {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: #F5F5F5;
  border-radius: 8px;
  padding: 0 16px;
}

.input-icon {
  color: #666;
  margin-right: 12px;
}

.toggle-password {
  cursor: pointer;
  color: #666;
}

input {
  width: 100%;
  padding: 16px 0;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;
}

input:focus {
  outline: none;
}

.signin-button {
  width: 100%;
  padding: 16px;
  background: #6362F8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signin-button:hover {
  background: #5151f1;
}

.recover-link {
  display: block;
  text-align: center;
  color: #6362F8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 48px;
}

.powered-by-section {
  text-align: center;
  margin-top: clamp(2rem, 4vh, 3rem);
  margin-bottom: clamp(1rem, 2vh, 2rem);
}

.powered-by {
  display: block;
  color: #666;
  font-size: 12px;
  margin-bottom: 8px;
}

.cathedral-logo {
  height: 32px;
}

.brand-section {
  position: relative;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/happy-person.png') center/cover no-repeat;
  opacity: 0.6;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/gradient.png') center/cover no-repeat;
  opacity: 0.5;
  mix-blend-mode: soft-light;
  z-index: 1;
}

.engage-logo {
  width: clamp(200px, 30vw, 280px);
  position: relative;
  z-index: 2;
  filter: brightness(1.2);
}

@media (max-width: 1024px) {
  .login-content {
    padding: 0;
  }
  
  .engage-logo {
    width: clamp(180px, 25vw, 240px);
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    min-height: 100vh;
    height: auto;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
  }

  .brand-section {
    display: none;
  }

  .login-section {
    min-height: 100vh;
    height: auto;
    padding: 1.5rem;
    background: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .login-content {
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 28px;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: #1A1A1A;
    font-weight: 600;
    text-align: center;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 2rem;
    color: #666;
    text-align: center;
  }

  .login-form {
    width: 100%;
    margin-top: 1rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .input-wrapper {
    background: white;
    border-radius: 12px;
    padding: 0 1rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  input {
    padding: 1rem 0;
    font-size: 16px;
  }

  .input-icon {
    color: #6362F8;
    margin-right: 0.75rem;
  }

  .signin-button {
    background: #6362F8;
    padding: 1rem;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    margin: 1rem 0;
    box-shadow: 0 2px 4px rgba(99,98,248,0.2);
  }

  .recover-link {
    color: #6362F8;
    font-size: 16px;
    text-align: center;
    display: block;
    margin: 1rem 0 2rem;
    text-decoration: none;
  }

  .powered-by-section {
    margin-top: auto;
    padding: 1.5rem 0;
    text-align: center;
  }

  .powered-by {
    font-size: 12px;
    color: #666;
    margin-bottom: 0.5rem;
  }

  .cathedral-logo {
    height: 24px;
  }
}

@media (max-height: 600px) and (max-width: 768px) {
  h1 {
    margin-top: 1.5rem;
  }

  .subtitle {
    margin-bottom: 1.5rem;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 0.75rem;
  }

  .signin-button {
    margin: 0.75rem 0;
  }

  .recover-link {
    margin: 0.75rem 0 1.5rem;
  }

  .powered-by-section {
    padding: 1rem 0;
  }
}
</style>