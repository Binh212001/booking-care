<template>
  <div class="patient-view-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Button
            icon="pi pi-arrow-left"
            severity="secondary"
            text
            @click="$router.push('/patient')"
          />
          <h2 class="page-title">Patient Information</h2>
        </div>
        <div class="flex gap-2">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            @click="$router.push(`/patient/edit/${id}`)"
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

    <div v-else-if="patient" class="patient-details">
      <Card>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="detail-section">
              <h3 class="section-title">Basic Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Full Name</label>
                  <p class="detail-value">{{ patient.fullName }}</p>
                </div>
                <div class="detail-item">
                  <label>Code</label>
                  <p class="detail-value">{{ patient.code || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Phone</label>
                  <p class="detail-value">{{ patient.phone }}</p>
                </div>
                <div class="detail-item">
                  <label>Email</label>
                  <p class="detail-value">{{ patient.email || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Gender</label>
                  <Tag
                    :value="formatGender(patient.gender)"
                    :severity="getGenderSeverity(patient.gender)"
                  />
                </div>
                <div class="detail-item">
                  <label>Date of Birth</label>
                  <p class="detail-value">
                    {{ formatDate(patient.dateOfBirth) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Identity Card</label>
                  <p class="detail-value">
                    {{ patient.identityCard || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Address</label>
                  <p class="detail-value">{{ patient.address || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Status</label>
                  <Tag
                    :value="patient.isActive ? 'Active' : 'Inactive'"
                    :severity="patient.isActive ? 'success' : 'danger'"
                  />
                </div>
                <div v-if="patient.avatar" class="detail-item">
                  <label>Avatar</label>
                  <img
                    :src="`${S3_URL}/${patient.avatar}`"
                    :alt="patient.fullName"
                    class="w-32 h-32 rounded object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- Medical Information -->
            <div class="detail-section">
              <h3 class="section-title">Medical Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Blood Type</label>
                  <p class="detail-value">{{ patient.bloodType || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Wears Glasses</label>
                  <Tag
                    :value="patient.wearsGlasses ? 'Yes' : 'No'"
                    :severity="patient.wearsGlasses ? 'info' : 'secondary'"
                  />
                </div>
                <div class="detail-item">
                  <label>Wears Contact Lens</label>
                  <Tag
                    :value="patient.wearsContactLens ? 'Yes' : 'No'"
                    :severity="patient.wearsContactLens ? 'info' : 'secondary'"
                  />
                </div>
                <div class="detail-item">
                  <label>Right Eye Power</label>
                  <p class="detail-value">
                    {{ patient.rightEyePower || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Left Eye Power</label>
                  <p class="detail-value">{{ patient.leftEyePower || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Emergency Contact</label>
                  <p class="detail-value">
                    {{ patient.emergencyContact || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Emergency Phone</label>
                  <p class="detail-value">
                    {{ patient.emergencyPhone || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Created At</label>
                  <p class="detail-value">
                    {{ formatDateTime(patient.createdAt) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Updated At</label>
                  <p class="detail-value">
                    {{ formatDateTime(patient.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Medical History -->
            <div
              v-if="patient.medicalHistory"
              class="detail-section md:col-span-2"
            >
              <h3 class="section-title">Medical History</h3>
              <p class="detail-value">{{ patient.medicalHistory }}</p>
            </div>

            <!-- Allergy -->
            <div v-if="patient.allergy" class="detail-section md:col-span-2">
              <h3 class="section-title">Allergy</h3>
              <p class="detail-value">{{ patient.allergy }}</p>
            </div>

            <!-- Eye History -->
            <div v-if="patient.eyeHistory" class="detail-section md:col-span-2">
              <h3 class="section-title">Eye History</h3>
              <p class="detail-value">{{ patient.eyeHistory }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">Patient not found</p>
    </div>
  </div>

  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Delete Patient"
    :modal="true"
  >
    <p>Are you sure you want to delete this patient?</p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="deleteDialogVisible = false"
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        severity="danger"
        @click="deletePatient"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePatientStore } from "~/stores/patient.service";

useHead({
  title: "Patient Information - Booking Care Admin",
});

const config = useRuntimeConfig();
const S3_URL = config.public.s3Url;

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const patientStore = usePatientStore();
const deleteDialogVisible = ref(false);
const loading = computed(() => patientStore.isLoading);
const patient = computed(() => patientStore.getCurrentPatient);

onMounted(async () => {
  try {
    await patientStore.fetchPatientById(id);
  } catch (error) {
    console.error("Error loading patient:", error);
  }
});

const confirmDelete = () => {
  deleteDialogVisible.value = true;
};

const deletePatient = async () => {
  try {
    await patientStore.deletePatient(id);
    deleteDialogVisible.value = false;
    router.push("/patient");
  } catch (error) {
    console.error("Error deleting patient:", error);
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

const formatGender = (gender: string | undefined) => {
  if (!gender) return "-";
  const genderMap: Record<string, string> = {
    male: "Nam",
    female: "Nữ",
    other: "Khác",
  };
  return genderMap[gender] || gender;
};

const getGenderSeverity = (gender: string | undefined) => {
  if (!gender) return "secondary";
  const severityMap: Record<string, string> = {
    male: "info",
    female: "warning",
    other: "help",
  };
  return severityMap[gender] || "secondary";
};
</script>

<style scoped>
.patient-view-page {
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

.patient-details {
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
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
