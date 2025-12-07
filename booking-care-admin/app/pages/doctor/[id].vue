<template>
  <div class="doctor-view-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Button
            icon="pi pi-arrow-left"
            severity="secondary"
            text
            @click="$router.push('/doctor')"
          />
          <h2 class="page-title">Doctor Information</h2>
        </div>
        <div class="flex gap-2">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            @click="$router.push(`/doctor/edit/${id}`)"
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

    <div v-else-if="doctor" class="doctor-details">
      <Card>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="detail-section">
              <h3 class="section-title">Basic Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Code</label>
                  <p class="detail-value">{{ doctor.code || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Full Name</label>
                  <p class="detail-value">{{ doctor.fullName }}</p>
                </div>
                <div class="detail-item">
                  <label>Phone</label>
                  <p class="detail-value">{{ doctor.phone }}</p>
                </div>
                <div class="detail-item">
                  <label>Email</label>
                  <p class="detail-value">{{ doctor.email || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Gender</label>
                  <Tag
                    :value="formatGender(doctor.gender)"
                    :severity="getGenderSeverity(doctor.gender)"
                  />
                </div>
                <div class="detail-item">
                  <label>Date of Birth</label>
                  <p class="detail-value">
                    {{ formatDate(doctor.dateOfBirth) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Address</label>
                  <p class="detail-value">{{ doctor.address || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Status</label>
                  <Tag
                    :value="doctor.isActive ? 'Active' : 'Inactive'"
                    :severity="doctor.isActive ? 'success' : 'danger'"
                  />
                </div>
                <div v-if="doctor.avatar" class="detail-item">
                  <label>Avatar</label>
                  <img
                    :src="`${S3_URL}/${doctor.avatar}`"
                    :alt="doctor.fullName"
                    class="w-32 h-32 rounded object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- Professional Information -->
            <div class="detail-section">
              <h3 class="section-title">Professional Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>License Number</label>
                  <p class="detail-value">
                    {{ doctor.licenseNumber || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Specialization</label>
                  <p class="detail-value">
                    {{ doctor.specialization || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Degree</label>
                  <p class="detail-value">{{ doctor.degree || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Experience</label>
                  <p class="detail-value">{{ doctor.experience || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Department</label>
                  <p class="detail-value">
                    {{ doctor.department?.name || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Created At</label>
                  <p class="detail-value">
                    {{ formatDateTime(doctor.createdAt) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Updated At</label>
                  <p class="detail-value">
                    {{ formatDateTime(doctor.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">Doctor not found</p>
    </div>
  </div>

  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Delete Doctor"
    :modal="true"
  >
    <p>Are you sure you want to delete this doctor?</p>
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
        @click="deleteDoctor"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDoctorStore } from "~/stores/doctor.service";

useHead({
  title: "Doctor Information - Booking Care Admin",
});

const config = useRuntimeConfig();
const S3_URL = config.public.s3Url;

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const doctorStore = useDoctorStore();
const deleteDialogVisible = ref(false);
const loading = computed(() => doctorStore.isLoading);
const doctor = computed(() => doctorStore.getCurrentDoctor);

onMounted(async () => {
  try {
    await doctorStore.fetchDoctorById(id);
  } catch (error) {
    console.error("Error loading doctor:", error);
  }
});

const confirmDelete = () => {
  deleteDialogVisible.value = true;
};

const deleteDoctor = async () => {
  try {
    await doctorStore.deleteDoctor(id);
    deleteDialogVisible.value = false;
    router.push("/doctor");
  } catch (error) {
    console.error("Error deleting doctor:", error);
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
.doctor-view-page {
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

.doctor-details {
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

