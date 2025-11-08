<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!sidebarCollapsed" class="logo">Booking Care</h2>
        <button class="toggle-btn" @click="toggleSidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink to="/" class="nav-item" active-class="active">
          <i class="pi pi-home"></i>
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </NuxtLink>

        <div v-if="!sidebarCollapsed" class="nav-section-title">Management</div>

        <NuxtLink to="/patient" class="nav-item" active-class="active">
          <i class="pi pi-user"></i>
          <span v-if="!sidebarCollapsed">Patients</span>
        </NuxtLink>

        <NuxtLink to="/doctor" class="nav-item" active-class="active">
          <i class="pi pi-user-md"></i>
          <span v-if="!sidebarCollapsed">Doctors</span>
        </NuxtLink>

        <NuxtLink to="/service" class="nav-item" active-class="active">
          <i class="pi pi-briefcase"></i>
          <span v-if="!sidebarCollapsed">Services</span>
        </NuxtLink>

        <NuxtLink to="/department" class="nav-item" active-class="active">
          <i class="pi pi-building"></i>
          <span v-if="!sidebarCollapsed">Departments</span>
        </NuxtLink>

        <NuxtLink to="/medicine" class="nav-item" active-class="active">
          <i class="pi pi-shopping-cart"></i>
          <span v-if="!sidebarCollapsed">Medicines</span>
        </NuxtLink>

        <NuxtLink to="/treatment" class="nav-item" active-class="active">
          <i class="pi pi-heart"></i>
          <span v-if="!sidebarCollapsed">Treatments</span>
        </NuxtLink>

        <NuxtLink to="/prescription" class="nav-item" active-class="active">
          <i class="pi pi-file-edit"></i>
          <span v-if="!sidebarCollapsed">Prescriptions</span>
        </NuxtLink>

        <div v-if="!sidebarCollapsed" class="nav-section-title">System</div>

        <NuxtLink to="/user" class="nav-item" active-class="active">
          <i class="pi pi-users"></i>
          <span v-if="!sidebarCollapsed">Users</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="user-menu">
            <Button
              icon="pi pi-user"
              label="Admin"
              class="p-button-text p-button-plain"
              iconPos="left"
            />
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarCollapsed = ref(false);
const route = useRoute();

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    "/": "Dashboard",
    "/patient": "Patients",
    "/doctor": "Doctors",
    "/service": "Services",
    "/department": "Departments",
    "/medicine": "Medicines",
    "/treatment": "Treatments",
    "/prescription": "Prescriptions",
    "/user": "Users",
  };

  // Handle nested routes
  const path = route.path;
  if (path.startsWith("/patient")) return "Patients";
  if (path.startsWith("/doctor")) return "Doctors";
  if (path.startsWith("/service")) return "Services";
  if (path.startsWith("/department")) return "Departments";
  if (path.startsWith("/medicine")) return "Medicines";
  if (path.startsWith("/treatment")) return "Treatments";
  if (path.startsWith("/prescription")) return "Prescriptions";
  if (path.startsWith("/user")) return "Users";

  return titles[path] || "Dashboard";
});
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* Sidebar Styles */
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: #3b82f6;
}

.nav-item i {
  flex-shrink: 0;
  font-size: 1.25rem;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-section-title {
  padding: 1rem 1.5rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.5rem;
}

/* Main Content Area */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header Styles */
.header {
  background: white;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #1e293b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f1f5f9;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #1e293b;
  font-weight: 500;
}

.user-btn:hover {
  background: #e2e8f0;
}

/* Content Area */
.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #f8fafc;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    z-index: 1000;
    transform: translateX(-100%);
  }

  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .main-content {
    width: 100%;
  }

  .content {
    padding: 1rem;
  }
}
</style>
