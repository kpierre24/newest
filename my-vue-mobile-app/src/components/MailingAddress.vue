<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
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

    <!-- Desktop View -->
    <div class="desktop-view">
      <div class="login-section">
        <div class="form-container">
          <div class="logo-container">
            <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
          </div>
          <h1>Mailing Address</h1>
          <form @submit.prevent="submitForm">
            <FormInput
              label=""
              type="text"
              id="AddressLine1-desktop"
              v-model="addressLine1"
              placeholder="Mailing Address line 1"
              :required="!sameAsResidential"
              iconClass="icon fas fa-map-marker-alt"
            />
            <FormInput
              label=""
              type="text"
              id="AddressLine2-desktop"
              v-model="addressLine2"
              placeholder="Mailing Address line 2"
              iconClass="icon fas fa-map-marker-alt"
            />
            <FormInput
              label=""
              type="text"
              id="City-desktop"
              v-model="city"
              placeholder="Mailing City"
              :required="!sameAsResidential"
              iconClass="icon fas fa-city"
            />
            <FormInput
              label=""
              type="select"
              id="Country-desktop"
              v-model="country"
              :required="!sameAsResidential"
              :selectOptions="countriesList"
              iconClass="icon fas fa-globe"
            />
            <div class="checkbox-container">
              <input type="checkbox" v-model="sameAsResidential" id="sameAsResidential-desktop" @change="useResidentialAddress" />
              <label for="sameAsResidential-desktop">Same as Residential Address</label>
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
      <div class="brand-section">
        <div class="brand-content">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
        </div>
      </div>
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
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Mobile View Styles */
.mobile-view {
  display: none;
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .mobile-view {
    display: block;
  }
  .desktop-view {
    display: none;
  }
}

/* Desktop View Styles */
.desktop-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
}

.login-section {
  grid-column: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

.brand-section {
  grid-column: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  position: relative;
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.brand-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.brand-logo {
  width: 180px;
  filter: brightness(1.2);
}

.form-container {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-sizing: border-box;
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 120px;
  height: auto;
}

h1 {
  font-size: clamp(24px, 4vw, 32px);
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox-container label {
  font-size: clamp(14px, 2.5vw, 16px);
  color: #444;
  cursor: pointer;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

.button-group {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
}

.back-button,
.submit-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: clamp(14px, 2.5vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #5251d3;
}

.submit-button {
  background-color: #FFBC2D;
  color: white;
}

.submit-button:hover {
  background-color: #e6a928;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.submit-button:disabled:hover {
  background-color: #cccccc;
}

@media (max-width: 480px) {
  .form-container {
    padding: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .back-button,
  .submit-button {
    width: 100%;
  }
}
</style>