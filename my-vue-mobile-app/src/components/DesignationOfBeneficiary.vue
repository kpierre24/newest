<template>
  <div class="container">
    <section class="form-section">
      <div class="content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        <div class="brand-text">
          <h1>Designation of Beneficiary</h1>
          <p>Enter your beneficiary's details</p>
        </div>
        <form @submit.prevent="submitForm">
          <div v-if="formError" class="error-message">{{ formError }}</div>
          
            <FormInput
              label="First Name"
              type="text"
              id="beneficiaryFirstName"
              v-model="formData.beneficiaryFirstName"
              placeholder="Beneficiary First Name"
              :required="true"
              iconClass="icon fas fa-user"
            />
            <FormInput
              label="Last Name"
              type="text"
              id="beneficiaryLastName"
              v-model="formData.beneficiaryLastName"
              placeholder="Beneficiary Last Name"
              :required="true"
              iconClass="icon fas fa-user"
            />
            <FormInput
              label="Relationship"
              type="select"
              id="relationship"
              v-model="formData.relationship"
              :required="true"
              :selectOptions="['Parent', 'Spouse', 'Child', 'Sibling', 'Other']"
              iconClass="icon fas fa-users"
            />
            <FormInput
              label="Percentage"
              type="number"
              id="percentage"
              v-model="formData.percentage"
              placeholder="Percentage (0-100)"
              :required="true"
              :min="0"
              :max="100"
              iconClass="icon fas fa-percent"
            />
          
          
            <FormInput
              label="Email"
              type="email"
              id="beneficiaryEmail"
              v-model="formData.beneficiaryEmail"
              placeholder="Beneficiary Email"
              :required="true"
              iconClass="icon fas fa-envelope"
            />
            <FormInput
              label="Phone Number"
              type="tel"
              id="beneficiaryPhone"
              v-model="formData.beneficiaryPhone"
              placeholder="Beneficiary Phone Number"
              :required="true"
              iconClass="icon fas fa-phone"
            />
          
          <div class="button-group">
            <button type="button" class="back-button" @click="navigateToPrevious">Back</button>
            <button type="submit" class="submit-button" :disabled="isLoading">
              <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin"></i> Processing...
              </span>
              <span v-else>Next</span>
            </button>
          </div>
        </form>
      </div>
    </section>
    <section class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import FormInput from '@/props/FormInput.vue';
import { useDemoStore } from '@/store/demoStore';

export default {
  name: 'DesignationOfBeneficiary',
  components: {
    FormInput
  },
  setup() {
    const router = useRouter();
    const store = useDemoStore();
    const isLoading = ref(false);
    const formError = ref('');

    const formData = ref({
      beneficiaryFirstName: '',
      beneficiaryLastName: '',
      relationship: '',
      percentage: '',
      beneficiaryEmail: '',
      beneficiaryPhone: ''
    });

    const submitForm = async () => {
      isLoading.value = true;
      formError.value = '';

      try {
        // Validate required fields
        if (!formData.value.beneficiaryFirstName || !formData.value.beneficiaryLastName || 
            !formData.value.relationship || !formData.value.percentage ||
            !formData.value.beneficiaryEmail || !formData.value.beneficiaryPhone) {
          formError.value = 'Please fill in all required fields';
          isLoading.value = false;
          return;
        }

        // Validate percentage is between 0 and 100
        const percentage = parseFloat(formData.value.percentage);
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
          formError.value = 'Percentage must be between 0 and 100';
          isLoading.value = false;
          return;
        }

        // Get the base URL dynamically
        const baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
          ? 'http://localhost:3000' 
          : `http://${window.location.hostname}:3000`;

        try {
          const response = await axios.post(`${baseURL}/beneficiary`, formData.value, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('Beneficiary info submitted:', response.data);
        } catch (apiError) {
          console.error('API error:', apiError);
          // Continue with navigation even if API fails
        }

        // Update store with form data
        store.$patch((state) => {
          Object.assign(state, formData.value);
        });

        router.push('/review'); // Assuming there's a review page after this
      } catch (error) {
        console.error('Error submitting beneficiary information:', error);
        formError.value = 'An error occurred while submitting your information';
      } finally {
        isLoading.value = false;
      }
    };

    const navigateToPrevious = () => {
      router.push('/power-of-attorney');
    };

    return {
      formData,
      submitForm,
      navigateToPrevious,
      isLoading,
      formError
    };
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-section {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  margin-bottom: 1.5rem;
}

.brand-text {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: 24px;
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.brand-text p {
  color: #666;
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    overflow: hidden;
  }

  .form-section {
    width: 50%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .form-section::-webkit-scrollbar {
    display: none;
  }

  .content {
    max-width: 450px;
    padding: 2rem;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
  }

  .brand-section {
    display: block;
    position: relative;
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
    overflow: hidden;
  }

  .brand-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/background.png') center/cover no-repeat;
    opacity: 0.1;
    mix-blend-mode: overlay;
  }

  .brand-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    filter: brightness(1.2);
    z-index: 2;
  }
}

/* Form field styles */
.form-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

:deep(.form-input-container) {
  margin-bottom: 1.25rem;
}

:deep(label) {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

:deep(input),
:deep(select) {
  width: 100%;
  height: 3rem;
  padding: 0.75rem 1rem;
  font-size: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  transition: all 0.2s ease;
}

:deep(input:focus),
:deep(select:focus) {
  border-color: #6362F8;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 98, 248, 0.1);
}

:deep(input[type="number"]) {
  -moz-appearance: textfield;
  appearance: textfield;
}

:deep(input[type="number"]::-webkit-outer-spin-button),
:deep(input[type="number"]::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

/* Button group styling */
.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.back-button,
.next-button,
.submit-button {
  flex: 1;
  height: 3rem;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button {
  background-color: #6362F8;
  color: white;
  border: none;
}

.next-button,
.submit-button {
  background-color: #FFBC2D;
  color: white;
  border: none;
}

.back-button:hover,
.next-button:hover,
.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>