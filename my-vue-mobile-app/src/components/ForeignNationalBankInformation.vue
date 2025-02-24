<!-- filepath: /c:/Users/Administrator/Documents/newest/my-vue-mobile-app/src/components/ForeignNationalBankInformation.vue -->
<template>
  <div class="container">
    <div class="form-container">
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

    onMounted(() => {
      bankName.value = store.bankName;
      bankAddressLine1.value = store.bankAddressLine1;
      bankCity.value = store.bankCity;
      bankCountry.value = store.bankCountry;
      bankAccountNumber.value = store.bankAccountNumber;
      swiftCode.value = store.swiftCode;
      bankTelephoneNumber.value = store.bankTelephoneNumber;
    });

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

          const response = await axios.post('http://localhost:3000/foreign-national-bank-information', formData, {
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
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;  /* Adjusted height */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
   /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

.form-container {
  background-image: url("@/assets/back.jpg");
  background-size: contain;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 100vh;
  text-align: center;
  overflow-y: auto;
  max-height: 100vh;
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
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
  background-color: #7838dd;
  color: white;
}

.next-button:hover, .submit-button:hover {
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