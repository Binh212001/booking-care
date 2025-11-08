<template>
  <div class="admin-layout">
    <!-- Topbar -->
    <header class="topbar">
      <div class="topbar-left">
        <img :src="logo" alt="Logo" class="topbar-logo" />
        <span class="topbar-title">Booking Care Admin</span>
      </div>
      <div class="topbar-right">
        <div class="user-avatar">
          <span>Admin</span>
          <div class="avatar-circle">
            <i class="pi pi-user"></i>
          </div>
        </div>
      </div>
    </header>
    <div class="content-row">
      <!-- Sidebar -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <NuxtLink to="/" class="nav-item" active-class="active">
            <i class="pi pi-home"></i>
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink to="/doctor" class="nav-item" active-class="active">
            <i class="pi pi-user"></i>
            <span>Doctors</span>
          </NuxtLink>
          <NuxtLink to="/patient" class="nav-item" active-class="active">
            <i class="pi pi-user"></i>
            <span>Patients</span>
          </NuxtLink>
          <NuxtLink to="/appointment" class="nav-item" active-class="active">
            <i class="pi pi-calendar"></i>
            <span>Appointments</span>
          </NuxtLink>
          <NuxtLink to="/service" class="nav-item" active-class="active">
            <i class="pi pi-briefcase"></i>
            <span>Services</span>
          </NuxtLink>
          <NuxtLink to="/department" class="nav-item" active-class="active">
            <i class="pi pi-building"></i>
            <span>Departments</span>
          </NuxtLink>
          <NuxtLink to="/medicine" class="nav-item" active-class="active">
            <i class="pi pi-shopping-cart"></i>
            <span>Medicines</span>
          </NuxtLink>
          <NuxtLink to="/treatment" class="nav-item" active-class="active">
            <i class="pi pi-heart"></i>
            <span>Treatments</span>
          </NuxtLink>
          <NuxtLink to="/prescription" class="nav-item" active-class="active">
            <i class="pi pi-file-edit"></i>
            <span>Prescriptions</span>
          </NuxtLink>
          <NuxtLink to="/user" class="nav-item" active-class="active">
            <i class="pi pi-users"></i>
            <span>Users</span>
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "../assets/logo.png";
</script>

<style scoped>
/* MAIN BACKGROUND */
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafd;
}

/* TOPBAR */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  background: #fff;
  border-bottom: 1px solid #d9dfe5;
  padding: 0 16px;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.topbar-logo {
  height: 21px;
  width: 21px;
}

.topbar-title {
  font-size: 15px;
  color: #444;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.topbar-right {
  display: flex;
  align-items: center;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #1a2a36;
}

.avatar-circle {
  width: 26px;
  height: 26px;
  background: #1dc198;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
}

/* LAYOUT */
.content-row {
  display: flex;
  flex: 1 1 0%;
  min-height: 0;
}

/* SIDEBAR */
.sidebar {
  background: #f7f9fb;
  width: 216px;
  border-right: 1px solid #e5eaf1;
  min-height: calc(100vh - 44px);
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width 0.2s;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* MENU ITEM */
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  padding: 10px 12px;
  color: #34495e;
  text-decoration: none;
  border-radius: 6px;
  margin: 2px 8px;
  transition: background 0.13s, color 0.13s;
  justify-content: flex-start;
  font-weight: 500;
}

.nav-item i {
  font-size: 18px;
  color: #5e6d86;
  min-width: 20px;
  text-align: center;
}

.nav-item.active,
.nav-item.router-link-exact-active {
  background: #ecfdf7;
  color: #1dc198;
  font-weight: 700;
}

.nav-item.active i,
.nav-item.router-link-exact-active i {
  color: #1dc198;
}

.nav-item span {
  margin-left: 8px;
  display: inline;
}

/* MAIN CONTENT AREA */
.main-content {
  flex: 1 1 0%;
  min-width: 0;
  padding: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 28px 32px 0 32px;
  overflow-x: auto;
  border-left: 1px solid #f5f6fa;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .content-row {
    flex-direction: column;
  }
  .sidebar {
    width: 100vw;
    min-height: 44px;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    border-right: none;
    border-bottom: 1px solid #e5eaf1;
    padding: 0 0 0 4px;
  }
  .main-content {
    padding: 16px 4vw 0 4vw;
    border-left: none;
  }
}
</style>
