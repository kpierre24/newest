<template>
    <div>
      <h1>Welcome, {{ demostore.user.firstname }}!</h1>
      <button @click="handleLogout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { demoStore } from '../store/demoStore';
  import { useRouter } from 'vue-router';
  
  const store = demoStore();
  const router = useRouter();
  
  const handleLogout = () => {
    store.logout();
    router.push('/login'); // Redirect to login after logout
  };
  </script>