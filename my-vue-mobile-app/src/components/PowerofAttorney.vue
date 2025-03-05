<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
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
        <ErrorMessage name="poaFirstName" class="error" />
        <FormInput
          label="Last Name"
          type="text"
          id="poaLastName"
          v-model="poaLastName"
          placeholder="Last Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <ErrorMessage name="poaLastName" class="error" />
        <FormInput
          label="Other Name"
          type="text"
          id="poaOtherName"
          v-model="poaOtherName"
          placeholder="Other Name"
          iconClass="icon fas fa-user"
        />
        <ErrorMessage name="poaOtherName" class="error" />
        <FormInput
          label="Address Line 1"
          type="text"
          id="poaAddressLine1"
          v-model="poaAddressLine1"
          placeholder="Address Line 1"
          :required="true"
          iconClass="icon fas fa-map-marker-alt"
        />
        <ErrorMessage name="poaAddressLine1" class="error" />
        <FormInput
          label="Address Line 2"
          type="text"
          id="poaAddressLine2"
          v-model="poaAddressLine2"
          placeholder="Address Line 2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <ErrorMessage name="poaAddressLine2" class="error" />
        <FormInput
          label="City"
          type="text"
          id="poaCity"
          v-model="poaCity"
          placeholder="City"
          :required="true"
          iconClass="icon fas fa-city"
        />
        <ErrorMessage name="poaCity" class="error" />
        <FormInput
          label="Country"
          type="text"
          id="poaCountry"
          v-model="poaCountry"
          placeholder="Country"
          :required="true"
          iconClass="icon fas fa-globe"
        />
        <ErrorMessage name="poaCountry" class="error" />
        <FormInput
          label="Date of Birth"
          type="date"
          id="poaDob"
          v-model="poaDob"
          placeholder="Date of Birth"
          :required="true"
          :max="today"
          :error="dobError"
          @validation="validateDateOfBirth"
          iconClass="icon fas fa-birthday-cake"
        />
        <ErrorMessage name="poaDob" class="error" />
        <FormInput
          label="ID Type"
          type="select"
          id="poaIdType"
          v-model="poaIdType"
          :required="true"
          :selectOptions="['National ID', 'Driver\'s Permit', 'Passport']"
          iconClass="icon fas fa-id-card"
        />
        <ErrorMessage name="poaIdType" class="error" />
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
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useForm, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';
import { useDateValidation } from '@/composables/useDateValidation';

