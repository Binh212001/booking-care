<template>
  <div class="treatment-view-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Button
            icon="pi pi-arrow-left"
            severity="secondary"
            text
            @click="$router.push('/treatment')"
          />
          <h2 class="page-title">Treatment Details</h2>
        </div>
        <div class="flex gap-2">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            @click="$router.push(`/treatment/${id}/edit`)"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDelete"
          />
        </div>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="treatment" class="treatment-details">
      <Card>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="detail-section">
              <h3 class="section-title">Basic Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Name</label>
                  <p class="detail-value">{{ treatment.name }}</p>
                </div>
                <div class="detail-item">
                  <label>Type</label>
                  <Tag
                    v-if="treatment.treatmentType"
                    :value="formatTreatmentType(treatment.treatmentType)"
                    :severity="getTreatmentTypeSeverity(treatment.treatmentType)"
                  />
                  <span v-else class="detail-value">-</span>
                </div>
                <div class="detail-item">
                  <label>Status</label>
                  <Tag
                    :value="formatStatus(treatment.status)"
                    :severity="getStatusSeverity(treatment.status)"
                  />
                </div>
                <div class="detail-item">
                  <label>Start Date</label>
                  <p class="detail-value">
                    {{ formatDate(treatment.startDate) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>End Date</label>
                  <p class="detail-value">
                    {{ formatDate(treatment.endDate) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Related Information -->
            <div class="detail-section">
              <h3 class="section-title">Related Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Doctor</label>
                  <p class="detail-value">
                    {{ treatment.doctor?.fullName || treatment.doctorId || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Medical Record ID</label>
                  <p class="detail-value">
                    {{ treatment.medicalRecordId || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Created At</label>
                  <p class="detail-value">
                    {{ formatDateTime(treatment.createdAt) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Updated At</label>
                  <p class="detail-value">
                    {{ formatDateTime(treatment.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div v-if="treatment.description" class="detail-section md:col-span-2">
              <h3 class="section-title">Description</h3>
              <p class="detail-value">{{ treatment.description }}</p>
            </div>

            <!-- Result -->
            <div v-if="treatment.result" class="detail-section md:col-span-2">
              <h3 class="section-title">Result</h3>
              <p class="detail-value">{{ treatment.result }}</p>
            </div>

            <!-- Notes -->
            <div v-if="treatment.notes" class="detail-section md:col-span-2">
              <h3 class="section-title">Notes</h3>
              <p class="detail-value">{{ treatment.notes }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">Treatment not found</p>
    </div>
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
      <Button label="Delete" icon="pi pi-trash" severity="danger" @click="deleteTreatment" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTreatmentStore } from "~/stores/treatment.service";

useHead({
  title: "Treatment Details - Booking Care Admin",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const treatmentStore = useTreatmentStore();
const deleteDialogVisible = ref(false);
const loading = computed(() => treatmentStore.isLoading);
const treatment = computed(() => treatmentStore.getCurrentTreatment);

onMounted(async () => {
  try {
    await treatmentStore.fetchTreatmentById(id);
  } catch (error) {
    console.error("Error loading treatment:", error);
  }
});

const confirmDelete = () => {
  deleteDialogVisible.value = true;
};

const deleteTreatment = async () => {
  try {
    await treatmentStore.deleteTreatment(id);
    deleteDialogVisible.value = false;
    router.push("/treatment");
  } catch (error) {
    console.error("Error deleting treatment:", error);
  }
};

const formatDate = (date: string | Date | undefined) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const formatDateTime = (date: string | Date | undefined) => {
  if (!date) return "-";
  return new Date(date).toLocaleString();
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
.treatment-view-page {
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

.treatment-details {
  margin-top: 1.5rem;
}

.detail-section {
  padding: 1rem 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 1rem;
  color: #1e293b;
  word-break: break-word;
}
</style>

