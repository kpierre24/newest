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
        await axios.post(`${baseURL}/politically-exposed-persons-2`, formData);

        // Get age from store's basic info
        const birthDate = new Date(store.basicInfo.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // Navigate based on age
        if (age < 18) {
          router.push('/child-id-information');
        } else {
          router.push('/id-information');
        }
      } catch (error) {
        console.error('Error submitting PEP information:', error);
        errorMessage.value = 'An error occurred while submitting your information';
        
        // Get age from store's basic info for error case navigation
        const birthDate = new Date(store.basicInfo.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // Continue with navigation even if API fails after a short delay
        setTimeout(() => {
          if (age < 18) {
            router.push('/child-id-information');
          } else {
            router.push('/id-information');
          }
        }, 2000);
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

.input-container {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.input-container label {
  display: block;
  font-size: clamp(14px, 3vw, 16px);
  color: #333;
  margin-bottom: 10px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: clamp(14px, 3vw, 16px);
  color: #333;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  width: 18px;
  height: 18px;
  margin: 0;
}

.input-container input[type="text"] {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: clamp(14px, 3vw, 16px);
  transition: border-color 0.3s ease;
}

.input-container input[type="text"]:focus {
  outline: none;
  border-color: #FFBC2D;
}

.input-container input[type="text"]:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-container {
  margin-top: 5px;
}

.error {
  color: #d32f2f;
  font-size: clamp(12px, 2.5vw, 14px);
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
  color: #FFBC2D;
  transition: color 0.3s ease;
}

.back-icon:hover {
  color: #FF883F;
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
  
  .input-container {
    padding: 0 10px;
  }
  
  .back-icon-link {
    top: 15px;
    left: 15px;
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