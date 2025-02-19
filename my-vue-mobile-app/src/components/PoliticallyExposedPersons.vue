<template>
  <div class="container">
    <div class="form-container">
      <h1>Politically <br>Exposed Persons</h1>
      <div class="text-container">
        <div class="text-content">
          <p>In accordance with the Proceeds of Crime Act 2000 (as amended) and the Financial Obligations (Amendment) Regulations 2014, Regulation 20(3), there is an obligation for Financial Institutions to undertake Enhanced Customer Due Diligence on clients who are classified as a PEP. 
             As defined by these Acts and adopted within the Cathedral Credit Union, a PEP shall be considered as an individual 
            who is or has been entrusted with a prominent function either locally or in a foreign country.</p>
        </div>
        <div class="input-container">
          <label for="pepAssociate">Are you a politically exposed person (PEP) or associated with one?</label>
          <div class="select-container">
            <select v-model="pepAssociate" id="pepAssociate" required>
              <option value="" disabled>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
      <div class="button-group">
        <button @click="showModal('Domestic Pep or Foreign PEP')" class="stretch-button" :disabled="pepAssociate === 'no'">Select Domestic Pep or Foreign PEP</button>
        <button @click="showModal('International Organization PEP')" class="stretch-button" :disabled="pepAssociate === 'no'">Select International Organization PEP</button>
        <button @click="showModal('Immediate Family member of a PEP')" class="stretch-button" :disabled="pepAssociate === 'no'">Select Immediate Family member of a PEP</button>
      </div>

      <!-- Modal inside the form-container -->
      <transition name="slide">
        <div v-if="modalVisible" class="modal">
          <div class="modal-content">
            <h2>Select Options</h2>
            <div class="checkbox-group">
              <label v-for="option in options" :key="option">
                <input type="checkbox" v-model="selectedOptions" :value="option" />
                {{ option }}
              </label>
            </div>
            <div class="modal-buttons">
              <button @click="closeModal" class="modal-button">Close</button>
              <button @click="confirmSelection" class="modal-button">Confirm</button>
            </div>
          </div>
        </div>
      </transition>
      <div class="navigation-buttons">
        <button class="back-button" @click="navigateToPrevious">Back</button>
        <button class="next-button" @click="navigateToNext">Next</button>
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
    const selectedOptions = ref([]);
    const options = ref([]);

    onMounted(() => {
      // Load state from Pinia store
      pepAssociate.value = store.pepAssociate;
      relationshipToPep.value = store.relationshipToPep;
      pepName.value = store.pepName;
      jobTitle.value = store.jobTitle;
      selectedOptions.value = store.selectedOptions || [];
    });

    const showModal = (button) => {
      if (button === 'Domestic Pep or Foreign PEP') {
        options.value = [
          'Head of State',
          'Senior Member of the Legislature',
          'Military Official',
          'Senior Government Official',
          'Senior Politician',
          'Senior Executive of State-Owned Corporation',
          'Head of Government'
        ];
      } else if (button === 'International Organization PEP') {
        options.value = [
          'United Nations and Affiliated International Organizations',
          'InterAmerican Development Bank',
          'Caribbean Financial Action Task Force',
          'Organization of American States'
        ];
      } else if (button === 'Immediate Family member of a PEP') {
        options.value = [
          'Spouse/Ex-Spouse',
          'Child',
          'Parent',
          'Sibling',
          'Half-Sibling',
          'Other Child of PEP Spouse'
        ];
      }

      selectedOptions.value = [];
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const confirmSelection = () => {
      // Save selected options to Pinia store
      store.setSelectedOptions(selectedOptions.value);
      closeModal();
    };

    const navigateToPrevious = () => {
      // Save state to Pinia before navigating back
      store.setPepInfo({
        pepAssociate: pepAssociate.value,
        relationshipToPep: relationshipToPep.value,
        pepName: pepName.value,
        jobTitle: jobTitle.value,
        selectedOptions: selectedOptions.value
      });
      router.push({ name: 'MembershipDeclarationAgreement' });
    };

    const navigateToNext = async () => {
      // Save state to Pinia before navigating forward
      store.setPepInfo({
        pepAssociate: pepAssociate.value,
        relationshipToPep: relationshipToPep.value,
        pepName: pepName.value,
        jobTitle: jobTitle.value,
        selectedOptions: selectedOptions.value
      });

      // Make API call
      try {
        const formData = {
          pepAssociate: pepAssociate.value,
          relationshipToPep: relationshipToPep.value,
          pepName: pepName.value,
          jobTitle: jobTitle.value,
          selectedOptions: selectedOptions.value
        };

        const response = await axios.post('http://localhost:3000/politically-exposed-persons', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('PEP information submitted:', response.data);

        // Navigate to the next page
        router.push({ name: 'PoliticallyExposedPersons2' });
      } catch (error) {
        console.error('Error submitting PEP information:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    return {
      pepAssociate,
      relationshipToPep,
      pepName,
      jobTitle,
      modalVisible,
      selectedOptions,
      options,
      showModal,
      closeModal,
      confirmSelection,
      navigateToPrevious,
      navigateToNext
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
  background-image: url('@/assets/back.jpg');
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

.select-container select,
.text-container textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  align-content: center;
}
h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

.select-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 16px;
}

.text-container {
  width: 100%;
  margin-bottom: 20px;
}

.text-content {
  text-align: left;
  font-size: 12px;
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
  border-radius: 7px;
  cursor: pointer;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  width: 48%;
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: left;
}

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #333;
}

.checkbox-group input[type="checkbox"] {
  margin: 0;
  width: 16px;
  height: 16px;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}

.radio-group label {
  margin-bottom: 10px;
}

.modal {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 50%;
  max-width: 420px;
  background: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 10;
}
.modal-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  margin-right: 10px;
  margin-left: 10px;
  align-self: center;
}

.modal-content {
  padding: 20px;
  text-align: center;
}

.modal-enter-active,
.modal-leave-active {
  transition: transform 3s ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateY(100%) translateX(-50%);
}

.modal-enter-to,
.modal-leave-from {
  transform: translateY(0) translateX(-50%);
}

.form-container {
  position: relative;
  overflow: hidden;
}

.stretch-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}



.label {
  font-size: 14px;
  color: rgb(69, 97, 190);
  cursor: pointer;
  transition: color 0.3s ease;
  text-align: left;
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