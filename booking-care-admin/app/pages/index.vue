<template>
  <div class="dashboard">
    <div class="stats-grid">
      <Card class="stat-card">
        <template #content>
          <div class="flex items-center gap-4">
            <i class="pi pi-calendar text-4xl text-blue-500"></i>
            <div class="flex-1">
              <h3 class="stat-value">0</h3>
              <p class="stat-label">Total Bookings</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="flex items-center gap-4">
            <i class="pi pi-users text-4xl text-green-500"></i>
            <div class="flex-1">
              <h3 class="stat-value">0</h3>
              <p class="stat-label">Active Users</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="flex items-center gap-4">
            <i class="pi pi-user-md text-4xl text-purple-500"></i>
            <div class="flex-1">
              <h3 class="stat-value">0</h3>
              <p class="stat-label">Doctors</p>
            </div>
          </div>
        </template>
      </Card>

      <Card class="stat-card">
        <template #content>
          <div class="flex items-center gap-4">
            <i class="pi pi-dollar text-4xl text-red-500"></i>
            <div class="flex-1">
              <h3 class="stat-value">$0</h3>
              <p class="stat-label">Revenue</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div class="content-section">
      <Card>
        <template #title>Recent Activity</template>
        <template #content>
          <div class="empty-state">
            <p>No recent activity</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Dashboard - Booking Care Admin",
});
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #1e293b;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.content-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #94a3b8;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
