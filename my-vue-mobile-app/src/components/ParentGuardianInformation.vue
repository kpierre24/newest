<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Parent/Guardian Information</h1>
      <form @submit.prevent="submitForm">
        <div class="input-container" v-for="(value, key) in formData" :key="key">
          <label :for="key">{{ formatLabel(key) }}</label>
          <input v-if="key !== 'RelationshipToChild' && key !== 'RelationshipDocument'" :type="getInputType(key)" v-model="formData[key]" :id="key" required />
          <select v-if="key === 'RelationshipToChild'" v-model="formData[key]" :id="key" required>
            <option value="" disabled>Select Relationship</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="grandparent">Grandparent</option>
            <option value="related_guardian">Related Guardian</option>
            <option value="unrelated_guardian">Unrelated Guardian</option>
          </select>
          <input v-if="key === 'RelationshipDocument'" type="file" @change="handleFileUpload" id="key" required />
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

    const formatLabel = (label) => {
      return label.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    };

    const getInputType = (key) => {
      return key.includes('Email') ? 'email' : key.includes('Phone') ? 'tel' : 'text';
    };

    return {
      formData,
      handleFileUpload,
      submitForm,
      navigateToPrevious,
      formatLabel,
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
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
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

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}
</style>
