<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <button class="menu-toggle" @click="$emit('toggle-sidebar')" aria-label="Toggle menu">
        <span class="menu-icon"></span>
      </button>
      <h1>Fitness Centre</h1>
    </div>
    
    <div class="navbar-actions">
      <div class="user-info" v-if="user">
        <span class="user-name">{{ user.name || user.username || 'User' }}</span>
      </div>
      <button class="logout-btn" @click="handleLogout" title="Logout">
        <i class="mdi mdi-logout"></i>
        <span class="logout-text">Logout</span>
      </button>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'NavbarComponent',
  emits: ['toggle-sidebar'],
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const user = computed(() => store.getters.user)
    
    const handleLogout = () => {
      store.dispatch('logout')
      router.push({ name: 'Login' })
    }
    
    return {
      user,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 60px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-brand h1 {
  font-size: 1.25rem;
  color: #333;
  margin: 0;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  position: relative;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #333;
  left: 0;
}

.menu-icon::before { top: -7px; }
.menu-icon::after { top: 7px; }

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-name {
  font-size: 0.9rem;
  color: #666;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: #f5f5f5;
  border-color: #ccc;
  color: #333;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .user-name {
    display: none;
  }
  
  .logout-text {
    display: none;
  }
  
  .logout-btn {
    padding: 0.5rem;
  }
}
</style>

