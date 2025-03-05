<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Branch</h1>
      <h2>Choose which branch you would like your account managed at</h2>
      <form @submit.prevent="submitBranch">
        <FormInput
          label="Branch"
          type="select"
          id="branch"
          v-model="selectedBranch"
          :required="true"
          :selectOptions="['Port of Spain', 'Milford Rd, Tobago']"
          iconClass="icon fas fa-building"
        />
        <div class="contact-method-container">
          <p>Choose which is your preferred method of contact</p>
          <hr />
          <div class="radio-container">
            <input type="radio" id="phone" value="phone" v-model="preferredContactMethod" />
            <label for="phone">Phone</label>
          </div>
          <div class="radio-container">
            <input type="radio" id="email" value="email" v-model="preferredContactMethod" />
            <label for="email">Email</label>
          </div>
        </div>
        <div class="contact-time-container">
          <p>Please choose the best time to contact you</p>
          <hr />
          <div class="radio-container">
            <input type="radio" id="morning" value="8:00am to 12:00pm" v-model="bestContactTime" />
            <label for="morning">8:00am to 12:00pm</label>
          </div>
          <div class="radio-container">
            <input type="radio" id="afternoon" value="12:00pm to 4:00pm" v-model="bestContactTime" />
            <label for="afternoon">12:00pm to 4:00pm</label>
          </div>
          <div class="radio-container">
            <input type="radio" id="evening" value="4:00pm to 8:00pm" v-model="bestContactTime" />
            <label for="evening">4:00pm to 8:00pm</label>
          </div>
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="submit-button">Next</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import FormInput from '@/props/FormInput.vue';

export default {
  name: 'Branch',
  components: {
    FormInput
  },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const selectedBranch = ref('');
    const preferredContactMethod = ref('');
    const bestContactTime = ref('');
    const errorMessage = ref('');

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const submitBranch = async () => {
      const formData = {
        selectedBranch: selectedBranch.value,
        preferredContactMethod: preferredContactMethod.value,
        bestContactTime: bestContactTime.value,
      };

      if (!formData.selectedBranch || !formData.preferredContactMethod || !formData.bestContactTime) {
        errorMessage.value = 'Please fill all required fields.';
        return;
      }

      store.setBranchInfo(formData);
      console.log('Branch info saved to store:', formData);

      try {
        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/branch`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Branch information submitted:', response.data);
        console.log('Navigating to /success');
        router.push('/success');
      } catch (error) {
        console.error('Error submitting branch information:', error);
        errorMessage.value = 'An error occurred. Please try again later.';
        
        // Log detailed error information for debugging
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        
        // Continue with navigation even if API fails
        console.log('API failed but continuing navigation to /success');
        router.push('/success');
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      selectedBranch,
      preferredContactMethod,
      bestContactTime,
      errorMessage,
      submitBranch,
      navigateToPrevious,
    };
  },
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
  margin-bottom: 10px;
  color: #FFBC2D;
}

h2 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
}

.contact-method-container,
.contact-time-container {
  text-align: left;
  margin-bottom: 20px;
  width: 100%;
}

hr {
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 15px 0;
}

.radio-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-container input[type="radio"] {
  width: 16px;
  height: 16px;
  accent-color: #FFBC2D;
  margin-right: 10px;
}

.radio-container label {
  font-size: 14px;
  color: #000;
  cursor: pointer;
}

.error-message {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button {
  width: 48%;
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

.submit-button {
  background-color: #FFBC2D;
  color: white;
}

.submit-button:hover {
  background-color: #9e79da;
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