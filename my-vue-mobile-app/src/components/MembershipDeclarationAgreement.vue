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
        router.push('/account-number');
      } catch (error) {
        console.error('Error submitting membership declaration:', error);
        
        if (!errorMessage.value) {
          errorMessage.value = 'An error occurred. Please try again.';
        }
        
        // Continue with navigation even if API fails after a short delay
        setTimeout(() => {
          router.push('/account-number');
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
  color: #FFBC2D;
  text-align: center;
}

.body-container {
  margin-bottom: 20px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 10px;
  text-align: left;
}

.form-section {
  width: 100%;
  margin-bottom: 20px;
}

.form-section p {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
}

.radio-group {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
  margin-bottom: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.radio-group input[type="radio"] {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  border-color: #FFBC2D;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 188, 45, 0.3);
}

.input-wrapper .icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 18px;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  border-left: 4px solid #d32f2f;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.next-button, .disagree-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.next-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.disagree-button {
  background-color: #f15539ea;
  color: white;
}

.disagree-button:hover {
  background-color: #f38b79ea;
}

.disagree-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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
