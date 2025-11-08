<template>
  <div class="prescription-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Prescription Management</h2>
        <RouterLink to="/prescription/create" class="btn btn-primary">
          <Button label="New Prescription" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Prescriptions</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="prescriptionNumber" header="Prescription Number"></Column>
      <Column header="Patient">
        <template #body="slotProps">
          {{ slotProps.data.patient?.fullName || slotProps.data.patientId }}
        </template>
      </Column>
      <Column header="Doctor">
        <template #body="slotProps">
          {{ slotProps.data.doctor?.fullName || slotProps.data.doctorId }}
        </template>
      </Column>
      <Column field="diagnosis" header="Diagnosis"></Column>
      <Column field="status" header="Status">
        <template #body="slotProps">
          <span
            :class="{
              'text-yellow-600': slotProps.data.status === 'pending',
              'text-green-600': slotProps.data.status === 'filled',
              'text-red-600': slotProps.data.status === 'cancelled',
            }"
          >
            {{ slotProps.data.status }}
          </span>
        </template>
      </Column>
      <Column field="filledAt" header="Filled At">
        <template #body="slotProps">
          {{ slotProps.data.filledAt ? new Date(slotProps.data.filledAt).toLocaleDateString() : '-' }}
        </template>
      </Column>
      <Column field="notes" header="Notes"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" />
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
    header="Delete Prescription"
    :modal="true"
  >
    <p>Are you sure you want to delete this prescription?</p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="deleteDialogVisible = false"
      />
      <Button label="Delete" icon="pi pi-trash" @click="deletePrescription" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { usePrescriptionStore } from "~/stores/prescription.service";

const deleteDialogVisible = ref(false);
const selectedPrescriptionId = ref("");

const prescriptionStore = usePrescriptionStore();
const search = ref("");
onMounted(() => {
  prescriptionStore.fetchPrescriptions();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedPrescriptionId.value = id;
};

const deletePrescription = async () => {
  try {
    await prescriptionStore.deletePrescription(selectedPrescriptionId.value);
    deleteDialogVisible.value = false;
    prescriptionStore.fetchPrescriptions();
  } catch (error) {
    console.error("Error deleting prescription:", error);
  }
};

const records = computed(() => prescriptionStore.getRecords);

const handleSearch = () => {
  prescriptionStore.fetchPrescriptions(1, 10, search.value);
};
</script>
