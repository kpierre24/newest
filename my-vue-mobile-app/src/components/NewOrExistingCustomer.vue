<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>New or Existing Customer</h1>
      <h3>Choose whether you are a new or existing customer.</h3>
      <div class="button-group">
        <button class="button" @click="navigateToGettingReady">New Customer</button>
        <button class="button" @click="navigateToGettingReady">Existing Customer</button>
      </div>
      <button class="back-button" @click="navigateToHome">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewOrExistingCustomer',
  methods: {
    navigateToGettingReady() {
      this.$router.push('/getting-ready');
    },
    navigateToHome() {
      this.$router.push('/');
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
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 90vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid black;
}

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

h3 {
  margin-bottom: 20px;
  color: #555;
}

.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.button:hover {
  background-color: #0056b3;
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: #5a6268;
}
</style>