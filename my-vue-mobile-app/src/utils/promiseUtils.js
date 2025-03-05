/**
 * Promise utility functions for the application
 */

/**
 * Fetches data from multiple endpoints in parallel
 * @param {Array} endpoints - Array of API endpoints to fetch
 * @param {String} baseURL - Base URL for the API
 * @returns {Promise} - Promise that resolves with an array of results
 */
export const fetchMultipleEndpoints = (endpoints, baseURL) => {
  // Create an array of promises
  const promises = endpoints.map(endpoint => {
    return fetch(`${baseURL}/${endpoint}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}`);
        }
        return response.json();
      });
  });
  
  // Use Promise.all to wait for all promises to resolve
  return Promise.all(promises);
};

/**
 * Executes promises in sequence (one after another)
 * @param {Array} promiseFunctions - Array of functions that return promises
 * @returns {Promise} - Promise that resolves with an array of results
 */
export const executeSequentially = (promiseFunctions) => {
  return promiseFunctions.reduce(
    (promise, func) => promise.then(result => 
      func().then(Array.isArray(result) 
        ? [...result, func] 
        : [result, func])
    ),
    Promise.resolve([])
  );
};

/**
 * Creates a promise that times out after a specified duration
 * @param {Promise} promise - The promise to wrap with a timeout
 * @param {Number} timeoutMs - Timeout in milliseconds
 * @returns {Promise} - Promise that resolves or rejects based on the race
 */
export const promiseWithTimeout = (promise, timeoutMs) => {
  // Create a promise that rejects after timeoutMs milliseconds
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
  
  // Race the original promise against the timeout
  return Promise.race([promise, timeoutPromise]);
};

/**
 * Retries a promise-returning function multiple times before giving up
 * @param {Function} promiseFunc - Function that returns a promise
 * @param {Number} maxRetries - Maximum number of retry attempts
 * @param {Number} delayMs - Delay between retries in milliseconds
 * @returns {Promise} - Promise that resolves with the result or rejects after all retries
 */
export const retryPromise = (promiseFunc, maxRetries = 3, delayMs = 1000) => {
  return new Promise((resolve, reject) => {
    const attempt = (attemptNumber) => {
      promiseFunc()
        .then(resolve)
        .catch(error => {
          if (attemptNumber < maxRetries) {
            console.log(`Attempt ${attemptNumber} failed, retrying in ${delayMs}ms...`);
            setTimeout(() => attempt(attemptNumber + 1), delayMs);
          } else {
            reject(error);
          }
        });
    };
    
    attempt(1);
  });
}; 