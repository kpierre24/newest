<template>
  <div class="container">
    <section class="form-section">
      <div class="content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        <div class="brand-text">
          <h1>Address</h1>
          <p>Enter your residential address information</p>
        </div>
        <form @submit.prevent="handleSubmit">
          <div v-if="formError" class="error-message">{{ formError }}</div>
          <FormInput
            label="Address Line 1"
            type="text"
            id="addressLine1"
            name="addressLine1"
            placeholder="Address line 1"
            v-model="formData.addressLine1"
            :required="true"
            :error="errors.addressLine1"
            iconClass="icon fas fa-map-marker-alt"
          />
          <FormInput
            label="Address Line 2"
            type="text"
            id="addressLine2"
            name="addressLine2"
            placeholder="Address line 2"
            v-model="formData.addressLine2"
            :error="errors.addressLine2"
            iconClass="icon fas fa-map-marker-alt"
          />
          <FormInput
            label="City"
            type="text"
            id="city"
            name="city"
            placeholder="City"
            v-model="formData.city"
            :required="true"
            :error="errors.city"
            iconClass="icon fas fa-city"
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
            iconClass="icon fas fa-globe"
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
            iconClass="icon fas fa-home"
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
            iconClass="icon fas fa-flag"
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
    </section>
    <section class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </section>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import FormInput from '@/props/FormInput.vue';
import axios from 'axios';
import { countries } from 'countries-list';

export default defineComponent({
  name: 'Address',
  components: { FormInput },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const isLoading = ref(false);
    const formError = ref('');
    const errors = ref({});

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
      // Initialize form data from store if available
      if (store.AddressLine1) formData.value.addressLine1 = store.AddressLine1;
      if (store.AddressLine2) formData.value.addressLine2 = store.AddressLine2;
      if (store.City) formData.value.city = store.City;
      if (store.Country) formData.value.country = store.Country;
      if (store.Nationality) formData.value.nationality = store.Nationality;
      if (store.DwellingStatus) formData.value.dwellingStatus = store.DwellingStatus;
    });

    const handleFileUpload = (event) => {
      if (event.target.files && event.target.files[0]) {
        formData.value.proofOfAddress = event.target.files[0];
      }
    };

    const triggerFileUpload = () => {
      const fileInput = document.getElementById('ProofOfAddress');
      if (fileInput) fileInput.click();
    };

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
      if (!formData.value.dwellingStatus) {
        errors.value.dwellingStatus = 'Dwelling Status is required';
        isValid = false;
      }
      if (!formData.value.nationality) {
        errors.value.nationality = 'Nationality is required';
        isValid = false;
      }

      return isValid;
    };

    const submitForm = async () => {
      isLoading.value = true;
      formError.value = '';

      try {
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

        router.push('/mailing-address');
      } catch (error) {
        console.error('Error submitting address information:', error);
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
      router.push('/parent-guardian-information');
    };

    return {
      formData,
      countryList,
      dwellingStatusOptions,
      isLoading,
      formError,
      errors,
      submitForm,
      navigateToPrevious,
      handleFileUpload,
      triggerFileUpload,
      handleSubmit
    };
  },
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-section {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 1.5rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
}

.brand-text h1 {
  font-size: clamp(24px, 2.2vw, 32px);
  color: #261C6B;
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.brand-text p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
  letter-spacing: 0.5px;
  max-width: 80%;
  line-height: 1.5;
}

.brand-section {
  display: none;
}

.input-container {
  width: 100%;
  margin-bottom: 1rem;
}

.upload-button {
  width: 100%;
  padding: 1rem;
  border: none;
  height: 2.9rem;
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
  justify-content: space-between;
  gap: 1rem;
  margin: 1.5rem 0;
  width: 100%;
  padding: 1rem 0;
}

.back-button,
.next-button {
  flex: 1;
  padding: 0.75rem;
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-button {
  background-color: #6362F8;
  border: 1px solid #261C6B;
  color: white;
}

.back-button:hover {
  background-color: #261C6B;
  transform: translateY(-1px);
}

.next-button {
  background-color: #FFBC2D;
  height: 2.7rem;
  border: none;
  color: white;
}

.next-button:hover {
  background-color: #e6a928;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.next-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  font-size: clamp(11px, 0.9vw, 13px);
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 3px solid #dc3545;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
}

/* Form Input Styles */
:deep(.form-input-container) {
  margin-bottom: 1rem;
  width: 100%;
}

:deep(label) {
  font-size: clamp(13px, 1.1vw, 15px);
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: visible;
}

:deep(input), 
:deep(select) {
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: clamp(14px, 1.2vw, 16px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}

:deep(input:focus), 
:deep(select:focus) {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 98, 248, 0.1);
}

/* Responsive Layout */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  .form-section {
    width: 50%;
    height: 100vh;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    overflow-y: auto;
  }

  .content {
    width: 100%;
    max-width: 500px;
    padding: 40px;
    min-height: min-content;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .brand-section {
    display: block;
    position: relative;
    width: 50%;
    height: 100vh;
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
    width: 180px;
    filter: brightness(1.2) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    z-index: 2;
  }

  .logo {
    width: 100px;
  }

  form {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 20px;
  }

  .button-group {
    margin: 1rem 0;
    padding: 0;
    position: relative;
    bottom: auto;
    width: 100%;
  }

  :deep(.form-input-container) {
    margin-bottom: 0.75rem;
  }

  .form-section::-webkit-scrollbar {
    width: 6px;
  }

  .form-section::-webkit-scrollbar-track {
    background: transparent;
  }

  .form-section::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
}

/* Mobile Styles */
@media (max-width: 767px) {
  .container {
    display: block;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .brand-section {
    display: none;
  }

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .back-button,
  .next-button {
    width: 100%;
  }
}
</style>