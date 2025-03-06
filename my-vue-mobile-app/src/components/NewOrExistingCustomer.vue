<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>New or Existing Customer?</h1>
      <p>Choose whether you're a new or existing customer</p>
      <div class="button-group">
        <button 
          class="next-button" 
          @click="handleNewCustomer"
          :disabled="loading"
        >
          {{ loading && isNewCustomer ? 'Processing...' : 'New Customer' }}
        </button>
        <button 
          class="back-button" 
          @click="handleExistingCustomer"
          :disabled="loading"
        >
          {{ loading && !isNewCustomer ? 'Processing...' : 'Existing Customer' }}
        </button>
      </div>
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
        // Mock a successful response (temporary fix)
        return { data: { success: true } };
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    };

    const handleNewCustomer = async () => {
      console.log('New Customer clicked');
      loading.value = true;
      isNewCustomer.value = true;
      try {
        await handleApiCall('new', 'new_customer');
        store.setExistingCustomer(false);
        console.log('Store state:', store.isExistingCustomer);
      } catch (error) {
        console.error('Error handling new customer:', error);
      } finally {
        loading.value = false;
        navigateToGettingReady();
      }
    };

    const handleExistingCustomer = async () => {
      console.log('Existing Customer clicked');
      loading.value = true;
      isNewCustomer.value = false;
      try {
        await handleApiCall('existing', 'existing_customer');
        store.setExistingCustomer(true);
        console.log('Store state:', store.isExistingCustomer);
      } catch (error) {
        console.error('Error handling existing customer:', error);
      } finally {
        loading.value = false;
        navigateToGettingReady();
      }
    };

    const navigateToGettingReady = () => {
      console.log('Navigating to Getting Ready');
      router.push('/getting-ready').catch((err) => {
        console.error('Navigation error:', err);
      });
    };

    const navigateToHome = () => {
      router.push('/');
    };

    return {
      loading,
      isNewCustomer,
      handleNewCustomer,
      handleExistingCustomer,
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
  height: 812px;
  width: 375px;
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px;
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  text-decoration: none;
  color: inherit;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.041);
  padding: 5px;
  background-color: rgb(98, 103, 173);
}

.back-icon {
  font-size: 24px;
  color: black;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #4b0082;
  text-align: center;
  margin-top: 80px;
}

p {
  font-size: 16px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
}

.next-button, .back-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button:disabled, .back-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
