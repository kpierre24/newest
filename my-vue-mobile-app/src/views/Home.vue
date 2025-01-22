<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Welcome to Cathedral Online</h1>
      <img src="@/assets/welcome.png" alt="Welcome" class="welcome-image" />
      <h6>If you don't have an online account,
       <br>click "Don't have an account?" to begin</h6>
      <div class="button-group">
        <router-link to="/login" class="button login-button">Login</router-link>
        <router-link to="/new-or-existing-customer" class="button signup-button">Don't have an account</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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

.welcome-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}

h6 {
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

.signup-button {
  background-color: white;
  color: #007bff;
  border: 2px solid #007bff;
}

.signup-button:hover {
  background-color: #e6f0ff;
}
</style>