export default {
  name: 'PowerofAttorney',
  components: {
    Field,
    ErrorMessage,
    FormInput,
    FileUpload,
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const errorMessage = ref('');
    const poaDocument = ref(null);
    const poaIdDocument = ref(null);

    // Validation Schema
    const validationSchema = yup.object({
      poaFirstName: yup.string().required('First Name is required'),
      poaLastName: yup.string().required('Last Name is required'),
      poaOtherName: yup.string(),
      poaAddressLine1: yup.string().required('Address Line 1 is required'),
      poaAddressLine2: yup.string(),
      poaCity: yup.string().required('City is required'),
      poaCountry: yup.string().required('Country is required'),
      poaDob: yup.string().required('Date of Birth is required'),
      poaIdType: yup.string().required('ID Type is required'),
    });

    // Form data with ref
    const poaFirstName = ref('');
    const poaLastName = ref('');
    const poaOtherName = ref('');
    const poaAddressLine1 = ref('');
    const poaAddressLine2 = ref('');
    const poaCity = ref('');
    const poaCountry = ref('');
    const poaDob = ref('');
    const poaIdType = ref('');

    // Setup Form with Vee-Validate
    const { handleSubmit, errors } = useForm({
      validationSchema,
    });

    const { validateDOB, dobError } = useDateValidation();

    // Get today's date for max DOB
    const today = computed(() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    });

    const handleFileUpload = (file) => {
      poaDocument.value = file;
      console.log('POA Document uploaded:', file);
    };

    const handleIdFileUpload = (file) => {
      poaIdDocument.value = file;
      console.log('POA ID Document uploaded:', file);
    };

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const onSubmit = handleSubmit(async (values) => {
      // Validate date of birth first
      if (!validateDateOfBirth()) {
        return; // Stop submission if date validation fails
      }
      
      try {
        // Prepare form data for API submission
        const formData = new FormData();
        formData.append('poaFirstName', values.poaFirstName);
        formData.append('poaLastName', values.poaLastName);
        formData.append('poaOtherName', values.poaOtherName || '');
        formData.append('poaAddressLine1', values.poaAddressLine1);
        formData.append('poaAddressLine2', values.poaAddressLine2 || '');
        formData.append('poaCity', values.poaCity);
        formData.append('poaCountry', values.poaCountry);
        formData.append('poaDob', poaDob.value);
        formData.append('poaGender', values.poaGender);
        formData.append('poaRelationship', values.poaRelationship);
        formData.append('poaIdType', values.poaIdType);
        
        if (poaIdDocument.value) {
          formData.append('poaIdDocument', poaIdDocument.value);
        }
        
        if (poaDocument.value) {
          formData.append('poaDocument', poaDocument.value);
        }
        
        // Update store with POA information
        const poaInfo = {
          poaFirstName: values.poaFirstName,
          poaLastName: values.poaLastName,
          poaOtherName: values.poaOtherName || '',
          poaAddressLine1: values.poaAddressLine1,
          poaAddressLine2: values.poaAddressLine2 || '',
          poaCity: values.poaCity,
          poaCountry: values.poaCountry,
          poaDob: poaDob.value,
          poaGender: values.poaGender,
          poaRelationship: values.poaRelationship,
          poaIdType: values.poaIdType,
          poaIdDocument: poaIdDocument.value,
          poaDocument: poaDocument.value
        };
        
        store.setPowerOfAttorneyInfo(poaInfo);
        console.log('Store updated with POA info:', poaInfo);
        
        // Try to submit to API but don't block navigation if it fails
        try {
          const response = await axios.post(`${getBaseURL()}/api/power-of-attorney`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log('Form submitted successfully:', response.data);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
        
        // Navigate to next page regardless of API success
        console.log('Navigating to /branch');
        router.push('/branch');
      } catch (error) {
        console.error('Error in form submission:', error);
        errorMessage.value = error.message || 'An error occurred. Please try again.';
      }
    });

    const goBack = () => {
      router.go(-1);
    };

    const skipToNext = () => {
      // Make sure to update the store with empty values
      store.setPowerOfAttorneyInfo({
        poaFirstName: '',
        poaLastName: '',
        poaOtherName: '',
        poaAddressLine1: '',
        poaAddressLine2: '',
        poaCity: '',
        poaCountry: '',
        poaDob: '',
        poaIdType: '',
        poaIdDocument: null,
        poaDocument: null,
      });
      
      console.log('Skipping POA, navigating to /branch');
      router.push('/branch');
    };

    const validateDateOfBirth = () => {
      if (!poaDob.value) {
        dobError.value = 'Date of birth is required';
        return false;
      }
      
      const selectedDate = new Date(poaDob.value);
      selectedDate.setHours(0, 0, 0, 0);
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      
      if (selectedDate >= todayDate) {
        dobError.value = 'Date of birth cannot be today or in the future';
        return false;
      }
      
      dobError.value = '';
      return true;
    };

    const validateForm = () => {
      errors.value = {};
      let isValid = true;
      
      if (!poaFirstName.value) {
        errors.value.poaFirstName = 'First Name is required.';
        isValid = false;
      }
      
      if (!poaLastName.value) {
        errors.value.poaLastName = 'Last Name is required.';
        isValid = false;
      }
      
      if (!poaAddress.value) {
        errors.value.poaAddress = 'Address is required.';
        isValid = false;
      }
      
      if (!poaCountry.value) {
        errors.value.poaCountry = 'Country is required.';
        isValid = false;
      }
      
      // Use the validateDateOfBirth function
      if (!validateDateOfBirth()) {
        isValid = false;
      }
      
      if (!poaGender.value) {
        errors.value.poaGender = 'Gender is required.';
        isValid = false;
      }
      
      if (!poaRelationship.value) {
        errors.value.poaRelationship = 'Relationship is required.';
        isValid = false;
      }
      
      return isValid;
    };

    return {
      handleSubmit: onSubmit,
      errors,
      errorMessage,
      handleFileUpload,
      handleIdFileUpload,
      goBack,
      skipToNext,
      poaFirstName,
      poaLastName,
      poaOtherName,
      poaAddressLine1,
      poaAddressLine2,
      poaCity,
      poaCountry,
      poaDob,
      poaIdType,
      poaDocument,
      poaIdDocument,
      dobError,
      today,
      validateDateOfBirth,
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

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

form {
  width: 100%;
  padding-bottom: 20px; /* Add padding at the bottom for better scrolling experience */
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #FFBC2D;
}

.input-container {
  width: 100%;
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}

.skip-link {
  margin: 15px 0;
  text-align: center;
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
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  width: 48%;
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