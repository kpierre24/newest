<template>
  <div class="container">
    <div class="form-container">
      <h1>Designation of Beneficiary</h1>
      <form @submit.prevent="handleSubmit('next')">
        <FormInput
          
          type="text"
          id="firstName"
          v-model="firstName"
          placeholder="First Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <FormInput
          
          type="text"
          id="lastName"
          v-model="lastName"
          placeholder="Last Name"
          :required="true"
          iconClass="icon fas fa-user"
        />
        <FormInput
          
          type="text"
          id="otherName"
          v-model="otherName"
          placeholder="Other Name"
          iconClass="icon fas fa-user"
        />
        <FormInput
          
          type="text"
          id="addressLine1"
          v-model="addressLine1"
          placeholder="Address Line 1"
          :required="true"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          
          type="text"
          id="addressLine2"
          v-model="addressLine2"
          placeholder="Address Line 2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          
          type="text"
          id="city"
          v-model="city"
          placeholder="City"
          :required="true"
          iconClass="icon fas fa-city"
        />
        <FormInput
          
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
          
          type="text"
          id="idNumber"
          v-model="idNumber"
          placeholder="ID Number"
          :required="true"
          iconClass="icon fas fa-id-badge"
        />
        <FormInput
          
          type="number"
          id="percentageOfInterest"
          v-model="percentageOfInterest"
          placeholder="Percentage of Beneficiary Interest"
          :required="true"
          iconClass="icon fas fa-percent"
        />
        <div class="button-container">
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
          const response = await axios.post('http://localhost:3000/designation-of-beneficiary', payload);
          console.log('Success:', response.data);

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
      skipAddingBeneficiary
    };
  },
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

.form-container::-webkit-scrollbar {
  display: none; /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
}
.form-container {
  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between buttons */
  width: 100%;
  margin-top: 20px;
}

.add-button,
.skip-button,
.back-button,
.next-button {
  width: 100%; /* Stretch buttons to full width */
  padding: 15px; /* Increase padding for better appearance */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  text-align: center;
}

.add-button {
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.add-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}

.skip-button {
  background-color: transparent;
  color: #7838dd; /* Purple text */
  text-decoration: underline;
}

.skip-button:hover {
  color: #9e79da; /* Lighter purple on hover */
}

.navigation-buttons {
  display: flex;
  gap: 10px; /* Space between Back and Next buttons */
}

.back-button {
  background-color: #f15539ea; /* Red background */
  color: white; /* White text */
}

.back-button:hover {
  background-color: #f38b79ea; /* Lighter red on hover */
}

.next-button {
  background-color: #FFBC2D; /* Purple background */
  color: white; /* White text */
}

.next-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
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

.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
}

.icon {
  position: absolute;
  left: 10px; /* Position the icon to the left */
  top: 50%; /* Center the icon vertically */
  transform: translateY(-50%);
  color: #666; /* Icon color */
  font-size: 16px; /* Icon size */
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px 12px 12px 40px; /* Add padding to the left for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}
</style>