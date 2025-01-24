<template>
  <div class="container">
    <div class="content">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Getting Ready</h1>
      <div class="text-content">
        <p>Welcome to the Cathedral Credit Union Online Banking service. We are excited to have you on board and look forward to providing you with a seamless banking experience.</p>
        <p>Before you get started, please take a moment to review the following important information:</p>
        <h3>1. Security</h3>
        <p>Your security is our top priority. Ensure that your User ID and Password are kept confidential and not shared with anyone. If you suspect any unauthorized access, please contact us immediately.</p>
        <h3>2. Account Information</h3>
        <p>You can view your account balances, transaction history, and other account details through our Online Banking service. Make sure to regularly review your account activity to stay informed.</p>
        <h3>3. Transfers and Payments</h3>
        <p>Our Online Banking service allows you to transfer funds between eligible accounts and make bill payments. Please ensure that you have sufficient funds in your account before initiating any transfers or payments.</p>
        <h3>4. Alerts</h3>
        <p>Set up notifications for account activity to stay updated on any changes or transactions. This will help you monitor your account and detect any suspicious activity promptly.</p>
        <h3>5. Privacy</h3>
        <p>Your privacy is important to us. Our <a href="#">Privacy Policy</a> outlines how we collect, use, and protect your personal information. Please review it to understand your rights and our responsibilities.</p>
        <p>Thank you for choosing Cathedral Credit Union. We are here to assist you with any questions or concerns you may have. Enjoy your Online Banking experience!</p>
      </div>
      <div class="button-group">
        <button class="back-button" @click="navigateToPrevious">Back</button>
        <button class="next-button" @click="navigateToNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GettingReady',
  methods: {
    navigateToPrevious() {
      this.$router.go(-1); // Navigate to the previous page
    },
    navigateToNext() {
      this.$router.push('/basic-info'); // Navigate to the BasicInfo component
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
  background: white;
  padding: 20px;
  text-align: center;
}

.content {
  background-color: rgb(255, 255, 255);
  background: linear-gradient(to right, #bdbcbe, #7da4e7);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  max-height: 80vh; 
  overflow-y: auto; 
}

.logo {
  width: 165px; 
  height: auto;
  margin-bottom: 20px;
}

.text-content {
  text-align: left;
  max-height: 60vh; /* Set max height for text content */
  overflow-y: auto; /* Enable vertical scrolling */
  padding-right: 10px; /* Add padding to avoid text being cut off */
}

.text-content::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.text-content p, .text-content h3 {
  margin: 10px 0;
}

.text-content a {
  color: #007bff;
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
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