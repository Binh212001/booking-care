<template>
  <div class="medicine-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Medicine Management</h2>
        <RouterLink to="/medicine/create" class="btn btn-primary">
          <Button label="New Medicine" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Medicines</span>
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
      <Column field="activeIngredient" header="Active Ingredient">
        <template #body="slotProps">
          {{ slotProps.data.activeIngredient || "-" }}
        </template>
      </Column>
      <Column field="form" header="Form">
        <template #body="slotProps">
          <Tag
            v-if="slotProps.data.form"
            :value="formatForm(slotProps.data.form)"
            :severity="getFormSeverity(slotProps.data.form)"
          />
          <span v-else>-</span>
        </template>
      </Column>
      <Column field="manufacturer" header="Manufacturer">
        <template #body="slotProps">
          {{ slotProps.data.manufacturer || "-" }}
        </template>
      </Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="stock" header="Stock">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.stock ?? 0"
            :severity="getStockSeverity(slotProps.data.stock)"
          />
        </template>
      </Column>
      <Column field="isEyeMedication" header="Eye Medication">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.isEyeMedication ? 'Yes' : 'No'"
            :severity="slotProps.data.isEyeMedication ? 'info' : 'secondary'"
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
            <RouterLink :to="`/medicine/${slotProps.data.id}`">
              <Button icon="pi pi-eye" severity="info" />
            </RouterLink>
            <RouterLink :to="`/medicine/edit/${slotProps.data.id}`">
              <Button icon="pi pi-pencil" />
            </RouterLink>
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
      <Button label="Delete" icon="pi pi-trash" @click="deleteMedicine" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useMedicineStore } from "~/stores/medicine.service";

useHead({
  title: "Medicine Management - Booking Care Admin",
});

const deleteDialogVisible = ref(false);
const selectedMedicineId = ref("");

const medicineStore = useMedicineStore();
const search = ref("");
onMounted(() => {
  medicineStore.fetchMedicines();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedMedicineId.value = id;
};

const deleteMedicine = async () => {
  try {
    await medicineStore.deleteMedicine(selectedMedicineId.value);
    deleteDialogVisible.value = false;
    medicineStore.fetchMedicines();
  } catch (error) {
    console.error("Error deleting medicine:", error);
  }
};

// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => medicineStore.getRecords);

const handleSearch = () => {
  medicineStore.fetchMedicines(1, 10, search.value);
};

const formatPrice = (price: number | undefined) => {
  if (!price) return "-";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
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
.medicine-page {
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
</style>
