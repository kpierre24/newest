<template>
  <div class="container">
    <div class="form-container">
      <h1>Child ID Information</h1>
      <div class="id-box">
        <div class="id-container">
          <h2>First Form of ID</h2>
          <FormInput
            label="Type of ID"
            type="select"
            id="firstIdType"
            v-model="firstIdType"
            @change="updateSecondIdOptions"
            :selectOptions="['ID Card', 'Passport', 'Birthpaper']"
            iconClass="icon fas fa-id-card"
          />
          <FormInput
            label="ID Number"
            type="text"
            id="firstIdNumber"
            v-model="firstIdNumber"
            placeholder="Enter ID number"
            iconClass="icon fas fa-hashtag"
          />
          <FormInput
            label="Expiry Date"
            type="date"
            id="firstExpiryDate"
            v-model="firstExpiryDate"
            :max="maxExpiryDate"
            :disabled="firstIdType === 'Birthpaper'"
            iconClass="icon fas fa-calendar-alt"
          />
          <FileUpload
            id="firstIdDocument"
            buttonText="Upload ID"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleFileUpload($event, 'first')"
          />
        </div>
      </div>
      <div class="id-box">
        <div class="id-container">
          <h2>Second Form of ID</h2>
          <FormInput
            label="Type of ID"
            type="select"
            id="secondIdType"
            v-model="secondIdType"
            :selectOptions="secondIdOptions"
            iconClass="icon fas fa-id-card"
          />
          <FormInput
            label="ID Number"
            type="text"
            id="secondIdNumber"
            v-model="secondIdNumber"
            placeholder="Enter ID number"
            iconClass="icon fas fa-hashtag"
          />
          <FormInput
            label="Expiry Date"
            type="date"
            id="secondExpiryDate"
            v-model="secondExpiryDate"
            :max="maxExpiryDate"
            :disabled="secondIdType === 'Birthpaper'"
            iconClass="icon fas fa-calendar-alt"
          />
          <FileUpload
            id="secondIdDocument"
            buttonText="Upload ID"
            accept=".pdf,.jpg,.png"
            @file-uploaded="handleFileUpload($event, 'second')"
          />
          <div class="id-box">
            <FormInput
              label="School Name"
              type="text"
              id="schoolName"
              v-model="schoolName"
              placeholder="Enter school name"
              iconClass="icon fas fa-school"
            />
          </div>
        </div>
      </div>
      <div class="button-group">
        <button class="back-button" @click="navigateToBasicInformation">Back</button>
        <button class="next-button" @click="navigateToNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useDateValidation } from '@/composables/useDateValidation';
