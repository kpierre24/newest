<template>
  <div class="container">
    <div class="form-container">
      <h1>Power of Attorney Information</h1>
      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <input type="text" v-model="firstName" placeholder="First Name" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="lastName" placeholder="Last Name" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="otherName" placeholder="Other Name" />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine1" placeholder="Address Line 1" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="addressLine2" placeholder="Address Line 2" />
        </div>
        <div class="input-container">
          <input type="text" v-model="city" placeholder="City" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="country" placeholder="Country" required />
        </div>
        <div class="input-container">
          <label for="dob">Date of Birth</label>
          <input type="date" v-model="dob" id="dob" required />
        </div>
        <div class="input-container">
          <select v-model="gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="input-container">
          <input type="text" v-model="relationshipToPrincipal" placeholder="Relationship to Principal" required />
        </div>
        <div class="input-container">
          <input type="email" v-model="email" placeholder="Email Address" required />
        </div>
        <div class="input-container">
          <input type="text" v-model="contactNumber" placeholder="Contact Number" required />
        </div>
        <div class="input-container">
          <select v-model="typeOfId" required>
            <option value="" disabled>Select Type of ID</option>
            <option value="passport">Passport</option>
            <option value="nationalId">National ID</option>
            <option value="driverLicense">Driver's License</option>
          </select>
        </div>
        <div class="input-container">
          <label for="idDocument">ID Document</label>
          <input type="file" id="idDocument" @change="handleFileUpload('idDocument')" required />
        </div>
        <div class="input-container">
          <label for="poaDocument">Power of Attorney Document</label>
          <input type="file" id="poaDocument" @change="handleFileUpload('poaDocument')" required />
        </div>
        <div class="button-group">
          <button type="button" class="back-button" @click="goBack">Back</button>
          <button type="submit" class="next-button">Next</button>
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

    const firstName = ref('');
    const lastName = ref('');
    const otherName = ref('');
    const addressLine1 = ref('');
    const addressLine2 = ref('');
    const city = ref('');
    const country = ref('');
    const dob = ref('');
    const gender = ref('');
    const relationshipToPrincipal = ref('');
    const email = ref('');
    const contactNumber = ref('');
    const typeOfId = ref('');
    const idDocument = ref(null);
    const poaDocument = ref(null);
    const errors = ref({});

    onMounted(() => {
      firstName.value = store.poaFirstName;
      lastName.value = store.poaLastName;
      otherName.value = store.poaOtherName;
      addressLine1.value = store.poaAddressLine1;
      addressLine2.value = store.poaAddressLine2;
      city.value = store.poaCity;
      country.value = store.poaCountry;
      dob.value = store.poaDateOfBirth;
      gender.value = store.poaGender;
      relationshipToPrincipal.value = store.poaRelationshipToPrincipal;
      email.value = store.poaEmail;
      contactNumber.value = store.poaContactNumber;
      typeOfId.value = store.poaTypeOfId;
      idDocument.value = store.poaIdDocument;
      poaDocument.value = store.poaDocument;
    });

    const handleFileUpload = (type) => (event) => {
      const file = event.target.files[0];
      if (type === 'idDocument') {
        idDocument.value = file;
      } else if (type === 'poaDocument') {
        poaDocument.value = file;
      }
    };

    const handleSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append('firstName', firstName.value);
        formData.append('lastName', lastName.value);
        formData.append('otherName', otherName.value);
        formData.append('addressLine1', addressLine1.value);
        formData.append('addressLine2', addressLine2.value);
        formData.append('city', city.value);
        formData.append('country', country.value);
        formData.append('dob', dob.value);
        formData.append('gender', gender.value);
        formData.append('relationshipToPrincipal', relationshipToPrincipal.value);
        formData.append('email', email.value);
        formData.append('contactNumber', contactNumber.value);
        formData.append('typeOfId', typeOfId.value);
        formData.append('idDocument', idDocument.value);
        formData.append('poaDocument', poaDocument.value);

        // Save power of attorney info to the store
        store.setPoaInfo({
          firstName: firstName.value,
          lastName: lastName.value,
          otherName: otherName.value,
          addressLine1: addressLine1.value,
          addressLine2: addressLine2.value,
          city: city.value,
          country: country.value,
          dob: dob.value,
          gender: gender.value,
          relationshipToPrincipal: relationshipToPrincipal.value,
          email: email.value,
          contactNumber: contactNumber.value,
          typeOfId: typeOfId.value,
          idDocument: idDocument.value,
          poaDocument: poaDocument.value
        });

        // Debugging logs to check form data
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }

        const response = await axios.post('http://localhost:4000/power-of-attorney', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Power of Attorney information submitted:', response.data);

        // Navigate to the next page
        router.push('/branch'); // Replace with the actual next page route
      } catch (error) {
        console.error('Error submitting Power of Attorney information:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      firstName,
      lastName,
      otherName,
      addressLine1,
      addressLine2,
      city,
      country,
      dob,
      gender,
      relationshipToPrincipal,
      email,
      contactNumber,
      typeOfId,
      idDocument,
      poaDocument,
      errors,
      handleFileUpload,
      handleSubmit,
      goBack
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

.text-content {
  margin-bottom: 20px;
}

.input-container {
  margin-bottom: 20px;
}

input[type="text"],
input[type="date"],
input[type="number"],
input[type="email"],
input[type="tel"],
input[type="file"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button,
.next-button {
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

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}

.back-button:hover {
  background-color: #5a6268;
}

.additional-actions {
  margin-top: 20px;
  text-align: center;
}

.add-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  background-color: #28a745;
  color: white;
  margin-bottom: 10px;
}

.add-button:hover {
  background-color: #218838;
}
</style>