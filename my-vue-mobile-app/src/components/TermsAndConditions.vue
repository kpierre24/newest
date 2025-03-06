<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <h2>Terms and Conditions</h2>
      <div class="modal-text">
        <h3>1. Introduction</h3>
        <p>These Terms and Conditions govern your use of the Online Banking services provided by Cathedral Credit Union. By signing up for and using our Online Banking services, you agree to be bound by these Terms and Conditions.</p>

        <h3>2. Definitions</h3>
        <p>
          <strong>Account:</strong> Any account you have with Cathedral Credit Union which is accessible via Online Banking.<br>
          <strong>Online Banking:</strong> The internet-based service providing access to your accounts.<br>
          <strong>User ID and Password:</strong> The unique identifiers used to access Online Banking.
        </p>

        <h3>3. Access and Use</h3>
        <p>
          <strong>Eligibility:</strong> You must be a member of Cathedral Credit Union and at least 18 years old to use Online Banking.<br>
          <strong>Security:</strong> You are responsible for maintaining the confidentiality of your User ID and Password. You agree not to share this information with anyone.<br>
          <strong>Authorization:</strong> By using your User ID and Password, you authorize us to carry out any and all instructions you provide through Online Banking.
        </p>

        <h3>4. Services</h3>
        <p>
          <strong>Account Information:</strong> You can view account balances, transaction history, and other account details.<br>
          <strong>Transfers:</strong> You can transfer funds between eligible accounts within Cathedral Credit Union.<br>
          <strong>Payments:</strong> You can make bill payments and transfer funds to external accounts.<br>
          <strong>Alerts:</strong> You can set up notifications for account activity.
        </p>

        <h3>5. Privacy</h3>
        <p>Your privacy is important to us. Our <a href="#">Privacy Policy</a> describes how we collect, use, and protect your personal information.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
    };
    
    return {
      closeModal
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: #f4f4f4;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 0;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  min-height: 600px;
  max-height: 90vh;
  color: rgb(12, 12, 12);
  position: relative;
  margin: auto;
}

.content h1 {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 2;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(3px);
}

h1 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 20px 0;
}

.terms-content {
  flex: 1;
  width: 100%;
  padding: 20px 15px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
  box-sizing: border-box;
}

.terms-content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.terms-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.terms-text {
  font-size: clamp(14px, 3vw, 16px);
  line-height: 1.6;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.close-button {
  width: 100%;
  padding: clamp(12px, 2.5vw, 15px);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  transition: background-color 0.3s ease;
  background-color: #261C6B;
  color: white;
}

.close-button:hover {
  background-color: #FF883F;
}

/* Media Queries */
@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .content {
    max-height: 100vh;
    border-radius: 0;
  }
  
  .content h1 {
    border-radius: 0;
  }
  
  .terms-content {
    padding: 15px 10px;
  }
  
  .button-group {
    padding: 0 10px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .content {
    max-width: 450px;
  }
}

@media (min-width: 769px) {
  .content {
    max-width: 500px;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  font-size: clamp(20px, 4vw, 24px);
  color: #FFBC2D;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding-right: 40px;
}

.modal-text {
  font-size: clamp(14px, 3vw, 16px);
  line-height: 1.6;
  color: #333;
}

.modal-text h3 {
  font-size: clamp(16px, 3.5vw, 18px);
  color: #FFBC2D;
  margin: 20px 0 10px;
}

.modal-text p {
  margin-bottom: 15px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  line-height: 1;
}

.close-button:hover {
  color: #FF883F;
}

/* Media Queries */
@media (max-width: 480px) {
  .modal-content {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
    margin: 0;
  }
  
  .modal-content h2 {
    padding-right: 30px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .modal-content {
    max-width: 450px;
  }
}

@media (min-width: 769px) {
  .modal-content {
    max-width: 500px;
  }
}
</style>