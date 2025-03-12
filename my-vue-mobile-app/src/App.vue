<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}



/* Global form styles */
input, select, textarea {
  font-family: 'Roboto', sans-serif;
  font-size: clamp(14px, 3vw, 16px);
  padding: clamp(12px, 2.5vw, 15px);
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #FFBC2D;
}

/* Global error message style */
.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin: 0 15px 15px;
  font-size: clamp(12px, 2.5vw, 14px);
  border-left: 4px solid #d32f2f;
}

/* Global disabled state */
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #cccccc;
}
</style>