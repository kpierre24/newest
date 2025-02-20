<template>
  <div class="container">
    <div class="form-container">
      <h1>Politically Exposed Persons - Part 2</h1>
      <form @submit.prevent="submitPepInfo">
        <div class="input-container">
          <label>Are you an associate of a politically exposed person?</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="pepAssociate" value="yes" /> Yes
            </label>
            <label>
              <input type="radio" v-model="pepAssociate" value="no" /> No
            </label>
          </div>
          <div class="error-container">
            <span class="error">{{ errorMessage }}</span>
          </div>
        </div>

        <div class="input-container">
          <label for="relationshipToPep">Relationship to PEP</label>
          <input
            type="text"
            v-model="relationshipToPep"
            id="relationshipToPep"
            placeholder="Enter relationship"
            :disabled="pepAssociate === 'no'"
          />
          <div class="error-container">
            <span class="error">{{ errorMessage }}</span>
          </div>
        </div>

        <div class="input-container">
          <label for="pepName">Name of PEP</label>
          <input
            type="text"
            v-model="pepName"
            id="pepName"
            placeholder="Enter name of PEP"
            :disabled="pepAssociate === 'no'"
          />
          <div class="error-container">
            <span class="error">{{ errorMessage }}</span>
          </div>
        </div>
      </form>

      <!-- Navigation buttons at the bottom -->
      <div class="button-group">
        <button class="back-button" @click="navigateToPrevious">Back</button>
        <button type="submit" class="next-button" @click="submitPepInfo">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'PoliticallyExposedPersons2',
  setup() {
    const router = useRouter();
    const store = useDemoStore();

    const pepAssociate = ref('');
    const relationshipToPep = ref('');
    const pepName = ref('');
    const errorMessage = ref('');

    // Pull date of birth from Pinia store
    const dateOfBirth = computed(() => store.basicInfo?.dob);

    // Function to calculate age
    const calculateAge = (dob) => {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    };

    const submitPepInfo = async () => {
      if (!pepAssociate.value) {
        errorMessage.value = 'Please select an option.';
        return;
      }

      try {
        const formData = {
          pepAssociate: pepAssociate.value,
          relationshipToPep: relationshipToPep.value,
          pepName: pepName.value,
        };

        // Save data to Pinia store
        store.setPepInfo(formData);

        // Make API call
        await axios.post('http://localhost:3000/politically-exposed-persons-2', formData);

        // Calculate age and navigate accordingly
        if (dateOfBirth.value) {
          const age = calculateAge(dateOfBirth.value);
          if (age <= 17) {
            router.push({ name: 'ChildIdInformation' });
          } else {
            router.push({ name: 'IdInformation' });
          }
        } else {
          errorMessage.value = 'Date of birth is missing.';
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        errorMessage.value = 'An error occurred while submitting the form.';
      }
    };

    const navigateToPrevious = () => {
      router.push({ name: 'PoliticallyExposedPersons' }); // Replace with your previous route
    };

    return {
      pepAssociate,
      relationshipToPep,
      pepName,
      errorMessage,
      submitPepInfo,
      navigateToPrevious,
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
  background: #f4f4f4;
  padding: 20px;
}

.form-container {
  background-color: #ffffff;
  background-image: url('@/assets/back.jpg');
  background-size: contain;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  height: 90vh; /* Set a fixed height for the form container */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space evenly */
  align-items: center; /* Center items horizontally */
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
  width: 100%; /* Ensure input containers take full width */
  text-align: center; /* Center text and inputs */
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
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

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  justify-content: center;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #555;
}

.radio-group input[type="radio"] {
  width: 16px;
  height: 16px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%; /* Ensure buttons take full width */
}

.back-button, .next-button {
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

.next-button {
  background-color: #7838dd;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.error-container {
  color: red;
  font-size: 14px;
  margin-top: 5px;
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
  /* Add your CSS adjustments here */
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