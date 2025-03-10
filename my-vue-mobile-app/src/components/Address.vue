<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Address</h1>
      <form @submit.prevent="handleSubmit">
        <div v-if="formError" class="error-message">{{ formError }}</div>
        <FormInput
          
          type="text"
          id="addressLine1"
          name="addressLine1"
          placeholder="Address line 1"
          v-model="formData.addressLine1"
          :required="true"
          :error="errors.addressLine1"
        />
        <FormInput
          
          type="text"
          id="addressLine2"
          name="addressLine2"
          placeholder=" Address line 2"
          v-model="formData.addressLine2"
          :error="errors.addressLine2"
        />
        <FormInput
          
          type="text"
          id="city"
          name="city"
          placeholder="City"
          v-model="formData.city"
          :required="true"
          :error="errors.city"
        />
        <FormInput
          label="Country"
          type="select"
          id="country"
          name="country"
          v-model="formData.country"
          :required="true"
          :selectOptions="countryList"
          :error="errors.country"
        />
        <FormInput
          label="Dwelling Status"
          type="select"
          id="dwellingStatus"
          name="dwellingStatus"
          v-model="formData.dwellingStatus"
          :required="true"
          :selectOptions="dwellingStatusOptions"
          :error="errors.dwellingStatus"
        />
        <FormInput
          label="Nationality"
          type="select"
          id="nationality"
          name="nationality"
          v-model="formData.nationality"
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
          <button type="submit" class="next-button" :disabled="isLoading">
            <span v-if="isLoading">
              <i class="fas fa-spinner fa-spin"></i> Processing...
            </span>
            <span v-else>Next</span>
          </button>
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
  name: 'Address',
  components: { FormInput },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const isLoading = ref(false);
    const formError = ref('');

    const formData = ref({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      dwellingStatus: '',
      nationality: '',
      proofOfAddress: null
    });

    const countryList = ref(Object.values(countries).map(country => country.name));
    const dwellingStatusOptions = ref(['Rented', 'Owned', 'Subletting', 'Living with relative']);

    onMounted(() => {
      formData.value.addressLine1 = store.AddressLine1;
      formData.value.addressLine2 = store.AddressLine2;
      formData.value.city = store.City;
      formData.value.country = store.Country;
      formData.value.nationality = store.Nationality;
      formData.value.dwellingStatus = store.DwellingStatus;
    });

    const handleFileUpload = (event) => {
      formData.value.proofOfAddress = event.target.files[0];
    };

    const triggerFileUpload = () => {
      document.getElementById('ProofOfAddress').click();
    };

    const submitForm = async () => {
      isLoading.value = true;
      formError.value = '';

      try {
        // Validate required fields
        if (!formData.value.addressLine1 || !formData.value.city || 
            !formData.value.state || !formData.value.postalCode || 
            !formData.value.country) {
          formError.value = 'Please fill in all required fields';
          isLoading.value = false;
          return;
        }

        // Get the base URL dynamically
        const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:3000' 
          : `http://${window.location.hostname}:3000`;

        try {
          const response = await axios.post(`${baseURL}/address`, formData.value, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Address info submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

        // Update store with form data
        store.$patch((state) => {
          Object.assign(state, formData.value);
        });

        router.push('/account-number');
      } catch (error) {
        console.error('Error submitting address information:', error);
        formError.value = 'An error occurred while submitting your information';
      } finally {
        isLoading.value = false;
      }
    };

    const handleSubmit = async () => {
      // Validation logic
      if (!formData.value.addressLine1) errors.value.addressLine1 = 'Address Line 1 is required';
      if (!formData.value.city) errors.value.city = 'City is required';
      if (!formData.value.country) errors.value.country = 'Country is required';
      if (!formData.value.dwellingStatus) errors.value.dwellingStatus = 'Dwelling Status is required';
      if (!formData.value.nationality) errors.value.nationality = 'Nationality is required';

      if (Object.keys(errors.value).length === 0) {
        await submitForm();
      }
    };

    const navigateToPrevious = () => {
      router.push('/parent-guardian-information');
    };

    return {
      formData,
      countryList,
      dwellingStatusOptions,
      isLoading,
      formError,
      submitForm,
      navigateToPrevious,
      handleFileUpload,
      triggerFileUpload,
      handleSubmit
    };
  },
};
</script>

<style scoped>
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

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  border-left: 4px solid #d32f2f;
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

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button, .submit-button {
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

.next-button, .submit-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover, .submit-button:hover {
  background-color: #9e79da;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover {
  background-color: #cccccc;
}

.upload-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  background-color: #7838dd;
  color: white;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #9e79da;
}
</style>