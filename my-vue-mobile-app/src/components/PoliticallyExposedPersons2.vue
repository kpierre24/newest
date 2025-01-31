<template>
  <div class="container">
    <div class="form-container">
      <h1>Politically Exposed Person</h1>
      <form @submit.prevent="handleSubmit">
        <p>Are you a close associate of a PEP?</p>
        <div>
          <input type="radio" id="pep-yes" name="pep-associate" value="yes" v-model="pepAssociate">
          <label for="pep-yes">Yes</label>
          <input type="radio" id="pep-no" name="pep-associate" value="no" v-model="pepAssociate">
          <label for="pep-no">No</label>
        </div>
        <p v-if="errors.pepAssociate" class="error">{{ errors.pepAssociate }}</p>

        <p>Indicate the type of relationship to PEP</p>
        <input type="text" placeholder="Relationship to PEP" v-model="relationshipToPep">
        <p v-if="errors.relationshipToPep" class="error">{{ errors.relationshipToPep }}</p>

        <div class="button-group">
          <button type="button" class="back-button" @click="goBack">Back</button>
          <button type="submit" class="submit-button">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useDemoStore } from '@/store/demoStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useDemoStore();
    const router = useRouter();

    const pepAssociate = ref('');
    const relationshipToPep = ref('');
    const errors = ref({});

    const handleSubmit = () => {
      if (!pepAssociate.value) {
        errors.value.pepAssociate = 'This field is required';
      } else {
        errors.value.pepAssociate = '';
      }

      if (!relationshipToPep.value) {
        errors.value.relationshipToPep = 'This field is required';
      } else {
        errors.value.relationshipToPep = '';
      }

      if (!errors.value.pepAssociate && !errors.value.relationshipToPep) {
        navigateBasedOnAge();
      }
    };

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const navigateBasedOnAge = () => {
      const dob = store.dob;
      const cutoffDate = new Date('2005-01-03');

      if (new Date(dob) < cutoffDate) {
        router.push({ name: 'IdInformation' });
      } else {
        router.push({ name: 'ChildIdInformation' });
      }
    };

    const goBack = () => {
      router.push("/politically-exposed-persons");
    };

    return {
      pepAssociate,
      relationshipToPep,
      errors,
      handleSubmit,
      navigateBasedOnAge,
      goBack
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
}

.form-container {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.input-group {
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.back-button,
.submit-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button {
  background-color: #6c757d;
  color: #fff;
}

.submit-button {
  background-color: #007bff;
  color: #fff;
}
</style>