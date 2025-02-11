<template>
  <div class="container">
    <div class="form-container">
      <h1>Child ID Information</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="firstIdType">First ID Type</label>
          <Field name="firstIdType" id="firstIdType" as="select" :class="{ 'is-invalid': errors.firstIdType }" v-model="firstIdType">
            <option value="">Select ID Type</option>
            <option value="national-id">National ID</option>
            <option value="passport">Passport</option>
            <option value="birthpaper">Birthpaper</option>
          </Field>
          <ErrorMessage name="firstIdType" class="error-message" />
        </div>
        <div class="input-container">
          <label for="firstIdNumber">First ID Number</label>
          <Field name="firstIdNumber" id="firstIdNumber" placeholder="Enter first ID number" :class="{ 'is-invalid': errors.firstIdNumber }" as="input" />
          <ErrorMessage name="firstIdNumber" class="error-message" />
        </div>
        <div class="input-container">
          <label for="firstExpiryDate">First ID Expiry Date</label>
          <Field name="firstExpiryDate" id="firstExpiryDate" type="date" :class="{ 'is-invalid': errors.firstExpiryDate }" as="input" :disabled="isFirstExpiryDateDisabled" />
          <ErrorMessage name="firstExpiryDate" class="error-message" />
        </div>
        <div class="input-container">
          <label for="firstIdDocument">First ID Document</label>
          <input type="file" id="firstIdDocument" @change="handleFirstIdFileUpload" required />
        </div>
        <div class="input-container">
          <label for="secondIdType">Second ID Type</label>
          <Field name="secondIdType" id="secondIdType" as="select" :class="{ 'is-invalid': errors.secondIdType }" v-model="secondIdType">
            <option value="">Select ID Type</option>
            <option v-if="firstIdType !== 'national-id'" value="national-id">National ID</option>
            <option v-if="firstIdType !== 'passport'" value="passport">Passport</option>
            <option v-if="firstIdType !== 'birthpaper'" value="birthpaper">Birthpaper</option>
          </Field>
          <ErrorMessage name="secondIdType" class="error-message" />
        </div>
        <div class="input-container">
          <label for="secondIdNumber">Second ID Number</label>
          <Field name="secondIdNumber" id="secondIdNumber" placeholder="Enter second ID number" :class="{ 'is-invalid': errors.secondIdNumber }" as="input" />
          <ErrorMessage name="secondIdNumber" class="error-message" />
        </div>
        <div class="input-container">
          <label for="secondExpiryDate">Second ID Expiry Date</label>
          <Field name="secondExpiryDate" id="secondExpiryDate" type="date" :class="{ 'is-invalid': errors.secondExpiryDate }" as="input" :disabled="isSecondExpiryDateDisabled" />
          <ErrorMessage name="secondExpiryDate" class="error-message" />
        </div>
        <div class="input-container">
          <label for="secondIdDocument">Second ID Document</label>
          <input type="file" id="secondIdDocument" @change="handleSecondIdFileUpload" required />
        </div>
        <div class="input-container">
          <label for="schoolName">School Name</label>
          <Field name="schoolName" id="schoolName" placeholder="Enter school name" :class="{ 'is-invalid': errors.schoolName }" as="input" />
          <ErrorMessage name="schoolName" class="error-message" />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useField, useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'ChildIDInformation',
  components: {
    Field,
    ErrorMessage
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const errorMessage = ref('');
    const firstIdDocument = ref(null);
    const secondIdDocument = ref(null);
    const firstIdType = ref('');
    const secondIdType = ref('');

    const isFirstExpiryDateDisabled = computed(() => firstIdType.value === 'birthpaper');
    const isSecondExpiryDateDisabled = computed(() => secondIdType.value === 'birthpaper');

    const validationSchema = yup.object({
    firstIdType: yup.string().required('First ID Type is required'),
    firstIdNumber: yup.string().required('First ID Number is required'),
    firstExpiryDate: yup.date().min(new Date(), 'First ID Expiry Date must be after the current date').when('firstIdType', (firstIdType) => {
        if (firstIdType === 'birthpaper') {
            return yup.date().nullable();
        } else {
            return yup.date().required('First ID Expiry Date is required');
        }
    }),
    secondIdType: yup.string().required('Second ID Type is required'),
    secondIdNumber: yup.string().required('Second ID Number is required'),
    secondExpiryDate: yup.date().min(new Date(), 'Second ID Expiry Date must be after the current date').when('secondIdType', (secondIdType) => {
        if (secondIdType === 'birthpaper') {
            return yup.date().nullable();
        } else {
            return yup.date().required('Second ID Expiry Date is required');
        }
    }),
    schoolName: yup.string().required('School name is required')
});

    const { handleSubmit, errors } = useForm({
      validationSchema
    });

    const handleFirstIdFileUpload = (event) => {
      firstIdDocument.value = event.target.files[0];
    };

    const handleSecondIdFileUpload = (event) => {
      secondIdDocument.value = event.target.files[0];
    };

    const onSubmit = async (values) => {
      try {
        const formData = new FormData();
        formData.append('firstIdType', values.firstIdType);
        formData.append('firstIdNumber', values.firstIdNumber);
        formData.append('firstExpiryDate', values.firstExpiryDate);
        formData.append('firstIdDocument', firstIdDocument.value);
        formData.append('secondIdType', values.secondIdType);
        formData.append('secondIdNumber', values.secondIdNumber);
        formData.append('secondExpiryDate', values.secondExpiryDate);
        formData.append('secondIdDocument', secondIdDocument.value);
        formData.append('schoolName', values.schoolName);

        // Save state to the store
        store.setChildIdInfo({
          firstIdType: values.firstIdType,
          firstIdNumber: values.firstIdNumber,
          firstExpiryDate: values.firstExpiryDate,
          firstIdDocument: firstIdDocument.value,
          secondIdType: values.secondIdType,
          secondIdNumber: values.secondIdNumber,
          secondExpiryDate: values.secondExpiryDate,
          secondIdDocument: secondIdDocument.value,
          schoolName: values.schoolName
        });

        // Debugging logs to check form data
        console.log('Form Data:', values);

        const response = await axios.post('http://localhost:3000/child-id-information', formData);
        console.log('Child ID information submitted:', response.data);

        // Navigate to the next page
        router.push('/parent-guardian-information');
      } catch (error) {
        console.error('Error submitting child ID information:', error);
        errorMessage.value = error.message;
        console.error('Error details:', error.response ? error.response.data : error.message);
      } finally {
        isLoading.value = false;
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      handleSubmit: handleSubmit(onSubmit),
      errors,
      errorMessage,
      handleFirstIdFileUpload,
      handleSecondIdFileUpload,
      navigateToPrevious,
      firstIdType,
      secondIdType,
      isFirstExpiryDateDisabled,
      isSecondExpiryDateDisabled,
      isLoading: ref(false)
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

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-group, .input-container {
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

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus, select:focus, textarea:focus {
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

.back-button, .submit-button, .next-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button, .next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.submit-button:hover, .next-button:hover {
  background-color: #0056b3;
}

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: left;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
}

.agree-button, .disagree-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 5px;
}

.checkbox-container input[type="checkbox"] {
  width: 14px;
  height: 14px;
}

.agree-button {
  background-color: #007bff;
  color: white;
}

.agree-button:hover {
  background-color: #0056b3;
}

.disagree-button {
  background-color: #6c757d;
  color: white;
}

.disagree-button:hover {
  background-color: #5a6268;
}

.common-icon {
  /* Add your CSS adjustments here */
  width: 24px;
  height: 24px;
  color: #333;
}
.icon fas fa-user {
  width: 24px;
  height: 24px;
  color: #333;
  transform: translateY(-10px);
  display: inline-block;
  vertical-align: middle;
}
</style>