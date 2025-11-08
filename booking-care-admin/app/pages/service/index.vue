<template>
  <div class="service-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Service Management</h2>
        <p class="page-description">Manage medical services</p>
      </div>
      <Button label="New Service" icon="pi pi-plus" @click="openDialog" />
    </div>
  </div>
</template>

<script setup lang="ts">
const services = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditMode = ref(false);
const selectedService = ref(null);

const serviceForm = ref({
  name: "",
  description: "",
  price: 0,
  status: "Active",
});

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const dialogTitle = computed(() =>
  isEditMode.value ? "Edit Service" : "New Service"
);

const openDialog = () => {
  isEditMode.value = false;
  serviceForm.value = {
    name: "",
    description: "",
    price: 0,
    status: "Active",
  };
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  serviceForm.value = {
    name: "",
    description: "",
    price: 0,
    status: "Active",
  };
};

const editService = (service: any) => {
  isEditMode.value = true;
  selectedService.value = service;
  serviceForm.value = { ...service };
  dialogVisible.value = true;
};

const saveService = () => {
  // TODO: Implement API call
  console.log("Saving service:", serviceForm.value);
  closeDialog();
  // Refresh list
  loadServices();
};

const confirmDelete = (service: any) => {
  selectedService.value = service;
  deleteDialogVisible.value = true;
};

const deleteService = () => {
  // TODO: Implement API call
  console.log("Deleting service:", selectedService.value);
  deleteDialogVisible.value = false;
  // Refresh list
  loadServices();
};

const loadServices = async () => {
  loading.value = true;
  // TODO: Implement API call
  // const response = await $fetch('/api/services');
  // services.value = response.data;
  services.value = [];
  loading.value = false;
};

onMounted(() => {
  loadServices();
});

useHead({
  title: "Services - Booking Care Admin",
});
</script>

<style scoped>
.service-page {
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
