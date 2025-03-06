<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Parent/Guardian Information</h1>
      <form @submit.prevent="submitForm">
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

    // Get the base URL dynamically
    const getBaseURL = () => {
      return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : `http://${window.location.hostname}:3000`;
    };

    const handleFileUpload = (file) => {
      // Check if file exists and is valid
      if (file) {
        formData.value.RelationshipDocument = file;
        console.log('File uploaded:', file.name);
      }
    };

    const submitForm = async () => {
      try {
        // Create FormData object for file upload
        const formDataObj = new FormData();
        
        // Log the form data before submission
        console.log('Form data before submission:', { ...formData.value });
        
        // Add all form fields
        Object.keys(formData.value).forEach(key => {
          if (key === 'RelationshipDocument' && formData.value[key]) {
            console.log('Appending file:', formData.value[key].name);
            formDataObj.append(key, formData.value[key]);
          } else {
            console.log(`Appending field ${key}:`, formData.value[key]);
            formDataObj.append(key, formData.value[key] || '');
          }
        });

        const baseURL = getBaseURL();
        console.log('Submitting to URL:', `${baseURL}/parent-guardian-information`);
        
        const response = await axios.post(`${baseURL}/parent-guardian-information`, formDataObj, {
          headers: { 
            'Content-Type': 'multipart/form-data'
          },
          validateStatus: function (status) {
            return status >= 200 && status < 300; // Only treat 2xx as success
          }
        });

        console.log('Server response:', response.data);
        
        // Update store with form data (excluding the file)
        const storeData = { ...formData.value };
        delete storeData.RelationshipDocument;
        store.setParentGuardianInfo(storeData);
        
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

    const formatPlaceholder = (key) => {
      return key
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
        .trim(); // Remove any leading/trailing spaces
    };

    const getInputType = (key) => {
      return key.includes('Email') ? 'email' : key.includes('Phone') ? 'tel' : 'text';
    };

    const triggerFileUpload = () => {
      // Implementation of triggerFileUpload method
    };

    return {
      formData,
      handleFileUpload,
      submitForm,
      navigateToPrevious,
      formatPlaceholder,
      getInputType,
      triggerFileUpload
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

.input-group {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
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

.back-button, .submit-button {
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

.submit-button {
  background-color: #FFBC2D;
  color: white;
}

.submit-button:hover {
  background-color: #FF883F;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 15px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.submit-button:disabled:hover {
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
  
  form {
    padding: 15px 10px 70px;
  }
  
  .input-group {
    padding: 0 10px;
  }
  
  .button-group {
    padding: 0 10px;
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