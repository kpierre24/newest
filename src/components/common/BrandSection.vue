<template>
  <v-col cols="12" md="6" class="brand-section d-none d-md-flex">
    <v-img
      src="@/assets/cathedral-engage-logo.png"
      alt="Cathedral Engage"
      class="brand-logo"
    />
  </v-col>
</template>

<script setup>
// No props or logic needed for this component
</script>

<style scoped>
.brand-section {
  background: linear-gradient(135deg, #6362F8 0%, #261C6B 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 240px;
  height: auto;
  filter: brightness(1.2);
  z-index: 2;
  position: relative;
  margin: auto;
}

@media (max-width: 959px) {
  .brand-section {
    position: relative;
    width: 100%;
    min-height: 300px;
  }

  .brand-logo {
    width: 180px;
  }
}
</style> 