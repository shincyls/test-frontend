<template>
  <aside class="sidebar" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-overlay" @click="$emit('close')"></div>
    <div class="sidebar-content">
      <nav class="sidebar-nav">
        <ul>
          <li>
            <router-link to="/dashboard" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-view-dashboard"></i>
              <span>Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/locations" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-map-marker"></i>
              <span>Locations</span>
            </router-link>
          </li>
          <li>
            <router-link to="/users" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-account-group"></i>
              <span>Users</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sellers" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-store"></i>
              <span>Sellers</span>
            </router-link>
          </li>
          <li>
            <router-link to="/products" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-package"></i>
              <span>Products</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sales" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-cash"></i>
              <span>Sales</span>
            </router-link>
          </li>
          <li>
            <router-link to="/orders" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-cart"></i>
              <span>Orders</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admins" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-account-cog"></i>
              <span>Admins</span>
            </router-link>
          </li>
          <li>
            <router-link to="/settings" class="nav-link" @click="$emit('close')">
              <i class="mdi mdi-cog"></i>
              <span>Settings</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
  props: {
    isOpen: { type: Boolean, default: false }
  },
  emits: ['close']
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 250px;
  z-index: 90;
}

.sidebar-overlay {
  display: none;
}

.sidebar-content {
  height: 100%;
  background: white;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

.sidebar-nav ul {
  list-style: none;
  padding: 1rem 0;
  margin: 0;
}

.sidebar-nav li {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #666;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f5f5f5;
  color: #333;
}

.nav-link.router-link-active,
.nav-link.router-link-exact-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-link i {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .sidebar.sidebar-open {
    transform: translateX(0);
  }
  
  .sidebar-open .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }
}
</style>

