<template>
  <div class="container">
    <div class="form-container">
      <h1>Politically Exposed Persons</h1>
      <div class="text-container">
        <div class="text-content">
          <p>In accordance with the Proceeds of Crime Act 2000 (as amended) and the Financial Obligations (Amendment) Regulations 2014, Regulation 20(3), there is an obligation for Financial Institutions to undertake Enhanced Customer Due Diligence on clients who are classified as a PEP. 
             As defined by these Acts and adopted within the Cathedral Credit Union, a PEP shall be considered as an individual 
            who is or has been entrusted with a prominent function either locally or in a foreign country.</p>
        </div>
        <input type="text" v-model="personName" placeholder="Enter Job Title" />
      </div>
      <div class="button-group">
        <button @click="showModal('Domestic Pep or Foreign PEP')" class="stretch-button">Select Domestic Pep or Foreign PEP</button>
        <button @click="showModal('Interntional Organization PEP')" class="stretch-button">Select Interntional Organization PEP</button>
        <button @click="showModal('Immediate Family member of a PEP')" class="stretch-button">Select Immediate Family member of a PEP</button>
      </div>
      <div class="navigation-buttons">
        <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
        <button type="button" class="next-button" @click="submitForm">Next</button>
      </div>

      <div v-if="modalVisible" class="modal">
        <div class="modal-content">
          <h2>Select an Option</h2>
          <div class="radio-group">
            <label v-for="option in options" :key="option">
              <input type="radio" v-model="selectedOption" :value="option" />
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
import axios from 'axios';

export default {
  name: 'PoliticallyExposedPersons',
  data() {
    return {
      jobtitle: '',
      modalVisible: false,
      selectedOption: '',
      options: [],
      currentButton: '',
      selections: {
        'Domestic Pep or Foreign PEP': '',
        'Interntional Organization PEP': '',
        'Immediate Family member of a PEP': ''}
    };
  },
  methods: {
    showModal(button) {
      this.currentButton = button;
      if (button === 'Domestic Pep or Foreign PEP') {
        this.options = ['Head of State', 'Senior Member of the Legislature', 'Military Official', 'Senior Government Official', 'Senior Politician', 'Senior Executive of State-Owned Corporation', 'Head of Government'];
      } else if (button === 'Interntional Organization PEP') {
        this.options = ['United Nations and Affiliated International Organizations', 'InterAmerican Development Bank', 'Caribbean Financial Action Task Force','Organization of American States'];
      } else if (button === 'Immediate Family member of a PEP') {
        this.options = ['Spouse/Ex-Spouse', 'Child', 'Parent', 'Sibling', 'Half-Sibling', 'Other Child of PEP Spouse'];
      }
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
      this.selectedOption = '';
    },
    confirmSelection() {
      this.selections[this.currentButton] = this.selectedOption;
      console.log(`Selected option for ${this.currentButton}: ${this.selectedOption}`);
      this.closeModal();
    },
    navigateToPrevious() {
      this.$router.go(-1);
    },
    async submitForm() {
      try {
        const formData = {
          jobTitle: this.jobtitle,
          selections: this.selections
        };

        // Debugging logs to check form data
        console.log('Form Data:', formData);

        const response = await axios.post('http://localhost:3000/politically-exposed-persons', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Form submitted:', response.data);

        // Navigate to the next page
        this.$router.push('/politically-exposed-persons-2');
      } catch (error) {
        console.error('Error submitting form:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    }
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

.radio-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.radio-group label {
  margin-bottom: 10px;
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
</style>