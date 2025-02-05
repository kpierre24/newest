<template>
  <div class="container">
    <div class="form-container">
      <h1>Branch Information</h1>
      <form @submit.prevent="submitBranch">
        <div class="input-container">
          <label for="branchName">Branch Name</label>
          <input type="text" v-model="branchName" id="branchName" placeholder="Enter branch name" required />
        </div>
        <div class="input-container">
          <label for="branchCode">Branch Code</label>
          <input type="text" v-model="branchCode" id="branchCode" placeholder="Enter branch code" required />
        </div>
        <div class="input-container">
          <label for="branchLocation">Branch Location</label>
          <input type="text" v-model="branchLocation" id="branchLocation" placeholder="Enter branch location" required />
        </div>
        <div class="input-container">
          <label for="bestContactTime">Best Contact Time</label>
          <input type="text" v-model="bestContactTime" id="bestContactTime" placeholder="Enter best contact time" required />
        </div>
        <div class="input-container">
          <label for="selectedBranch">Selected Branch</label>
          <input type="text" v-model="selectedBranch" id="selectedBranch" placeholder="Enter selected branch" required />
        </div>
        <div class="input-container">
          <label for="preferredContactMethod">Preferred Contact Method</label>
          <input type="text" v-model="preferredContactMethod" id="preferredContactMethod" placeholder="Enter preferred contact method" required />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="submit-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const branchName = ref('');
    const branchCode = ref('');
    const branchLocation = ref('');
    const bestContactTime = ref('');
    const selectedBranch = ref('');
    const preferredContactMethod = ref('');

    onMounted(() => {
      branchName.value = store.branchName;
      branchCode.value = store.branchCode;
      branchLocation.value = store.branchLocation;
      bestContactTime.value = store.bestContactTime;
      selectedBranch.value = store.selectedBranch;
      preferredContactMethod.value = store.preferredContactMethod;
    });

    const submitBranch = async () => {
      try {
        const formData = {
          branchName: branchName.value,
          branchCode: branchCode.value,
          branchLocation: branchLocation.value,
          bestContactTime: bestContactTime.value,
          selectedBranch: selectedBranch.value,
          preferredContactMethod: preferredContactMethod.value
        };

        // Save branch info to the store
        store.setBranchInfo(formData);

        const response = await axios.post('http://localhost:4000/branch', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Branch information submitted:', response.data);

        // Navigate to the success page
        router.push('/success');
      } catch (error) {
        console.error('Error submitting branch information:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const navigateToPrevious = () => {
      router.go(-1);
    };

    return {
      branchName,
      branchCode,
      branchLocation,
      bestContactTime,
      selectedBranch,
      preferredContactMethod,
      submitBranch,
      navigateToPrevious
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
  background: #f4f4f4;
  padding: 20px;
}

.form-container {
  background-color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

.input-container {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

h1 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}
</style>