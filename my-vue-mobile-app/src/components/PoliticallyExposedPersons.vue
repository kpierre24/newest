<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Politically Exposed Persons</h1>
      <div class="text-container">
        <div class="text-content">
          <p>In accordance with the Proceeds of Crime Act 2000 (as amended) and the Financial Obligations (Amendment) Regulations 2014, Regulation 20(3), there is an obligation for Financial Institutions to undertake Enhanced Customer Due Diligence on clients who are classified as a PEP. 
             As defined by these Acts and adopted within the Cathedral Credit Union, a PEP shall be considered as an individual 
            who is or has been entrusted with a prominent function either locally or in a foreign country.</p>
         <div class="input-container">
          <label for="pepAssociate">Are you a politically exposed person (PEP) or associated with one?</label>
          <select v-model="pepAssociate" id="pepAssociate" required>
            <option value="" disabled>Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        
            <div class="button-group">
            <button @click="showModal('Domestic Pep or Foreign PEP')" class="stretch-button" :disabled="pepAssociate === 'no'">Select Domestic Pep or Foreign PEP</button>
            <button @click="showModal('Interntional Organization PEP')" class="stretch-button" :disabled="pepAssociate === 'no'">Select Interntional Organization PEP</button>
            <button @click="showModal('Immediate Family member of a PEP')" class="stretch-button" :disabled="pepAssociate === 'no'">Select Immediate Family member of a PEP</button>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        
       
        <h3 v-if="pepAssociate === 'yes'">You are a politically exposed person.</h3>
        <h3 v-else-if="pepAssociate === 'no'">You are not a politically exposed person.</h3>
        
        <div class="navigation-buttons">
          <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
          <button type="submit" class="next-button">Next</button>
        </div>
      </form>
      <div v-if="modalVisible" class="modal">
        <div class="modal-content">
          <h2>Select Options</h2>
          <div class="checkbox-group">
            <label v-for="option in currentModalOptions" :key="option">
              <input 
                type="checkbox" 
                :value="option" 
                v-model="selectedOptions[currentModalType]"
              />
              {{ option }}
            </label>
          </div>
          <div class="modal-buttons">
            <button @click="closeModal" class="modal-button">Close</button>
            <button @click="confirmSelection" class="modal-button">Confirm</button>
          </div>
        </div>
      </div>
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

    const pepAssociate = ref('');
    const relationshipToPep = ref('');
    const pepName = ref('');
    const jobTitle = ref('');
    const modalVisible = ref(false);
    const selectedOptions = ref({
      'Domestic Pep or Foreign PEP': [],
      'Interntional Organization PEP': [],
      'Immediate Family member of a PEP': []
    });
    const currentModalType = ref('');
    
    const currentModalOptions = ref([]);

    const modalOptions = {
      'Domestic Pep or Foreign PEP': [
        'Head of State',
        'Senior Politician',
        'Senior Government Official',
        'Senior Judicial Official',
        'Senior Military Official'
      ],
      'Interntional Organization PEP': [
        'Director',
        'Deputy Director',
        'Board Member',
        'Executive Committee Member'
      ],
      'Immediate Family member of a PEP': [
        'Spouse',
        'Child',
        'Parent',
        'Sibling',
        'Spouse\'s Parent'
      ]
    };

    onMounted(() => {
      pepAssociate.value = store.pepAssociate;
      relationshipToPep.value = store.relationshipToPep;
      pepName.value = store.pepName;
      jobTitle.value = store.jobTitle;
      // Load saved selections from store if they exist
      if (store.pepSelections) {
        selectedOptions.value = store.pepSelections;
      }
    });

    const handleSubmit = async () => {
      if (pepAssociate.value === 'no') {
        router.push({ name: 'PoliticallyExposedPersons2' });
        return;
      }

      try {
        const formData = {
          pepAssociate: pepAssociate.value,
          relationshipToPep: relationshipToPep.value,
          pepName: pepName.value,
          jobTitle: jobTitle.value,
          pepSelections: selectedOptions.value
        };

        const response = await axios.post('http://localhost:3000/politically-exposed-persons', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('PEP information submitted:', response.data);
        router.push({ name: 'PoliticallyExposedPersons2' });
      } catch (error) {
        console.error('Error submitting PEP information:', error);
      }
    };

    const navigateToPrevious = () => {
      router.push('/membership-declaration-agreement');
    };

    const showModal = (option) => {
      currentModalType.value = option;
      currentModalOptions.value = modalOptions[option];
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const confirmSelection = () => {
      // Save selections to store
      store.$patch({
        pepSelections: selectedOptions.value
      });
      closeModal();
    };

    return {
      pepAssociate,
      relationshipToPep,
      pepName,
      jobTitle,
      modalVisible,
      selectedOptions,
      currentModalType,
      currentModalOptions,
      showModal,
      closeModal,
      confirmSelection,
      handleSubmit,
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
  background: linear-gradient(45deg, #d4a5ff, #a5d4ff);
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

.text-container {
  width: 100%;
  margin-bottom: 20px;
}

.text-content {
  text-align: left;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.stretch-button {
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.stretch-button:hover {
  background-color: #0056b3;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  width: 48%; /* Adjust width to fit two buttons side by side */
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  text-align: left;
}

.checkbox-group label {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease;
}

.modal-button:hover {
  background-color: #0056b3;
}
.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>