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
    const age = computed(() => store.basicInfo.age);

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
        await axios.post('http://localhost:3000/politically-exposed-persons-2', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Calculate age and navigate accordingly
        if (age.value !== null) {
          if (age.value < 17) {
        router.push({ name: 'ChildIdInformation' });
          } else {
        router.push({ name: 'IdInformation' });
          }
        } else {
          errorMessage.value = 'Date of birth or age is missing.';
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
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
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
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  position: relative;
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
  padding-left: 40px; /* Adjust padding to make space for the icon */
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
  background-color: #FFBC2D ;
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

.agree-button, .disagree-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.agree-button {
  background-color: #007bff;
  color: white;
}

.agree-button:hover {
  background-color: #0056b3;
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

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
}

@media (max-width: 600px) {
  .container {
    padding: 10px;
  }

  .form-container {
    padding: 20px;
    width: 100%;
    max-width: 100%;
  }

  .button-group {
    flex-direction: column;
    gap: 5px;
  }

  .back-button, .next-button {
    padding: 10px;
    font-size: 14px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 100%;
    height: 100vh;
    padding: 40px;
  }

  .form-container {
    padding: 60px;
    width: 100%;
    max-width: 800px;
    height: auto;
  }

  .button-group {
    flex-direction: row;
    justify-content: space-between;
  }

  .back-button, .next-button {
    width: 48%;
    padding: 20px;
    font-size: 18px;
  }
}
</style>