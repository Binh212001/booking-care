<template>
  <div class="department-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Department Management</h2>
        <p class="page-description">Manage hospital departments</p>
      </div>
      <Button label="New Department" icon="pi pi-plus" @click="openDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
const departments = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditMode = ref(false);
const selectedDepartment = ref(null);

const departmentForm = ref({
  name: "",
  description: "",
  head: "",
  status: "Active",
});

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const dialogTitle = computed(() =>
  isEditMode.value ? "Edit Department" : "New Department"
);

const openDialog = () => {
  isEditMode.value = false;
  departmentForm.value = {
    name: "",
    description: "",
    head: "",
    status: "Active",
  };
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  departmentForm.value = {
    name: "",
    description: "",
    head: "",
    status: "Active",
  };
};

const editDepartment = (department: any) => {
  isEditMode.value = true;
  selectedDepartment.value = department;
  departmentForm.value = { ...department };
  dialogVisible.value = true;
};

const saveDepartment = () => {
  // TODO: Implement API call
  console.log("Saving department:", departmentForm.value);
  closeDialog();
  loadDepartments();
};

const confirmDelete = (department: any) => {
  selectedDepartment.value = department;
  deleteDialogVisible.value = true;
};

const deleteDepartment = () => {
  // TODO: Implement API call
  console.log("Deleting department:", selectedDepartment.value);
  deleteDialogVisible.value = false;
  loadDepartments();
};

const loadDepartments = async () => {
  loading.value = true;
  // TODO: Implement API call
  departments.value = [];
  loading.value = false;
};

onMounted(() => {
  loadDepartments();
});

useHead({
  title: "Departments - Booking Care Admin",
});
</script>

<style scoped>
.department-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.page-description {
  color: #64748b;
  margin: 0;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 500;
  color: #1e293b;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
  }
}
</style>
