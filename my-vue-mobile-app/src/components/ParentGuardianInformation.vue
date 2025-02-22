<template>
  <div class="container">
    <div class="form-container">
      <h1>Parent/Guardian Information</h1>
      <form @submit.prevent="submitForm">
        <div class="input-container" v-for="(value, key) in formData" :key="key">
          <input
            v-if="key !== 'RelationshipToChild' && key !== 'RelationshipDocument'"
            :type="getInputType(key)"
            v-model="formData[key]"
            :id="key"
            :placeholder="formatPlaceholder(key)"
            required
          />
          <select
            v-if="key === 'RelationshipToChild'"
            v-model="formData[key]"
            :id="key"
            required
          >
            <option value="" disabled>Select Relationship</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="grandparent">Grandparent</option>
            <option value="related_guardian">Related Guardian</option>
            <option value="unrelated_guardian">Unrelated Guardian</option>
          </select>
          <input
            v-if="key === 'RelationshipDocument'"
            type="file"
            @change="handleFileUpload"
            :id="key"
            required
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

export default {
  name: 'ParentGuardianInformation',
  setup() {
    const router = useRouter();
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

    const handleFileUpload = (event) => {
      formData.value.RelationshipDocument = event.target.files[0];
    };

    const submitForm = async () => {
      try {
        const formDataObj = new FormData();
        for (const key in formData.value) {
          formDataObj.append(key, formData.value[key]);
        }

        const response = await axios.post('http://localhost:3000/parent-guardian-information', formDataObj, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log('Response:', response.data);
        router.push({ name: 'IdInformation' });
      } catch (error) {
        console.error('Error submitting form:', error);
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

    return {
      formData,
      handleFileUpload,
      submitForm,
      navigateToPrevious,
      formatPlaceholder,
      getInputType
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
  background: #f4f4f4;
  padding: 20px;
}

.form-container {
  background-color: #ffffff;
  background-image: url('@/assets/back.jpg');
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.form-container::-webkit-scrollbar {
  display: none;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.form-container::-webkit-scrollbar {
  display: none;
}


h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-group, .input-container {
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

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #800080;
  border-radius: 8px;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #4b0082;
  outline: none;
  box-shadow: 0 0 5px rgba(128, 0, 128, 0.2);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.back-button, .submit-button, .next-button {
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
.submit-button {
  background-color: #7838dd;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button {
  background-color: #7838dd;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: left;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content textarea {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
}

.agree-button, .disagree-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 5px;
}

.checkbox-container input[type="checkbox"] {
  width: 14px;
  height: 14px;
}

.agree-button {
  background-color: #007bff;
  color: white;
}

.agree-button:hover {
  background-color: #0056b3;
}

.disagree-button {
  background-color: #6c757d;
  color: white;
}

.disagree-button:hover {
  background-color: #5a6268;
}

.common-icon {
  /* Add your CSS adjustments here */
  width: 24px;
  height: 24px;
  color: #333;
}
.icon fas fa-user {
  width: 24px;
  height: 24px;
  color: #333;
  transform: translateY(-10px);
  display: inline-block;
  vertical-align: middle;
}

.id-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.id-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.browse-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #800080;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background-color: #4b0082;
}
</style>