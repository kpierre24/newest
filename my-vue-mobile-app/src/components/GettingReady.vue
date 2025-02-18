<template>
  <div class="container">
    <div class="content">
      <h1>Getting Ready</h1>
      <h5>Before going forward, here are some of the things you should have on hand that are required:</h5>
      <div class="text-container">
        <div class="text-content">
        
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
          <p>You will be asked to create a password. When <br>
            completed a code will be sent to your email address<br>
            for verification purposes. You have 14 days to complete<br>
          the signup process before it will need to be restarted.</p>
        </div>
      </div>
      <div class="customer-button">
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
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  
  background: #f4f4f4; /* Light background for the page */
  padding: 20px;
}

.content {
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Narrower width for consistency */
  max-height: 80vh; /* Set max height */
  overflow-y: auto; /* Enable vertical scrolling */
  color: rgb(12, 12, 12);
   /* White text for contrast */
}
.p{
  font-size: 10px;
  color: rgba(0, 0, 0, 0.1)
}

.logo {
  width: 165px; /* Slightly larger for better visibility */
  height: auto;
  margin-bottom: 20px;
}
h5{
  font-size: 12px;
  margin-bottom: 10px;
  color: rgb(20, 42, 163);
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
}

h3{
  font-size: 12px;
  margin-bottom: 10px;
  color: rgb(20, 42, 163);
}

.text-container {
  margin-bottom: 20px;
  border-radius: 10px; /* Rounded corners */
  background: rgb(248, 245, 245); /* Semi-transparent white background */
  padding: 15px;
}

.text-content {
  text-align: left;
  max-height: 30vh; /* Set max height for text content */
  overflow-y: auto; /* Enable vertical scrolling */
  font-size: 12px; /* Reduce text size */
}

.placeholder-content {
  text-align: center;
  max-height: 30vh; /* Set max height for text content */
  overflow-y: auto; /* Enable vertical scrolling */
  font-size: 10px;
  background: rgb(211, 205, 205); /* Semi-transparent white background */
  padding: 15px;
  border-radius: 10px; /* Rounded corners */
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
  width: 100%;
  gap: 10px;
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
  margin-right: 10px;
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
  scrollbar-width: none; 
}
  
  .customer-button {
  width: 100%;
  margin: 20px 0;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
}

</style>