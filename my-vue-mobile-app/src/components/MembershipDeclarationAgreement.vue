<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Membership Declaration Agreement</h1>
      <p>
        I hereby make application for membership in <strong>CATHEDRAL CREDIT UNION CO-OPERATIVE SOCIETY LIMITED</strong> and if admitted, agree to abide by the Bye-Laws or amendments of the said Society. I am aware that I am not a bona fide member of the society until this application is approved by the Board of Directors. I further pledge to offer my skills towards the growth of the Society.
      </p>
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
        <button class="disagree-button" @click="navigateToHome">Disagree</button>
        <button class="next-button" @click="navigateToNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MembershipDeclarationAgreement',
  data() {
    return {
      isMemberOfAnotherCreditUnion: '',
      creditUnionName: '',
      isServingOnBoard: '',
      creditUnionBoardName: ''
    };
  },
  methods: {
    navigateToHome() {
      this.$router.push('/');
    },
    navigateToNext() {
      // Handle navigation to the next screen
      alert('Navigating to the next screen...');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  padding: 20px;
  text-align: center;
}

.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

p {
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
  text-align: left;
}

.radio-group {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 15px;
}

input[type="radio"] {
  margin-right: 5px;
}

.input-container {
  width: 100%;
  margin-bottom: 15px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.disagree-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.disagree-button {
  background-color: #6c757d;
  color: white;
}

.disagree-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>