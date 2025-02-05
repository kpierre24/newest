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

        const response = await axios.post('http://localhost:4000/address', formData, {
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
.radio-group {
  display: inline-flex;
  flex-direction: row;
  gap: 10px;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
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