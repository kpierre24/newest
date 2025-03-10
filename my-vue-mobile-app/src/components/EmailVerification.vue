<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
        <h1>Email Verification</h1>
        <h4>Enter the verification code sent to your email</h4>
        <form @submit.prevent="handleSubmit">
          <div class="input-container">
            <label for="verificationCode">Verification Code</label>
            <input
              type="text"
              v-model="verificationCode"
              id="verificationCode"
              placeholder="Enter 6-digit code"
              maxlength="6"
              oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6)"
            />
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="$router.go(-1)">Back</button>
            <button class="verify-button" type="submit">Verify</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="desktop-view">
      <div class="login-section">
        
          <div class="logo-container">
            <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
          </div>
          <h1>Email Verification</h1>
          <h4>Enter the verification code sent to your email</h4>
          <form @submit.prevent="handleSubmit">
            <div class="input-container">
              <label for="verificationCode-desktop">Verification Code</label>
              <input
                type="text"
                v-model="verificationCode"
                id="verificationCode-desktop"
                placeholder="Enter 6-digit code"
                maxlength="6"
                oninput="this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6)"
              />
            </div>
            <div class="button-group">
              <button type="button" class="back-button" @click="$router.go(-1)">Back</button>
              <button class="verify-button" type="submit">Verify</button>
            </div>
          </form>  
      </div>
      <div class="brand-section">
        <div class="brand-content">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'EmailVerification',
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const verificationCode = ref('');

    const handleSubmit = () => {
      if (verificationCode.value.length === 6) {
        store.setVerificationCode(verificationCode.value); // Save the code to the store
        router.push('/email-verification-successful'); // Navigate to the next page
      } else {
        alert('Please enter a 6-digit code.');
      }
    };

    return {
      verificationCode,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

/* Mobile View Styles */
.mobile-view {
  display: none;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .mobile-view {
    display: block;
  }
  .desktop-view {
    display: none;
  }
}

/* Desktop View Styles */
.desktop-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  width: 100%;
}

.login-section {
  width: 50vw;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.login-section form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
}

.logo {
  width: 120px;
  height: auto;
}

h1 {
  font-size: clamp(24px, 2.5vw, 32px);
  color: #333;
  margin-bottom: 0.5rem;
  text-align: center;
  width: 100%;
}

h4 {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #555;
  margin-bottom: 2rem;
  text-align: center;
  width: 100%;
}

.input-container {
  width: 100%;
  margin-bottom: 0;
}

label {
  display: block;
  font-size: clamp(14px, 1.2vw, 16px);
  color: #555;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: clamp(14px, 1.2vw, 16px);
  background: #fff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 98, 248, 0.1);
}

.button-group {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}

.back-button,
.verify-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #5251d3;
}

.verify-button {
  background-color: #FFBC2D;
  color: white;
}

.verify-button:hover {
  background-color: #e6a928;
}

.brand-section {
  position: relative;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
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
  width: 150px;
  filter: brightness(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

.form-container {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  .form-container {
    padding: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .back-button,
  .verify-button {
    width: 100%;
  }
}
</style>