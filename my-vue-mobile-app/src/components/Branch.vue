<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Branch</h1>
      <h2>Choose which branch you would like your account managed at</h2>
      <div class="input-container">
        <select v-model="selectedBranch" required>
          <option value="" disabled>Select Branch</option>
          <option value="Port of Spain">Port of Spain</option>
          <option value="Milford Rd, Tobago">Milford Rd, Tobago</option>
        </select>
      </div>
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
        <button type="submit" class="submit-button" @click="saveBranchState">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const branchName = ref('');
    const branchCode = ref('');
    const branchLocation = ref('');
    const bestContactTime = ref('');
    const selectedBranch = ref('');
    const preferredContactMethod = ref('');

    onMounted(() => {
      branchName.value = store.branchName;
      branchCode.value = store.branchCode;
      branchLocation.value = store.branchLocation;
      bestContactTime.value = store.bestContactTime;
      selectedBranch.value = store.selectedBranch;
      preferredContactMethod.value = store.preferredContactMethod;
    });

    const submitBranch = async () => {
      try {
        const formData = {
          branchName: branchName.value,
          branchCode: branchCode.value,
          branchLocation: branchLocation.value,
          bestContactTime: bestContactTime.value,
          selectedBranch: selectedBranch.value,
          preferredContactMethod: preferredContactMethod.value
        };

        // Save branch info to the store
        store.setBranchInfo(formData);

        const response = await axios.post('http://localhost:3000/branch', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Branch information submitted:', response.data);

        // Navigate to the success page
        router.push('/success');
      } catch (error) {
        console.error('Error submitting branch information:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      branchName,
      branchCode,
      branchLocation,
      bestContactTime,
      selectedBranch,
      preferredContactMethod,
      submitBranch,
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

.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.input-container .icon {
  position: absolute;
  left: 15px;  /* Align icon to the left */
  color: #666;
  font-size: 16px;
}

.input-container input,
.input-container select {
  width: 100%;
  padding: 12px;
  padding-left: 40px; /* Add space on the left for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

.input-container input:focus,
.input-container select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}/* Adds space between the icons */

</style>