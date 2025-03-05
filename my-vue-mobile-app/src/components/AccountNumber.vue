<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Enter Your Account Number</h1>
      <div class="input-container">
        <label for="accountNumber">Account Number</label>
        <div class="input-wrapper">
          <input
            type="number"
            v-model="accountNumber"
            id="accountNumber"
            placeholder="Enter your account number"
          />
          <i class="icon fas fa-hashtag"></i>
        </div>
        <div class="error-container" v-if="errorMessage">
          <span class="error">{{ errorMessage }}</span>
        </div>
      </div>
      <div class="button-group">
        <button @click="goBack" class="back-button">Back</button>
        <button @click="verifyAccountNumber" class="next-button" :disabled="loading">Next</button>
      </div>
      <a href="#" @click.prevent="skipAccountNumber" class="skip-link">Skip adding account number</a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '../store/demoStore';
import { watch } from 'vue';

export default {
  name: 'AccountNumber',
  setup() {
    const router = useRouter();
    const demoStore = useDemoStore();
    const errorMessage = ref('');
    const loading = ref(false);

    const accountNumber = ref(demoStore.bankAccountNumber);

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    watch(
      () => demoStore.bankAccountNumber,
      (newAccountNumber) => {
        accountNumber.value = newAccountNumber;
      }
    );

    watch(accountNumber, (newAccountNumber) => {
      demoStore.setBankAccountNumber(newAccountNumber);
    });

    const verifyAccountNumber = async () => {
      loading.value = true;
      errorMessage.value = '';
      const accountNumberValue = demoStore.bankAccountNumber;
      try {
        // Basic validation: Check if it's a 12-digit number
        if (!/^\d{12}$/.test(accountNumberValue)) {
          errorMessage.value = 'Account number must be 12 digits.';
          loading.value = false;
          return;
        }

        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/account-number`, {
          accountNumber: accountNumberValue,
        });

        if (response.data.success) {
          router.push('/due-diligence');
        } else {
          errorMessage.value = 'Invalid account number. Please try again.';
        }
      } catch (error) {
        console.error('Error verifying account number:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
        // Continue with navigation even if API fails
        router.push('/due-diligence');
      } finally {
        loading.value = false;
      }
    };

    const goBack = () => {
      router.back();
    };

    const skipAccountNumber = () => {
      router.push('/due-diligence');
    };

    return {
      accountNumber,
      errorMessage,
      loading,
      verifyAccountNumber,
      goBack,
      skipAccountNumber,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #333;
  font-size: 20px;
  text-decoration: none;
  z-index: 10;
}

.back-icon {
  font-size: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #FFBC2D;
}

.input-container {
  width: 100%;
  position: relative;
  margin-bottom: 20px;
  text-align: left;
}

.input-wrapper {
  position: relative;
  width: 100%;
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
  padding-left: 40px; /* Adjust padding to make space for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus {
  border-color: #FFBC2D;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 188, 45, 0.3);
}

.error-container {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.error {
  display: block;
}

.icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.skip-link {
  display: block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
}

.skip-link:hover {
  text-decoration: underline;
}

/* Scrollbar styling */
.content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>