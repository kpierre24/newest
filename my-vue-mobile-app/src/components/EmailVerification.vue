<template>
  <div class="container">
    <div class="form-container">
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-container {
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
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

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.verify-button {
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #007bff;
  color: white;
}

.verify-button:hover {
  background-color: #0056b3;
}
</style>