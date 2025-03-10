<!-- filepath: /c:/Users/Administrator/Documents/newest/my-vue-mobile-app/src/components/ForeignNationalBankInformation.vue -->
<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
        <h1>Foreign National Bank Information</h1>
        <form @submit.prevent="handleSubmit">
          <FormInput
            label="Bank Name"
            type="text"
            id="bankName"
            v-model="bankName"
            placeholder="Bank name"
            :required="true"
            iconClass="icon fas fa-university"
          />
          <FormInput
            label="Address Line 1"
            type="text"
            id="bankAddressLine1"
            v-model="bankAddressLine1"
            placeholder="Address line 1"
            :required="true"
            iconClass="icon fas fa-map-marker-alt"
          />
          <FormInput
            label="City"
            type="text"
            id="bankCity"
            v-model="bankCity"
            placeholder="City"
            :required="true"
            iconClass="icon fas fa-city"
          />
          <FormInput
            label="Country"
            type="select"
            id="bankCountry"
            v-model="bankCountry"
            :required="true"
            :selectOptions="countryList"
            iconClass="icon fas fa-globe"
          />
          <FormInput
            label="Account Number"
            type="text"
            id="bankAccountNumber"
            v-model="bankAccountNumber"
            placeholder="Account number"
            :required="true"
            iconClass="icon fas fa-credit-card"
          />
          <FormInput
            label="SWIFT Code"
            type="text"
            id="swiftCode"
            v-model="swiftCode"
            placeholder="SWIFT code"
            :required="true"
            iconClass="icon fas fa-code"
          />
          <FormInput
            label="Telephone Number"
            type="text"
            id="bankTelephoneNumber"
            v-model="bankTelephoneNumber"
            placeholder="Bank telephone number"
            :required="true"
            iconClass="icon fas fa-phone"
          />
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button">Next</button>
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
          <h1>Foreign National Bank Information</h1>
          <form @submit.prevent="handleSubmit">
            <FormInput
              label="Bank Name"
              type="text"
              id="bankName-desktop"
              v-model="bankName"
              placeholder="Bank name"
              :required="true"
              iconClass="icon fas fa-university"
            />
            <FormInput
              label="Address Line 1"
              type="text"
              id="bankAddressLine1-desktop"
              v-model="bankAddressLine1"
              placeholder="Address line 1"
              :required="true"
              iconClass="icon fas fa-map-marker-alt"
            />
            <FormInput
              label="City"
              type="text"
              id="bankCity-desktop"
              v-model="bankCity"
              placeholder="City"
              :required="true"
              iconClass="icon fas fa-city"
            />
            <FormInput
              label="Country"
              type="select"
              id="bankCountry-desktop"
              v-model="bankCountry"
              :required="true"
              :selectOptions="countryList"
              iconClass="icon fas fa-globe"
            />
            <FormInput
              label="Account Number"
              type="text"
              id="bankAccountNumber-desktop"
              v-model="bankAccountNumber"
              placeholder="Account number"
              :required="true"
              iconClass="icon fas fa-credit-card"
            />
            <FormInput
              label="SWIFT Code"
              type="text"
              id="swiftCode-desktop"
              v-model="swiftCode"
              placeholder="SWIFT code"
              :required="true"
              iconClass="icon fas fa-code"
            />
            <FormInput
              label="Telephone Number"
              type="text"
              id="bankTelephoneNumber-desktop"
              v-model="bankTelephoneNumber"
              placeholder="Bank telephone number"
              :required="true"
              iconClass="icon fas fa-phone"
            />
            <div class="button-group">
              <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
              <button type="submit" class="submit-button">Next</button>
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
import { useDemoStore } from '@/store/demoStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { countries } from 'countries-list';
import FormInput from '@/props/FormInput.vue';

export default {
  components: {
    FormInput
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const bankName = ref('');
    const bankAddressLine1 = ref('');
    const bankCity = ref('');
    const bankCountry = ref('');
    const bankAccountNumber = ref('');
    const swiftCode = ref('');
    const bankTelephoneNumber = ref('');
    const countryList = ref(Object.values(countries).map(country => country.name));
    const formError = ref('');
    const isLoading = ref(false);

    onMounted(() => {
      bankName.value = store.bankName;
      bankAddressLine1.value = store.bankAddressLine1;
      bankCity.value = store.bankCity;
      bankCountry.value = store.bankCountry;
      bankAccountNumber.value = store.bankAccountNumber;
      swiftCode.value = store.swiftCode;
      bankTelephoneNumber.value = store.bankTelephoneNumber;
    });

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const handleSubmit = async () => {
      if (validateForm()) {
        try {
          const formData = {
            bankName: bankName.value,
            bankAddressLine1: bankAddressLine1.value,
            bankCity: bankCity.value,
            bankCountry: bankCountry.value,
            bankAccountNumber: bankAccountNumber.value,
            swiftCode: swiftCode.value,
            bankTelephoneNumber: bankTelephoneNumber.value
          };

          // Save bank info to the store
          store.setBankInfo(formData);

          // Debugging logs to check form data
          console.log('Bank Information Data:', formData);

          const baseURL = getBaseURL();
          const response = await axios.post(`${baseURL}/foreign-national-bank-information`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Bank information submitted:', response.data);

          // Navigate to the employment information page after successful submission
          router.push('/employment-information');
        } catch (error) {
          console.error('Error submitting bank information:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
      }
    };

    const validateForm = () => {
      return bankName.value && bankAddressLine1.value && bankCity.value && bankCountry.value && bankAccountNumber.value && swiftCode.value && bankTelephoneNumber.value;
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      bankName,
      bankAddressLine1,
      bankCity,
      bankCountry,
      bankAccountNumber,
      swiftCode,
      bankTelephoneNumber,
      countryList,
      handleSubmit,
      validateForm,
      navigateToPrevious
    };
  }
}
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