<template>
  <div class="container">
    <div class="content">
      <h1>Due Diligence</h1>
      <h3>Due Diligence Information</h3>
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
import { useDemoStore } from '@/store/demoStore';
import { useRouter } from 'vue-router';

export default {
  name: 'DueDiligence',
  setup() {
    const router = useRouter();
    const store = useDemoStore();

    const navigateToPrevious = () => {
      router.go(-1);
    };

    const navigateToNext = () => {
      router.push('/address');
    };

    return {
      navigateToPrevious,
      navigateToNext
    };
  }
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Adjust to start the content from the top */
  height: 100vh;  /* Adjusted height */
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  backdrop-filter: blur(5px);
   /* Start hidden */
  animation: fadeIn 1s ease-in-out forwards;
}

.content {
  background-color: white;
  background-image: url('@/assets/back.jpg');
  background-size: cover;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100vh;
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
  font-size: 16px;
  color: #555;
  margin-top: 10px;
  margin-bottom: 10px;
}

p {
  font-size: 12px;
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
  flex-direction: column;
  gap: 10px;
  width: 100%; /* Ensure buttons take full width */
}

.back-button, .next-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: #f15539ea;
  color: white;
}

.back-button:hover {
  background-color: #f38b79ea;
}

.next-button {
  background-color: #FFBC2D ;
  color: white;
}

.next-button:hover {
  background-color: #9e79da;
}

</style>