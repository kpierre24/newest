<template>
  <div class="container">
    <a href="/" class="back-icon-link">
    <i class="fas fa-arrow-left back-icon"></i>
  </a>
    <div class="form-container"> 
      
   </div>
   <div></div>
   <div></div>
    <div class="content">
      <h1>New or Existing Customer?</h1>
      <p>Choose whether you're a new or existing customer</p>
      <button 
        class="customer-button" 
        @click="handleNewCustomer"
        :disabled="loading"
      >
        {{ loading && isNewCustomer ? 'Processing...' : 'New Customer' }}
      </button>
      <button 
        class="customer-button" 
        @click="handleExistingCustomer"
        :disabled="loading"
      >
        {{ loading && !isNewCustomer ? 'Processing...' : 'Existing Customer' }}
      </button>
    </div>
    <div class="footer">
      <p>powered by:</p>
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDemoStore } from '@/store/demoStore';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'NewOrExistingCustomer',
  setup() {
    const store = useDemoStore();
    const router = useRouter();
    const loading = ref(false);
    const isNewCustomer = ref(false);

    const handleApiCall = async (endpoint, customerType) => {
      try {
        const response = await axios.post(`http://localhost:3000/new-or-existing-customer/`, {
          customerType: customerType
        });
        return response.data;
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    };

    const handleNewCustomer = async () => {
      loading.value = true;
      isNewCustomer.value = true;
      try {
        await handleApiCall('new', 'new_customer');
        setExistingCustomer(false);
        navigateToGettingReady();
      } catch (error) {
        console.error('Error handling new customer:', error);
      } finally {
        loading.value = false;
      }
    };

    const handleExistingCustomer = async () => {
      loading.value = true;
      isNewCustomer.value = false;
      try {
        await handleApiCall('existing', 'existing_customer');
        setExistingCustomer(true);
        navigateToGettingReady();
      } catch (error) {
        console.error('Error handling existing customer:', error);
      } finally {
        loading.value = false;
      }
    };

    const setExistingCustomer = (isExisting) => {
      store.isExistingCustomer = isExisting;
      navigateToGettingReady();
    };

    const navigateToGettingReady = () => {
      router.push('/getting-ready');
    };

    const navigateToHome = () => {
      router.push('/');
    };

    return {
      loading,
      isNewCustomer,
      handleNewCustomer,
      handleExistingCustomer,
      setExistingCustomer,
      navigateToHome
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
  background-image: url('@/assets/bg.png');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
  color: #fff;
  opacity: 0; /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -55%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.form-container {
  background: rgba(255, 255, 255, 0);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 1px;
  text-align: center;
  margin-top: auto;  /* Pushes content down */
}

.header {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
}

.back-button {
  background: none;
  border: none;
  color: #5c65e2;
  font-size: 30px;  /* Increased font size */
  cursor: pointer;
  padding: 12px 20px;  /* Increased padding for better size */
  transition: color 0.3s ease;
}

.back-button:hover {
  color: #434190;
}

.content {
  text-align: center;
  margin-top: 30px;  /* Increased margin-top to push content lower */
}

h1 {
  font-size: 24px; 
  margin-top: 80px; /* Larger font size */
  margin-bottom: 15px;  /* Adjusted margin */
  color: #5c65e2;
}

p {
  font-size: 14px;  /* Slightly bigger text */
  margin-bottom: 30px;  /* Increased space below */
  color: #030303;
}

.customer-button {
  width: 80%;
  padding: 15px;
  margin: 20px 0;  /* Increased margin to spread out buttons */
  background-color: #5a67d8;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.customer-button:hover {
  background-color: #434190;
}

.footer {
  text-align: center;
  margin-top: auto;  /* Ensures footer stays at the bottom */
}

.logo {
  width: 100px;
  margin-top: 10px;
}
.back-icon-link {
  position: absolute; /* Position the link relative to the form container */
  top: 27px; /* Adjust the top position as needed */
  left: 24px; /* Adjust the left position as needed */
  text-decoration: none; /* Remove the underline from the link */
  color: inherit; /* Inherit the color from the parent */
  z-index: 10;
  display: flex; /* Use flexbox to center the icon */
  align-items: center; /* Vertically center the icon */
  justify-content: center; /* Horizontally center the icon */
  width: 40px; /* Set a fixed width for the circular border */
  height: 40px; /* Set a fixed height for the circular border */
  border-radius: 50%; /* Make the border circular */
  border: 1px solid rgba(0, 0, 0, 0.041); /* Add a border */
  padding: 5px;
  background-color: rgb(98, 103, 173);
}

.back-icon {
  font-size: 24px; /* Adjust the icon size as needed */
  color: black;
}
</style>
