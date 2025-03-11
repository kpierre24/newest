<template>
  <div class="container">
    <section class="form-section">
      <div class="content">
        <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="logo" />
        <div class="brand-text">
          <h1>Due Diligence</h1>
          <p>Due Diligence Information</p>
        </div>
        <div class="form-box">
          <p class="info-text">As part of our commitment to regulatory compliance and ensuring the security of our members, we may require all 
            foreign nationals to complete additional due diligence procedures which may include:</p>
          <div class="info-container">
            <ul class="info-list">
              <li>Foreign bank information</li>
              <li>Source of funds</li>
              <li>Purpose of the account</li>
              <li>Anti-Money Laundering (AML) Compliance</li>
              <li>Foreign Account Tax Compliance Act (FATCA) Compliance</li>
              <li>Politically Exposed Persons Regulations</li>
            </ul>
          </div>
          <a href="https://drive.google.com/drive/folders/1t8z2oRVvDwJwXGtKQ7JAQGdsK7-IuZIN" 
             target="_blank" 
             class="regulations-link">
            Link to Laws and Regulations
          </a>
        </div>
        <div class="button-group">
          <button class="back-button" @click="navigateToPrevious">Back</button>
          <button class="next-button" @click="navigateToNext">Next</button>
        </div>
      </div>
    </section>
    <section class="brand-section">
      <div class="overlay"></div>
      <img src="@/assets/cathedral-engage-logo.png" alt="Cathedral Engage" class="brand-logo" />
    </section>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-section {
  width: 100%;
  min-height: 100vh;
  background: white;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 80px;
  margin-bottom: 1.5rem;
}

.brand-text {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-text h1 {
  font-size: 24px;
  color: #261C6B;
  margin-bottom: 0.5rem;
}

.brand-text p {
  color: #666;
}

.form-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.info-text {
  font-size: 15px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 1.5rem;
}

.info-container {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(99, 98, 248, 0.2);
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  color: #261C6B;
  font-size: 14px;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(99, 98, 248, 0.1);
  display: flex;
  align-items: center;
}

.info-list li:last-child {
  border-bottom: none;
}

.info-list li::before {
  content: '•';
  color: #6362F8;
  font-weight: bold;
  margin-right: 0.75rem;
}

.regulations-link {
  display: block;
  text-align: center;
  color: #6362F8;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.regulations-link:hover {
  color: #261C6B;
  text-decoration: underline;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
}

.back-button,
.next-button {
  flex: 1;
  height: 3rem;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.back-button {
  background-color: #6362F8;
  color: white;
}

.next-button {
  background-color: #FFBC2D;
  color: white;
}

.back-button:hover,
.next-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }

  .form-section {
    width: 50%;
    height: 100vh;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #ffffff, #f8f9fa);
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .form-section::-webkit-scrollbar {
    display: none;
  }

  .content {
    max-width: 450px;
    padding: 2rem;
  }

  .brand-section {
    display: block;
    position: relative;
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
    overflow: hidden;
  }

  .brand-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/background.png') center/cover no-repeat;
    opacity: 0.1;
    mix-blend-mode: overlay;
  }

  .brand-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    filter: brightness(1.2);
    z-index: 2;
  }
}

/* Mobile specific styles */
@media (max-width: 767px) {
  .form-section {
    padding: 20px;
  }

  .content {
    padding: 0;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>