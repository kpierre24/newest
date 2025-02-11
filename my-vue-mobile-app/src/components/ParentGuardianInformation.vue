<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Parent/Guardian Information</h1>
      <form @submit.prevent="submitForm">
        <div class="input-container">
          <label for="ParentFirstName">First Name</label>
          <input type="text" v-model="ParentFirstName" id="ParentFirstName" required />
        </div>
        <div class="input-container">
          <label for="ParentMiddleName">Middle Name</label>
          <input type="text" v-model="ParentMiddleName" id="ParentMiddleName" />
        </div>
        <div class="input-container">
          <label for="ParentLastName">Last Name</label>
          <input type="text" v-model="ParentLastName" id="ParentLastName" required />
        </div>
        <div class="input-container">
          <label for="ParentOccupation">Occupation</label>
          <input type="text" v-model="ParentOccupation" id="ParentOccupation" required />
        </div>
        <div class="input-container">
          <label for="ParentWorkplace">Workplace</label>
          <input type="text" v-model="ParentWorkplace" id="ParentWorkplace" required />
        </div>
        <div class="input-container">
          <label for="ParentEmail">Email Address</label>
          <input type="email" v-model="ParentEmail" id="ParentEmail" required />
        </div>
        <div class="input-container">
          <label for="ParentPhoneNumber">Phone Number</label>
          <input type="tel" v-model="ParentPhoneNumber" id="ParentPhoneNumber" required />
        </div>
        <div class="input-container">
          <label for="RelationshipToChild">Relationship to Child</label>
          <select v-model="RelationshipToChild" id="RelationshipToChild" required>
            <option value="" disabled>Select Relationship</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="grandparent">Grandparent</option>
            <option value="related_guardian">Related Guardian</option>
            <option value="unrelated_guardian">Unrelated Guardian</option>
          </select>
        </div>
        <div class="input-container">
          <label for="RelationshipDocument">Upload Relationship Document</label>
          <input type="file" @change="handleFileUpload" id="RelationshipDocument" required />
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

export default {
  name: 'ParentGuardianInformation',
  setup() {
    const router = useRouter();

    const ParentFirstName = ref('');
    const ParentMiddleName = ref('');
    const ParentLastName = ref('');
    const ParentOccupation = ref('');
    const ParentWorkplace = ref('');
    const ParentEmail = ref('');
    const ParentPhoneNumber = ref('');
    const RelationshipToChild = ref('');
    const RelationshipDocument = ref(null);

    const handleFileUpload = (event) => {
      RelationshipDocument.value = event.target.files[0];
    };

    const submitForm = () => {
      // Perform form validation and API call here
      console.log('Form submitted', {
        ParentFirstName: ParentFirstName.value,
        ParentMiddleName: ParentMiddleName.value,
        ParentLastName: ParentLastName.value,
        ParentOccupation: ParentOccupation.value,
        ParentWorkplace: ParentWorkplace.value,
        ParentEmail: ParentEmail.value,
        ParentPhoneNumber: ParentPhoneNumber.value,
        RelationshipToChild: RelationshipToChild.value,
        RelationshipDocument: RelationshipDocument.value
      });

      // Navigate to the next page
      router.push({ name: 'IdInformation' });
    };

    const navigateToPrevious = () => {
      router.push({ name: 'ChildIdInformation' });
    };

    return {
      ParentFirstName,
      ParentMiddleName,
      ParentLastName,
      ParentOccupation,
      ParentWorkplace,
      ParentEmail,
      ParentPhoneNumber,
      RelationshipToChild,
      RelationshipDocument,
      handleFileUpload,
      submitForm,
      navigateToPrevious
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

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
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

.back-button:hover {
  background-color: #5a6268;
}

.submit-button, .next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.submit-button:hover, .next-button:hover {
  background-color: #0056b3;
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
</style>