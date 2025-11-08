<template>
  <div class="patient-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Patient Management</h2>
        <p class="page-description">Manage patient records</p>
      </div>
      <Button label="New Patient" icon="pi pi-plus" @click="openDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
const patients = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditMode = ref(false);
const selectedPatient = ref(null);

const patientForm = ref({
  name: "",
  email: "",
  phone: "",
  dateOfBirth: null,
  gender: "",
  address: "",
});

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const dialogTitle = computed(() =>
  isEditMode.value ? "Edit Patient" : "New Patient"
);

const formatDate = (date: string | Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

const openDialog = () => {
  isEditMode.value = false;
  patientForm.value = {
    name: "",
    email: "",
    phone: "",
    dateOfBirth: null,
    gender: "",
    address: "",
  };
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  patientForm.value = {
    name: "",
    email: "",
    phone: "",
    dateOfBirth: null,
    gender: "",
    address: "",
  };
};

const editPatient = (patient: any) => {
  isEditMode.value = true;
  selectedPatient.value = patient;
  patientForm.value = { ...patient };
  dialogVisible.value = true;
};

const savePatient = () => {
  // TODO: Implement API call
  console.log("Saving patient:", patientForm.value);
  closeDialog();
  loadPatients();
};

const confirmDelete = (patient: any) => {
  selectedPatient.value = patient;
  deleteDialogVisible.value = true;
};

const deletePatient = () => {
  // TODO: Implement API call
  console.log("Deleting patient:", selectedPatient.value);
  deleteDialogVisible.value = false;
  loadPatients();
};

const loadPatients = async () => {
  loading.value = true;
  // TODO: Implement API call
  patients.value = [];
  loading.value = false;
};

onMounted(() => {
  loadPatients();
});

useHead({
  title: "Patients - Booking Care Admin",
});
</script>

<style scoped>
.patient-page {
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
