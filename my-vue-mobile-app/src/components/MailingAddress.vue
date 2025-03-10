<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="logo-container">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
      </div>
      <h1>Mailing Address</h1>
      <form @submit.prevent="handleSubmit">
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <FormInput
          label="Address Line 1"
          type="text"
          id="AddressLine1"
          v-model="formData.addressLine1"
          placeholder="Mailing Address line 1"
          :required="!formData.sameAsResidential"
          :error="errors.addressLine1"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="Address Line 2"
          type="text"
          id="AddressLine2"
          v-model="formData.addressLine2"
          placeholder="Mailing Address line 2"
          :error="errors.addressLine2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label="City"
          type="text"
          id="City"
          v-model="formData.city"
          placeholder="Mailing City"
          :required="!formData.sameAsResidential"
          :error="errors.city"
          iconClass="icon fas fa-city"
        />
        <FormInput
          label="Country"
          type="select"
          id="Country"
          v-model="formData.country"
          :required="!formData.sameAsResidential"
          :selectOptions="countryList"
          :error="errors.country"
          iconClass="icon fas fa-globe"
        />
        <div class="checkbox-container">
          <input type="checkbox" v-model="formData.sameAsResidential" id="sameAsResidential" @change="useResidentialAddress" />
          <label for="sameAsResidential">Same as Residential Address</label>
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

    <!-- Desktop View -->
    <div class="desktop-view">
      <div class="login-section">
        <div class="brand-text">
          <h1>Mailing Address</h1>
          <p>Enter your mailing address information</p>
        </div>
        <form @submit.prevent="handleSubmit" class="desktop-form">
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <div class="form-box">
            <FormInput
              label="Address Line 1"
              type="text"
              id="AddressLine1-desktop"
              v-model="formData.addressLine1"
              placeholder="Mailing Address line 1"
              :required="!formData.sameAsResidential"
              :error="errors.addressLine1"
              iconClass="icon fas fa-map-marker-alt"
            />
            <FormInput
              label="Address Line 2"
              type="text"
              id="AddressLine2-desktop"
              v-model="formData.addressLine2"
              placeholder="Mailing Address line 2"
              :error="errors.addressLine2"
              iconClass="icon fas fa-map-marker-alt"
            />
            <FormInput
              label="City"
              type="text"
              id="City-desktop"
              v-model="formData.city"
              placeholder="Mailing City"
              :required="!formData.sameAsResidential"
              :error="errors.city"
              iconClass="icon fas fa-city"
            />
            <FormInput
              label="Country"
              type="select"
              id="Country-desktop"
              v-model="formData.country"
              :required="!formData.sameAsResidential"
              :selectOptions="countryList"
              :error="errors.country"
              iconClass="icon fas fa-globe"
            />
            <div class="checkbox-container">
              <input type="checkbox" v-model="formData.sameAsResidential" id="sameAsResidential-desktop" @change="useResidentialAddress" />
              <label for="sameAsResidential-desktop">Same as Residential Address</label>
            </div>
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
      <section class="brand-section">
        <div class="overlay"></div>
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
    const isLoading = ref(false);
    const formError = ref('');
    const errors = ref({});

    // Initialize formData with default values
    const formData = ref({
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      sameAsResidential: false
    });

    // Load existing data from store if available
    onMounted(() => {
      if (store.addressLine1) formData.value.addressLine1 = store.addressLine1;
      if (store.addressLine2) formData.value.addressLine2 = store.addressLine2;
      if (store.city) formData.value.city = store.city;
      if (store.country) formData.value.country = store.country;
      if (store.sameAsResidential !== undefined) formData.value.sameAsResidential = store.sameAsResidential;
    });

    const validateForm = () => {
      errors.value = {};
      let isValid = true;

      if (!formData.value.addressLine1) {
        errors.value.addressLine1 = 'Address Line 1 is required';
        isValid = false;
      }

      if (!formData.value.city) {
        errors.value.city = 'City is required';
        isValid = false;
      }

      if (!formData.value.country) {
        errors.value.country = 'Country is required';
        isValid = false;
      }

      return isValid;
    };

    const submitForm = async () => {
      isLoading.value = true;
      formError.value = '';

      try {
        // Update store with form data
        store.$patch((state) => {
          Object.assign(state, formData.value);
        });

        // Navigate to the next page
        router.push('/foreign-national-bank-information');
      } catch (error) {
        console.error('Error submitting mailing address:', error);
        formError.value = 'An error occurred while submitting your information';
      } finally {
        isLoading.value = false;
      }
    };

    const handleSubmit = async () => {
      if (validateForm()) {
        await submitForm();
      }
    };

    const navigateToPrevious = () => {
      router.push('/address');
    };

    const countryList = ref(Object.values(countries).map(country => country.name));

    const useResidentialAddress = () => {
      if (formData.value.sameAsResidential) {
        // Copy residential address from store
        formData.value.addressLine1 = store.addressLine1 || '';
        formData.value.addressLine2 = store.addressLine2 || '';
        formData.value.city = store.city || '';
        formData.value.country = store.country || '';
      } else {
        // Clear the form
        formData.value.addressLine1 = '';
        formData.value.addressLine2 = '';
        formData.value.city = '';
        formData.value.country = '';
      }
    };

    return {
      formData,
      countryList,
      isLoading,
      formError,
      errors,
      handleSubmit,
      navigateToPrevious,
      useResidentialAddress
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}
.checkbox-container {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox-label {
    font-size: clamp(12px, 1vw, 14px);
  }

/* Mobile View */
.mobile-view {
  display: none;
}

/* Desktop View */
.desktop-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  width: 50vw;
}

.login-content {
  
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  max-width: 100%;
  overflow-y: auto;
}

.login-content {
  width: 100%;
  
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.engage-logo {
  width: 100px;
  height: auto;
  margin-bottom: 1.5rem;
}

.brand-text {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: clamp(24px, 2.5vw, 32px);
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.brand-text p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
}

.desktop-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
}

.form-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.brand-section {
  position: relative;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  overflow: hidden;
}

.brand-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') center/cover no-repeat;
  opacity: 0.1;
  mix-blend-mode: overlay;
}

.brand-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(99, 98, 248, 0.4) 0%, rgba(38, 28, 107, 0.4) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  filter: brightness(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

.form-container {
  width: 100%;
  max-width: 450px;
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

.input-container {
  width: 100%;
  margin-bottom: 1rem;
}

.upload-button {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #7838dd;
  color: white;
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.upload-button:hover {
  background-color: #9e79da;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.back-button,
.next-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: clamp(14px, 1.2vw, 16px);
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

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #e6a928;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4d4d;
  font-size: clamp(12px, 1vw, 14px);
  margin-top: 0.25rem;
  background-color: rgba(255, 77, 77, 0.1);
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .container {
    display: block;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .mobile-view {
    display: block;
    min-height: 100vh;
  }

  .desktop-view {
    display: none;
  }

  .form-container {
    padding: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .back-button,
  .next-button {
    width: 100%;
  }
}

/* Desktop Styles */
@media (min-width: 769px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1920px;
    height: 100vh;
  }

  .mobile-view {
    display: none;
  }

  .desktop-view {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
    height: 100vh;
  }

  .login-content {
    padding: 2rem;
    height: 100%;
    overflow-y: inherit;
  }

  .form-box {
    margin-bottom: 1.5rem;
  }
}
</style>