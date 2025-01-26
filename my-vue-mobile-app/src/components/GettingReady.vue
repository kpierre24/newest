<template>
  <div class="container">
    <div class="content">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Getting Ready</h1>
      <div class="text-container">
        <div class="text-content">
          <p>Welcome to the Cathedral Credit Union Online Banking service. We are excited to have you on board and look forward to providing you with a seamless banking experience.</p>
          <p>Before you get started, please take a moment to review the following important information:</p>
          <h3>1. Personal Identification</h3>
          <p>
            Government-issued ID (e.g., driver's license, passport, ID card, birth paper (Under 16))<br>
            Social Security Number (SSN) or Taxpayer Identification Number (TIN) if you live in the United States of America
          </p>
          <h3>2. Foreign Bank Account Information (For non Trinidad and Tobago Citizens only)</h3>
          <p>
            Bank account number<br>
            Address<br>
            Swift code<br>
            Routing Number<br>
            Contact Number
          </p>
          <h3>3. Address</h3>
          <p>
            Utility Bill - Electricity, Phone, Water, Cable bill in your name. (Valid 3 months or less)<br>
            If you do not have a utility bill for your abode in your name, an authorization letter for the current owner with a copy of their ID will suffice.
          </p>
          <h3>4. Employment/Source of Funds Information</h3>
          <p>
            Job letter<br>
            Payslip<br>
            Business Owners or Self Employed – Projected Income for 3 years (completed cash flow projection) or Audited Financials.<br>
            Retirees – A letter from National Insurance Board (NIB) or the organization they worked with advising of the pension to be received.
          </p>
          <h3>5. Valid Email Address and Mobile Number</h3>
          <h3>6. Saved Progress</h3>
          <p>
            Your progress will be saved as you proceed to signup. You will be asked to create a password and when completed a code sent to your email address to verify ownership.<br>
            You have Fourteen Days to complete before signup must be restarted if not finished.
          </p>
          <h3>7. Guardian Information</h3>
          <p>
            If the parent/guardian of the child has a different last name, it may be necessary to prove this relationship by uploading one of the following:<br>
            Deed Poll<br>
            Marriage Certificate<br>
            Adoption Certificate
          </p>
        </div>
      </div>
      <div class="placeholder-container">
        <div class="placeholder-content">
          <p>Placeholder text goes here. This is an additional container for any other information you might want to display.</p>
        </div>
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
  background: linear-gradient(to right, #6a11cb, #2575fc);
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
  max-height: 80vh; /* Set max height */
  overflow-y: auto; /* Enable vertical scrolling */
}

.logo {
  width: 165px; /* Slightly larger for better visibility */
  height: auto;
  margin-bottom: 20px;
}

.text-container, .placeholder-container {
  margin-bottom: 20px;
}

.text-content, .placeholder-content {
  text-align: left;
  max-height: 30vh; /* Set max height for text content */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 10px 20px; /* Add padding to avoid text being cut off */
  font-size: 14px; /* Reduce text size */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.text-content::-webkit-scrollbar, .placeholder-content::-webkit-scrollbar {
  width: 0;
  background: transparent; /* Optional: just make scrollbar invisible */
}

/* Hide scrollbar for IE, Edge and Firefox */
.text-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.placeholder-content {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  background: rgb(226, 222, 222);
}

.text-content p, .text-content h3, .placeholder-content p {
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