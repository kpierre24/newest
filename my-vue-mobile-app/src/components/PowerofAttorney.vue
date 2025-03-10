<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
        <h1>Power of Attorney</h1>
        <form @submit.prevent="submitForm">
          <div v-if="formError" class="error-message">{{ formError }}</div>
          <div class="form-box">
            <div class="form-container">
              <h2>Attorney Information</h2>
              <FormInput
                label="First Name"
                type="text"
                id="attorneyFirstName"
                v-model="formData.attorneyFirstName"
                placeholder="Attorney First Name"
                :required="true"
                iconClass="icon fas fa-user"
              />
              <FormInput
                label="Last Name"
                type="text"
                id="attorneyLastName"
                v-model="formData.attorneyLastName"
                placeholder="Attorney Last Name"
                :required="true"
                iconClass="icon fas fa-user"
              />
              <FormInput
                label="Email"
                type="email"
                id="attorneyEmail"
                v-model="formData.attorneyEmail"
                placeholder="Attorney Email"
                :required="true"
                iconClass="icon fas fa-envelope"
              />
              <FormInput
                label="Phone Number"
                type="tel"
                id="attorneyPhone"
                v-model="formData.attorneyPhone"
                placeholder="Attorney Phone Number"
                :required="true"
                iconClass="icon fas fa-phone"
              />
            </div>
          </div>
          <div class="form-box">
            <div class="form-container">
              <h2>Document Upload</h2>
              <div class="input-container">
                <label>Power of Attorney Document</label>
                <FileUpload
                  id="poaDocument"
                  buttonText="Upload Document"
                  accept=".pdf,.jpg,.png"
                  @file-uploaded="handleFileUpload"
                />
              </div>
            </div>
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin"></i> Processing...
              </span>
              <span v-else>Next</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="desktop-view">
      <section class="login-section">
        <div class="login-content">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="engage-logo" />
          <div class="brand-text">
            <h1>Power of Attorney</h1>
            <p>Enter the attorney's details and upload required documents</p>
          </div>
          <form @submit.prevent="submitForm" class="desktop-form">
            <div v-if="formError" class="error-message">{{ formError }}</div>
            <div class="form-box">
              <div class="form-container">
                <h2>Attorney Information</h2>
                <FormInput
                  label="First Name"
                  type="text"
                  id="attorneyFirstName-desktop"
                  v-model="formData.attorneyFirstName"
                  placeholder="Attorney First Name"
                  :required="true"
                  iconClass="icon fas fa-user"
                />
                <FormInput
                  label="Last Name"
                  type="text"
                  id="attorneyLastName-desktop"
                  v-model="formData.attorneyLastName"
                  placeholder="Attorney Last Name"
                  :required="true"
                  iconClass="icon fas fa-user"
                />
                <FormInput
                  label="Email"
                  type="email"
                  id="attorneyEmail-desktop"
                  v-model="formData.attorneyEmail"
                  placeholder="Attorney Email"
                  :required="true"
                  iconClass="icon fas fa-envelope"
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  id="attorneyPhone-desktop"
                  v-model="formData.attorneyPhone"
                  placeholder="Attorney Phone Number"
                  :required="true"
                  iconClass="icon fas fa-phone"
                />
              </div>
            </div>
            <div class="form-box">
              <div class="form-container">
                <h2>Document Upload</h2>
                <div class="input-container">
                  <label>Power of Attorney Document</label>
                  <FileUpload
                    id="poaDocument-desktop"
                    buttonText="Upload Document"
                    accept=".pdf,.jpg,.png"
                    @file-uploaded="handleFileUpload"
                  />
                </div>
              </div>
            </div>
            <div class="button-group">
              <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
              <button type="submit" class="submit-button" :disabled="isLoading">
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
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'PowerOfAttorney',
  components: {
    FormInput,
    FileUpload
  },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const isLoading = ref(false);
    const formError = ref('');

    const formData = ref({
      attorneyFirstName: '',
      attorneyLastName: '',
      attorneyEmail: '',
      attorneyPhone: '',
      poaDocument: null
    });

    const handleFileUpload = (file) => {
      formData.value.poaDocument = file;
    };

    const submitForm = async () => {
      isLoading.value = true;
      formError.value = '';

      try {
        // Validate required fields
        if (!formData.value.attorneyFirstName || !formData.value.attorneyLastName || 
            !formData.value.attorneyEmail || !formData.value.attorneyPhone) {
          formError.value = 'Please fill in all required fields';
          isLoading.value = false;
          return;
        }

        // Get the base URL dynamically
        const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:3000' 
          : `http://${window.location.hostname}:3000`;

        try {
          const response = await axios.post(`${baseURL}/power-of-attorney`, formData.value, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Power of Attorney info submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

        // Update store with form data (excluding the file)
        const storeData = { ...formData.value };
        delete storeData.poaDocument;
        store.$patch((state) => {
          Object.assign(state, storeData);
        });

        router.push('/designation-of-beneficiary');
      } catch (error) {
        console.error('Error submitting power of attorney information:', error);
        formError.value = 'An error occurred while submitting your information';
      } finally {
        isLoading.value = false;
      }
    };

    const navigateToPrevious = () => {
      router.push('/account-number');
    };

    return {
      formData,
      handleFileUpload,
      submitForm,
      navigateToPrevious,
      isLoading,
      formError
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

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
  overflow: hidden;
}

.login-content {
  height: 100%;
  padding: 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.login-content::-webkit-scrollbar {
  width: 6px;
}

.login-content::-webkit-scrollbar-track {
  background: transparent;
}

.login-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.login-content::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.engage-logo {
  width: 100px;
  height: auto;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.engage-logo:hover {
  transform: scale(1.05);
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
}

.brand-text h1 {
  font-size: clamp(24px, 2.2vw, 32px);
  color: #261C6B;
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.brand-text p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
  letter-spacing: 0.5px;
  max-width: 80%;
  line-height: 1.5;
}

.desktop-form {
  width: 100%;
  max-width: 600px;
  padding: 0 1.5rem 2rem;
  flex: 1;
  overflow-y: auto;
  position: relative;
  margin-top: 1rem;
}

.brand-section {
  position: relative;
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  overflow: hidden;
  width: 50vw;
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
  height: 100%;
  background: linear-gradient(135deg, rgba(99, 98, 248, 0.4) 0%, rgba(38, 28, 107, 0.4) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
}

.brand-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  filter: brightness(1.2) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

.form-box {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.form-container {
  width: 100%;
}

.form-container h2 {
  font-size: clamp(16px, 1.4vw, 18px);
  color: #261C6B;
  margin-bottom: 1.5rem;
  font-weight: 500;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.5rem 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 0;
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

.submit-button:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Desktop Form Input Styles */
:deep(.form-input-container) {
  margin-bottom: 1rem;
}

:deep(label) {
  font-size: clamp(13px, 1.1vw, 15px);
  margin-bottom: 0.5rem;
  display: block;
  width: 100%;
  white-space: nowrap;
  overflow: visible;
}

:deep(input), 
:deep(select) {
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: clamp(14px, 1.2vw, 16px);
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

/* Error Message Styling */
.error-message {
  font-size: clamp(11px, 0.9vw, 13px);
  color: #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 3px solid #dc3545;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
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

  .desktop-view {
    display: none;
  }

  .content {
    min-height: 100vh;
    padding: 1.5rem;
    background: white;
  }

  .content h1 {
    font-size: clamp(24px, 2.2vw, 28px);
    color: #261C6B;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }

  form {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .form-box {
    padding: 1.5rem;
  }

  .button-group {
    flex-direction: column;
    gap: 0.75rem;
  }

  .back-button,
  .submit-button {
    width: 100%;
  }

  :deep(input), 
  :deep(select) {
    height: 3rem;
    font-size: 16px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100vw;
  }

  .login-section {
    padding: 1.5rem;
  }

  .login-content {
    padding: 2rem;
    max-height: 100vh;
    overflow-y: auto;
  }

  .form-box {
    margin-bottom: 1.5rem;
  }

  :deep(.form-input-container) {
    margin-bottom: 1.5rem;
  }
}
</style>