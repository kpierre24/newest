<template>
  <div class="container">
    <div class="content">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Are you a new or existing customer?</h1>
      <div class="button-group">
        <button class="button" @click="setExistingCustomer(true)">Existing Customer</button>
        <button class="button" @click="setExistingCustomer(false)">New Customer</button>
      </div>
      <button class="back-button" @click="navigateToHome">Back</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useDemoStore } from '@/store/demoStore';
import { useRouter } from 'vue-router';

export default {
  name: 'NewOrExistingCustomer',
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const setExistingCustomer = async (isExisting) => {
      try {
        // Save to store
        store.isExistingCustomer = isExisting;
        console.log('Customer type saved to store:', isExisting ? 'Existing' : 'New');

        // Prepare data for API
        const customerData = {
          isExistingCustomer: isExisting
        };

        // Make API call
        const response = await axios.post('http://localhost:3000/new-or-existing-customer', customerData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('API Response:', response.data);

        // Navigate to next screen
        navigateToGettingReady();
      } catch (error) {
        console.error('API Error:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const navigateToGettingReady = () => {
      router.push('/getting-ready');
    };

    const navigateToHome = () => {
      router.push('/');
    };

    return {
      setExistingCustomer,
      navigateToHome
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
  background: #f4f4f4; /* Light background for the page */
  padding: 20px;
}

.content {
  background: linear-gradient(to right, #6aa4da, #9d50bb); /* Purple gradient */
  padding: 30px;
  border-radius: 20px; /* Rounded corners */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Narrower width for consistency */
  max-height: 80vh; /* Set max height */
  overflow-y: auto; /* Enable vertical scrolling */
  color: white; /* White text for contrast */
}

.logo {
  width: 165px; /* Slightly larger for better visibility */
  height: auto;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.text-container, .placeholder-container {
  margin-bottom: 20px;
  border-radius: 10px; /* Rounded corners */
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
  padding: 15px;
}

.text-content {
  text-align: left;
  max-height: 30vh; /* Set max height for text content */
  overflow-y: auto; /* Enable vertical scrolling */
  font-size: 14px; /* Reduce text size */
}

.placeholder-content {
  text-align: center;
  max-height: 30vh; /* Set max height for text content */
  overflow-y: auto; /* Enable vertical scrolling */
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
  padding: 15px;
  border-radius: 10px; /* Rounded corners */
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
}
</style>