import { defineStore } from 'pinia';

export const useDemoStore = defineStore({
  id: 'demo',
  state: () => ({
    signupId: null,
    firstName: '',
    lastName: '',
    otherName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dob: '',
    nationality: '',
    password: '',
    confirmPassword: '',
    termsViewed: false,
    financialAgreementViewed: false,
    AddressLine1: '',
    AddressLine2: '',
    City: '',
    Country: '',
    DwellingStatus: '',
    branchName: '',
    branchCode: '',
    branchLocation: '',
    preferredcontactmethod: '',
    childId: '',
    childName: '',
    childAge: '',
    isNewCustomer: false,
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
    jobTitle: '',
    selectedOptions: [],
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
    verificationCode: '',
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
    poaDocument: null
    },
    isExistingCustomer: false,
    basicInfo: {
      dob: '',
      firstName: '',
      lastName: '',
      otherName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      nationality: '',
      password: '',
      confirmPassword: '',
      termsViewed: false,
      financialAgreementViewed: false,
    },
    pepInfo: {
      pepAssociate: '',
      relationshipToPep: '',
      pepName: '',
    },
    pepAssociateDetails: '',
    pepAssociateName: '',
    maritalStatus: '',
    isPEP: null,
    pepPosition: '',
    pepRelationship: '',
    pepCountry: '',
    childIdInfo: {
      firstIdType: '',
      firstIdNumber: '',
      firstExpiryDate: '',
      secondIdType: '',
      secondIdNumber: '',
      secondExpiryDate: '',
      schoolName: ''
    },
    bankInfo: {
      bankName: '',
      bankAddressLine1: '',
      bankCity: '',
      bankCountry: '',
      bankAccountNumber: '',
      swiftCode: '',
      bankTelephoneNumber: ''
    },
    employmentInfo: {
      employerName: '',
      employerAddressLine1: '',
      employerCity: '',
      employerCountry: '',
      workNumber: '',
      employmentStatus: '',
      employmentType: ''
    },
    beneficiaryInfo: {
      beneficiaryFirstName: '',
      beneficiaryLastName: '',
      beneficiaryEmail: '',
      beneficiaryPhone: '',
      idType: '',
      idNumber: '',
      idExpiry: '',
      relationship: '',
      percentage: ''
    },
    isMemberOfAnotherCreditUnion: 'no',
    creditUnionName: '',
    isServingOnBoard: 'no',
    creditUnionBoardName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    dwellingStatus: '',
    addressId: null,
    isEmailVerified: false,
    emailVerifiedOn: null,
    isMobileVerified: false,
    mobileVerifiedOn: null,
  }),
  actions: {
    setBasicInfo(info) {
      this.basicInfo = { ...this.basicInfo, ...info };
    },
    
    setAddressInfo(info) {
      this.AddressLine1 = info.AddressLine1;
      this.AddressLine2 = info.AddressLine2;
      this.City = info.City;
      this.Country = info.Country;
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
    setPepInfo(data) {
      this.pepInfo.pepAssociate = data.pepAssociate;
      this.pepInfo.relationshipToPep = data.relationshipToPep;
      this.pepInfo.pepName = data.pepName;
    },
    setPepInfo2(data) {
      this.pepAssociate = data.pepAssociate;
      this.pepAssociateDetails = data.pepAssociateDetails;
      this.pepName = data.pepName;
    },
    setSelectedOptions(options) {
      this.selectedOptions = options;
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
      this.bankTelephoneNumber = info.bankTelephoneNumber;
    },
    setBankAccountNumber(accountNumber) {
      this.bankAccountNumber = accountNumber;
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
    setNewCustomer(value) {
      this.isNewCustomer = value;
    },
    setExistingCustomer(isExisting) {
      this.isExistingCustomer = isExisting;
    },
    setIdInfo(info) {
      this.firstIdType = info.firstIdType;
      this.firstIdNumber = info.firstIdNumber;
      this.firstExpiryDate = info.firstExpiryDate;
      this.firstIdDocument = info.firstIdDocument;
      this.secondIdType = info.secondIdType;
      this.secondIdNumber = info.secondIdNumber;
      this.secondExpiryDate = info.secondExpiryDate;
      this.secondIdDocument = info.secondIdDocument;
      this.maritalStatus = info.maritalStatus;
    },
    clearBasicInfo() {
      this.firstName = '';
      this.lastName = '';
      this.otherName = '';
      this.email = '';
      this.mobileNumber = '';
      this.gender = '';
      this.dob = '';
      this.nationality = '';
      this.password = '';
      this.confirmPassword = '';
      this.isExistingCustomer = false;
    },
    clearAddressInfo() {
      this.AddressLine1 = '';
      this.AddressLine2 = '';
      this.City = '';
      this.Country = '';
      this.DwellingStatus = '';
    },
    setSignupId(id) {
      this.signupId = id;
      console.log('Signup ID set in store:', id);
    },
    clearSignupData() {
      this.signupId = null;
      this.isExistingCustomer = false;
      // Clear other signup-related data
      this.firstName = '';
      this.lastName = '';
      this.otherName = '';
      this.email = '';
      this.mobileNumber = '';
      this.password = '';
      this.confirmPassword = '';
      this.gender = '';
      this.dob = '';
      this.nationality = '';
    },
    clearMembershipData() {
      this.isMemberOfAnotherCreditUnion = 'no';
      this.creditUnionName = '';
      this.isServingOnBoard = 'no';
      this.creditUnionBoardName = '';
    },
    clearAddressData() {
      this.addressLine1 = '';
      this.addressLine2 = '';
      this.city = '';
      this.country = '';
      this.dwellingStatus = '';
      this.addressId = null;
    },
    clearForeignNationalBankData() {
      this.bankName = '';
      this.bankAddressLine1 = '';
      this.bankAddressLine2 = '';
      this.bankCity = '';
      this.bankCountry = '';
      this.bankAccountNumber = '';
      this.bankTelephoneNumber = '';
    },
    setEmailVerified(status) {
      this.isEmailVerified = status;
    },
    clearEmailVerification() {
      this.isEmailVerified = false;
      this.emailVerifiedOn = null;
    },
    clearMobileVerification() {
      this.isMobileVerified = false;
      this.mobileVerifiedOn = null;
    },
  },
  persist: true,
});