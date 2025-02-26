<template>
  <div class="container">
    <div class="form-container">
      <h1>Enter Your Account Number</h1>
      <div class="input-container">
        <label for="accountNumber">Account Number</label>
        <input
          type="number"
          v-model="accountNumber"
          id="accountNumber"
          placeholder="Enter your account number"
        />
        <div class="error-container" v-if="errorMessage">
          <span class="error">{{ errorMessage }}</span>
        </div>
      </div>
      <div class="button-group">
        <button @click="goBack" class="button back-button">Back</button>
        <button @click="verifyAccountNumber" class="button next-button" :disabled="loading">Next</button>
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
          return;
        }

        const response = await axios.post('http://localhost:3000/account-number', {
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


input-group, .input-container {
  width: 100%;
  position: relative;
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

input, select {
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

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

error-container {
  color: red;
  font-size: 12px;
}

.error {
  display: block;
}



.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .form-container {
    padding: 20px;
    width: 100%;
    max-width: 100%;
  }

  .button-group {
    flex-direction: column;
    gap: 5px;
  }

  .back-button, .next-button, .submit-button {
    padding: 10px;
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 100%;
    height: 100vh;
    padding: 40px;
  }

  .form-container {
    padding: 60px;
    width: 100%;
    max-width: 800px;
    height: auto;
  }

  .button-group {
    flex-direction: row;
    justify-content: space-between;
  }

  .back-button, .next-button, .submit-button {
    width: 48%;
    padding: 20px;
    font-size: 18px;
  }
}

.skip-link {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
  text-align: center;
}

.skip-link:hover {
  text-decoration: underline;
}
</style>