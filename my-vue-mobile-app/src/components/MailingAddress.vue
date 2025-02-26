<template>
  <div class="container">
    <div class="form-container">
      <h1>Mailing Address</h1>
      <form @submit.prevent="submitMailingAddress">
        <FormInput
          label=""
          type="text"
          id="AddressLine1"
          v-model="AddressLine1"
          placeholder="Mailing Address line 1"
          :required="!sameAsHomeAddress"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label=""
          type="text"
          id="AddressLine2"
          v-model="AddressLine2"
          placeholder="Mailing Address line 2"
          iconClass="icon fas fa-map-marker-alt"
        />
        <FormInput
          label=""
          type="text"
          id="City"
          v-model="City"
          placeholder="Mailing City"
          :required="!sameAsHomeAddress"
          iconClass="icon fas fa-city"
        />
        <FormInput
          label=""
          type="select"
          id="Country"
          v-model="Country"
          :required="!sameAsHomeAddress"
          :selectOptions="countries"
          iconClass="icon fas fa-globe"
        />
        <div class="checkbox-container">
          <input type="checkbox" v-model="sameAsHomeAddress" id="sameAsHomeAddress" />
          <label for="sameAsHomeAddress">Same as Home Address</label>
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { countries } from 'countries-list';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import FormInput from '@/props/FormInput.vue';

export default {
  components: {
    FormInput
  },
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const AddressLine1 = ref('');
    const AddressLine2 = ref('');
    const City = ref('');
    const Country = ref('');
    const sameAsHomeAddress = ref(false);
    const countriesList = ref(Object.values(countries).map(country => country.name));

    onMounted(() => {
      Country.value = store.Country;
    });

    const validateForm = () => {
      return AddressLine1.value && City.value && Country.value;
    };

    const submitMailingAddress = async () => {
      if (validateForm() || sameAsHomeAddress.value) {
        try {
          const formData = {
            AddressLine1: AddressLine1.value,
            AddressLine2: AddressLine2.value,
            City: City.value,
            Country: Country.value
          };

          // Save mailing address info to the store
          store.setMailingAddressInfo(formData);

          // Debugging logs to check form data
          console.log('Mailing Address Data:', formData);

          const response = await axios.post('http://localhost:3000/mailing-address', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Mailing address info submitted:', response.data);
          console.log('Store State:', store.$state);

          // Navigate to the appropriate page based on nationality
          if (store.Nationality === 'Trinidad and Tobago') {
            router.push('/employment-information');
          } else {
            router.push('/foreign-national-bank-information');
          }
        } catch (error) {
          console.error('Error submitting mailing address info:', error);
          console.error('Error details:', error.response ? error.response.data : error.message);
        }
      } else {
        alert('Please fill in all required fields.');
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
      sameAsHomeAddress,
      countries: countriesList,
      validateForm,
      submitMailingAddress,
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
  width: 100%; /* Ensure buttons take full width */
}

.back-button, .submit-button, .next-button {
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

.next-button , .submit-button {
  background-color: #FFBC2D ;
  color: white;
}

.next-button:hover , .submit-button:hover {
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
.icon fas fa-map-marker-alt {
  width: 24px;
  height: 24px;
  color: #333;
  transform: translateY(-10px);
  display: inline-block;
  vertical-align: middle;
  
}
</style>