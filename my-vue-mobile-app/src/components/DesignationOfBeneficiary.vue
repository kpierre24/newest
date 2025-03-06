<template>
  <div class="container">
    <div class="content">
      <h1>Designation of Beneficiary</h1>
      <form @submit.prevent="handleSubmit('next')">
        <FormInput
          label="First Name"
          type="text"
          id="firstName"
          v-model="firstName"
          placeholder="First Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <FormInput
          label="Last Name"
          type="text"
          id="lastName"
          v-model="lastName"
          placeholder="Last Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <FormInput
          label="Other Name"
          type="text"
          id="otherName"
          v-model="otherName"
          placeholder="Other Name"
          iconClass="icon fas fa-user"
        />
        <FormInput
          label="Address Line 1"
          type="text"
          id="addressLine1"
          v-model="addressLine1"
          placeholder="Address Line 1"
          :required="true"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="Address Line 2"
          type="text"
          id="addressLine2"
          v-model="addressLine2"
          placeholder="Address Line 2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="City"
          type="text"
          id="city"
          v-model="city"
          placeholder="City"
          :required="true"
          iconClass="icon fas fa-city"
        />
        <FormInput
          label="Country"
          type="text"
          id="country"
          v-model="country"
          placeholder="Country"
          :required="true"
          iconClass="icon fas fa-globe"
        />
        <FormInput
          label="Date of Birth"
          type="date"
          id="dob"
          v-model="dob"
          placeholder="Date of Birth"
          :required="true"
          :max="today"
          :error="dobError"
          @validation="validateDateOfBirth"
          iconClass="icon fas fa-birthday-cake"
        />
        <FormInput
          label="Gender"
          type="select"
          id="gender"
          v-model="gender"
          :required="true"
          :selectOptions="['male', 'female']"
          iconClass="icon fas fa-venus-mars"
        />
        <FormInput
          label="Relationship to Beneficiary"
          type="text"
          id="relationshipToBeneficiary"
          v-model="relationshipToBeneficiary"
          placeholder="Relationship to Beneficiary"
          :required="true"
          iconClass="icon fas fa-users"
        />
        <FormInput
          label="Type of ID"
          type="select"
          id="typeOfId"
          v-model="typeOfId"
          :required="true"
          :selectOptions="['ID Card', 'Driver\'s Permit', 'Passport', 'Birthpaper']"
          iconClass="icon fas fa-id-card"
        />
        <FormInput
          label="ID Number"
          type="text"
          id="idNumber"
          v-model="idNumber"
          placeholder="ID Number"
          :required="true"
          iconClass="icon fas fa-id-badge"
        />
        <FormInput
          label="Percentage of Interest"
          type="number"
          id="percentageOfInterest"
          v-model="percentageOfInterest"
          placeholder="Percentage of Beneficiary Interest"
          :required="true"
          iconClass="icon fas fa-percent"
        />
        <div class="button-group">
          <button type="button" class="add-button" @click="handleSubmit('add')">Add Another Beneficiary</button>
          <a href="#" class="skip-button" @click.prevent="skipAddingBeneficiary">Skip Adding Beneficiary</a>
          <div class="navigation-buttons">
            <button type="button" class="back-button" @click="goBack">Back</button>
            <button type="submit" class="next-button">Next</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FormInput from '@/props/FormInput.vue';
import { useDemoStore } from '@/store/demoStore';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDateValidation } from '@/composables/useDateValidation';

