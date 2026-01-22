<template>
  <MainLayout>
    <div class="content-header">
      <h2>Welcome to Weplace</h2>
      <p>Your one-stop neighborhood marketplace</p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'MainPage',
  components: { MainLayout }
}
</script>

<style scoped>
.content-header {
  padding: 2rem;
  text-align: center;
}
</style>