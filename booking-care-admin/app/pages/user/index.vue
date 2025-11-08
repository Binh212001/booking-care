<template>
  <div class="user-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">User Management</h2>
        <RouterLink to="/user/create" class="btn btn-primary">
          <Button label="New User" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Users</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="username" header="Username"></Column>
      <Column field="email" header="Email">
        <template #body="slotProps">
          {{ slotProps.data.email }}
        </template>
      </Column>
      <Column field="role" header="Role">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.role"
            :severity="
              slotProps.data.role === 'admin'
                ? 'danger'
                : slotProps.data.role === 'doctor'
                  ? 'info'
                  : 'success'
            "
          />
        </template>
      </Column>
      <Column field="isActive" header="Status">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.isActive ? 'Active' : 'Inactive'"
            :severity="slotProps.data.isActive ? 'success' : 'danger'"
          />
        </template>
      </Column>
      <Column field="createdAt" header="Created At">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" />
            <Button
              icon="pi pi-trash"
              @click="confirmDelete(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Delete User"
    :modal="true"
  >
    <p>Are you sure you want to delete this user?</p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="deleteDialogVisible = false"
      />
      <Button label="Delete" icon="pi pi-trash" @click="deleteUser" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useUserStore } from "~/stores/user.service";

useHead({
  title: "User Management - Booking Care Admin",
});

const deleteDialogVisible = ref(false);
const selectedUserId = ref("");

const userStore = useUserStore();
const search = ref("");
onMounted(() => {
  userStore.fetchUsers();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedUserId.value = id;
};

const deleteUser = async () => {
  try {
    await userStore.deleteUser(selectedUserId.value);
    deleteDialogVisible.value = false;
    userStore.fetchUsers();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => userStore.getRecords);

const handleSearch = () => {
  userStore.fetchUsers(1, 10, search.value);
};

const formatDate = (date: string | undefined) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.user-page {
  padding: 1.5rem;
}

.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
}
</style>
