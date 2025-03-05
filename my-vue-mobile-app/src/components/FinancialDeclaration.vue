<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <h2>Financial Declaration Agreement</h2>
      <div class="modal-text">
        <p>I hereby certify that the information given in this Declaration filled with CREDIT UNION CO-OPERATIVE SOCIETY LIMITED is TRUE and CORRECT.</p>
        <p>By reason that the requirements of the Guidelines on Money Laundering for institutions licensed under the Financial Obligation Regulations, 2010, CCU's policy requires it to be satisfied as to the source of funds before accepting deposits.</p>
        <p>Consent is hereby given to this Society to disclose its information to law enforcement authorities.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinancialDeclaration',
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;  /* Adjusted height */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
   /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

.form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.input-group, .input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
  margin-right: 10px;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button, .next-button {
  background-color: #007bff;
  color: white;
  margin-left: 10px;
}

.submit-button:hover, .next-button:hover {
  background-color: #0056b3;
}

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

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

p {
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
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