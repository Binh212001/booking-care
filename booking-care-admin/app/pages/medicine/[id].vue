<template>
  <div class="medicine-view-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <Button
            icon="pi pi-arrow-left"
            severity="secondary"
            text
            @click="$router.push('/medicine')"
          />
          <h2 class="page-title">Medicine Information</h2>
        </div>
        <div class="flex gap-2">
          <Button
            label="Edit"
            icon="pi pi-pencil"
            @click="$router.push(`/medicine/edit/${id}`)"
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

    <div v-else-if="medicine" class="medicine-details">
      <Card>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="detail-section">
              <h3 class="section-title">Basic Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Name</label>
                  <p class="detail-value">{{ medicine.name }}</p>
                </div>
                <div class="detail-item">
                  <label>Code</label>
                  <p class="detail-value">{{ medicine.code || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Active Ingredient</label>
                  <p class="detail-value">
                    {{ medicine.activeIngredient || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Dosage</label>
                  <p class="detail-value">{{ medicine.dosage || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Unit</label>
                  <p class="detail-value">{{ medicine.unit || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Form</label>
                  <Tag
                    v-if="medicine.form"
                    :value="formatForm(medicine.form)"
                    :severity="getFormSeverity(medicine.form)"
                  />
                  <span v-else class="detail-value">-</span>
                </div>
                <div class="detail-item">
                  <label>Status</label>
                  <Tag
                    :value="medicine.isActive ? 'Active' : 'Inactive'"
                    :severity="medicine.isActive ? 'success' : 'danger'"
                  />
                </div>
                <div class="detail-item">
                  <label>Eye Medication</label>
                  <Tag
                    :value="medicine.isEyeMedication ? 'Yes' : 'No'"
                    :severity="medicine.isEyeMedication ? 'info' : 'secondary'"
                  />
                </div>
              </div>
            </div>

            <!-- Manufacturer & Pricing -->
            <div class="detail-section">
              <h3 class="section-title">Manufacturer & Pricing</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Manufacturer</label>
                  <p class="detail-value">
                    {{ medicine.manufacturer || "-" }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Country</label>
                  <p class="detail-value">{{ medicine.country || "-" }}</p>
                </div>
                <div class="detail-item">
                  <label>Price</label>
                  <p class="detail-value">{{ formatPrice(medicine.price) }}</p>
                </div>
                <div class="detail-item">
                  <label>Stock</label>
                  <Tag
                    :value="medicine.stock ?? 0"
                    :severity="getStockSeverity(medicine.stock)"
                  />
                </div>
                <div class="detail-item">
                  <label>Created At</label>
                  <p class="detail-value">
                    {{ formatDateTime(medicine.createdAt) }}
                  </p>
                </div>
                <div class="detail-item">
                  <label>Updated At</label>
                  <p class="detail-value">
                    {{ formatDateTime(medicine.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Indication -->
            <div
              v-if="medicine.indication"
              class="detail-section md:col-span-2"
            >
              <h3 class="section-title">Indication</h3>
              <p class="detail-value">{{ medicine.indication }}</p>
            </div>

            <!-- Contraindication -->
            <div
              v-if="medicine.contraindication"
              class="detail-section md:col-span-2"
            >
              <h3 class="section-title">Contraindication</h3>
              <p class="detail-value">{{ medicine.contraindication }}</p>
            </div>

            <!-- Side Effects -->
            <div
              v-if="medicine.sideEffects"
              class="detail-section md:col-span-2"
            >
              <h3 class="section-title">Side Effects</h3>
              <p class="detail-value">{{ medicine.sideEffects }}</p>
            </div>

            <!-- Usage -->
            <div v-if="medicine.usage" class="detail-section md:col-span-2">
              <h3 class="section-title">Usage</h3>
              <p class="detail-value">{{ medicine.usage }}</p>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="flex justify-center items-center py-8">
      <p class="text-gray-500">Medicine not found</p>
    </div>
  </div>

  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Delete Medicine"
    :modal="true"
  >
    <p>Are you sure you want to delete this medicine?</p>
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
        @click="deleteMedicine"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMedicineStore } from "~/stores/medicine.service";

useHead({
  title: "Medicine Information - Booking Care Admin",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const medicineStore = useMedicineStore();
const deleteDialogVisible = ref(false);
const loading = computed(() => medicineStore.isLoading);
const medicine = computed(() => medicineStore.currentMedicine);

onMounted(async () => {
  try {
    await medicineStore.fetchMedicineById(id);
  } catch (error) {
    console.error("Error loading medicine:", error);
  }
});

const confirmDelete = () => {
  deleteDialogVisible.value = true;
};

const deleteMedicine = async () => {
  try {
    await medicineStore.deleteMedicine(id);
    deleteDialogVisible.value = false;
    router.push("/medicine");
  } catch (error) {
    console.error("Error deleting medicine:", error);
  }
};

const formatPrice = (price: number | undefined) => {
  if (!price) return "-";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDateTime = (date: string | Date | undefined) => {
  if (!date) return "-";
  return new Date(date).toLocaleString();
};

const formatForm = (form: string | undefined) => {
  if (!form) return "-";
  const formMap: Record<string, string> = {
    tablet: "Tablet",
    capsule: "Capsule",
    eye_drops: "Eye Drops",
    ointment: "Ointment",
    injection: "Injection",
    other: "Other",
  };
  return formMap[form] || form;
};

const getFormSeverity = (form: string | undefined) => {
  if (!form) return "secondary";
  const severityMap: Record<string, string> = {
    tablet: "success",
    capsule: "info",
    eye_drops: "warning",
    ointment: "help",
    injection: "danger",
    other: "secondary",
  };
  return severityMap[form] || "secondary";
};

const getStockSeverity = (stock: number | undefined) => {
  if (stock === undefined || stock === null) return "secondary";
  if (stock === 0) return "danger";
  if (stock < 10) return "warning";
  return "success";
};
</script>

<style scoped>
.medicine-view-page {
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

.medicine-details {
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
