<template>
  <div class="container">
    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="form-container">
        <div class="logo-container">
          <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        </div>
        <h1>Parent/Guardian Information</h1>
        <form @submit.prevent="submitForm">
          <div v-if="formError" class="error-message">{{ formError }}</div>
          <FormInput
            label="First Name"
            type="text"
            id="ParentFirstName"
            v-model="formData.ParentFirstName"
            placeholder="Parent First Name"
            :required="true"
            iconClass="icon fas fa-user"
          />
          <FormInput
            label="Middle Name"
            type="text"
            id="ParentMiddleName"
            v-model="formData.ParentMiddleName"
            placeholder="Parent Middle Name"
            iconClass="icon fas fa-user"
          />
          <FormInput
            label="Last Name"
            type="text"
            id="ParentLastName"
            v-model="formData.ParentLastName"
            placeholder="Parent Last Name"
            :required="true"
            iconClass="icon fas fa-user"
          />
          <FormInput
            label="Occupation"
            type="text"
            id="ParentOccupation"
            v-model="formData.ParentOccupation"
            placeholder="Parent Occupation"
            :required="true"
            iconClass="icon fas fa-briefcase"
          />
          <FormInput
            label="Workplace"
            type="text"
            id="ParentWorkplace"
            v-model="formData.ParentWorkplace"
            placeholder="Parent Workplace"
            :required="true"
            iconClass="icon fas fa-building"
          />
          <FormInput
            label="Email"
            type="email"
            id="ParentEmail"
            v-model="formData.ParentEmail"
            placeholder="Parent Email"
            :required="true"
            iconClass="icon fas fa-envelope"
          />
          <FormInput
            label="Phone Number"
            type="tel"
            id="ParentPhoneNumber"
            v-model="formData.ParentPhoneNumber"
            placeholder="Parent Phone Number"
            :required="true"
            iconClass="icon fas fa-phone"
          />
          <FormInput
            label="Relationship to Child"
            type="select"
            id="RelationshipToChild"
            v-model="formData.RelationshipToChild"
            :required="true"
            :selectOptions="['Mother', 'Father', 'Grandparent', 'Related Guardian', 'Unrelated Guardian']"
            iconClass="icon fas fa-users"
          />
          <div class="input-container">
            <label>Relationship Document</label>
            <FileUpload
              id="RelationshipDocument"
              buttonText="Browse"
              accept=".pdf,.jpg,.png"
              @file-uploaded="handleFileUpload"
            />
          </div>
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button">Next</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="desktop-view">
      <section class="login-section">
        <div class="login-content">
          
          <div class="brand-text">
            <h1>Parent/Guardian Information</h1>
            <p>Enter the parent or guardian's details</p>
          </div>
          <form @submit.prevent="submitForm" class="desktop-form">
            <div v-if="formError" class="error-message">{{ formError }}</div>
            <div class="form-box">
                <FormInput
                  label="First Name"
                  type="text"
                  id="ParentFirstName-desktop"
                  v-model="formData.ParentFirstName"
                  placeholder="Parent First Name"
                  :required="true"
                  iconClass="icon fas fa-user"
                />
                <FormInput
                  label="Middle Name"
                  type="text"
                  id="ParentMiddleName-desktop"
                  v-model="formData.ParentMiddleName"
                  placeholder="Parent Middle Name"
                  iconClass="icon fas fa-user"
                />
                <FormInput
                  label="Last Name"
                  type="text"
                  id="ParentLastName-desktop"
                  v-model="formData.ParentLastName"
                  placeholder="Parent Last Name"
                  :required="true"
                  iconClass="icon fas fa-user"
                />
                <FormInput
                  label="Occupation"
                  type="text"
                  id="ParentOccupation-desktop"
                  v-model="formData.ParentOccupation"
                  placeholder="Parent Occupation"
                  :required="true"
                  iconClass="icon fas fa-briefcase"
                />
                <FormInput
                  label="Workplace"
                  type="text"
                  id="ParentWorkplace-desktop"
                  v-model="formData.ParentWorkplace"
                  placeholder="Parent Workplace"
                  :required="true"
                  iconClass="icon fas fa-building"
                />
                <FormInput
                  label="Email"
                  type="email"
                  id="ParentEmail-desktop"
                  v-model="formData.ParentEmail"
                  placeholder="Parent Email"
                  :required="true"
                  iconClass="icon fas fa-envelope"
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  id="ParentPhoneNumber-desktop"
                  v-model="formData.ParentPhoneNumber"
                  placeholder="Parent Phone Number"
                  :required="true"
                  iconClass="icon fas fa-phone"
                />
                <FormInput
                  label="Relationship to Child"
                  type="select"
                  id="RelationshipToChild-desktop"
                  v-model="formData.RelationshipToChild"
                  :required="true"
                  :selectOptions="['Mother', 'Father', 'Grandparent', 'Related Guardian', 'Unrelated Guardian']"
                  iconClass="icon fas fa-users"
                />
                <div class="input-container">
                  <label>Relationship Document</label>
                  <FileUpload
                    id="RelationshipDocument-desktop"
                    buttonText="Browse"
                    accept=".pdf,.jpg,.png"
                    @file-uploaded="handleFileUpload"
                  />
                
              </div>
            </div>
            <div class="button-group">
              <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
              <button type="submit" class="submit-button">Next</button>
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
  name: 'ParentGuardianInformation',
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
      ParentFirstName: '',
      ParentMiddleName: '',
      ParentLastName: '',
      ParentOccupation: '',
      ParentWorkplace: '',
      ParentEmail: '',
      ParentPhoneNumber: '',
      RelationshipToChild: '',
      RelationshipDocument: null
    });

    const handleFileUpload = (file) => {
      formData.value.RelationshipDocument = file;
    };

    const submitForm = async () => {
      isLoading.value = true;
      formError.value = '';

      try {
        // Validate required fields
        if (!formData.value.ParentFirstName || !formData.value.ParentLastName || 
            !formData.value.ParentOccupation || !formData.value.ParentWorkplace || 
            !formData.value.ParentEmail || !formData.value.ParentPhoneNumber || 
            !formData.value.RelationshipToChild) {
          formError.value = 'Please fill in all required fields';
          isLoading.value = false;
          return;
        }

        // Get the base URL dynamically
        const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:3000' 
          : `http://${window.location.hostname}:3000`;

        try {
          const response = await axios.post(`${baseURL}/parent-guardian-info`, formData.value, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Parent/Guardian info submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

        // Update store with form data (excluding the file)
        const storeData = { ...formData.value };
        delete storeData.RelationshipDocument;
        store.$patch((state) => {
          Object.assign(state, storeData);
        });

        router.push('/id-information');
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });

        // Create a user-friendly error message
        let errorMessage = 'An error occurred while saving your information. ';
        if (error.response?.status === 500) {
          errorMessage += 'The server encountered an internal error. Please try again later.';
        } else if (error.response?.data?.message) {
          errorMessage += error.response.data.message;
        }

        // Show error to user (you might want to add a toast/alert component for this)
        alert(errorMessage);

        // Still update store and continue navigation
        const storeData = { ...formData.value };
        delete storeData.RelationshipDocument;
        store.setParentGuardianInfo(storeData);
        
        // Add a small delay before navigation
        setTimeout(() => {
          router.push('/id-information');
        }, 1500);
      }
    };

    const navigateToPrevious = () => {
      router.push('/politically-exposed-persons-2');
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
.desktop-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  width: 100%;
}

.login-section {
  width: 50vw;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.login-content {
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  font-size: clamp(24px, 2.5vw, 32px);
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.form-header p {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #666;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-grid .input-group {
  grid-column: span 2;
}

.form-grid .input-group.half {
  grid-column: span 1;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #555;
  font-weight: 500;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: clamp(14px, 1.2vw, 16px);
  background: #fff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 98, 248, 0.1);
}

.file-upload-section {
  margin: 2rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.back-button,
.next-button {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #5251d3;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #e6a928;
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
  width: 150px;
  filter: brightness(1) drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  z-index: 2;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .desktop-view {
    display: none;
  }
  
  .mobile-view {
    display: block;
    padding: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-grid .input-group,
  .form-grid .input-group.half {
    grid-column: 1;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .login-content {
    padding: 1rem;
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