import FormInput from '@/props/FormInput.vue';
import FileUpload from '@/props/FileUpload.vue';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'ChildIDInformation',
  components: {
    FormInput,
    FileUpload
  },
  setup() {
    const store = useDemoStore();
    const { 
      minDate, 
      validateExpiryDate, 
      validateDOB, 
      dob, 
      dobError 
    } = useDateValidation();

    const firstIdType = ref('');
    const firstIdNumber = ref('');
    const firstExpiryDate = ref('');
    const firstIdDocument = ref(null);
    const secondIdType = ref('');
    const secondIdNumber = ref('');
    const secondExpiryDate = ref('');
    const secondIdDocument = ref(null);
    const secondIdOptions = ref(['ID Card', 'Passport', 'Birthpaper']);
    const schoolName = ref('');
    const expiryDate = ref('');
    const expiryDateError = ref('');

    const updateSecondIdOptions = () => {
      if (firstIdType.value === 'Birthpaper') {
        secondIdOptions.value = ['ID Card', 'Passport'];
      } else {
        secondIdOptions.value = ['ID Card', 'Passport', 'Birthpaper'];
      }
      if (!secondIdOptions.value.includes(secondIdType.value)) {
        secondIdType.value = '';
      }
    };

    const handleFileUpload = (event, idType) => {
      const file = event.target.files[0];
      if (idType === 'first') {
        firstIdDocument.value = file;
      } else {
        secondIdDocument.value = file;
      }
    };

    const handleSubmit = () => {
      const isDOBValid = validateDOB();
      const isExpiryDateValid = validateExpiryDate(expiryDate.value);

      if (!isExpiryDateValid) {
        expiryDateError.value = 'Expiry date must be today or in the future';
      } else {
        expiryDateError.value = '';
      }

      if (isDOBValid && isExpiryDateValid) {
        console.log('Form submitted successfully');
      } else {
        console.log('Validation failed');
      }
    };

    const navigateToNext = async () => {
      const childIdInfo = {
        firstIdType: firstIdType.value,
        firstIdNumber: firstIdNumber.value,
        firstExpiryDate: firstExpiryDate.value,
        firstIdDocument: firstIdDocument.value,
        secondIdType: secondIdType.value,
        secondIdNumber: secondIdNumber.value,
        secondExpiryDate: secondExpiryDate.value,
        secondIdDocument: secondIdDocument.value,
        schoolName: schoolName.value,
      };

      try {
        const response = await axios.post('http://localhost:3000/child-id-information', childIdInfo);
        console.log('Child ID Info submitted:', response.data);

        store.setChildIdInfo(childIdInfo);

        router.push('/parent-guardian-information');
      } catch (error) {
        console.error('Error submitting child ID info:', error);
        alert('An error occurred while saving child ID information.');
      }
    };

    const navigateToBasicInformation = () => {
      router.push('/politically-exposed-persons-2');
    };

    return {
      minDate,
      validateExpiryDate,
      validateDOB,
      dob,
      dobError,
      expiryDate,
      expiryDateError,
      handleSubmit,
      firstIdType,
      firstIdNumber,
      firstExpiryDate,
      firstIdDocument,
      secondIdType,
      secondIdNumber,
      secondExpiryDate,
      secondIdDocument,
      secondIdOptions,
      schoolName,
      updateSecondIdOptions,
      handleFileUpload,
      navigateToNext,
      navigateToBasicInformation,
    };
  }
};
</script>

<style scoped>
.container {
    position: relative;
    margin-top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: fit-content; /* Add this line */
    min-height: calc(100vh - 40px);
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    backdrop-filter: blur(5px);
    animation: fadeIn 1s ease-in-out forwards;
    overflow-y: auto; /* Move overflow to container */
}

.form-container {
    background-image: url('@/assets/back.jpg');
    background-size: cover;
    background-position: center;
    padding: 30px;
    padding-top: 50px; /* add padding top */
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 420px;
    max-width: 420px;
    height: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}


.form-container::-webkit-scrollbar {
  display: none;
}

h1{
  color: #FFBC2D ;
  font-size: 25px;
  font-style: regular;
  font-family: roboto;
  margin-bottom: 20px;
  margin-top: 50px;
}

.input-group, .input-container {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 6px;
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: #f9f9f9;
  transition: 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #800080;
  border-radius: 8px;
  font-size: 16px;
  background-color: #ffffff;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #4b0082;
  outline: none;
  box-shadow: 0 0 5px rgba(128, 0, 128, 0.2);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.back-button, .next-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button {
  background-color: #FFBC2D ;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

.logo {
  width: 157.5px; 
  height: auto;
  margin-bottom: 20px;
}



.agree-button, .disagree-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  gap: 5px;
}

.checkbox-container input[type="checkbox"] {
  width: 14px;
  height: 14px;
}

.agree-button {
  background-color: #007bff;
  color: white;
}

.agree-button:hover {
  background-color: #0056b3;
}

.disagree-button {
  background-color: #6c757d;
  color: white;
}

.disagree-button:hover {
  background-color: #5a6268;
}

.common-icon {
  /* Add your CSS adjustments here */
  width: 24px;
  height: 24px;
  color: #333;
}
.icon fas fa-user {
  width: 24px;
  height: 24px;
  color: #333;
  transform: translateY(-10px);
  display: inline-block;
  vertical-align: middle;
}

.id-box {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  min-width:fit-content;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.id-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.browse-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #800080;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.browse-button:hover {
  background-color: #4b0082;
}
</style>