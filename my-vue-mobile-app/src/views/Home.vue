<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/Logo1.png" alt="Logo" class="logo" />
      <h2>Welcome to</h2>
      <h1>Cathedral Online</h1>
      <h6>If you don't have an online account,
       <br>click "Don't have an account?" to get started</h6>
      <div class="button-group">
        <button @click="navigateToLogin" class="button login-button">Sign In</button>
        <button @click="navigateToSignup" class="button signup-button">Don't have an account?</button>
      </div>
      <div><h5>Powered by</h5></div>
      <img src="@/assets/Logo.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const router = useRouter();

    const navigateToLogin = () => {
      router.push("/login");
    };

    const navigateToSignup = () => {
      router.push("/new-or-existing-customer");
    };

    return {
      navigateToLogin,
      navigateToSignup
    };
  }
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
  background-image: url('@/assets/front screen.png');
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 420px;
  max-width: 420px;
  height: 100%;
  text-align: center;
  overflow-y: auto;
  height:850.5px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  margin: 0;
}
h6 {
  margin: 0;
}
h5 {
  font-size: 10px;
  margin: 0;
}
h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  margin: 0;
}




.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button {
  background-color: #7b3be2;
  color: #fff;
}



.signup-button {
  background-color: #28a745;
  color: #fff;
}

.signup-button:hover {
  background-color: #218838;
}




.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
  margin: 0;
  flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 30px;
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