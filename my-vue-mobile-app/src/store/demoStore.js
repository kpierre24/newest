import { defineStore } from 'pinia';

export const useDemoStore = defineStore('demo', {
  state: () => ({
    firstName: '',
    lastName: '',
    otherName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    age: null,
    AddressLine1: '',
    AddressLine2: '',
    City: '',
    Country: '',
    Nationality: '',
    DwellingStatus: '',
    branchName: '',
    branchCode: '',
    branchLocation: '',
    preferredcontactmethod: '',
    childId: '',
    childName: '',
    childAge: '',
    isExistingCustomer: false,
    mailingAddressLine1: '',
    mailingAddressLine2: '',
    mailingCity: '',
    mailingCountry: '',
    employerName: '',
    employerAddressLine1: '',
    employerAddressLine2: '',
    employerCity: '',
    employerCountry: '',
    workNumber: '',
    employmentStatus: ''
  }),
  actions: {
    setBasicInfo(info) {
      this.firstName = info.firstName;
      this.lastName = info.lastName;
      this.otherName = info.otherName;
      this.email = info.email;
      this.mobileNumber = info.mobileNumber;
      this.gender = info.gender;
      this.dateOfBirth = info.dateOfBirth;
    },
    setAge(age) {
      this.age = age;
    },
    setAddressInfo(info) {
      this.AddressLine1 = info.AddressLine1;
      this.AddressLine2 = info.AddressLine2;
      this.City = info.City;
      this.Country = info.Country;
      this.Nationality = info.Nationality;
      this.DwellingStatus = info.DwellingStatus;
    },
    setBranchInfo(info) {
      this.branchName = info.branchName;
      this.branchCode = info.branchCode;
      this.branchLocation = info.branchLocation;
      this.preferredcontactmethod = info.preferredcontactmethod;
    },
    setChildInfo(info) {
      this.childId = info.childId;
      this.childName = info.childName;
      this.childAge = info.childAge;
    },
    setMailingAddressInfo(info) {
      this.mailingAddressLine1 = info.AddressLine1;
      this.mailingAddressLine2 = info.AddressLine2;
      this.mailingCity = info.City;
      this.mailingCountry = info.Country;
    },
    setEmploymentInfo(info) {
      this.employerName = info.employerName;
      this.employerAddressLine1 = info.employerAddressLine1;
      this.employerAddressLine2 = info.employerAddressLine2;
      this.employerCity = info.employerCity;
      this.employerCountry = info.employerCountry;
      this.workNumber = info.workNumber;
      this.employmentStatus = info.employmentStatus;
    }
  }
});