<template>
  <div class="container">
    <div class="form-container">
      <h1>Politically Exposed Persons - Part 2</h1>
      <form @submit.prevent="submitPepInfo">
        <div class="input-container">
          <label for="pepAssociate">Are you an associate of a politically exposed person?</label>
          <select v-model="pepAssociate" id="pepAssociate" required>
            <option value="" disabled>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div class="error-container">
            <span class="error">{{ errorMessage }}</span>
          </div>
        </div>

        <div class="input-container" v-if="pepAssociate === 'yes'">
          <label for="relationshipToPep">Relationship to PEP</label>
          <input 
            type="text" 
            v-model="relationshipToPep" 
            id="relationshipToPep" 
            placeholder="Enter relationship"
            :required="pepAssociate === 'yes'"
          />
        </div>

        <div class="input-container" v-if="pepAssociate === 'yes'">
          <label for="pepName">Name of PEP</label>
          <input 
            type="text" 
            v-model="pepName" 
            id="pepName" 
            placeholder="Enter name of PEP"
            :required="pepAssociate === 'yes'"
          />
        </div>

        <div class="button-group">
          <button class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'; // Import computed
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


  
      
    
 

    const validateForm = () => {
      if (!pepAssociate.value) {
        errorMessage.value = 'Please select whether you are an associate of a politically exposed person.';
        return false;
      }

      // Only validate other fields if 'yes' is selected
      if (pepAssociate.value === 'yes') {
        if (!relationshipToPep.value || !pepName.value) {
          errorMessage.value = 'Please fill all required fields.';
          return false;
        }
      }

      return true;
    };

    const submitPepInfo = async () => {
      if (validateForm()) {
        try {
          const formData = {
            pepAssociate: pepAssociate.value,
            relationshipToPep: pepAssociate.value === 'yes' ? relationshipToPep.value : '',
            pepName: pepAssociate.value === 'yes' ? pepName.value : ''
          };

          // Save PEP info to the store
          store.setPepInfo(formData);

          // Make API call
          await axios.post('http://localhost:3000/politically-exposed-persons-2', formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          // Get date of birth from store
          const dateOfBirth = store.dob;
          console.log('Date of Birth from store:', dateOfBirth);

          // Calculate age
          const today = new Date();
          const birthDate = new Date(dateOfBirth);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          
          // Adjust age if birthday hasn't occurred this year
          const finalAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
            ? age - 1 
            : age;

          console.log('Calculated age:', finalAge);

          // Navigate based on age
          if (finalAge >= 17) {
            console.log('Navigating to ID Information (Adult)');
            router.push('/id-information');
          } else {
            console.log('Navigating to Child ID Information');
            router.push('/child-id-information');
          }

        } catch (error) {
          console.error('Error in form submission:', error);
          errorMessage.value = 'An error occurred while processing your information.';
        }
      }
    };

    const navigateToPrevious = () => {
      router.push('/politically-exposed-persons');
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
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-group, .input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
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

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button, .next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.submit-button:hover, .next-button:hover {
  background-color: #0056b3;
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