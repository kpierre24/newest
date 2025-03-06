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
      <div class="button-group">
        <button class="back-button" @click="navigateToPrevious">Back</button>
        <button class="next-button" @click="navigateToNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'GettingReady',
  setup() {
    const router = useRouter();
    
    const navigateToPrevious = () => {
      router.go(-1); // Navigate to the previous page
    };
    
    const navigateToNext = () => {
      router.push('/basic-info'); // Navigate to the BasicInfo component
    };
    
    return {
      navigateToPrevious,
      navigateToNext
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
}

.content h1 {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(2px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

h5 {
  font-size: 12px;
  margin-bottom: 15px;
  color: rgb(20, 42, 163);
}

h3 {
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 10px;
  color: rgb(20, 42, 163);
}

.text-container {
  margin-bottom: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 15px;
  width: 100%;
}

.text-content {
  text-align: left;
  font-size: 12px;
  overflow-y: auto;
}

.placeholder-container {
  width: 100%;
  margin-bottom: 20px;
}

.placeholder-content {
  text-align: center;
  font-size: 12px;
  background: rgba(211, 205, 205, 0.7);
  padding: 15px;
  border-radius: 10px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 0 15px;
  box-sizing: border-box;
}

.back-button, .next-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.back-button:hover {
  background-color: #FF883F;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #FF883F;
}

.next-button:disabled, .back-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.next-button:disabled:hover, .back-button:disabled:hover {
  background-color: #cccccc;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.text-content::-webkit-scrollbar, .content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

/* Style scrollbar thumb for Chrome, Safari and Opera */
.text-content::-webkit-scrollbar-thumb, .content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* Hide scrollbar for IE, Edge and Firefox */
.text-content, .content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.back-icon-link, .back-icon, .back-icon:hover {
  display: none;
}
</style>