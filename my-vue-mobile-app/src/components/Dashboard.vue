<template>
  <div class="dashboard">
    <header>
      <h1>Welcome, {{ user?.firstName || 'User' }}</h1>
      <button @click="handleLogout">Logout</button>
    </header>
    <main>
      <!-- Add your dashboard content here -->
    </main>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
  name: 'Dashboard',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const user = computed(() => authStore.user);

    const handleLogout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return {
      user,
      handleLogout
    };
  }
};
</script>
