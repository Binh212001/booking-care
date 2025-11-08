<template>
  <div class="treatment-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Treatment Management</h2>
        <RouterLink to="/treatment/create" class="btn btn-primary">
          <Button label="New Treatment" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Treatments</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description">
        <template #body="slotProps">
          <span class="truncate-text">
            {{ slotProps.data.description || "-" }}
          </span>
        </template>
      </Column>
      <Column field="treatmentType" header="Type">
        <template #body="slotProps">
          <Tag
            v-if="slotProps.data.treatmentType"
            :value="formatTreatmentType(slotProps.data.treatmentType)"
            :severity="getTreatmentTypeSeverity(slotProps.data.treatmentType)"
          />
          <span v-else>-</span>
        </template>
      </Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <Tag
            :value="formatStatus(slotProps.data.status)"
            :severity="getStatusSeverity(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column field="startDate" header="Start Date">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.startDate) }}
        </template>
      </Column>
      <Column field="endDate" header="End Date">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.endDate) }}
        </template>
      </Column>
      <Column field="doctor" header="Doctor">
        <template #body="slotProps">
          {{ slotProps.data.doctor?.fullName || "-" }}
        </template>
      </Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <RouterLink :to="`/treatment/${slotProps.data.id}`">
              <Button icon="pi pi-eye" severity="info" />
            </RouterLink>
            <Button icon="pi pi-pencil" />
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmDelete(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Delete Treatment"
    :modal="true"
  >
    <p>Are you sure you want to delete this treatment?</p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="deleteDialogVisible = false"
      />
      <Button label="Delete" icon="pi pi-trash" @click="deleteTreatment" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useTreatmentStore } from "~/stores/treatment.service";

useHead({
  title: "Treatment Management - Booking Care Admin",
});

const deleteDialogVisible = ref(false);
const selectedTreatmentId = ref("");

const treatmentStore = useTreatmentStore();
const search = ref("");
onMounted(() => {
  treatmentStore.fetchTreatments();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedTreatmentId.value = id;
};

const deleteTreatment = async () => {
  try {
    await treatmentStore.deleteTreatment(selectedTreatmentId.value);
    deleteDialogVisible.value = false;
    treatmentStore.fetchTreatments();
  } catch (error) {
    console.error("Error deleting treatment:", error);
  }
};

// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => treatmentStore.getRecords);

const handleSearch = () => {
  treatmentStore.fetchTreatments(1, 10, search.value);
};

const formatDate = (date: string | Date | undefined) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const formatStatus = (status: string | undefined) => {
  if (!status) return "-";
  const statusMap: Record<string, string> = {
    planned: "Planned",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return statusMap[status] || status;
};

const getStatusSeverity = (status: string | undefined) => {
  if (!status) return "secondary";
  const severityMap: Record<string, string> = {
    planned: "info",
    in_progress: "warning",
    completed: "success",
    cancelled: "danger",
  };
  return severityMap[status] || "secondary";
};

const formatTreatmentType = (type: string | undefined) => {
  if (!type) return "-";
  const typeMap: Record<string, string> = {
    medication: "Medication",
    eye_drops: "Eye Drops",
    surgery: "Surgery",
    laser: "Laser",
    injection: "Injection",
    physical_therapy: "Physical Therapy",
    follow_up: "Follow Up",
    other: "Other",
  };
  return typeMap[type] || type;
};

const getTreatmentTypeSeverity = (type: string | undefined) => {
  if (!type) return "secondary";
  const severityMap: Record<string, string> = {
    medication: "success",
    eye_drops: "info",
    surgery: "danger",
    laser: "warning",
    injection: "help",
    physical_therapy: "info",
    follow_up: "success",
    other: "secondary",
  };
  return severityMap[type] || "secondary";
};
</script>

<style scoped>
.treatment-page {
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
