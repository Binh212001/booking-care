<template>
  <div class="medicine-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Medicine Management</h2>
        <p class="page-description">Manage medicine inventory</p>
      </div>
      <Button label="New Medicine" icon="pi pi-plus" @click="openDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
const medicines = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditMode = ref(false);
const selectedMedicine = ref(null);

const medicineForm = ref({
  name: "",
  manufacturer: "",
  quantity: 0,
  price: 0,
  expiryDate: null,
});

const dialogTitle = computed(() =>
  isEditMode.value ? "Edit Medicine" : "New Medicine"
);

const formatDate = (date: string | Date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};

const openDialog = () => {
  isEditMode.value = false;
  medicineForm.value = {
    name: "",
    manufacturer: "",
    quantity: 0,
    price: 0,
    expiryDate: null,
  };
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  medicineForm.value = {
    name: "",
    manufacturer: "",
    quantity: 0,
    price: 0,
    expiryDate: null,
  };
};

const editMedicine = (medicine: any) => {
  isEditMode.value = true;
  selectedMedicine.value = medicine;
  medicineForm.value = { ...medicine };
  dialogVisible.value = true;
};

const saveMedicine = () => {
  // TODO: Implement API call
  console.log("Saving medicine:", medicineForm.value);
  closeDialog();
  loadMedicines();
};

const confirmDelete = (medicine: any) => {
  selectedMedicine.value = medicine;
  deleteDialogVisible.value = true;
};

const deleteMedicine = () => {
  // TODO: Implement API call
  console.log("Deleting medicine:", selectedMedicine.value);
  deleteDialogVisible.value = false;
  loadMedicines();
};

const loadMedicines = async () => {
  loading.value = true;
  // TODO: Implement API call
  medicines.value = [];
  loading.value = false;
};

onMounted(() => {
  loadMedicines();
});

useHead({
  title: "Medicines - Booking Care Admin",
});
</script>

<style scoped>
.medicine-page {
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
