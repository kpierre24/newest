<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Politically Exposed Persons - Part 2</h1>
      <form @submit.prevent="submitPepInfo">
        <div class="input-container">
          <label>Are you an associate of a politically exposed person?</label>
          <div class="radio-group">
            <label>
              <input type="radio" v-model="pepAssociate" value="yes" required/> Yes
            </label>
            <label>
              <input type="radio" v-model="pepAssociate" value="no" required/> No
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
            v-model="pepAssociateDetails"
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

      <!-- Navigation buttons at the bottom -->
      <div class="button-group">
        <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
        <button type="submit" class="next-button">Next</button>
      </div>
      </form>
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
    const pepAssociateDetails = ref('');
    const pepName = ref('');
    const errorMessage = ref('');

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    // Calculate age based on date of birth
    const age = computed(() => {
      if (!store.dob) return null;
      
      const birthDate = new Date(store.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    });

    const submitPepInfo = async () => {
      if (pepAssociate.value === '') {
        errorMessage.value = 'Please select an option.';
        return;
      }

      if (pepAssociate.value === 'yes' && !pepAssociateDetails.value) {
        errorMessage.value = 'Please provide details about your association with a politically exposed person.';
        return;
      }

      const formData = {
        pepAssociate: pepAssociate.value,
        pepAssociateDetails: pepAssociateDetails.value,
        pepName: pepName.value
      };

      try {
        // Update store
        store.setPepInfo2(formData);
        
        // Submit to API
        const baseURL = getBaseURL();
        await axios.post(`${baseURL}/politically-exposed-persons-2`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Navigate based on age
        if (age.value && age.value < 18) {
          router.push('/parent-guardian-information');
        } else {
          router.push('/id-information');
        }
      } catch (error) {
        console.error('Error submitting PEP information:', error);
        
        // Continue with navigation even if API fails
        if (age.value && age.value < 18) {
          router.push('/parent-guardian-information');
        } else {
          router.push('/id-information');
        }
      }
    };

    const navigateToPrevious = () => {
      router.push('/politically-exposed-persons');
    };

    return {
      pepAssociate,
      pepAssociateDetails,
      pepName,
      errorMessage,
      submitPepInfo,
      navigateToPrevious
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #333;
  font-size: 20px;
  text-decoration: none;
  z-index: 10;
}

.back-icon {
  font-size: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.input-container {
  position: relative;
  margin-bottom: 20px;
  width: 100%; /* Ensure input containers take full width */
  text-align: left; /* Align text to the left for better readability */
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
  border-color: #FFBC2D;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 188, 45, 0.3);
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
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
  accent-color: #FFBC2D;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
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
  background-color: #FFBC2D;
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

/* Scrollbar styling */
.content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style>