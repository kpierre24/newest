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

.back-button, .submit-button {
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
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #FF883F;
}

.submit-button {
  background-color: #FFBC2D;
  color: white;
}

.submit-button:hover {
  background-color: #FF883F;
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