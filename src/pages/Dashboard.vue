<template>
  <MainLayout>
    <div class="content-header">
      <h2>Dashboard</h2>
      <p>Welcome to the Fitness Centre Management System</p>
    </div>

    <div class="content-body">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon members">
            <i class="mdi mdi-account-group"></i>
          </div>
          <div class="stat-info">
            <h3>Total Members</h3>
            <p class="stat-value">{{ totalMembers }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon active">
            <i class="mdi mdi-account-check"></i>
          </div>
          <div class="stat-info">
            <h3>Active Members</h3>
            <p class="stat-value">--</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon sessions">
            <i class="mdi mdi-calendar-clock"></i>
          </div>
          <div class="stat-info">
            <h3>Total Bookings</h3>
            <p class="stat-value">{{ totalBookings }}</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import MainLayout from '../layouts/MainLayout.vue'
import userService from '../services/admin'
import bookingService from '../services/location'

export default {
  name: 'DashboardPage',
  components: { MainLayout },
  setup() {

    const totalMembers = ref(0)
    const totalBookings = ref(0)

    const fetchStats = async () => {
      try {

        const response = await userService.getUsers()
        totalMembers.value = response.total || response.meta?.total || 0

        const bookingResponse = await bookingService.getBookings({ page: 1, limit: 1 })
        totalBookings.value = bookingResponse.total || bookingResponse.meta?.total || 0

      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    

    onMounted(() => { fetchStats() })

    return { totalMembers, totalBookings }
  }
}
</script>

<style scoped>
.content-header {
  padding: 2rem;
  background: white;
  border-bottom: 1px solid #eee;
}

.content-header h2 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.5rem;
}

.content-header p {
  margin: 0;
  color: #666;
}

.content-body {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-icon.members { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.stat-icon.active { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
.stat-icon.sessions { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }

.stat-info h3 {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  margin: 0.25rem 0 0 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

@media (max-width: 768px) {
  .content-header,
  .content-body {
    padding: 1rem;
  }
}
</style>
