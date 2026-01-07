<template>
  <div class="layout">
    <Navbar @toggle-sidebar="toggleSidebar" />
    <Sidebar :is-open="sidebarOpen" @close="closeSidebar" />
    <main class="main-content">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'MainLayout',
  components: { Navbar, Sidebar },
  setup() {
    const sidebarOpen = ref(false)
    const toggleSidebar = () => { sidebarOpen.value = !sidebarOpen.value }
    const closeSidebar = () => { sidebarOpen.value = false }
    return { sidebarOpen, toggleSidebar, closeSidebar }
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f5f7fa;
}

.main-content {
  margin-left: 250px;
  padding-top: 60px;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>