export default {
  name: 'DesignationOfBeneficiary',
  components: {
    FormInput
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const firstName = ref('');
    const lastName = ref('');
    const otherName = ref('');
    const addressLine1 = ref('');
    const addressLine2 = ref('');
    const city = ref('');
    const country = ref('');
    const dob = ref('');
    const gender = ref('');
    const relationshipToBeneficiary = ref('');
    const typeOfId = ref('');
    const idNumber = ref('');
    const percentageOfInterest = ref('');
    const errors = ref({});

    // Get the base URL dynamically
    const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? 'http://localhost:3000' 
      : `http://${window.location.hostname}:3000`;

    const { validateDOB, dobError } = useDateValidation();

    // Get today's date for max DOB
    const today = computed(() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    });

    const validateForm = () => {
      errors.value = {};
      if (!firstName.value) {
        errors.value.firstName = 'First Name is required.';
      }
      if (!lastName.value) {
        errors.value.lastName = 'Last Name is required.';
      }
      if (!addressLine1.value) {
        errors.value.addressLine1 = 'Address Line 1 is required.';
      }
      if (!city.value) {
        errors.value.city = 'City is required.';
      }
      if (!country.value) {
        errors.value.country = 'Country is required.';
      }
      if (!dob.value) {
        errors.value.dob = 'Date of Birth is required.';
      }
      if (!gender.value) {
        errors.value.gender = 'Gender is required.';
      }
      if (!relationshipToBeneficiary.value) {
        errors.value.relationshipToBeneficiary = 'Relationship to Beneficiary is required.';
      }
      if (!typeOfId.value) {
        errors.value.typeOfId = 'Type of ID is required.';
      }
      if (!idNumber.value) {
        errors.value.idNumber = 'ID Number is required.';
      }
      if (!percentageOfInterest.value) {
        errors.value.percentageOfInterest = 'Percentage of Beneficiary Interest is required.';
      }
      return Object.keys(errors.value).length === 0;
    };

    const handleSubmit = async (action) => {
      if (validateForm()) {
        const payload = {
          firstName: firstName.value,
          lastName: lastName.value,
          otherName: otherName.value,
          addressLine1: addressLine1.value,
          addressLine2: addressLine2.value,
          city: city.value,
          country: country.value,
          dob: dob.value,
          gender: gender.value,
          relationshipToBeneficiary: relationshipToBeneficiary.value,
          typeOfId: typeOfId.value,
          idNumber: idNumber.value,
          percentageOfInterest: percentageOfInterest.value
        };

        try {
          try {
            const response = await axios.post(`${baseURL}/designation-of-beneficiary`, payload);
            console.log('Success:', response.data);
          } catch (apiError) {
            console.error('API error:', apiError);
            // Continue with navigation even if API fails
          }

          store.setBeneficiaryInfo(payload);

          if (action === 'next') {
            router.push('/power-of-attorney');
          } else if (action === 'add') {
            clearForm();
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    const clearForm = () => {
      firstName.value = '';
      lastName.value = '';
      otherName.value = '';
      addressLine1.value = '';
      addressLine2.value = '';
      city.value = '';
      country.value = '';
      dob.value = '';
      gender.value = '';
      relationshipToBeneficiary.value = '';
      typeOfId.value = '';
      idNumber.value = '';
      percentageOfInterest.value = '';
    };

    const goBack = () => {
      router.go(-1);
    };

    const skipAddingBeneficiary = () => {
      router.push('/power-of-attorney');
    };

    const validateDateOfBirth = () => {
      if (!dob.value) {
        dobError.value = 'Date of birth is required';
        return false;
      }
      
      const selectedDate = new Date(dob.value);
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

    return {
      firstName,
      lastName,
      otherName,
      addressLine1,
      addressLine2,
      city,
      country,
      dob,
      gender,
      relationshipToBeneficiary,
      typeOfId,
      idNumber,
      percentageOfInterest,
      errors,
      handleSubmit,
      clearForm,
      goBack,
      skipAddingBeneficiary,
      dobError,
      today,
      validateDateOfBirth
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

form {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  padding: 20px 15px 80px;
  margin-top: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  box-sizing: border-box;
}

form::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

form::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.input-group {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 0 15px;
  box-sizing: border-box;
}

.back-button, .next-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
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

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 15px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover {
  background-color: #cccccc;
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
  
  form {
    padding: 15px 10px 70px;
  }
  
  .input-group {
    padding: 0 10px;
  }
  
  .button-group {
    padding: 0 10px;
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