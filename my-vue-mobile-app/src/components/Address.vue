<template>
  <div class="container">
    <div class="form-container">
      <h1>Address Information</h1>
      <form @submit.prevent="handleSubmit">
        <FormInput
          
          type="text"
          id="addressLine1"
          name="addressLine1"
          placeholder="Enter address line 1"
          v-model="AddressLine1"
          :required="true"
          :error="errors.addressLine1"
        />
        <FormInput
          
          type="text"
          id="addressLine2"
          name="addressLine2"
          placeholder="Enter address line 2"
          v-model="AddressLine2"
          :error="errors.addressLine2"
        />
        <FormInput
          
          type="text"
          id="city"
          name="city"
          placeholder="Enter city"
          v-model="City"
          :required="true"
          :error="errors.city"
        />
        <FormInput
          label="Country"
          type="select"
          id="country"
          name="country"
          v-model="Country"
          :required="true"
          :selectOptions="countryList"
          :error="errors.country"
        />
        <FormInput
          label="Dwelling Status"
          type="select"
          id="dwellingStatus"
          name="dwellingStatus"
          v-model="DwellingStatus"
          :required="true"
          :selectOptions="dwellingStatusOptions"
          :error="errors.dwellingStatus"
        />
        <FormInput
          label="Nationality"
          type="select"
          id="nationality"
          name="nationality"
          v-model="Nationality"
          :required="true"
          :selectOptions="countryList"
          :error="errors.nationality"
        />
        <div class="input-container">
          <button type="button" class="upload-button" @click="triggerFileUpload">
            Upload Proof of Address
          </button>
          <input type="file" id="ProofOfAddress" @change="handleFileUpload" style="display: none;" />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import FormInput from '@/props/FormInput.vue';

import axios from 'axios';
import { countries } from 'countries-list';

export default {
  components: { FormInput },
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const AddressLine1 = ref('');
    const AddressLine2 = ref('');
    const City = ref('');
    const Country = ref('');
    const Nationality = ref('');
    const DwellingStatus = ref('');
    const ProofOfAddress = ref(null);
    const errors = ref({});

    const countryList = ref(Object.values(countries).map(country => country.name));
    const dwellingStatusOptions = ref(['Rented', 'Owned', 'Subletting', 'Living with relative']);

    onMounted(() => {
      AddressLine1.value = store.AddressLine1;
      AddressLine2.value = store.AddressLine2;
      City.value = store.City;
      Country.value = store.Country;
      Nationality.value = store.Nationality;
      DwellingStatus.value = store.DwellingStatus;
    });

    const handleFileUpload = (event) => {
      ProofOfAddress.value = event.target.files[0];
    };

    const triggerFileUpload = () => {
      document.getElementById('ProofOfAddress').click();
    };

    const handleSubmit = async () => {
      // Validation logic
      if (!AddressLine1.value) errors.value.addressLine1 = 'Address Line 1 is required';
      if (!City.value) errors.value.city = 'City is required';
      if (!Country.value) errors.value.country = 'Country is required';
      if (!DwellingStatus.value) errors.value.dwellingStatus = 'Dwelling Status is required';
      if (!Nationality.value) errors.value.nationality = 'Nationality is required';

      if (Object.keys(errors.value).length === 0) {
        try {
          const formData = new FormData();
          formData.append('AddressLine1', AddressLine1.value);
          formData.append('AddressLine2', AddressLine2.value);
          formData.append('City', City.value);
          formData.append('Country', Country.value);
          formData.append('Nationality', Nationality.value);
          formData.append('DwellingStatus', DwellingStatus.value);
          formData.append('ProofOfAddress', ProofOfAddress.value);

          // Save address info to the store
          store.setAddressInfo({
            AddressLine1: AddressLine1.value,
            AddressLine2: AddressLine2.value,
            City: City.value,
            Country: Country.value,
            Nationality: Nationality.value,
            DwellingStatus: DwellingStatus.value
          });

          const response = await axios.post('http://localhost:3000/address', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Address information submitted:', response.data);

          // Navigate to the next page
          router.push('/mailing-address');
        } catch (error) {
          console.error('Error submitting address information:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      AddressLine1,
      AddressLine2,
      City,
      Country,
      Nationality,
      DwellingStatus,
      ProofOfAddress,
      countryList,
      dwellingStatusOptions,
      errors,
      handleFileUpload,
      triggerFileUpload,
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
  background-image: 
    url('@/assets/back.jpg');
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

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  transition: 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; /* Ensure buttons take full width */
}

.back-button, .next-button ,.submit-button {
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

.next-button , .submit-button{
  background-color: #7838dd;
  color: white;
}

.next-button:hover , .submit-button:hover{
  background-color: #9e79da;
}

.error-message {
  color: #ff4d4d; /* Red for error messages */
  font-size: 12px;
  margin-top: 5px;
}

.select-input {
  border: 2px solid #7838dd; /* Purple border */
  border-radius: 8px;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: border-color 0.3s ease;
}

.select-input:focus {
  border-color: #9e79da; /* Lighter purple on focus */
  outline: none;
  box-shadow: 0 0 5px rgba(120, 56, 221, 0.2);
}

.upload-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}
</style>