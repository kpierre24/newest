<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Getting Ready</h1>
      <div class="scrollable-text">
        <p>
          Before going forward, here are some of the things you should have on hand that are required before going forward:
          <br>1. Personal Identification
          <br>Government-issued ID (e.g., driver's license, passport, ID card, birth paper (Under 16))
          <br>Social Security Number (SSN) or Taxpayer Identification Number (TIN) if you live in the United States of America
        </p>
        <p>
          2. Foreign Bank Account Information (For non Trinidad and Tobago Citizens only)
          <br>Bank account number
          <br>Address
          <br>Swift code
          <br>Routing Number
          <br>Contact Number
        </p>
        <p>
          3. Address
          <br>Utility Bill - Electricity, Phone, Water, Cable bill in your name. (Valid 3 months or less)
          <br>If you do not have a utility bill for your abode in your name, an authorization letter for the current owner with a copy of their ID will suffice.
        </p>
      </div>
      <div class="button-group">
        <button class="back-button" @click="navigateToNewOrExistingCustomer">Back</button>
        <button class="next-button" @click="navigateToBasicInfo">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GettingReady',
  methods: {
    navigateToNewOrExistingCustomer() {
      this.$router.push('/new-or-existing-customer');
    },
    navigateToBasicInfo() {
      this.$router.push('/basic-info');
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
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  height: 90vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
}

.logo {
  width: 165px; /* Slightly larger for better visibility */
  height: auto;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.scrollable-text {
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  overflow-y: auto;
  text-align: left;
  background-color: #f9f9f9;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
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