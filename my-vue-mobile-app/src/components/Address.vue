<template>
  <div class="container">
    <div class="form-container">
      <h1>Address Information</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <label for="addressLine1">Address Line 1</label>
          <input type="text" v-model="AddressLine1" id="addressLine1" placeholder="Enter address line 1" required />
        </div>
        <div class="input-container">
          <label for="addressLine2">Address Line 2</label>
          <input type="text" v-model="AddressLine2" id="addressLine2" placeholder="Enter address line 2" />
        </div>
        <div class="input-container">
          <label for="city">City</label>
          <input type="text" v-model="City" id="city" placeholder="Enter city" required />
        </div>
        <div class="input-container">
          <label for="country">Country</label>
          <select v-model="Country" id="country" required>
            <option value="" disabled>Select country</option>
            <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="nationality">Nationality</label>
          <select v-model="Nationality" id="nationality" required>
            <option value="" disabled>Select nationality</option>
            <option v-for="country in countryList" :key="country" :value="country">{{ country }}</option>
          </select>
        </div>
        <div class="input-container">
          <label for="dwellingStatus">Dwelling Status</label>
          <select v-model="DwellingStatus" id="dwellingStatus" required>
            <option value="" disabled>Select dwelling status</option>
            <option value="rented">Rented</option>
            <option value="owned">Owned</option>
            <option value="subletting">Subletting</option>
            <option value="living with relative">Living with relative</option>
          </select>
        </div>
        <div class="input-container">
          <label for="ProofOfAddress">Proof of Address</label>
          <input type="file" id="ProofOfAddress" @change="handleFileUpload" required />
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
      handleSubmit,
      navigateToPrevious
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

.error-message {
  color: #ff4d4d; /* Red for error messages */
  font-size: 12px;
  margin-top: 5px;
}
</style>