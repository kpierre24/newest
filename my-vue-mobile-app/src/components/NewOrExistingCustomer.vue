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
import { useDemoStore } from '@/store/demoStore';
import { useRouter } from 'vue-router';

export default {
  name: 'NewOrExistingCustomer',
  setup() {
    const store = useDemoStore();
    const router = useRouter();

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
      setExistingCustomer,
      navigateToHome
    };
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
}

.content {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.button,
.back-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button {
  background-color: #6a11cb;
  color: #ffffff;
}

.back-button {
  background-color: #cccccc;
  color: #333333;
}
</style>