<template>
  <div class="doctor-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Doctor Management</h2>
        <RouterLink to="/doctor/create" class="btn btn-primary">
          <Button label="New Doctor" icon="pi pi-plus" />
        </RouterLink>
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Doctors</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="fullName" header="Full Name"></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
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
      <Column field="licenseNumber" header="License Number"></Column>
      <Column field="specialization" header="Specialization"></Column>
      <Column field="degree" header="Degree"></Column>
      <Column field="experience" header="Experience"></Column>
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
      <Button label="Delete" icon="pi pi-trash" @click="deleteDoctor" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useDoctorStore } from "~/stores/doctor.service";

const config = useRuntimeConfig();
const S3_URL = config.public.s3Url;
const deleteDialogVisible = ref(false);
const selectedDoctorId = ref("");
// Define a type for the doctor records for proper typing

const doctorStore = useDoctorStore();
const search = ref("");
onMounted(() => {
  doctorStore.fetchDoctors();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedDoctorId.value = id;
};

const deleteDoctor = async () => {
  try {
    await doctorStore.deleteDoctor(selectedDoctorId.value);
    deleteDialogVisible.value = false;
    doctorStore.fetchDoctors();
  } catch (error) {
    console.error("Error deleting doctor:", error);
  }
};
// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => doctorStore.getRecords);

const handleSearch = () => {
  doctorStore.fetchDoctors(1, 10, search.value);
};
</script>
