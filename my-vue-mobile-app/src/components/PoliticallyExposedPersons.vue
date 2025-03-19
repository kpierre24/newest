<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters>
      <!-- Form Section -->
      <v-col cols="12" md="6" class="form-section">
        <v-container class="form-container pa-4">
          <v-row justify="center" align="start">
            <v-col cols="12" sm="8" md="10" lg="8">
              <div class="text-center mb-6">
                <v-img
                  :src="logoImage"
                  alt="Cathedral Engage"
                  class="mx-auto mb-2"
                  width="120"
                  height="120"
                />
               
                <h1 class="text-h1 font-weight-bold mb-2">Politically Exposed Persons</h1>
                <p class="text-subtitle-1 text-medium-emphasis">Please provide information about any political exposure</p>
              </div>

              <v-form @submit.prevent="handleSubmit">
                <v-alert
                  v-if="formError"
                  type="error"
                  variant="tonal"
                  class="mb-4"
                >
                  {{ formError }}
                </v-alert>

                <!-- PEP Status Section -->
                <v-card class="mb-6" elevation="3">
                  <v-card-text>
                    <p class="text-body-1 mb-4">
                      A Politically Exposed Person (PEP) is someone who has been entrusted with a prominent public function, 
                      or an immediate family member or close associate of such a person.
                    </p>

                    <v-radio-group
                      v-model="formData.isPEP"
                      label="Are you a politically exposed person, or related to one?"
                      class="mb-4"
                      required
                    >
                      <v-radio
                        label="Yes"
                        :value="true"
                      />
                      <v-radio
                        label="No"
                        :value="false"
                      />
                    </v-radio-group>

                    <template v-if="formData.isPEP">
                      <v-select
                        v-model="formData.domestic_foreign_roles"
                        label="Position/Office"
                        :items="pepPositions"
                        variant="outlined"
                        prepend-inner-icon="mdi-briefcase"
                        multiple
                        chips
                        closable-chips
                        item-title="title"
                        item-value="value"
                        :return-object="false"
                        :menu-props="{ closeOnContentClick: true }"
                        required
                      >
                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :value="item.value"
                          >
                            <template v-slot:prepend>
                              <v-checkbox-btn
                                :model-value="formData.domestic_foreign_roles.includes(item.value)"
                              />
                            </template>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-select>

                      <v-select
                        v-model="formData.immediate_family_members"
                        label="Immediate Family Member of PEP"
                        :items="pepRelationships"
                        variant="outlined"
                        prepend-inner-icon="mdi-account-group"
                        multiple
                        chips
                        closable-chips
                        item-title="title"
                        item-value="value"
                        :return-object="false"
                        :menu-props="{ closeOnContentClick: true }"
                        required
                      >
                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :value="item.value"
                          >
                            <template v-slot:prepend>
                              <v-checkbox-btn
                                :model-value="formData.immediate_family_members.includes(item.value)"
                              />
                            </template>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-select>

                      <v-select
                        v-model="formData.international_roles"
                        label="International Organization PEP"
                        :items="internationalOrganizations"
                        variant="outlined"
                        prepend-inner-icon="mdi-earth"
                        multiple
                        chips
                        closable-chips
                        item-title="title"
                      
                        :return-object="false"
                        :menu-props="{ closeOnContentClick: true }"
                        required
                      >
                        <template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :value="item.value"
                          >
                            <template v-slot:prepend>
                              <v-checkbox-btn
                                :model-value="formData.international_roles.includes(item.value)"
                              />
                            </template>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </template>
                      </v-select>

                      <v-text-field
                        v-model="formData.jobTitle"
                        label="Job Title"
                        placeholder="Enter your job title"
                        variant="outlined"
                        prepend-inner-icon="mdi-card-account-details"
                        required
                      />
                    </template>
                  </v-card-text>
                </v-card>

                <!-- PEP Association Section -->
                <v-card class="mb-6" elevation="3">
                  <v-card-text>
                    <div class="input-container">
                      <label>Are you an associate of a politically exposed person?</label>
                      <div class="radio-group">
                        <label>
                          <input 
                            type="radio" 
                            v-model="formData.is_close_associate" 
                            value="yes" 
                            required
                          /> Yes
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            v-model="formData.is_close_associate" 
                            value="no" 
                            required
                          /> No
                        </label>
                      </div>
                    </div>

                    <div class="input-container">
                      <v-text-field
                        v-model="formData.relationship_type"
                        label="Relationship to PEP"
                        placeholder="Enter relationship"
                        variant="outlined"
                        prepend-inner-icon="mdi-account-group"
                        :disabled="formData.is_close_associate === 'no'"
                        required
                      />
                    </div>

                    <div class="input-container">
                      <v-text-field
                        v-model="formData.associate_name"
                        label="Name of Associated PEP"
                        placeholder="Enter name of PEP"
                        variant="outlined"
                        prepend-inner-icon="mdi-account"
                        :disabled="formData.is_close_associate === 'no'"
                        required
                      />
                    </div>
                  </v-card-text>
                </v-card>

                <v-row>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="secondary"
                      density="default"
                      size="large"
                      variant="flat"
                      @click="navigateToPrevious"
                      :disabled="isLoading"
                    >
                      Back
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      color="primary"
                      density="default"
                      variant="flat"
                      size="large"
                      type="submit"
                      :loading="isLoading"
                    >
                      {{ isLoading ? 'Processing...' : 'Next' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <!-- Brand Section -->
      <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
        <div class="brand-overlay"></div>
        <v-img
          src="@/assets/Logo1.png"
          alt="Cathedral Engage"
          class="brand-logo"
          contain
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDemoStore } from '@/store/demoStore';
import axios from 'axios';
import logoImage from '@/assets/Logo1.png';

const router = useRouter();
const store = useDemoStore();
const formError = ref('');
const isLoading = ref(false);

const formData = ref({
  isPEP: null,
  jobTitle: '',
  domestic_foreign_roles: [],
  international_roles: [],
  immediate_family_members: [],
  is_close_associate: false,
  relationship_type: '',
  associate_name: '',
  is_confirmed: false
});

const pepPositions = [
  { title: 'Head of State', value: 'Head of State' },
  { title: 'Senior Politician', value: 'Senior Politician' },
  { title: 'Senior Government Official', value: 'Senior Government Official' },
  { title: 'Senior Judicial Official', value: 'Senior Judicial Official' },
  { title: 'Senior Military Official', value: 'Senior Military Official' },
  { title: 'Senior Executive of State-Owned Corporation', value: 'Senior Executive of State-Owned Corporation' },
  { title: 'High-Ranking Political Party Official', value: 'High-Ranking Political Party Official' },
  { title: 'Other', value: 'Other' }
].map(item => ({
  ...item,
  text: item.title // Remove any potential label
}));

const pepRelationships = [
  { title: 'Self', value: 'Self' },
  { title: 'Spouse', value: 'Spouse' },
  { title: 'Child', value: 'Child' },
  { title: 'Parent', value: 'Parent' },
  { title: 'Sibling', value: 'Sibling' },
  { title: 'Close Associate', value: 'Close Associate' }
].map(item => ({
  ...item,
  text: item.title // Remove any potential label
}));

const internationalOrganizations = [
  { title: 'InterAmerican Development Bank', value: 'InterAmerican Development Bank' },
  { title: 'Caribbean Financial Action Task Force', value: 'Caribbean Financial Action Task Force' },
  { title: 'Organization of American States', value: 'Organization of American States' },
  { title: 'International Labour Organization', value: 'International Labour Organization' },
  { title: 'Military Official', value: 'Military Official' },
  { title: 'Senior Member of the Legislature', value: 'Senior Member of the Legislature' }
].map(item => ({
  ...item,
  text: item.title // Remove any potential label
}));

const handleSubmit = async () => {
  isLoading.value = true;
  formError.value = '';

  try {
    // Basic validation
    if (formData.value.isPEP === null) {
      formError.value = 'Please indicate if you are a politically exposed person';
      return;
    }

    if (formData.value.isPEP === true) {
      if (!formData.value.jobTitle || 
          !formData.value.domestic_foreign_roles.length || 
          !formData.value.immediate_family_members.length) {
        formError.value = 'Please fill in all required PEP details';
        return;
      }
    }

    // Format data for API
    const pepData = {
      signup_id: store.signupId,
      job_title: formData.value.jobTitle,
      domestic_foreign_roles: formData.value.domestic_foreign_roles,
      international_roles: formData.value.international_roles,
      immediate_family_members: formData.value.immediate_family_members,
      is_close_associate: formData.value.is_close_associate,
      relationship_type: formData.value.relationship_type,
      associate_name: formData.value.associate_name,
      is_confirmed: true
    };

    try {
      const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : `http://${window.location.hostname}:8000`;
      await axios.post(`${baseURL}/peps/`, pepData);
    } catch (apiError) {
      console.error('API error:', apiError);
      throw apiError;
    }

    // Update store
    store.$patch((state) => {
      state.isPEP = formData.value.isPEP;
      state.jobTitle = formData.value.jobTitle;
      state.domestic_foreign_roles = formData.value.domestic_foreign_roles;
      state.international_roles = formData.value.international_roles;
      state.immediate_family_members = formData.value.immediate_family_members;
      state.is_close_associate = formData.value.is_close_associate;
      state.relationship_type = formData.value.relationship_type;
      state.associate_name = formData.value.associate_name;
    });

    // Get DOB from store and calculate age
    const dob = store.basicInfo?.dob;
    const age = calculateAge(dob);

    // Navigate based on age
    if (age < 18) {
      router.push('/child-id-information');
    } else {
      router.push('/id-information');
    }

  } catch (error) {
    console.error('Error submitting PEP information:', error);
    formError.value = error.response?.data?.detail || 'An error occurred while submitting your information';
  } finally {
    isLoading.value = false;
  }
};

// Load existing PEP data if available
const loadExistingPEPData = async () => {
  try {
    const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:8000' : `http://${window.location.hostname}:8000`;
    const response = await axios.get(`${baseURL}/peps/${store.signupId}`);
    if (response.data && response.data.length > 0) {
      const pepData = response.data[0];
      formData.value = {
        isPEP: true,
        jobTitle: pepData.job_title,
        domestic_foreign_roles: pepData.domestic_foreign_roles,
        international_roles: pepData.international_roles,
        immediate_family_members: pepData.immediate_family_members,
        is_close_associate: pepData.is_close_associate,
        relationship_type: pepData.relationship_type,
        associate_name: pepData.associate_name,
        is_confirmed: pepData.is_confirmed
      };
    }
  } catch (error) {
    console.error('Error loading PEP data:', error);
  }
};

onMounted(async () => {
  if (!store.signupId) {
    router.push('/basic-info');
    return;
  }
  await loadExistingPEPData();
});

const calculateAge = (dob) => {
  if (!dob) return 0;
  
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) {
    console.error('Invalid date format:', dob);
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const navigateToPrevious = () => {
  // Save current state before navigating
  store.$patch((state) => {
    // PEP Status
    state.isPEP = formData.value.isPEP;
    state.jobTitle = formData.value.jobTitle;
    state.domestic_foreign_roles = formData.value.domestic_foreign_roles;
    state.international_roles = formData.value.international_roles;
    state.immediate_family_members = formData.value.immediate_family_members;
    state.is_close_associate = formData.value.is_close_associate;
    state.relationship_type = formData.value.relationship_type;
    state.associate_name = formData.value.associate_name;
  });
  router.go(-1);
};
</script>

<style scoped>
.form-section {
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
  min-height: 100vh;
  overflow-y: auto;
}

.form-container {
  max-width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

:deep(.v-btn) {
  height: 48px;
  border-radius: 8px;
}

:deep(.v-card) {
  border: none !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

:deep(.v-card-text) {
  padding: 24px;
}

/* Mobile specific styles */
@media (max-width: 959px) {
  .form-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .brand-section {
    position: relative;
    width: 100%;
    min-height: 300px;
  }

  .brand-logo {
    width: 180px;
  }
}

/* Ensure form content is scrollable on mobile */
@media (max-width: 600px) {
  .form-section {
    height: 100vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .form-container {
    min-height: auto;
    padding: 1rem;
  }
}

.input-container {
  margin-bottom: 20px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>