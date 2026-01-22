<template>
  <MainLayout>
    <div class="content-header">
      <h2>Settings</h2>
      <p>Weplace Settings</p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'

export default {
  name: 'SettingsPage',
  components: { MainLayout }
}
</script>

<style scoped>
.content-header {
  padding: 2rem;
  text-align: center;
}
</style>