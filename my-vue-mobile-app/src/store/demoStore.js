import { defineStore } from 'pinia';
import axios from 'axios';

export const useDemoStore = defineStore('demo', {
  state: () => ({
    // Existing state
    firstName: '',
    lastName: '',
    otherName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dateOfBirth: '',
    age: null,
    password: '',
    confirmPassword: '',
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
    employmentStatus: '',
    pepAssociate: '',
    relationshipToPep: '',
    pepName: '',
    firstIdType: '',
    firstIdNumber: '',
    firstExpiryDate: '',
    firstIdDocument: null,
    secondIdType: '',
    secondIdNumber: '',
    secondExpiryDate: '',
    secondIdDocument: null,
    bankName: '',
    bankAddressLine1: '',
    bankCity: '',
    bankCountry: '',
    bankAccountNumber: '',
    swiftCode: '',
    bankTelephoneNumber: '',
    beneficiaryFirstName: '',
    beneficiaryLastName: '',
    beneficiaryOtherName: '',
    beneficiaryAddressLine1: '',
    beneficiaryAddressLine2: '',
    beneficiaryCity: '',
    beneficiaryCountry: '',
    beneficiaryDateOfBirth: '',
    beneficiaryGender: '',
    parentFirstName: '',
    parentMiddleName: '',
    parentLastName: '',
    parentOccupation: '',
    parentWorkplace: '',
    parentEmail: '',
    parentPhoneNumber: '',
    relationshipToChild: '',
    relationshipDocument: null,
    verificationCode: null,
    membershipInfo: {
      isMemberOfAnotherCreditUnion: null,
      creditUnionName: null,
      isServingOnBoard: null,
      creditUnionBoardName: null,
      poaFirstName: '',
      poaLastName: '',
      poaOtherName: '',
      poaAddressLine1: '',
      poaAddressLine2: '',
      poaCity: '',
      poaCountry: '',
      poaDob: '',
      poaIdDocument: null,
      poaDocument: null,
    },

    // New authentication state
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    // Existing getters (if any)
    getBasicInfo() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        otherName: this.otherName,
        email: this.email,
        mobileNumber: this.mobileNumber,
        gender: this.gender,
        dateOfBirth: this.dateOfBirth,
      };
    },

    // New authentication getters
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    // Existing actions
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
      this.employmentType = info.employmentType;
      this.proofOfEmploymentFile = info.proofOfEmploymentFile;
    },
    setPepInfo(info) {
      this.pepAssociate = info.pepAssociate;
      this.relationshipToPep = info.relationshipToPep;
      this.pepName = info.pepName;
    },
    setChildIdInfo(info) {
      this.firstIdType = info.firstIdType;
      this.firstIdNumber = info.firstIdNumber;
      this.firstExpiryDate = info.firstExpiryDate;
      this.firstIdDocument = info.firstIdDocument;
      this.secondIdType = info.secondIdType;
      this.secondIdNumber = info.secondIdNumber;
      this.secondExpiryDate = info.secondExpiryDate;
      this.secondIdDocument = info.secondIdDocument;
    },
    setBankInfo(info) {
      this.bankName = info.bankName;
      this.bankAddressLine1 = info.bankAddressLine1;
      this.bankCity = info.bankCity;
      this.bankCountry = info.bankCountry;
      this.bankAccountNumber = info.bankAccountNumber;
      this.swiftCode = info.swiftCode;
      this.bankTelephoneNumber = info.bankTelephoneNumber;
    },
    setBeneficiaryInfo(info) {
      this.beneficiaryFirstName = info.firstName;
      this.beneficiaryLastName = info.lastName;
      this.beneficiaryOtherName = info.otherName;
      this.beneficiaryAddressLine1 = info.addressLine1;
      this.beneficiaryAddressLine2 = info.addressLine2;
      this.beneficiaryCity = info.city;
      this.beneficiaryCountry = info.country;
      this.beneficiaryDateOfBirth = info.dob;
      this.beneficiaryGender = info.gender;
    },
    setParentGuardianInfo(info) {
      this.parentFirstName = info.parentFirstName;
      this.parentMiddleName = info.parentMiddleName;
      this.parentLastName = info.parentLastName;
      this.parentOccupation = info.parentOccupation;
      this.parentWorkplace = info.parentWorkplace;
      this.parentEmail = info.parentEmail;
      this.parentPhoneNumber = info.parentPhoneNumber;
      this.relationshipToChild = info.relationshipToChild;
      this.relationshipDocument = info.relationshipDocument;
    },
    setVerificationCode(code) {
      this.verificationCode = code;
    },
    setMembershipInfo(info) {
      this.isMemberOfAnotherCreditUnion = info.isMemberOfAnotherCreditUnion;
      this.creditUnionName = info.creditUnionName;
      this.isServingOnBoard = info.isServingOnBoard;
      this.creditUnionBoardName = info.creditUnionBoardName;
    },
    setPowerOfAttorneyInfo(info) {
      this.poaFirstName = info.poaFirstName;
      this.poaLastName = info.poaLastName;
      this.poaOtherName = info.poaOtherName;
      this.poaAddressLine1 = info.poaAddressLine1;
      this.poaAddressLine2 = info.poaAddressLine2;
      this.poaCity = info.poaCity;
      this.poaCountry = info.poaCountry;
      this.poaDob = info.poaDob;
      this.poaIdType = info.poaIdType;
      this.poaIdDocument = info.poaIdDocument;
      this.poaDocument = info.poaDocument;
    },
    setPassword(password) {
      this.password = password;
    },
    setConfirmPassword(confirmPassword) {
      this.confirmPassword = confirmPassword;
    },
    clearPassword() {
      this.password = '';
      this.confirmPassword = '';
    },
    

    // New authentication actions
    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token); // Save token to localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`; // Set Axios auth header
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    async register(userData) {
      try {
        const response = await axios.post('/api/register', userData);
        this.token = response.data.token;
        this.user = response.data.user;
        localStorage.setItem('token', this.token); // Save token to localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`; // Set Axios auth header
      } catch (error) {
        console.error('Registration failed:', error);
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token'); // Remove token from localStorage
      delete axios.defaults.headers.common['Authorization']; // Remove Axios auth header
    },
    async checkAuth() {
      if (this.token) {
        try {
          const response = await axios.get('/api/me'); // Endpoint to verify token
          this.user = response.data.user;
        } catch (error) {
          this.logout(); // Logout if token is invalid
        }
      }
    },
  },
});