<template>
  <div class="container">
    <a href="/" class="back-icon-link">
      <i class="fas fa-arrow-left back-icon"></i>
    </a>
    <div class="content">
      <h1>Promise Examples</h1>
      
      <div class="example-section">
        <h2>Basic Promise</h2>
        <p>Status: {{ basicStatus }}</p>
        <button @click="runBasicPromise" :disabled="isBasicLoading">
          {{ isBasicLoading ? 'Loading...' : 'Run Basic Promise' }}
        </button>
      </div>
      
      <div class="example-section">
        <h2>Promise.all</h2>
        <p>Status: {{ parallelStatus }}</p>
        <button @click="runParallelPromises" :disabled="isParallelLoading">
          {{ isParallelLoading ? 'Loading...' : 'Run Parallel Promises' }}
        </button>
      </div>
      
      <div class="example-section">
        <h2>Promise with Timeout</h2>
        <p>Status: {{ timeoutStatus }}</p>
        <button @click="runPromiseWithTimeout" :disabled="isTimeoutLoading">
          {{ isTimeoutLoading ? 'Loading...' : 'Run Promise with Timeout' }}
        </button>
      </div>
      
      <div class="example-section">
        <h2>Retry Promise</h2>
        <p>Status: {{ retryStatus }}</p>
        <button @click="runRetryPromise" :disabled="isRetryLoading">
          {{ isRetryLoading ? 'Loading...' : 'Run Retry Promise' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { 
  promiseWithTimeout, 
  retryPromise 
} from '@/utils/promiseUtils';

export default {
  name: 'PromiseExample',
  setup() {
    // Basic Promise
    const basicStatus = ref('Not started');
    const isBasicLoading = ref(false);
    
    // Promise.all
    const parallelStatus = ref('Not started');
    const isParallelLoading = ref(false);
    
    // Promise with timeout
    const timeoutStatus = ref('Not started');
    const isTimeoutLoading = ref(false);
    
    // Retry Promise
    const retryStatus = ref('Not started');
    const isRetryLoading = ref(false);
    
    // Basic Promise example
    const runBasicPromise = () => {
      isBasicLoading.value = true;
      basicStatus.value = 'Running...';
      
      // Create a simple promise that resolves after 2 seconds
      const simplePromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Basic promise resolved successfully!');
        }, 2000);
      });
      
      simplePromise
        .then(result => {
          basicStatus.value = result;
        })
        .catch(error => {
          basicStatus.value = `Error: ${error.message}`;
        })
        .finally(() => {
          isBasicLoading.value = false;
        });
    };
    
    // Promise.all example
    const runParallelPromises = () => {
      isParallelLoading.value = true;
      parallelStatus.value = 'Running multiple promises in parallel...';
      
      // Create three promises with different resolve times
      const promise1 = new Promise(resolve => setTimeout(() => resolve('Promise 1 done'), 1000));
      const promise2 = new Promise(resolve => setTimeout(() => resolve('Promise 2 done'), 2000));
      const promise3 = new Promise(resolve => setTimeout(() => resolve('Promise 3 done'), 3000));
      
      Promise.all([promise1, promise2, promise3])
        .then(results => {
          parallelStatus.value = `All promises completed: ${results.join(', ')}`;
        })
        .catch(error => {
          parallelStatus.value = `Error: ${error.message}`;
        })
        .finally(() => {
          isParallelLoading.value = false;
        });
    };
    
    // Promise with timeout example
    const runPromiseWithTimeout = () => {
      isTimeoutLoading.value = true;
      timeoutStatus.value = 'Running promise with timeout...';
      
      // Create a promise that takes 5 seconds to resolve
      const slowPromise = new Promise(resolve => {
        setTimeout(() => resolve('Slow operation completed'), 5000);
      });
      
      // Wrap it with a 3-second timeout
      promiseWithTimeout(slowPromise, 3000)
        .then(result => {
          timeoutStatus.value = result;
        })
        .catch(error => {
          timeoutStatus.value = `Error: ${error.message}`;
        })
        .finally(() => {
          isTimeoutLoading.value = false;
        });
    };
    
    // Retry Promise example
    const runRetryPromise = () => {
      isRetryLoading.value = true;
      retryStatus.value = 'Running promise with retry...';
      
      // Create a function that fails the first two times and succeeds on the third try
      let attempts = 0;
      const flakeyOperation = () => {
        return new Promise((resolve, reject) => {
          attempts++;
          if (attempts < 3) {
            reject(new Error(`Attempt ${attempts} failed`));
          } else {
            resolve(`Success on attempt ${attempts}!`);
          }
        });
      };
      
      retryPromise(flakeyOperation, 3, 1000)
        .then(result => {
          retryStatus.value = result;
        })
        .catch(error => {
          retryStatus.value = `Error: ${error.message}`;
        })
        .finally(() => {
          isRetryLoading.value = false;
          // Reset attempts for next run
          attempts = 0;
        });
    };
    
    return {
      basicStatus,
      isBasicLoading,
      runBasicPromise,
      
      parallelStatus,
      isParallelLoading,
      runParallelPromises,
      
      timeoutStatus,
      isTimeoutLoading,
      runPromiseWithTimeout,
      
      retryStatus,
      isRetryLoading,
      runRetryPromise
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 812px; /* Typical height for a mobile phone */
  width: 375px; /* Typical width for a mobile phone */
  background: #f4f4f4;
  padding: 20px;
  margin: 0 auto; /* Center the container horizontally */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  position: absolute; /* Change to absolute positioning */
  top: 50%; /* Position at 50% from the top */
  left: 50%; /* Position at 50% from the left */
  transform: translate(-50%, -50%); /* Center the container */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('@/assets/background.png');
  background-size: cover;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  height: 90%;
  overflow-y: auto;
  color: rgb(12, 12, 12);
  position: relative;
  max-height: 750px; /* Set a max height to ensure scrollability */
}

.back-icon-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #333;
  font-size: 20px;
  text-decoration: none;
  z-index: 10;
}

.back-icon {
  font-size: 24px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #FFBC2D;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.example-section {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  background-color: #FFBC2D;
  color: white;
  margin-top: 10px;
}

button:hover:not(:disabled) {
  background-color: #9e79da;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

p {
  margin: 10px 0;
  font-size: 14px;
}

/* Scrollbar styling */
.content::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.content {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}
</style> 