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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 15px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-text {
  overflow-y: auto;
  max-height: calc(80vh - 100px);
  padding-right: 10px;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 22px;
  padding-right: 30px;
}

h3 {
  color: #007bff;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
}

p {
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
}

strong {
  color: #333;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Scrollbar styling */
.modal-text::-webkit-scrollbar {
  width: 6px;
}

.modal-text::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.modal-text::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.modal-text::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* For Firefox */
.modal-text {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>