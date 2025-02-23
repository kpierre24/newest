<template>
  <div class="container">
    <div class="form-container">
      
      <h1>Enter Account Number</h1>
      <p>Please enter any account number you have with Cathedral Credit Union</p>
      <form @submit.prevent="handleSubmit">
        <FormInput
          label="Account Number"
          type="text"
          id="accountNumber"
          name="accountNumber"
          placeholder="Enter account number"
          v-model="accountNumber"
          :required="true"
          :error="errors.accountNumber"
        />
        <FormInput
          label="Verify Account Number"
          type="text"
          id="verifyAccountNumber"
          name="verifyAccountNumber"
          placeholder="Re-enter account number"
          v-model="verifyAccountNumber"
          :required="true"
          :error="errors.verifyAccountNumber"
        />
        <div class="button-group">
          <FormButton text="Back" type="button" @click="navigateToPrevious" />
          <FormButton text="Next" type="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import FormInput from '@/props/FormInput.vue';


export default {
  components: { FormInput },
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const accountNumber = ref('');
    const verifyAccountNumber = ref('');
    const errors = ref({});

    const handleSubmit = () => {
      // Validation logic
      if (!accountNumber.value) errors.value.accountNumber = 'Account number is required';
      if (!verifyAccountNumber.value) errors.value.verifyAccountNumber = 'Please verify your account number';
      if (accountNumber.value !== verifyAccountNumber.value) {
        errors.value.verifyAccountNumber = 'Account numbers do not match';
      }

      if (Object.keys(errors.value).length === 0) {
        // Save account number to the store
        store.setAccountNumber(accountNumber.value);

        // Navigate to the next page
        router.push('/power-of-attorney');
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      accountNumber,
      verifyAccountNumber,
      errors,
      handleSubmit,
      navigateToPrevious,
    };
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #FFFFFF;
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
  background-image: url('@/assets/back.jpg');
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 420px;
  max-width: 420px;
  height: 100%;
  text-align: center;
  overflow-y: auto;
  height:850.5px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px; /* Reduced margin */
  color: #FFBC2D;
  margin: 0; /* Darker heading color */
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #000000; /* Slightly darker text color */
}

.account-number-box {
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  padding: 20px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add shadow */
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.input-with-icon {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.icon {
  position: absolute;
  left: 10px; /* Position the icon to the left */
  color: #333; /* Icon color */
  font-size: 20px; /* Icon size */
}

input {
  width: 100%;
  padding: 12px 12px 12px 40px; /* Add padding to the left for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: white; /* Solid white background for input */
  transition: 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.button-group {
  display: flex;
  flex-direction: column; /* Arrange buttons vertically */
  gap: 10px; /* Add space between buttons */
  margin-top: 20px;
  width: 100%; /* Stretch to the width of the container */
}

.back-button, .next-button {
  width: 100%; /* Stretch buttons to full width */
  padding: 15px; /* Increase padding for better appearance */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea; /* Red background */
  color: white; /* White text */
}

.back-button:hover {
  background-color: #f38b79ea; /* Lighter red on hover */
}

.next-button {
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.next-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}

.error-message {
  color: #ff4d4d; /* Red for error messages */
  font-size: 12px;
  margin-top: 5px;
}
</style>