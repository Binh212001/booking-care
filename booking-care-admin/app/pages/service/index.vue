<template>
  <div class="service-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Service Management</h2>
        <RouterLink to="/service/create" class="btn btn-primary">
          <Button label="New Service" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Services</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="code" header="Code">
        <template #body="slotProps">
          {{ slotProps.data.code || "-" }}
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description">
        <template #body="slotProps">
          <span class="truncate-text">
            {{ slotProps.data.description || "-" }}
          </span>
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="unit" header="Unit">
        <template #body="slotProps">
          {{ slotProps.data.unit || "-" }}
        </template>
      </Column>
      <Column field="duration" header="Duration (min)">
        <template #body="slotProps">
          {{ slotProps.data.duration || "-" }}
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #body="slotProps">
          <Tag
            :value="formatType(slotProps.data.type)"
            :severity="getTypeSeverity(slotProps.data.type)"
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
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              @click="navigateTo(`/service/edit/${slotProps.data.id}`)"
            />
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
    header="Delete Service"
    :modal="true"
  >
    <p>Are you sure you want to delete this service?</p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="deleteDialogVisible = false"
      />
      <Button label="Delete" icon="pi pi-trash" @click="deleteService" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useServiceStore } from "~/stores/service.service";

useHead({
  title: "Service Management - Booking Care Admin",
});

const deleteDialogVisible = ref(false);
const selectedServiceId = ref("");

const serviceStore = useServiceStore();
const search = ref("");
onMounted(() => {
  serviceStore.fetchServices();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedServiceId.value = id;
};

const deleteService = async () => {
  try {
    await serviceStore.deleteService(selectedServiceId.value);
    deleteDialogVisible.value = false;
    serviceStore.fetchServices();
  } catch (error) {
    console.error("Error deleting service:", error);
  }
};

// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => serviceStore.getRecords);

const handleSearch = () => {
  serviceStore.fetchServices(1, 10, search.value);
};

const formatPrice = (price: number | undefined) => {
  if (!price) return "-";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatType = (type: string | undefined) => {
  if (!type) return "-";
  const typeMap: Record<string, string> = {
    examination: "Examination",
    surgery: "Surgery",
    test: "Test",
    consultation: "Consultation",
    other: "Other",
  };
  return typeMap[type] || type;
};

const getTypeSeverity = (type: string | undefined) => {
  if (!type) return "secondary";
  const severityMap: Record<string, string> = {
    examination: "info",
    surgery: "warning",
    test: "success",
    consultation: "help",
    other: "secondary",
  };
  return severityMap[type] || "secondary";
};
</script>

<style scoped>
.service-page {
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

.truncate-text {
  display: block;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
