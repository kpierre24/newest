import { defineStore } from 'pinia';

export const useDemoStore = defineStore('demo', {
  state: () => ({
    firstName: '',
    lastName: '',
    otherName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    dob: '',
    age: null,
    password: '',
    confirmPassword: '',
    termsViewed: false,
    financialAgreementViewed: false,
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
      firstName: '',
      lastName: '',
      otherName: '',
      email: '',
      mobileNumber: '',
      gender: '',
      dob: '',
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
  }),
  actions: {
    setBasicInfo(data) {
      this.basicInfo.firstName = data.firstName;
      this.basicInfo.lastName = data.lastName;
      this.basicInfo.otherName = data.otherName;
      this.basicInfo.email = data.email;
      this.basicInfo.mobileNumber = data.mobileNumber;
      this.basicInfo.gender = data.gender;
      this.basicInfo.dob = data.dob;
      this.basicInfo.password = data.password;
      this.basicInfo.confirmPassword = data.confirmPassword;
      this.basicInfo.termsViewed = data.termsViewed;
      this.basicInfo.financialAgreementViewed = data.financialAgreementViewed;
      this.age = data.age;
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
    setPepInfo(data) {
      this.pepInfo.pepAssociate = data.pepAssociate;
      this.pepInfo.relationshipToPep = data.relationshipToPep;
      this.pepInfo.pepName = data.pepName;
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
      this.swiftCode = info.swiftCode;
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
  },

  persist: true,
});