<template>
  <div class="container">
    <div class="content">
     
      <h1>Due Diligence</h1>
      <div class="text-container">
        <div class="text-content">
          <p>As part of our commitment to regulatory compliance and ensuring the security of our members, we may require all 
            foreign nationals to complete additional due diligence procedures which may include: </p>
          <div class="tags-container">
            <h5>Foreign bank information</h5>
            <h5>Source of funds</h5>
            <h5>Purpose of the account</h5>
            <h5>Anti-Money Laundering (AML) Compliance</h5>
            <h5>Foreign Account Tax Compliance Act (FATCA) Compliance</h5>
            <h5>Politically Exposed Persons Regulations</h5>
          </div>
          <a href="https://drive.google.com/drive/folders/1t8z2oRVvDwJwXGtKQ7JAQGdsK7-IuZIN" target="_blank">Link to Laws and Regulations</a>
        </div>
      </div>
      <div class="button-group">
        <button class="back-button" @click="navigateToPrevious">Back</button>
        <button class="next-button" @click="navigateToNext">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DueDiligence',
  methods: {
    navigateToPrevious() {
      this.$router.go(-1); // Navigate to the previous page
    },
    navigateToNext() {
      this.$router.push('/address'); // Navigate to the address page
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  text-align: center;
}

.content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Adjusted to replicate mobile phone size */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 100px;
  margin-bottom: 20px;
}

.text-container {
  width: 100%;
  margin-bottom: 20px;
}

.text-content {
  text-align: left;
}

.tags-container {
  border: 1px solid #ccc; /* Thin border */
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 10px;
}

p {
  font-size: 10px;
  color: #666;
  margin-bottom: 20px;
}

a {
  display: block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
  font-size: 16px;
}

a:hover {
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.back-button, .next-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #6c757d;
  color: white;
}

.back-button:hover {
  background-color: #5a6268;
}

.next-button {
  background-color: #007bff;
  color: white;
}

.next-button:hover {
  background-color: #0056b3;
}
</style>