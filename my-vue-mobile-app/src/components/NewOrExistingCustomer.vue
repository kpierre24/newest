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
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  margin: 0;
  overflow: hidden;
}

.content {
  background: white;
  display: flex;
  flex-direction: column;
  padding: clamp(1rem, 2vw, 2rem);
  position: relative;
  height: 100%;
  overflow-y: auto;
  justify-content: center;
}

.content {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  width: min(100%, 400px);
  margin: auto;
  padding: 0 clamp(0.5rem, 1vw, 1rem);
}

.back-icon-link {
  position: absolute;
  top: 40px;
  left: 40px;
  text-decoration: none;
  color: white;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6362F8;
}

.back-icon {
  font-size: 20px;
  color: white;
}

h1 {
  font-size: 32px;
  color: #261C6B;
  margin-bottom: 8px;
  font-weight: 600;
  text-align: center;
}

p {
  color: #666;
  margin-bottom: 32px;
  font-size: 16px;
  text-align: center;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 20px;
}

.next-button, .back-button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: white;
    height: 100vh;
    max-width: 100%;
    width: 100%;
  }

  .content {
    height: 100vh;
    width: 100%;
    background: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    width: 100%;
  }

  /* Right side background */
  .container::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: url('@/assets/BG pic.png') center/cover no-repeat;
    opacity: 0.6;
  }

  /* Gradient overlay */
  .container::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: url('@/assets/gradient.png') center/cover no-repeat;
    opacity: 4;
    mix-blend-mode: soft-light;
    z-index: 1;
  }

  /* Logo overlay */
  .brand-section {
    position: relative;
    background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 100%;
  }

  .engage-logo {
    width: clamp(200px, 30vw, 280px);
    position: relative;
    z-index: 2;
    filter: brightness(1.2);
  }
}

/* Mobile Styles */
@media (max-width: 767px) {
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: auto;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
  }

  .content {
    min-height: 100vh;
    height: auto;
    padding: 1.5rem;
    background: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-size: 28px;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
    color: #261C6B;
    font-weight: 600;
    text-align: center;
  }

  p {
    font-size: 16px;
    margin-bottom: 2rem;
    color: #666;
    text-align: center;
  }

  .button-group {
    width: 100%;
    margin-top: 1rem;
  }
}

/* Maintain existing button colors and states */
.next-button {
  background-color: #FFBC2D;
  color: white;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.next-button:disabled, .back-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
