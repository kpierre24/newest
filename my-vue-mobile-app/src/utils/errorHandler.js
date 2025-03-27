export class AppError extends Error {
  constructor(message, type = errorTypes.GENERIC_ERROR, statusCode = 500) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

export const errorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  FILE_ERROR: 'FILE_ERROR',
  GENERIC_ERROR: 'GENERIC_ERROR'
};

export const handleError = (error) => {
  // If it's already an AppError, return it
  if (error instanceof AppError) {
    return error;
  }

  // Handle Axios errors
  if (error.response) {
    const statusCode = error.response.status;
    const message = error.response.data?.detail || 'An error occurred while processing your request';
    
    switch (statusCode) {
      case 400:
        return new AppError(message, errorTypes.VALIDATION_ERROR, statusCode);
      case 401:
      case 403:
        return new AppError(message, errorTypes.AUTH_ERROR, statusCode);
      case 413:
        return new AppError('File size too large', errorTypes.FILE_ERROR, statusCode);
      case 415:
        return new AppError('Unsupported file type', errorTypes.FILE_ERROR, statusCode);
      default:
        return new AppError(message, errorTypes.API_ERROR, statusCode);
    }
  }

  // Handle network errors
  if (error.request) {
    return new AppError(
      'Unable to connect to the server. Please check your internet connection.',
      errorTypes.NETWORK_ERROR,
      0
    );
  }

  // Handle all other errors
  return new AppError(
    error.message || 'An unexpected error occurred',
    errorTypes.GENERIC_ERROR,
    500
  );
};
