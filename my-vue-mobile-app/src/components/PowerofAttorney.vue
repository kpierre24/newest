<template>
  <div class="container">
    <div class="form-container">
      <h1>Power of Attorney</h1>
      <form @submit.prevent="handleSubmit">
        <FormInput
          label="First Name"
          type="text"
          id="poaFirstName"
          v-model="poaFirstName"
          placeholder="First Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <FormInput
          label="Last Name"
          type="text"
          id="poaLastName"
          v-model="poaLastName"
          placeholder="Last Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <FormInput
          label="Other Name"
          type="text"
          id="poaOtherName"
          v-model="poaOtherName"
          placeholder="Other Name"
          iconClass="icon fas fa-user"
        />
        <FormInput
          label="Address Line 1"
          type="text"
          id="poaAddressLine1"
          v-model="poaAddressLine1"
          placeholder="Address Line 1"
          :required="true"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="Address Line 2"
          type="text"
          id="poaAddressLine2"
          v-model="poaAddressLine2"
          placeholder="Address Line 2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="City"
          type="text"
          id="poaCity"
          v-model="poaCity"
          placeholder="City"
          :required="true"
          iconClass="icon fas fa-city"
        />
        <FormInput
          label="Country"
          type="text"
          id="poaCountry"
          v-model="poaCountry"
          placeholder="Country"
          :required="true"
          iconClass="icon fas fa-globe"
        />
        <FormInput
          label="Date of Birth"
          type="date"
          id="poaDob"
          v-model="poaDob"
          placeholder="Date of Birth"
          :required="true"
          iconClass="icon fas fa-calendar-alt"
        />
        <FormInput
          label="ID Type"
          type="select"
          id="poaIdType"
          v-model="poaIdType"
          :required="true"
          :selectOptions="['National ID', 'Driver\'s Permit', 'Passport']"
          iconClass="icon fas fa-id-card"
        />
        <div class="input-container">
          <label>POA ID Document</label>
          <FileUpload
            id="poaIdDocument"
            buttonText="Upload ID"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleIdFileUpload"
          />
        </div>
        <div class="input-container">
          <label>POA Document</label>
          <FileUpload
            id="poaDocument"
            buttonText="Upload POA"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleFileUpload"
          />
        </div>
        <div class="skip-link">
          <a href="#" @click.prevent="skipToNext">Add Power of Attorney Later</a>
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
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';

export default {
  name: 'PowerofAttorney',
  components: {
    Field,
    ErrorMessage,
    FormInput,
    FileUpload
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

    const handleFileUpload = (file) => {
      poaDocument.value = file;
    };

    const handleIdFileUpload = (file) => {
      poaIdDocument.value = file;
    };

    const onSubmit = async (values) => {
      try {
        if (!poaIdDocument.value || !poaDocument.value) {
          throw new Error('ID Document and/or Power of Attorney Document is missing');
        }

        // Validate the form data
        if (!values.poaFirstName || !values.poaLastName || !values.poaAddressLine1 || !values.poaCity || !values.poaCountry || !values.poaDob || !values.poaIdType) {
          throw new Error('Please fill in all required fields.');
        }

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

        // Append files only if they exist
        if (poaIdDocument.value) {
          formData.append('poaIdDocument', poaIdDocument.value);
        }
        if (poaDocument.value) {
          formData.append('poaDocument', poaDocument.value);
        }

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

        const response = await axios.post('http://localhost:3000/power-of-attorney', formData);

        console.log('Submission response:', response.data);

        // Navigate to the branch page
        router.push('/branch'); 
      } catch (error) {
        console.error('Error submitting form:', error);
        errorMessage.value = 'An error occurred. Please check the console for details.'; // Changed error message
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const goBack = () => {
      if (!router || !router.go) {
        console.error('Router instance or its go method is not available.');
        return;
      }

      try {
        router.go(-1);
      } catch (error) {
        console.error('Error navigating to the previous route:', error);
        if (error instanceof Error) {
          console.error('Error details:', error.message, error.stack);
        }
      }
    };

    const skipToNext = () => {
      if (!router) {
        console.error('Router instance is not available.');
        return;
      }

      try {
        router.push('/branch'); // Adjust the route as needed
      } catch (error) {
        console.error('Error navigating to the next route:', error);
      }
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
    position: relative;
    margin-top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content; /* Add this line */
    min-height: calc(100vh - 40px);
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    backdrop-filter: blur(5px);
    animation: fadeIn 1s ease-in-out forwards;
    overflow-y: auto; /* Move overflow to container */
}

.form-container {
    background-image: url('@/assets/back.jpg');
    background-size: cover;
    background-position: center;
    padding: 30px;
    padding-top: 50px; /* add padding top */
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 420px;
    max-width: 420px;
    height: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
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

.skip-link {
  margin-bottom: 20px;
}

.skip-link a {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.skip-link a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
}

.navigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
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
  background-color: #FFBC2D ;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.stretch-button {
  background-color: #2d5ad4;
  color: white;
  font-size: 12px;
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.stretch-button:hover {
  background-color: #9e79da;
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