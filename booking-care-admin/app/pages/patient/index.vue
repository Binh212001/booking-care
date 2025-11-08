<template>
  <div class="patient-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Patient Management</h2>
        <RouterLink to="/patient/create" class="btn btn-primary">
          <Button label="New Patient" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Patients</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="fullName" header="Full Name"></Column>
      <Column header="Image" v-if="hasAvatar">
        <template #body="slotProps">
          <img
            v-if="slotProps.data.avatar"
            :src="`${S3_URL}/${slotProps.data.avatar}`"
            :alt="slotProps.data.avatar"
            class="w-24 rounded"
          />
        </template>
      </Column>
      <Column field="phone" header="Phone">
        <template #body="slotProps">
          {{ slotProps.data.phone }}
        </template>
      </Column>
      <Column field="email" header="Email">
        <template #body="slotProps">
          {{ slotProps.data.email }}
        </template>
      </Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="dateOfBirth" header="Date of Birth"></Column>
      <Column field="address" header="Address"></Column>
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
      <Button label="Delete" icon="pi pi-trash" @click="deletePatient" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { usePatientStore } from "~/stores/patient.service";

const config = useRuntimeConfig();
const S3_URL = config.public.s3Url;
const deleteDialogVisible = ref(false);
const selectedPatientId = ref("");

const patientStore = usePatientStore();
const search = ref("");
onMounted(() => {
  patientStore.fetchPatients();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedPatientId.value = id;
};

const deletePatient = async () => {
  try {
    await patientStore.deletePatient(selectedPatientId.value);
    deleteDialogVisible.value = false;
    patientStore.fetchPatients();
  } catch (error) {
    console.error("Error deleting patient:", error);
  }
};
// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => patientStore.getRecords);

const handleSearch = () => {
  patientStore.fetchPatients(1, 10, search.value);
};

const hasAvatar = computed(() => {
  return records.value.some((record: any) => record.avatar);
});
</script>
