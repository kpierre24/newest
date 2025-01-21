<template>
  <div class="container">
    <img src="@/assets/logo.png" alt="Logo" class="logo" />
    <h1>Welcome to Our App</h1>
    <div class="button-group">
      <router-link to="/login" class="button">Login</router-link>
      <router-link to="/signup" class="button">Signup</router-link>
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

.logo {
  width: 150px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #fff;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
</style>