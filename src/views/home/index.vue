<script setup></script>
<template>
  <div class="home-container">
    <img src="/images/logo.png" alt="Logo SESAB" class="logo" />
    <h1>Bem-vindo ao Desafio Técnico SESAB</h1>
    <p class="subtitle">Sua plataforma para gestão eficiente e inovadora.</p>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo {
  width: 160px;
  height: auto;
  margin-bottom: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

h1 {
  font-size: 2.2rem;
  color: #1976d2;
  margin-bottom: 12px;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 0;
  font-weight: 400;
}
</style>
