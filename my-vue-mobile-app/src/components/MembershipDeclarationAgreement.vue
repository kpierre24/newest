<template>
  <div class="container background-image">
    <div class="form-container">
      <h1>Membership Declaration Agreement</h1>
      <div class="body-container">
        <p>
          I hereby make application for membership in <strong>CATHEDRAL CREDIT UNION CO-OPERATIVE SOCIETY LIMITED</strong> and if admitted, agree to abide by the Bye-Laws or amendments of the said Society. I am aware that I am not a bona fide member of the society until this application is approved by the Board of Directors. I further pledge to offer my skills towards the growth of the Society.
        </p>
      </div>
      <p>Are you a member of another credit union?</p>
      <div class="radio-group">
        <label>
          <input type="radio" v-model="isMemberOfAnotherCreditUnion" value="yes" /> Yes
        </label>
        <label>
          <input type="radio" v-model="isMemberOfAnotherCreditUnion" value="no" /> No
        </label>
      </div>
      <p>If yes, what is the name of the credit union?</p>
      <div class="input-container">
        <input type="text" v-model="creditUnionName" placeholder="Name of credit union" v-if="isMemberOfAnotherCreditUnion === 'yes'" />
      </div>
      <p>Are you serving on another Credit Union/State Board of Directors/Committee?</p>
      <div class="radio-group">
        <label>
          <input type="radio" v-model="isServingOnBoard" value="yes" /> Yes
        </label>
        <label>
          <input type="radio" v-model="isServingOnBoard" value="no" /> No
        </label>
      </div>
      <p>If yes, what is the name of the Board?</p>
      <div class="input-container">
        <input type="text" v-model="creditUnionBoardName" placeholder="Name of credit union board" v-if="isServingOnBoard === 'yes'" />
      </div>
      <div class="button-group">
        <button class="next-button" @click="goNext">Next</button>
        <button class="disagree-button" @click="disagree">Disagree</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'; // Import ref from vue
import { useRouter } from 'vue-router'; // Import useRouter from vue-router
import axios from 'axios';
import { useDemoStore } from '@/store/demostore';

export default {
  setup() {
    const router = useRouter(); // Use the router
    const demoStore = useDemoStore();
    const isMemberOfAnotherCreditUnion = ref(demoStore.isMemberOfAnotherCreditUnion);
    const creditUnionName = ref(demoStore.creditUnionName);
    const isServingOnBoard = ref(demoStore.isServingOnBoard);
    const creditUnionBoardName = ref(demoStore.creditUnionBoardName);

    const goNext = async () => {
      try {
        // Save form data to Pinia store
        demoStore.setMembershipInfo({
          isMemberOfAnotherCreditUnion: isMemberOfAnotherCreditUnion.value,
          creditUnionName: creditUnionName.value,
          isServingOnBoard: isServingOnBoard.value,
          creditUnionBoardName: creditUnionBoardName.value
        });

        // Make an API call to submit membership declaration data
        await axios.post('http://localhost:3000/membership-declaration-agreement', {
          isMemberOfAnotherCreditUnion: isMemberOfAnotherCreditUnion.value,
          creditUnionName: creditUnionName.value,
          isServingOnBoard: isServingOnBoard.value,
          creditUnionBoardName: creditUnionBoardName.value
        });

        // Navigate to the politically exposed persons page
        router.push({ name: 'PoliticallyExposedPersons' });
      } catch (error) {
        console.error('Error submitting membership declaration:', error);
      }
    };

    return {
      isMemberOfAnotherCreditUnion,
      creditUnionName,
      isServingOnBoard,
      creditUnionBoardName,
      goNext
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
  overflow-y: auto;
  max-height: 90vh;
  text-align: left; /* Left align all text by default */
}

h1, h2, h3, h4, h5, h6 {
  text-align: center; /* Center align all heading tags */
}

.input-group, .input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}
.radio-group {
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  text-align: center;
}
.body-container {
  margin-bottom: 20px;
  font-size: 12px;
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
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.next-button {
  background-color: purple;
  color: white;
}

.disagree-button {
  background-color: orange;
  color: white;
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
