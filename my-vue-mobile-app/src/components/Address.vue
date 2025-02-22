<template>
  <div class="container">
    <div class="form-container">
      <h1>Address Information</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
        
          <input type="text" v-model="AddressLine1" id="addressLine1" placeholder=" Address line 1" required />
        </div>
        <div class="input-container">
                    <input type="text" v-model="AddressLine2" id="addressLine2" placeholder="Address line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="City" id="city" placeholder="City" required />
        </div>
        <div class="input-container">
          <select v-model="Country" id="country" required class="select-input">
            <option value="" disabled>Country</option>
            <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <select v-model="DwellingStatus" id="dwellingStatus" required class="select-input">
            <option value="" disabled>Dwelling status</option>
            <option value="rented">Rented</option>
            <option value="owned">Owned</option>
            <option value="subletting">Subletting</option>
            <option value="living with relative">Living with relative</option>
          </select>
        </div>
        <div class="input-container">
          <button type="button" class="upload-button" @click="triggerFileUpload">
            Upload Proof of Address
          </button>
          <input type="file" id="ProofOfAddress" @change="handleFileUpload" style="display: none;" />
        </div>
        <div class="input-container">
          <select v-model="Nationality" id="nationality" required class="select-input">
            <option value="" disabled>Nationality</option>
            <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
          </select>
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
import { useDemoStore } from '@/store/demoStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { countries } from 'countries-list';

export default {
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
    const countryList = ref(Object.values(countries).map(country => country.name));

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
        router.push('/mailing-address'); // Replace with the actual next page route
      } catch (error) {
        console.error('Error submitting address information:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
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
      handleFileUpload,
      triggerFileUpload,
      handleSubmit,
      navigateToPrevious
    };
  }
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
  background-color: #7838dd;
  color: white;
}

.next-button:hover {
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