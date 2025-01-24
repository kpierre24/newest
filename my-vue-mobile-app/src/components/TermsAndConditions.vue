<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
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
      <div class="button-group">
        <button class="agree-button" @click="agree">Agree</button>
        <button class="disagree-button" @click="disagree">Disagree</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    agree() {
      this.$emit('agree');
    },
    disagree() {
      this.$emit('disagree');
    }
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
}

.modal-content h2 {
  margin-top: 0;
}

.modal-text {
  max-height: 200px;
  overflow-y: auto;
  padding-right: 10px; /* Add padding to avoid text being cut off */
}

.modal-text::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.modal-text p {
  margin: 10px 0;
}

.modal-text a {
  color: #ffcc00;
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.agree-button, .disagree-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.agree-button {
  background-color: #007bff;
  color: white;
  margin-right: 10px; /* Add margin to separate buttons */
}

.agree-button:hover {
  background-color: #0056b3;
}

.disagree-button {
  background-color: #6c757d;
  color: white;
}

.disagree-button:hover {
  background-color: #5a6268;
}
</style>