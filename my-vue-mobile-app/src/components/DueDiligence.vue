<template>
    <div class="container">
      <div class="content">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <h1>Due Diligence</h1>
        <div class="text-container">
          <div class="text-content">
            <p>Welcome to the Cathedral Credit Union Online Banking service. We are excited to have you on board and look forward to providing you with a seamless banking experience.</p>
            <p>Before you get started, please take a moment to review the following important information:</p>
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
    </div>
  </template>
  
  <script>
  export default {
    name: 'DueDiligence',
    methods: {
      navigateToPrevious() {
        this.$router.go(-1); // Navigate to the previous page
      },
      navigateToNext() {
        this.$router.push('/address'); // Navigate to the Address component
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    padding: 20px;
    text-align: center;
  }
  
  .content {
    background-color: rgb(255, 255, 255);
    background: linear-gradient(to right, #bdbcbe, #7da4e7);
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    max-height: 80vh; /* Set max height */
    overflow-y: auto; /* Enable vertical scrolling */
  }
  
  .logo {
    width: 165px; /* Slightly larger for better visibility */
    height: auto;
    margin-bottom: 20px;
  }
  
  .text-container, .placeholder-container {
    margin-bottom: 20px;
    border-radius: 20px;
  }
  
  .text-content  {
    text-align: left;
    max-height: 30vh; /* Set max height for text content */
    overflow-y: auto; /* Enable vertical scrolling */
    padding: 10px 20px; /* Add padding to avoid text being cut off */
    font-size: 14px; /* Reduce text size */
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
    scrollbar-width: none;  /* Firefox */
    background: rgb(190, 189, 189);
    text-align: center;
    max-height: 30vh; /* Set max height for text content */
    overflow-y: auto; /* Enable vertical scrolling */
    padding: 10px 20px; /* Add padding to avoid text being cut off */
    font-size: 12px; 
    
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
  </style>