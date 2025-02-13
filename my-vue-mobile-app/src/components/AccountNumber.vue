<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Account Number</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="accountNumber">Account Number</label>
          <Field
            name="accountNumber"
            id="accountNumber"
            placeholder="Enter account number"
            :class="{ 'is-invalid': errors.accountNumber }"
            as="input"
          />
          <ErrorMessage name="accountNumber" class="error-message" />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default defineComponent({
  components: {
    Field,
    ErrorMessage
  },
  setup() {
    const router = useRouter();

    const validationSchema = yup.object({
      accountNumber: yup
        .string()
        .matches(/^\d{12}$/, 'Account number must be exactly 12 digits')
        .required('Account number is required')
    });

    const { handleSubmit, errors } = useForm({
      validationSchema
    });

    const onSubmit = (values) => {
      console.log('Form submitted:', values);
      // Navigate to the next page
      router.push('/due-diligence'); // Replace with the actual next page route
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      handleSubmit: handleSubmit(onSubmit),
      errors,
      navigateToPrevious
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f4f4f4; /* Light background for the page */
  padding: 20px;
}

.form-container {
  background: linear-gradient(to right, #a8c0ff, #3f2b96); /* Light purple gradient */
  padding: 40px;
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px; /* Narrower width for consistency */
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
  color: white; /* White text for contrast */
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  transition: 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.back-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.next-button:hover {
  background-color: #0056b3;
}

.logo {
  width: 157.5px;
  height: auto;
  margin-bottom: 20px;
}

.error-message {
  color: #ff4d4d; /* Red for error messages */
  font-size: 12px;
  margin-top: 5px;
}
</style>