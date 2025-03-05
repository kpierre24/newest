<template>
  <div class="container">
    <div class="form-container">
      <h1>Mailing Address</h1>
      <form @submit.prevent="submitForm">
        <FormInput
          label=""
          type="text"
          id="AddressLine1"
          v-model="addressLine1"
          placeholder="Mailing Address line 1"
          :required="!sameAsResidential"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label=""
          type="text"
          id="AddressLine2"
          v-model="addressLine2"
          placeholder="Mailing Address line 2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label=""
          type="text"
          id="City"
          v-model="city"
          placeholder="Mailing City"
          :required="!sameAsResidential"
          iconClass="icon fas fa-city"
        />
        <FormInput
          label=""
          type="select"
          id="Country"
          v-model="country"
          :required="!sameAsResidential"
          :selectOptions="countriesList"
          iconClass="icon fas fa-globe"
        />
        <div class="checkbox-container">
          <input type="checkbox" v-model="sameAsResidential" id="sameAsResidential" @change="useResidentialAddress" />
          <label for="sameAsResidential">Same as Residential Address</label>
        </div>
        
        <!-- Error message display -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="submit-button" :disabled="isLoading">
            {{ isLoading ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { countries } from 'countries-list';
import FormInput from '@/props/FormInput.vue';

export default {
  name: 'MailingAddress',
  components: {
    FormInput
  },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const sameAsResidential = ref(false);
    const addressLine1 = ref('');
    const addressLine2 = ref('');
    const city = ref('');
    const state = ref('');
    const zipCode = ref('');
    const country = ref('');
    const errorMessage = ref('');
    const isLoading = ref(false);
    const countriesList = ref(Object.values(countries).map(country => country.name));

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const useResidentialAddress = () => {
      if (sameAsResidential.value) {
        // Copy residential address from store
        addressLine1.value = store.addressLine1 || '';
        addressLine2.value = store.addressLine2 || '';
        city.value = store.city || '';
        state.value = store.state || '';
        zipCode.value = store.zipCode || '';
        country.value = store.country || '';
      } else {
        // Clear the form
        addressLine1.value = '';
        addressLine2.value = '';
        city.value = '';
        state.value = '';
        zipCode.value = '';
        country.value = '';
      }
    };

    // Promise-based address validation
    const validateAddress = () => {
      return new Promise((resolve, reject) => {
        // Reset error message
        errorMessage.value = '';
        
        // Check if using residential address or if required fields are filled
        if (sameAsResidential.value) {
          resolve({
            valid: true,
            message: 'Using residential address'
          });
          return;
        }
        
        // Validate required fields
        if (!addressLine1.value || !city.value || !country.value) {
          reject({
            valid: false,
            message: 'Please fill in all required fields'
          });
          return;
        }
        
        // All validations passed
        resolve({
          valid: true,
          message: 'Address is valid'
        });
      });
    };

    const submitForm = async () => {
      isLoading.value = true;
      
      try {
        // Use the Promise-based validation
        await validateAddress();
        
        const formData = {
          sameAsResidential: sameAsResidential.value,
          addressLine1: addressLine1.value,
          addressLine2: addressLine2.value,
          city: city.value,
          state: state.value,
          zipCode: zipCode.value,
          country: country.value
        };

        // Update store
        store.setMailingAddressInfo(formData);
        
        // Submit to API
        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/mailing-address`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('Mailing address submitted:', response.data);
        router.push('/employment-information');
      } catch (error) {
        // Handle validation errors
        if (error && error.message) {
          errorMessage.value = error.message;
        } else if (error && typeof error === 'object' && error.valid === false) {
          errorMessage.value = error.message;
        } else {
          console.error('Error submitting mailing address:', error);
          errorMessage.value = 'An error occurred while submitting your address';
          
          // Continue with navigation even if API fails
          setTimeout(() => {
            router.push('/employment-information');
          }, 2000);
        }
      } finally {
        isLoading.value = false;
      }
    };

    const navigateToPrevious = () => {
      router.push('/address');
    };

    return {
      sameAsResidential,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      errorMessage,
      isLoading,
      countriesList,
      useResidentialAddress,
      submitForm,
      navigateToPrevious
    };
  }
};
</script>

<style scoped>
.input-group, .input-container {
  width: 100%;
  
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 0px;
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
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button {
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

.submit-button {
  background-color: #FFBC2D;
  color: white;
}

.submit-button:hover {
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
  margin: 15px 0;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 10px;
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
.icon fas fa-map-marker-alt {
  width: 24px;
  height: 24px;
  color: #333;
  transform: translateY(-10px);
  display: inline-block;
  vertical-align: middle;
  
}

.error-message {
  color: #ff4d4d;
  background-color: rgba(255, 77, 77, 0.1);
  border: 1px solid #ff4d4d;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
}
</style>