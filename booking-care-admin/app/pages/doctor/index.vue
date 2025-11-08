<template>
  <div class="doctor-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Doctor Management</h2>
        <p class="page-description">Manage doctor profiles</p>
      </div>
      <Button label="New Doctor" icon="pi pi-plus" @click="openDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
const doctors = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditMode = ref(false);
const selectedDoctor = ref(null);

const doctorForm = ref({
  name: "",
  email: "",
  phone: "",
  specialization: "",
  department: "",
  status: "Active",
});

const departmentOptions = [
  { label: "Cardiology", value: "Cardiology" },
  { label: "Neurology", value: "Neurology" },
  { label: "Orthopedics", value: "Orthopedics" },
  { label: "Pediatrics", value: "Pediatrics" },
  { label: "General", value: "General" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const dialogTitle = computed(() =>
  isEditMode.value ? "Edit Doctor" : "New Doctor"
);

const openDialog = () => {
  isEditMode.value = false;
  doctorForm.value = {
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    status: "Active",
  };
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  doctorForm.value = {
    name: "",
    email: "",
    phone: "",
    specialization: "",
    department: "",
    status: "Active",
  };
};

const editDoctor = (doctor: any) => {
  isEditMode.value = true;
  selectedDoctor.value = doctor;
  doctorForm.value = { ...doctor };
  dialogVisible.value = true;
};

const saveDoctor = () => {
  // TODO: Implement API call
  console.log("Saving doctor:", doctorForm.value);
  closeDialog();
  loadDoctors();
};

const confirmDelete = (doctor: any) => {
  selectedDoctor.value = doctor;
  deleteDialogVisible.value = true;
};

const deleteDoctor = () => {
  // TODO: Implement API call
  console.log("Deleting doctor:", selectedDoctor.value);
  deleteDialogVisible.value = false;
  loadDoctors();
};

const loadDoctors = async () => {
  loading.value = true;
  // TODO: Implement API call
  doctors.value = [];
  loading.value = false;
};

onMounted(() => {
  loadDoctors();
});

useHead({
  title: "Doctors - Booking Care Admin",
});
</script>

<style scoped>
.doctor-page {
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
