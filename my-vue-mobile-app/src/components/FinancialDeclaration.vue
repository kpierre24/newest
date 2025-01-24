<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <h2>Financial Declaration Agreement</h2>
      <div class="modal-text">
        <p>I hereby certify that the information given in this Declaration filled with CREDIT UNION CO-OPERATIVE SOCIETY LIMITED is TRUE and CORRECT.</p>
        <p>By reason that the requirements of the Guidelines on Money Laundering for institutions licensed under the Financial Obligation Regulations, 2010, CCU's policy requires it to be satisfied as to the source of funds before accepting deposits.</p>
        <p>Consent is hereby given to this Society to disclose its information to law enforcement authorities.</p>
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