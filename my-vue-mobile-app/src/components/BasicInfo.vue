<template>
  <div class="container">
    <div class="form-container">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Basic Information</h1>
      <form @submit.prevent="submitSignup">
        <div class="input-group">
          <div class="input-container">
            <input type="text" v-model="firstName" id="firstName" placeholder="First Name" maxlength="50" required />
            <i class="icon fas fa-user"></i>
          </div>
          <div class="input-container">
            <input type="text" v-model="lastName" id="lastName" placeholder="Last Name" maxlength="50" required />
            <i class="icon fas fa-user"></i>
          </div>
          <div class="input-container">
            <input type="text" v-model="otherName" id="otherName" placeholder="Other Name" maxlength="50" />
            <i class="icon fas fa-user"></i>
          </div>
          <div class="input-container">
            <input type="email" v-model="email" id="email" placeholder="Email Address" maxlength="50" required />
            <i class="icon fas fa-envelope"></i>
          </div>
          <div class="input-container">
            <input type="tel" v-model="mobileNumber" id="mobileNumber" placeholder="Mobile Number" maxlength="11" required />
            <i class="icon fas fa-phone"></i>
          </div>
          <div class="input-container">
            <select v-model="gender" id="gender" class="gender-select" required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <i class="icon fas fa-venus-mars"></i>
          </div>
          <div class="input-container">
            <label for="dob">Date of Birth</label>
            <input type="date" v-model="dob" id="dob" required class="date-picker" placeholder="Date of Birth" />
            <i class="icon fas fa-calendar-alt"></i>
          </div>
          <div class="input-container">
            <input type="password" v-model="password" id="password" placeholder="Password" maxlength="50" required />
            <i class="icon fas fa-lock"></i>
          </div>
          <small v-if="passwordError" class="error">{{ passwordError }}</small>
          <div class="password-requirements">
            Password must be at least 10 characters, include 1 capital letter, 1 number, and 1 special character.
          </div>
          <div class="input-container">
            <input type="password" v-model="confirmPassword" id="confirmPassword" placeholder="Confirm Password" maxlength="50" required />
            <i class="icon fas fa-lock"></i>
          </div>
          <small v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</small>
        </div>
        <div class="button-group">
          <button class="back-button" @click="navigateToPrevious">Back</button>
          <button class="next-button" @click="navigateToNext">Next</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  data() {
    return {
      firstName: '',
      lastName: '',
      otherName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      dob: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: ''
    };
  },
  methods: {
    validatePassword() {
      const password = this.password;
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
      if (!regex.test(password)) {
        this.passwordError = 'Password must be at least 10 characters long, include 1 capital letter, 1 number, and 1 special character.';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    validateConfirmPassword() {
      if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = 'Passwords do not match.';
        return false;
      }
      this.confirmPasswordError = '';
      return true;
    },
    navigateToPrevious() {
      this.$router.go(-1);
    },
    navigateToNext() {
      const today = new Date();
      const birthDate = new Date(this.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age <= 17) {
        this.$router.push('/child-id-information');
      } else {
        this.$router.push('/id-information');
      }
    },
    submitSignup() {
      if (this.validatePassword() && this.validateConfirmPassword()) {
        // Navigate to the address page after successful validation
        this.$router.push('/address');
      }
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: white;
  padding: 20px;
  text-align: center;
}

.form-container {
  background-color: rgb(255, 255, 255);
  background: linear-gradient(to right, #bdbcbe, #7da4e7);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.input-group {
  width: 100%;
  margin-bottom: 15px;
}

.input-container {
  position: relative;
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 10px 40px; /* Adjust padding to make space for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

input::placeholder, select::placeholder {
  color: #aaa;
  padding: 20px;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.gender-select {
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  padding-left: 45px; /* Adjust padding to move text to the right */
}

.icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.date-picker {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  background-image: none; /* Remove default calendar icon */
}

.password-requirements {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}

.error {
  color: red;
  font-size: 12px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .submit-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.submit-button {
  background-color: #007bff;
  color: white;
}

.submit-button:hover {
  background-color: #0056b3;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>