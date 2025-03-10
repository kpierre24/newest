<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="content">
        <h1>Branch</h1>
        <h2>Choose which branch you would like your account managed at</h2>
        <form @submit.prevent="handleSubmit">
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

    <!-- Desktop View -->
    <div class="desktop-view">
      <section class="login-section">
        <div class="login-content">
          <img src="@/assets/cathedral-engage-logo.png" alt="Engage Logo" class="engage-logo" />
          <div class="brand-text">
            <h1>Branch Selection</h1>
            <p>Choose your preferred branch and contact preferences</p>
          </div>
          <form @submit.prevent="handleSubmit">
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
                <input type="radio" id="phone-desktop" value="phone" v-model="preferredContactMethod" />
                <label for="phone-desktop">Phone</label>
              </div>
              <div class="radio-container">
                <input type="radio" id="email-desktop" value="email" v-model="preferredContactMethod" />
                <label for="email-desktop">Email</label>
              </div>
            </div>
            <div class="contact-time-container">
              <p>Please choose the best time to contact you</p>
              <hr />
              <div class="radio-container">
                <input type="radio" id="morning-desktop" value="8:00am to 12:00pm" v-model="bestContactTime" />
                <label for="morning-desktop">8:00am to 12:00pm</label>
              </div>
              <div class="radio-container">
                <input type="radio" id="afternoon-desktop" value="12:00pm to 4:00pm" v-model="bestContactTime" />
                <label for="afternoon-desktop">12:00pm to 4:00pm</label>
              </div>
              <div class="radio-container">
                <input type="radio" id="evening-desktop" value="4:00pm to 8:00pm" v-model="bestContactTime" />
                <label for="evening-desktop">4:00pm to 8:00pm</label>
              </div>
            </div>
            <div class="button-group">
              <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
              <button type="submit" class="submit-button">Next</button>
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          </form>
        </div>
      </section>
      <section class="brand-section">
        <img src="@/assets/cathedral-engage-logo.png" alt="Brand Logo" class="brand-logo" />
      </section>
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
      handleSubmit,
      navigateToPrevious,
    };
  },
};
</script>


<style scoped>
.container {
  height: 100vh;
  width: 100%;
  max-width: 1920px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
}

/* Mobile View */
.mobile-view {
  display: none;
}

/* Desktop View */
.login-section {
  width: 50vw;
  height: 100vh;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.login-content {
  height: 100vh;
  padding: 0.75rem 0;
  overflow-y: hidden;
}

.engage-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
}

.brand-text h1 {
  font-size: clamp(24px, 2.2vw, 28px);
  color: #261C6B;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.brand-text p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
  letter-spacing: 0.5px;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-section {
  position: relative;
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

.brand-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, rgba(99, 98, 248, 0.4) 0%, rgba(38, 28, 107, 0.4) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  filter: brightness(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

form {
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 1rem;
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
  font-size: clamp(14px, 1.2vw, 16px);
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
  font-size: clamp(13px, 1.1vw, 15px);
  color: #333;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.back-button,
.submit-button {
  flex: 1;
  padding: 0.75rem;
  font-size: clamp(13px, 1.1vw, 15px);
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.back-button {
  background-color: transparent;
  border: 1px solid #6362F8;
  color: #6362F8;
}

.back-button:hover {
  background-color: rgba(99, 98, 248, 0.05);
  transform: translateY(-1px);
}

.submit-button {
  background-color: #6362F8;
  border: none;
  color: white;
}

.submit-button:hover {
  background-color: #4b4ac0;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.error-message {
  font-size: clamp(11px, 0.9vw, 13px);
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 3px solid #dc3545;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
}

/* Mobile Styles */
@media (max-width: 767px) {
  .container {
    display: block;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .mobile-view {
    display: block;
    min-height: 100vh;
  }

  .login-section,
  .brand-section {
    display: none;
  }

  .content {
    min-height: 100vh;
    padding: 20px;
    background: white;
  }

  form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .button-group {
    flex-direction: column;
  }

  .back-button,
  .submit-button {
    max-width: 100%;
  }
}

/* Desktop Styles */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1920px;
  }

  .mobile-view {
    display: none;
  }

  .desktop-view {
    display: block;
  }

  h1 {
    font-size: clamp(24px, 2.2vw, 28px);
    color: #261C6B;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: clamp(16px, 1.4vw, 18px);
    color: #666;
    margin-bottom: 2rem;
    text-align: center;
  }
}
</style>