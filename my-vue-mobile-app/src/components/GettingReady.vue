<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
      <h2>GETTING READY</h2>
    </div>
    <div class="content">
      <div class="info-card">
        <h1>Getting Ready</h1>
        <p class="intro-text">Before going forward, here are some of the things you should have on hand that are required before going forward.</p>
        
        <div class="requirements-list">
          <div class="requirement-item">
            <h3>1. Personal Identification</h3>
            <p>Government-issued ID (e.g., driver's license, passport, ID card, birth paper (Under 16))</p>
            <p>Social Security Number (SSN) or Taxpayer Identification Number (TIN) if you live in the united States of America</p>
          </div>

          <div class="requirement-item">
            <h3>2. Foreign Bank Account Information</h3>
            <p>For non Trinidad and Tobago Citizens only: Bank account number, Address, Swift code, Routing Number, Contact Number</p>
          </div>

          <div class="requirement-item">
            <h3>3. Address</h3>
            <p>Utility Bill -Electricity, Phone, Water, Cable bill in your name. (Valid 3 months or less)</p>
            <p>If you do not have a utility bill for your abode in your name, an authorization letter for the current owner with a copy of their ID will suffice.</p>
          </div>

          <div class="requirement-item">
            <h3>4. Employment/Source of Funds</h3>
            <p>Job letter, Payslip, Business Owners or Self Employed-- Projected Income for 3 years (completed cash flow projection) or Audited Financial, Retirees – A letter from National Insurance Board (NIB)</p>
          </div>

          <div class="requirement-item">
            <h3>5. Valid Email & Mobile</h3>
            <p>A valid email address and mobile number are required for verification and communication purposes.</p>
          </div>

          <div class="requirement-item">
            <h3>6. Saved Progress</h3>
            <p>Your progress will be saved as you proceed to sign up with a continue link being sent to your email address. You have 48 hours to complete before sign up must be restarted.</p>
          </div>

          <div class="requirement-item">
            <h3>7. Guardian Information</h3>
            <p>If the parent/guardian of the child has a different last name, it may be necessary to prove this relationship by uploading one of the following.</p>
          </div>
        </div>
      </div>
      
      <div class="button-group">
        <button class="next-button" @click="handleNext">Next</button>
        <button class="cancel-button" @click="handleCancel">Cancel</button>
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

    const handleNext = () => {
      router.push('/basic-info');
    };

    const handleCancel = () => {
      router.push('/');
    };

    return {
      handleNext,
      handleCancel
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  background: #F5F5F5;
}

.header {
  background: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.logo {
  height: 40px;
  width: auto;
}

.header h2 {
  color: #666;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
}

.content {
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 2rem;
  padding: 2rem;
  margin: 64px auto 0;
  width: 100%;
  max-width: 100%;
  height: calc(100vh - 64px);
  overflow-y: auto;
  box-sizing: border-box;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: fit-content;
}

h1 {
  color: #261C6B;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.intro-text {
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.requirements-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.requirement-item h3 {
  color: #261C6B;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.requirement-item p, 
.requirement-item li {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.requirement-item ul {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-top: 0.25rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem 0;
}

.next-button, 
.cancel-button {
  padding: 0.75rem 0;
  width: 180px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button {
  background: #6362F8;
  color: white;
}

.cancel-button {
  background: #FF883F;
  color: white;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .container {
    background: #F5F5F5;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    padding: 2rem;
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  .info-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
  }

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #261C6B;
  }

  .intro-text {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #666;
  }

  .requirements-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .requirement-item {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .requirement-item h3 {
    font-size: 1rem;
    color: #261C6B;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .requirement-item p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
    margin: 0;
  }

  .button-group {
    margin-top: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    max-width: 900px;
  }

  .next-button, 
  .cancel-button {
    width: 180px;
    padding: 0.875rem 0;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
  }

  .next-button {
    background: #6362F8;
    color: white;
  }

  .cancel-button {
    background: #FF883F;
    color: white;
  }
}

/* Mobile Styles */
@media (max-width: 767px) {
  .header {
    padding: 1rem;
    height: 56px;
  }

  .logo {
    height: 32px;
  }

  .content {
    padding: 1rem;
    margin-top: 56px;
    height: calc(100vh - 56px);
  }

  .info-card {
    padding: 1.5rem;
    border-radius: 8px;
  }

  .requirements-list {
    display: flex;
    flex-direction: column;
  }

  .button-group {
    flex-direction: column;
    padding: 1rem;
  }

  .next-button, 
  .cancel-button {
    width: 100%;
  }
}
</style>