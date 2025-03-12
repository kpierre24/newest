<template>
  <div class="terms-content">
    <div class="pa-4">
      <h3 class="mb-4">Terms and Conditions</h3>
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
        <v-btn
        color="primary"
        block
        class="mt-4"
        @click="$emit('close')"
      >
        I Agree
      </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close']);
</script>

<style scoped>
.terms-content {
  max-height: 60vh;
  overflow-y: auto;
}
</style>