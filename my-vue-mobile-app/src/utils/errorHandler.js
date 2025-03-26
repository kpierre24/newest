export class AppError extends Error {
  constructor(message, type = 'GENERIC_ERROR', statusCode = 500) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
  }
}

export const errorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  API_ERROR: 'API_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
};

export const handleError = (error) => {
  if (error instanceof AppError) {
    return error;
  }

  if (error.response) {
    // Handle API errors
    const statusCode = error.response.status;
    const message = error.response.data?.detail || 'An error occurred while processing your request';
    
    switch (statusCode) {
      case 400:
        return new AppError(message, errorTypes.VALIDATION_ERROR, statusCode);
      case 401:
      case 403:
        return new AppError(message, errorTypes.AUTH_ERROR, statusCode);
      default:
        return new AppError(message, errorTypes.API_ERROR, statusCode);
    }
  }

  if (error.request) {
    // Network errors
    return new AppError(
      'Unable to connect to the server. Please check your internet connection.',
      errorTypes.NETWORK_ERROR,
      0
    );
  }

  // Generic errors
  return new AppError(
    error.message || 'An unexpected error occurred',
    errorTypes.GENERIC_ERROR,
    500
  );
};
