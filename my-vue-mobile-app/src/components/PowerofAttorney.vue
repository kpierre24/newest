<template>
  <div class="container">
    <div class="form-container">
      <h1>Power of Attorney</h1>
      
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="poaFirstName">First Name</label>
          <Field name="poaFirstName" id="poaFirstName" placeholder="First Name" :class="{ 'is-invalid': errors.poaFirstName }" as="input" />
          <ErrorMessage name="poaFirstName" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaLastName">Last Name</label>
          <Field name="poaLastName" id="poaLastName" placeholder="Last Name" :class="{ 'is-invalid': errors.poaLastName }" as="input" />
          <ErrorMessage name="poaLastName" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaOtherName">Other Name</label>
          <Field name="poaOtherName" id="poaOtherName" placeholder="Other Name" :class="{ 'is-invalid': errors.poaOtherName }" as="input" />
          <ErrorMessage name="poaOtherName" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaAddressLine1">Address Line 1</label>
          <Field name="poaAddressLine1" id="poaAddressLine1" placeholder="Address Line 1" :class="{ 'is-invalid': errors.poaAddressLine1 }" as="input" />
          <ErrorMessage name="poaAddressLine1" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaAddressLine2">Address Line 2</label>
          <Field name="poaAddressLine2" id="poaAddressLine2" placeholder="Address Line 2" :class="{ 'is-invalid': errors.poaAddressLine2 }" as="input" />
          <ErrorMessage name="poaAddressLine2" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaCity">City</label>
          <Field name="poaCity" id="poaCity" placeholder="City" :class="{ 'is-invalid': errors.poaCity }" as="input" />
          <ErrorMessage name="poaCity" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaCountry">Country</label>
          <Field name="poaCountry" id="poaCountry" placeholder="Country" :class="{ 'is-invalid': errors.poaCountry }" as="input" />
          <ErrorMessage name="poaCountry" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaDob">Date of Birth</label>
          <Field name="poaDob" id="poaDob" type="date" :class="{ 'is-invalid': errors.poaDob }" as="input" />
          <ErrorMessage name="poaDob" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaIdType">ID Type</label>
          <Field name="poaIdType" id="poaIdType" as="select" :class="{ 'is-invalid': errors.poaIdType }">
            <option value="">Select ID Type</option>
            <option value="national-id">National ID</option>
            <option value="drivers-permit">Driver's Permit</option>
            <option value="passport">Passport</option>
          </Field>
          <ErrorMessage name="poaIdType" class="error-message" />
        </div>
        <div class="input-container">
          <label for="poaIdDocument">ID Document</label>
          <input type="file" id="poaIdDocument" @change="handleIdFileUpload" required />
        </div>
        <div class="input-container">
          <label for="poaDocument">Power of Attorney Document</label>
          <input type="file" id="poaDocument" @change="handleFileUpload" required />
        </div>
        <div class="skip-container">
        <a href="#" @click.prevent="skipToNext" class="skip-link">Add Power of Attorney later</a>
      </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="goBack">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useField, useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'PowerofAttorney',
  components: {
    Field,
    ErrorMessage
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const errorMessage = ref('');
    const poaDocument = ref(null);
    const poaIdDocument = ref(null);

    const validationSchema = yup.object({
      poaFirstName: yup.string().required('First Name is required'),
      poaLastName: yup.string().required('Last Name is required'),
      poaOtherName: yup.string(),
      poaAddressLine1: yup.string().required('Address Line 1 is required'),
      poaAddressLine2: yup.string(),
      poaCity: yup.string().required('City is required'),
      poaCountry: yup.string().required('Country is required'),
      poaDob: yup.string().required('Date of Birth is required'),
      poaIdType: yup.string().required('ID Type is required')
    });

    const { handleSubmit, errors } = useForm({
      validationSchema
    });

    const handleFileUpload = (event) => {
      poaDocument.value = event.target.files[0];
    };

    const handleIdFileUpload = (event) => {
      poaIdDocument.value = event.target.files[0];
    };

    const onSubmit = async (values) => {
      try {
        const formData = new FormData();
        formData.append('poaFirstName', values.poaFirstName);
        formData.append('poaLastName', values.poaLastName);
        formData.append('poaOtherName', values.poaOtherName);
        formData.append('poaAddressLine1', values.poaAddressLine1);
        formData.append('poaAddressLine2', values.poaAddressLine2);
        formData.append('poaCity', values.poaCity);
        formData.append('poaCountry', values.poaCountry);
        formData.append('poaDob', values.poaDob);
        formData.append('poaIdType', values.poaIdType);
        formData.append('poaIdDocument', poaIdDocument.value);
        formData.append('poaDocument', poaDocument.value);

        // Save state to the store
        store.setPowerOfAttorneyInfo({
          poaFirstName: values.poaFirstName,
          poaLastName: values.poaLastName,
          poaOtherName: values.poaOtherName,
          poaAddressLine1: values.poaAddressLine1,
          poaAddressLine2: values.poaAddressLine2,
          poaCity: values.poaCity,
          poaCountry: values.poaCountry,
          poaDob: values.poaDob,
          poaIdType: values.poaIdType,
          poaIdDocument: poaIdDocument.value,
          poaDocument: poaDocument.value
        });

        // Debugging logs to check form data
        console.log('Form Data:', values);

        const response = await axios.post('http://localhost:3000/power-of-attorney', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Submission response:', response.data);

        // Navigate to the branch page
        router.push('/branch'); 
      } catch (error) {
        console.error('Error submitting form:', error);
        errorMessage.value = error.message;
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    const skipToNext = () => {
      router.push('/branch');
    };

    return {
      handleSubmit: handleSubmit(onSubmit),
      errors,
      errorMessage,
      handleFileUpload,
      handleIdFileUpload,
      goBack,
      skipToNext,
      poaFirstName: ref(''),
      poaLastName: ref(''),
      poaOtherName: ref(''),
      poaAddressLine1: ref(''),
      poaAddressLine2: ref(''),
      poaCity: ref(''),
      poaCountry: ref(''),
      poaDob: ref(''),
      poaIdType: ref(''),
      poaDocument,
      poaIdDocument
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

.skip-container {
  text-align: center;
  margin-bottom: 20px;
}

.skip-link {
  color: #6c757d;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

.skip-link:hover {
  text-decoration: underline;
  color: #5a6268;
}
</style>