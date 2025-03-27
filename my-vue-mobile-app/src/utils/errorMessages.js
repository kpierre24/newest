export const errorMessages = {
  // Validation Errors
  validation: {
    required: (field) => `${field} is required. Please fill in this field to continue.`,
    email: 'Please enter a valid email address (e.g., john.doe@example.com).',
    phone: 'Please enter a valid phone number (e.g., +1-234-567-8900).',
    password: 'Password must be at least 8 characters long and contain at least one number and one letter.',
    passwordMatch: 'Passwords do not match. Please make sure both passwords are identical.',
    accountNumber: 'Account number must be between 8 and 30 characters and contain only letters and numbers.',
    swiftCode: 'Please enter a valid SWIFT code (e.g., CHASUS33).',
    dateOfBirth: 'Please enter a valid date of birth. You must be at least 18 years old.',
    fileSize: (maxSize) => `File size exceeds the maximum limit of ${maxSize / 1024 / 1024}MB.`,
    fileType: 'Unsupported file type. Please upload a PDF, JPG, or PNG file.',
    signupId: 'Invalid session. Please start the signup process again.',
    relationship: 'Please select your relationship to the child.',
    occupation: 'Please enter your occupation.',
    workplace: 'Please enter your workplace.',
    address: 'Please enter a valid address.',
    city: 'Please enter a valid city name.',
    country: 'Please select a country.',
  },

  // Network Errors
  network: {
    connection: 'Unable to connect to the server. Please check your internet connection and try again.',
    timeout: 'Request timed out. Please try again.',
    serverError: 'The server is currently unavailable. Please try again later.',
  },

  // Authentication Errors
  auth: {
    invalidCredentials: 'Invalid email or password. Please check your credentials and try again.',
    sessionExpired: 'Your session has expired. Please sign in again.',
    unauthorized: 'You are not authorized to perform this action.',
    verificationFailed: 'Verification failed. Please try again or contact support.',
  },

  // File Upload Errors
  file: {
    uploadFailed: 'Failed to upload file. Please try again.',
    multipleFiles: 'Please upload all required documents.',
    invalidFormat: 'Invalid file format. Please upload a supported file type.',
    sizeLimit: (maxSize) => `File size exceeds the maximum limit of ${maxSize / 1024 / 1024}MB.`,
  },

  // Form Submission Errors
  submission: {
    general: 'An error occurred while submitting your information. Please try again.',
    incomplete: 'Please fill in all required fields before submitting.',
    validation: 'Please correct the errors in the form before submitting.',
    server: 'The server encountered an error. Please try again later.',
  },

  // PEP (Politically Exposed Person) Errors
  pep: {
    statusRequired: 'Please indicate if you are a politically exposed person.',
    jobTitleRequired: 'Please enter your job title if you are a politically exposed person.',
    relationshipRequired: 'Please specify your relationship to the politically exposed person.',
  },

  // Guardian Information Errors
  guardian: {
    requiredFields: 'Please fill in all required guardian information fields.',
    relationship: 'Please select your relationship to the child.',
    document: 'Please upload the required relationship document.',
  },

  // Bank Information Errors
  bank: {
    nameRequired: 'Please enter your bank name.',
    addressRequired: 'Please enter your bank address.',
    accountRequired: 'Please enter your account number.',
    swiftRequired: 'Please enter your SWIFT code.',
    phoneRequired: 'Please enter your bank telephone number.',
  },

  // Membership Declaration Errors
  membership: {
    declarationRequired: 'Please complete the membership declaration.',
    creditUnionName: 'Please enter the name of your current credit union.',
    boardName: 'Please enter the name of the credit union board you serve on.',
  }
}; 