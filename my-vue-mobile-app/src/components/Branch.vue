<template>
  <div class="container">
    <div class="form-container">
      <h1>Branch</h1>
      <h2>Choose which branch you would like your account managed at</h2>
      <form @submit.prevent="submitBranch">
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

    const submitBranch = async () => {
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

      try {
        const response = await axios.post('http://localhost:3000/branch', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Branch information submitted:', response.data);
        router.push('/success');
      } catch (error) {
        console.error('Error submitting branch information:', error);
        errorMessage.value = 'An error occurred. Please try again later.'; // More user-friendly
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
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
      submitBranch,
      navigateToPrevious,
    };
  },
};
</script>


<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;  /* Adjusted height */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
   /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

.form-container {
  background-image: url('@/assets/back.jpg');
  background-size: cover;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  max-width: 400px;
  text-align: center;
  overflow-y: auto;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #FFBC2D;
}

h2 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #6362F8;
}

p {
  font-size: 14px;
  margin-bottom: 20px;
  color: #0c0c0c;
  font-style: italic;
}

.input-container {
  width: 100%;
  margin-bottom: 20px;
}

.contact-method-container,
.contact-time-container {
  text-align: left;
  margin-bottom: 20px;
}

hr {
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 15px 0;
}

.radio-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-container input[type="radio"] {
  width: 16px;
  height: 16px;
  accent-color: #007bff;
  margin-right: 10px;
}

.radio-container label {
  font-size: 14px;
  color: #000;
  cursor: pointer;
}

.button-group {
  display: flex;
  flex-direction: column; /* Arrange buttons vertically */
  gap: 10px; /* Add space between buttons */
  margin-top: 20px;
  width: 100%; /* Stretch to the width of the container */
}

.back-button, .next-button, .submit-button {
  width: 100%; /* Stretch buttons to full width */
  padding: 15px; /* Increase padding for better appearance */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea; /* Red background */
  color: white; /* White text */
}

.back-button:hover {
  background-color: #f38b79ea; /* Lighter red on hover */
}

.next-button , .submit-button {
  background-color: #7838dd; /* Purple background */
  color: white; /* White text */
}

.next-button:hover, .submit-button:hover {
  background-color: #9e79da; /* Lighter purple on hover */
}

.error-message {
  color: #ff4d4d;
  font-size: 12px;
  margin-top: 20px;
}
</style>