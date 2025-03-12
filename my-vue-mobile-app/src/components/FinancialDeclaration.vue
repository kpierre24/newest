<template>
  <div class="declaration-content">
    <div class="pa-4">
      <h3 class="mb-4">Financial Declaration</h3>
        <p>I hereby certify that the information given in this Declaration filled with CREDIT UNION CO-OPERATIVE SOCIETY LIMITED is TRUE and CORRECT.</p>
        <p>By reason that the requirements of the Guidelines on Money Laundering for institutions licensed under the Financial Obligation Regulations, 2010, CCU's policy requires it to be satisfied as to the source of funds before accepting deposits.</p>
        <p>Consent is hereby given to this Society to disclose its information to law enforcement authorities.</p>
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
</template>
     

<script setup>
defineEmits(['close']);
</script>

<style scoped>
.declaration-content {
  max-height: 60vh;
  overflow-y: auto;
}
</style>