<template>
  <div class="container">
    <div class="form-container">
      <h1>Mobile [SMS] Verification</h1>
      <h4>Enter the verification code sent as an SMS to your mobile phone</h4>
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
          <button class="verify-button" type="submit">Verify</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'MobileVerification',
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const verificationCode = ref('');

    const handleSubmit = () => {
      if (verificationCode.value.length === 6) {
        store.setVerificationCode(verificationCode.value);
        router.push('/mobile-verification-successful');
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
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  min-height: 600px;
  max-height: 90vh;
  color: rgb(12, 12, 12);
  position: relative;
  margin: auto;
}

.content h1 {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(3px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

.verification-content {
  flex: 1;
  width: 100%;
  padding: 20px 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.verification-text {
  font-size: clamp(14px, 3vw, 16px);
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
  padding: 0 20px;
}

.otp-input {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0 20px;
}

.otp-input input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: clamp(18px, 4vw, 24px);
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.otp-input input:focus {
  border-color: #FFBC2D;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.verify-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  transition: background-color 0.3s ease;
  background-color: #FFBC2D;
  color: white;
}

.verify-button:hover {
  background-color: #9e79da;
}

.verify-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.verify-button:disabled:hover {
  background-color: #cccccc;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 15px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

/* Media Queries */
@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .content {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .content h1 {
    border-radius: 0;
  }
  
  .verification-content {
    padding: 15px 10px;
  }
  
  .button-group {
    padding: 0 10px;
  }
  
  .otp-input input {
    width: 35px;
    height: 35px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .content {
    max-width: 450px;
  }
}

@media (min-width: 769px) {
  .content {
    max-width: 500px;
  }
}
</style>