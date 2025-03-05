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

    const handleFileUpload = (event) => {
      formData.value.RelationshipDocument = event.target.files[0];
    };

    const submitForm = async () => {
      try {
        const formDataObj = new FormData();
        for (const key in formData.value) {
          formDataObj.append(key, formData.value[key]);
        }

        const baseURL = getBaseURL();
        const response = await axios.post(`${baseURL}/parent-guardian-information`, formDataObj, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log('Response:', response.data);
        store.setParentGuardianInfo(formData.value);
        router.push({ name: 'IdInformation' });
      } catch (error) {
        console.error('Error submitting form:', error);
        // Continue with navigation even if API fails
        store.setParentGuardianInfo(formData.value);
        router.push({ name: 'IdInformation' });
      }
    };

    const navigateToPrevious = () => {
      router.push({ name: 'ChildIdInformation' });
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
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button {
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