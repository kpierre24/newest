import { defineStore } from 'pinia';

export const useDemoStore = defineStore('demo', {
  state: () => ({
    firstName: '',
    lastName: '',
    otherName: '',
    email: '',
    mobileNumber: '',
    gender: ''
  }),
  actions: {
    setBasicInfo(info) {
      this.firstName = info.firstName;
      this.lastName = info.lastName;
      this.otherName = info.otherName;
      this.email = info.email;
      this.mobileNumber = info.mobileNumber;
      this.gender = info.gender;
    }
  }
});