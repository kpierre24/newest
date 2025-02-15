<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>Welcome to Your Dashboard</h1>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>
    <div class="dashboard-content">
      <div class="user-info">
        <h2>User Information</h2>
        <p><strong>Name:</strong> {{ user.firstName }} {{ user.lastName }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Mobile Number:</strong> {{ user.mobileNumber }}</p>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
        <p><strong>Date of Birth:</strong> {{ user.dateOfBirth }}</p>
      </div>
      <div class="quick-links">
        <h2>Quick Links</h2>
        <ul>
          <li><a href="#">View Account Details</a></li>
          <li><a href="#">Update Profile</a></li>
          <li><a href="#">Change Password</a></li>
          <li><a href="#">Transaction History</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore'; // Import your Pinia store
import { useRouter } from 'vue-router';

export default {
  setup() {
    const demoStore = useDemoStore(); // Use your Pinia store
    const router = useRouter();

    // Get the authenticated user's data from the store
    const user = demoStore.user;

    // Handle logout
    const handleLogout = () => {
      demoStore.logout(); // Call the logout action
      router.push('/login'); // Redirect to the login page
    };

    return {
      user,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.dashboard-header h1 {
  font-size: 28px;
  color: #333;
}

.logout-button {
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #cc0000;
}

.dashboard-content {
  display: flex;
  gap: 30px;
}

.user-info,
.quick-links {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.user-info h2,
.quick-links h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.user-info p {
  font-size: 16px;
  color: #555;
  margin-bottom: 10px;
}

.quick-links ul {
  list-style: none;
  padding: 0;
}

.quick-links ul li {
  margin-bottom: 10px;
}

.quick-links ul li a {
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  transition: color 0.3s ease;
}

.quick-links ul li a:hover {
  color: #0056b3;
}
</style>