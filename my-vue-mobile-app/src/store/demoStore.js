import { defineStore } from 'pinia';

export const useDemoStore = defineStore({
  id: 'demo',
  state: () => ({
    signupId: null,
    isNewCustomer: false,
    isExistingCustomer: false,
    isEmailVerified: false,
    emailVerifiedOn: null,
    isMobileVerified: false,
    mobileVerifiedOn: null,
    verificationCode: '',

    // Basic Information
    basicInfo: {
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
    },

    // Address Information
    addressInfo: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      dwellingStatus: '',
      addressId: null,
    },

    // Mailing Address
    mailingAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
    },

    // Branch Information
    branchInfo: {
      branchName: '',
      branchCode: '',
      branchLocation: '',
      preferredcontactmethod: '',
    },

    // Employment Information
    employmentInfo: {
      employerName: '',
      employerAddressLine1: '',
      employerAddressLine2: '',
      employerCity: '',
      employerCountry: '',
      workNumber: '',
      employmentStatus: '',
      employmentType: '',
    },

    // Child Information
    childInfo: {
      childId: '',
      childName: '',
      childAge: '',
      schoolName: '',
      firstIdType: '',
      firstIdNumber: '',
      firstExpiryDate: '',
      firstIdDocument: null,
      secondIdType: '',
      secondIdNumber: '',
      secondExpiryDate: '',
      secondIdDocument: null,
    },

    // Bank Information
    bankInfo: {
      bankName: '',
      bankAddressLine1: '',
      bankCity: '',
      bankCountry: '',
      bankAccountNumber: '',
      swiftCode: '',
      bankTelephoneNumber: '',
    },

    // PEP Information
    pepInfo: {
      isPEP: null,
      pepPosition: [],
      pepRelationship: [],
      internationalOrgPEP: [],
      pepAssociate: '',
      pepAssociateDetails: '',
      pepAssociateName: '',
      relationshipToPep: '',
      pepName: '',
    },

    // Beneficiary Information
    beneficiaryInfo: [],

    // Guardian Information
    guardianInfo: {
      firstName: '',
      lastName: '',
      middleName: '',
      occupation: '',
      workplace: '',
      email: '',
      mobile: '',
      relationshipToChild: '',
      guardian_files: null,
    },

    // Membership Information
    membershipInfo: {
      isMemberOfAnotherCreditUnion: 'no',
      creditUnionName: '',
      isServingOnBoard: 'no',
      creditUnionBoardName: '',
    },

    // Power of Attorney Information
    poaInfo: {
      firstName: '',
      lastName: '',
      otherName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      dob: '',
      idDocument: null,
      document: null,
    },

    // Agreement Status
    agreed_to_tc_fa: false,

    // Auth state
    userId: null,
    accessToken: null,
    mobileNumber: null,
    isAuthenticated: false,
    mailingAddressInfo: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      dwellingStatus: '',
      sameAsResidential: false
    },
  }),

  actions: {
    setBasicInfo(info) {
      this.basicInfo = { ...this.basicInfo, ...info };
    },
    
    setAddressInfo(info) {
      this.addressInfo = { ...this.addressInfo, ...info };
    },

    setBranchInfo(info) {
      this.branchInfo = { ...this.branchInfo, ...info };
    },

    setChildInfo(info) {
      this.childInfo = { ...this.childInfo, ...info };
    },

    setMailingAddress(info) {
      this.mailingAddress = { ...this.mailingAddress, ...info };
    },

    setEmploymentInfo(info) {
      this.employmentInfo = { ...this.employmentInfo, ...info };
    },

    setPepInfo(info) {
      this.pepInfo = { ...this.pepInfo, ...info };
    },

    setBankInfo(info) {
      this.bankInfo = { ...this.bankInfo, ...info };
    },

    setBeneficiaryInfo(info) {
      this.beneficiaryInfo = { ...this.beneficiaryInfo, ...info };
    },

    setGuardianInfo(info) {
      this.guardianInfo = { ...this.guardianInfo, ...info };
    },

    setMembershipInfo(info) {
      this.membershipInfo = { ...this.membershipInfo, ...info };
    },

    setPowerOfAttorneyInfo(info) {
      this.poaInfo = { ...this.poaInfo, ...info };
    },

    setVerificationCode(code) {
      this.verificationCode = code;
    },

    setSignupId(id) {
      this.signupId = id;
      console.log('Signup ID set in store:', id);
    },

    setNewCustomer(value) {
      this.isNewCustomer = value;
    },

    setExistingCustomer(value) {
      this.isExistingCustomer = value;
    },

    setAgreementStatus(status) {
      this.agreed_to_tc_fa = status;
    },

    setAuthData(data) {
      this.userId = data.userId;
      this.accessToken = data.accessToken;
      this.mobileNumber = data.mobileNumber;
    },

    setFinalAuthToken(token) {
      this.accessToken = token;
      this.isAuthenticated = true;
    },

    clearAuth() {
      this.userId = null;
      this.accessToken = null;
      this.mobileNumber = null;
      this.isAuthenticated = false;
    },

    // Clear functions
    clearAll() {
      this.$reset();
    },

    clearBasicInfo() {
      this.basicInfo = this.$state.basicInfo;
    },

    clearAddressInfo() {
      this.addressInfo = this.$state.addressInfo;
    },

    clearSignupData() {
      this.signupId = null;
      this.isExistingCustomer = false;
      this.basicInfo = this.$state.basicInfo;
    },

    clearMembershipData() {
      this.membershipInfo = this.$state.membershipInfo;
    },

    clearPEPData() {
      this.pepInfo = this.$state.pepInfo;
    },

    clearGuardianInfo() {
      this.guardianInfo = this.$state.guardianInfo;
    },

    clearBeneficiaryInfo() {
      this.beneficiaryInfo = this.$state.beneficiaryInfo;
    },
  },
  persist: true,
});