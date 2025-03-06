<!-- filepath: /c:/Users/Administrator/Documents/newest/my-vue-mobile-app/src/components/ForeignNationalBankInformation.vue -->
<template>
  <div class="container">
    <div class="content">
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

.back-button, .next-button {
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

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
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