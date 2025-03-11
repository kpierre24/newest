<template>
  <div class="container">
    <section class="form-section">
      <div class="content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        <div class="brand-text">
          <h1>Branch Selection</h1>
          <p>Choose your preferred branch and contact preferences</p>
        </div>
        <form @submit.prevent="handleSubmit">
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
            <p>Choose your preferred method of contact</p>
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
            <button type="submit" class="next-button" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin"></i> Processing...
              </span>
              <span v-else>Next</span>
            </button>
          </div>
        </form>
      </div>
    </section>
    <section class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </section>
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
    const isLoading = ref(false);

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const handleSubmit = async () => {
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
        isLoading.value = true;
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
      } finally {
        isLoading.value = false;
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
      isLoading,
      handleSubmit,
      navigateToPrevious,
    };
  },
};
</script>

<style scoped>
/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-section {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  margin-bottom: 1.5rem;
}

.brand-text {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: 24px;
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.brand-text p {
  color: #666;
  font-size: 14px;
}

form {
  width: 100%;
}

/* Form styles */
:deep(.form-input-container) {
  margin-bottom: 1rem;
  width: 100%;
}

:deep(input), 
:deep(select) {
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
}
:deep(select) {
  width: 100%;
  height: 2.7rem;
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  
}

:deep(input:focus), 
:deep(select:focus) {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 98, 248, 0.1);
}

.contact-method-container,
.contact-time-container {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.contact-method-container p,
.contact-time-container p {
  font-size: 14px;
  color: #333;
  margin-bottom: 1rem;
}

hr {
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
}

.radio-container {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.radio-container input[type="radio"] {
  width: 16px;
  height: 16px;
  margin-right: 0.75rem;
  accent-color: #6362F8;
}

.radio-container label {
  font-size: 14px;
  color: #333;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  width: 100%;
}

.back-button,
.next-button {
  flex: 1;
  height: 2.5rem;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
  border: none;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
  border: none;
}

.error-message {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  font-size: 14px;
}

/* Mobile specific styles */
@media (max-width: 767px) {
  .form-section {
    padding: 20px;
  }

  .content {
    padding: 0;
  }

  .button-group {
    flex-direction: column;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  .form-section {
    width: 50%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .form-section::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .content {
    max-width: 450px;
    padding: 2rem;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
  }

  .brand-section {
    display: block;
    position: relative;
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
    overflow: hidden;
  }

  .brand-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/background.png') center/cover no-repeat;
    opacity: 0.1;
    mix-blend-mode: overlay;
  }

  .brand-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    filter: brightness(1.2);
    z-index: 2;
  }
}
</style>