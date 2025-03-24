<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <!-- App Header -->
        <v-app-bar color="white" elevation="1" class="mb-6">
          <v-img :src="logoImage" alt="Cathedral Engage" max-width="120" class="mr-3" />
          <v-toolbar-title class="text-primary font-weight-bold">
            Cathedral Engage
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon="mdi-bell" variant="text" class="mr-2">
            <v-badge color="error" content="2" dot />
          </v-btn>
          <v-btn icon="mdi-logout" variant="text" @click="handleLogout" />
        </v-app-bar>

        <v-row>
          <!-- Sidebar -->
          <v-col cols="12" md="3" class="pr-md-4">
            <v-card class="mb-4">
              <v-list>
                <v-list-item
                  prepend-avatar="https://via.placeholder.com/150"
                  :title="userFullName"
                  :subtitle="store.email"
                >
                  <template v-slot:append>
                    <v-btn
                      icon="mdi-pencil"
                      variant="text"
                      size="small"
                      @click="openProfilePictureDialog"
                    />
                  </template>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card>
              <v-list nav>
                <v-list-item
                  v-for="item in sidebarItems"
                  :key="item.title"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  :active="activeSection === item.key"
                  @click="activeSection = item.key"
                />
              </v-list>
            </v-card>
          </v-col>

          <!-- Main Content -->
          <v-col cols="12" md="9">
            <!-- Overview Section -->
            <v-card v-if="activeSection === 'overview'" class="mb-4">
              <v-card-title>Account Overview</v-card-title>
              <v-card-text>
                <v-row>
                  <!-- Account Balance Card -->
                  <v-col cols="12" sm="6" md="4">
                    <v-card color="primary" theme="dark" class="elevation-3">
                      <v-card-text>
                        <div class="text-subtitle-2 mb-1">Available Balance</div>
                        <div class="text-h4 mb-2">$10,234.56</div>
                        <div class="text-caption">Last updated: {{ new Date().toLocaleString() }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Quick Actions -->
                  <v-col cols="12" sm="6" md="8">
                    <v-card class="elevation-1">
                      <v-card-text>
                        <div class="text-subtitle-1 mb-2">Quick Actions</div>
                        <v-row>
                          <v-col cols="6" md="4">
                            <v-btn block prepend-icon="mdi-bank-transfer" color="primary" class="gradient-btn">
                              Transfer
                            </v-btn>
                          </v-col>
                          <v-col cols="6" md="4">
                            <v-btn block prepend-icon="mdi-cash" variant="outlined">
                              Pay Bills
                            </v-btn>
                          </v-col>
                          <v-col cols="6" md="4">
                            <v-btn block prepend-icon="mdi-file-document" variant="outlined">
                              Statements
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Recent Transactions -->
                  <v-col cols="12">
                    <v-card class="elevation-1">
                      <v-card-title class="d-flex align-center">
                        Recent Transactions
                        <v-spacer />
                        <v-btn variant="text" color="primary" size="small">
                          View All
                        </v-btn>
                      </v-card-title>
                      <v-list lines="two">
                        <v-list-item
                          v-for="(transaction, index) in recentTransactions"
                          :key="index"
                          :title="transaction.description"
                          :subtitle="transaction.date"
                        >
                          <template v-slot:append>
                            <span :class="transaction.amount < 0 ? 'text-error' : 'text-success'">
                              {{ transaction.amount < 0 ? '-' : '+' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                            </span>
                          </template>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Profile Section -->
            <v-card v-if="activeSection === 'profile'" class="mb-4">
              <v-card-title class="d-flex align-center">
                Profile Information
                <v-spacer />
                <v-btn
                  prepend-icon="mdi-pencil"
                  variant="text"
                  @click="editProfile = !editProfile"
                >
                  {{ editProfile ? 'Cancel' : 'Edit' }}
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-form v-if="editProfile" @submit.prevent="updateProfile">
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="profileData.firstName" label="First Name" variant="outlined" />
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="profileData.lastName" label="Last Name" variant="outlined" />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="profileData.email" label="Email" variant="outlined" disabled />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="profileData.mobileNumber" label="Mobile Number" variant="outlined" />
                    </v-col>
                    <v-col cols="12">
                      <v-btn color="primary" type="submit" :loading="isLoading">
                        Save Changes
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
                <v-list v-else>
                  <v-list-item title="Name" :subtitle="`${profileData.firstName} ${profileData.lastName}`" />
                  <v-list-item title="Email" :subtitle="profileData.email" />
                  <v-list-item title="Mobile" :subtitle="profileData.mobileNumber" />
                </v-list>
              </v-card-text>
            </v-card>

            <!-- Other Sections (Account, Statements, Cards, Notifications, Security) -->
            <!-- Add similar improvements to other sections -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Profile Picture Upload Dialog -->
    <v-dialog v-model="showProfilePictureDialog" max-width="500px">
      <v-card>
        <v-card-title>Update Profile Picture</v-card-title>
        <v-card-text>
          <v-file-input
            v-model="profilePicture"
            accept="image/*"
            label="Select an image"
            prepend-icon="mdi-camera"
            show-size
            variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="uploadProfilePicture" :loading="isUploading">
            Upload
          </v-btn>
          <v-btn color="grey" variant="text" @click="showProfilePictureDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDemoStore } from '@/store/demoStore';
import { useRouter } from 'vue-router';
import axios from 'axios';
import logoImage from '@/assets/Logo1.png';

const store = useDemoStore();
const router = useRouter();
const activeSection = ref('overview');
const editProfile = ref(false);
const isLoading = ref(false);
const isUploading = ref(false);
const showProfilePictureDialog = ref(false);
const profilePicture = ref(null);

const profileData = ref({
  firstName: store.basicInfo.firstName,
  lastName: store.basicInfo.lastName,
  email: store.basicInfo.email,
  mobileNumber: store.basicInfo.mobileNumber,
});

const userFullName = computed(() => `${profileData.value.firstName} ${profileData.value.lastName}`);

const sidebarItems = [
  { icon: 'mdi-view-dashboard', title: 'Overview', key: 'overview' },
  { icon: 'mdi-account', title: 'Profile', key: 'profile' },
  { icon: 'mdi-bank', title: 'Account', key: 'account' },
  { icon: 'mdi-security', title: 'Security', key: 'security' },
  { icon: 'mdi-file-document', title: 'Statements', key: 'statements' },
  { icon: 'mdi-card-bulleted', title: 'Cards', key: 'cards' },
  { icon: 'mdi-bell', title: 'Notifications', key: 'notifications' },
];

const recentTransactions = ref([
  { description: 'Grocery Store', date: '2024-03-20', amount: -85.50 },
  { description: 'Salary Deposit', date: '2024-03-19', amount: 2500.00 },
  { description: 'Utility Bill', date: '2024-03-18', amount: -120.75 },
  { description: 'Transfer from Savings', date: '2024-03-17', amount: 500.00 },
]);

const handleLogout = async () => {
  try {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    await axios.post(`${baseURL}/auth/logout/`, {}, {
      headers: { Authorization: `Bearer ${store.accessToken}` },
    });
    store.clearAuth();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.gradient-btn {
  background: linear-gradient(135deg, var(--v-primary-base), var(--v-primary-lighten2));
  color: white !important;
  transition: transform 0.2s ease;
}

.gradient-btn:hover {
  transform: translateY(-2px);
}

.text-success {
  color: #4CAF50 !important;
}

.text-error {
  color: #FF5252 !important;
}
</style>