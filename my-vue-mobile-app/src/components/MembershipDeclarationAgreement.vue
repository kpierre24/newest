<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Membership Declaration Agreement</h1>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="body-container">
        <p>
          I hereby make application for membership in <strong>CATHEDRAL CREDIT UNION CO-OPERATIVE SOCIETY LIMITED</strong> and if admitted, agree to abide by the Bye-Laws or amendments of the said Society. I am aware that I am not a bona fide member of the society until this application is approved by the Board of Directors. I further pledge to offer my skills towards the growth of the Society.
        </p>
      </div>
      <div class="form-section">
        <p>Are you a member of another credit union?</p>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="isMemberOfAnotherCreditUnion" value="yes" /> Yes
          </label>
          <label>
            <input type="radio" v-model="isMemberOfAnotherCreditUnion" value="no" /> No
          </label>
        </div>
      </div>
      
      <div class="form-section" v-if="isMemberOfAnotherCreditUnion === 'yes'">
        <p>What is the name of the credit union?</p>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="creditUnionName" 
            placeholder="Name of credit union" 
          />
          <i class="icon fas fa-building"></i>
        </div>
      </div>
      
      <div class="form-section">
        <p>Are you serving on another Credit Union/State Board of Directors/Committee?</p>
        <div class="radio-group">
          <label>
            <input type="radio" v-model="isServingOnBoard" value="yes" /> Yes
          </label>
          <label>
            <input type="radio" v-model="isServingOnBoard" value="no" /> No
          </label>
        </div>
      </div>
      
      <div class="form-section" v-if="isServingOnBoard === 'yes'">
        <p>What is the name of the Board?</p>
        <div class="input-wrapper">
          <input 
            type="text" 
            v-model="creditUnionBoardName" 
            placeholder="Name of credit union board" 
          />
          <i class="icon fas fa-users"></i>
        </div>
      </div>
      
      <div class="button-group">
        <button class="next-button" @click="goNext" :disabled="isLoading">
          {{ isLoading ? 'Processing...' : 'Next' }}
        </button>
        <button class="disagree-button" @click="disagree" :disabled="isLoading">Disagree</button>
      </div>
    </div>
    
    <TermsAndConditions :visible="showTermsModal" @close="toggleTermsModal" />
    <FinancialDeclaration :visible="showFinancialDeclarationModal" @close="toggleFinancialDeclarationModal" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import TermsAndConditions from './TermsAndConditions.vue';
import FinancialDeclaration from './FinancialDeclaration.vue';

export default {
  name: 'MembershipDeclarationAgreement',
  components: {
    TermsAndConditions,
    FinancialDeclaration
  },
  setup() {
    const router = useRouter();
    const demoStore = useDemoStore();
    const isMemberOfAnotherCreditUnion = ref(demoStore.isMemberOfAnotherCreditUnion || 'no');
    const creditUnionName = ref(demoStore.creditUnionName || '');
    const isServingOnBoard = ref(demoStore.isServingOnBoard || 'no');
    const creditUnionBoardName = ref(demoStore.creditUnionBoardName || '');
    const showTermsModal = ref(false);
    const showFinancialDeclarationModal = ref(false);
    const errorMessage = ref('');
    const isLoading = ref(false);

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const toggleTermsModal = () => {
      showTermsModal.value = !showTermsModal.value;
    };

    const toggleFinancialDeclarationModal = () => {
      showFinancialDeclarationModal.value = !showFinancialDeclarationModal.value;
    };

    const validateForm = () => {
      return new Promise((resolve, reject) => {
        errorMessage.value = '';
        
        if (isMemberOfAnotherCreditUnion.value === 'yes' && !creditUnionName.value.trim()) {
          errorMessage.value = 'Please enter the name of the credit union';
          reject(new Error(errorMessage.value));
          return;
        }
        
        if (isServingOnBoard.value === 'yes' && !creditUnionBoardName.value.trim()) {
          errorMessage.value = 'Please enter the name of the board';
          reject(new Error(errorMessage.value));
          return;
        }
        
        resolve({
          isMemberOfAnotherCreditUnion: isMemberOfAnotherCreditUnion.value,
          creditUnionName: creditUnionName.value,
          isServingOnBoard: isServingOnBoard.value,
          creditUnionBoardName: creditUnionBoardName.value
        });
      });
    };

    const goNext = async () => {
      isLoading.value = true;
      errorMessage.value = '';
      
      try {
        // Validate form
        const formData = await validateForm();
        
        // Update store
        demoStore.setMembershipInfo(formData);

        // Submit to API
        const baseURL = getBaseURL();
        await axios.post(`${baseURL}/membership-declaration-agreement`, formData);

        // Navigate to next page
        router.push('/politically-exposed-persons');
      } catch (error) {
        console.error('Error submitting membership declaration:', error);
        
        if (!errorMessage.value) {
          errorMessage.value = 'An error occurred. Please try again.';
        }
        
        // Continue with navigation even if API fails after a short delay
        setTimeout(() => {
          router.push('/politically-exposed-persons');
        }, 2000);
      } finally {
        isLoading.value = false;
      }
    };

    const disagree = () => {
      router.push('/');
    };

    return {
      isMemberOfAnotherCreditUnion,
      creditUnionName,
      isServingOnBoard,
      creditUnionBoardName,
      showTermsModal,
      showFinancialDeclarationModal,
      errorMessage,
      isLoading,
      toggleTermsModal,
      toggleFinancialDeclarationModal,
      goNext,
      disagree
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
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(2px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

.body-container {
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin: 20px;
  font-size: clamp(14px, 3vw, 16px);
  line-height: 1.6;
}

.form-section {
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  margin-bottom: 15px;
}

.form-section p {
  font-size: clamp(14px, 3vw, 16px);
  color: #333;
  margin-bottom: 10px;
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
  font-size: clamp(14px, 3vw, 16px);
  cursor: pointer;
}

.radio-group input[type="radio"] {
  accent-color: #FFBC2D;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: clamp(14px, 3vw, 16px);
  background: #f9f9f9;
  transition: 0.3s ease;
}

.input-wrapper input:focus {
  border-color: #FFBC2D;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 188, 45, 0.2);
}

.input-wrapper .icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 0 20px 20px;
  box-sizing: border-box;
}

.next-button, .disagree-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #FF883F;
}

.disagree-button {
  background-color: #261C6B;
  color: white;
}

.disagree-button:hover {
  background-color: #FF883F;
}

.next-button:disabled, .disagree-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover, .disagree-button:disabled:hover {
  background-color: #cccccc;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 20px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 3;
}

.back-icon {
  color: #FFBC2D;
  font-size: 20px;
  transition: color 0.3s ease;
}

.back-icon:hover {
  color: #FF883F;
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
  
  .body-container, .form-section {
    margin: 10px;
    padding: 15px;
  }
  
  .button-group {
    padding: 0 15px 15px;
  }
  
  .radio-group {
    flex-direction: column;
    gap: 10px;
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
