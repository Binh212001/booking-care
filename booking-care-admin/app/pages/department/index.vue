<template>
  <div class="department-page">
    <div class="page-header">
      <div class="flex justify-between items-center">
        <h2 class="page-title">Department Management</h2>
        <Button
          label="New Department"
          icon="pi pi-plus"
          @click="createDepartmentDialogVisible = true"
        />
      </div>
    </div>

    <DataTable :value="records" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">Departments</span>
          <InputText
            v-model="search"
            placeholder="Search"
            @input="handleSearch"
          />
        </div>
      </template>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description">
        <template #body="slotProps">
          <span class="truncate-text">
            {{ slotProps.data.description || "-" }}
          </span>
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
              @click="openUpdateDepartmentDialog(slotProps.data.id)"
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
    header="Delete Department"
    :modal="true"
  >
    <p>Are you sure you want to delete this department?</p>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="deleteDialogVisible = false"
      />
      <Button label="Delete" icon="pi pi-trash" @click="deleteDepartment" />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="createDepartmentDialogVisible"
    header="Create Department"
    :modal="true"
  >
    <Form
      class="flex flex-col gap-2"
      v-slot="$form"
      :initialValues="newDepartment"
      :resolver="resolver"
      @submit="createDepartment"
    >
      <InputText
        v-model="newDepartment.name"
        name="name"
        placeholder="Department Name"
      />
      <Message
        v-if="$form.name?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.name?.error?.message }}</Message
      >
      <InputText
        v-model="newDepartment.description"
        name="description"
        placeholder="Department Description"
      />
      <Message
        v-if="$form.description?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.description?.error?.message }}</Message
      >
      <InputText
        v-model="newDepartment.code"
        name="code"
        placeholder="Department Code"
      />
      <Message
        v-if="$form.code?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.code?.error?.message }}</Message
      >
      <Button label="Create" icon="pi pi-check" @click="createDepartment" />
    </Form>
  </Dialog>

  <!-- Update Department Dialog -->
  <Dialog
    v-model:visible="updateDepartmentDataVisible"
    header="Update Department"
    :modal="true"
  >
    <Form
      v-slot="$form"
      class="flex flex-col gap-2"
      :initialValues="updateDepartmentData"
      :resolver="resolver"
      @submit="updateDepartment"
    >
      <InputText
        v-model="updateDepartmentData.name"
        name="name"
        placeholder="Department Name"
      />
      <Message
        v-if="$form.name?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.name?.error?.message }}</Message
      >
      <InputText
        v-model="updateDepartmentData.description"
        name="description"
        placeholder="Department Description"
      />
      <Message
        v-if="$form.description?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.description?.error?.message }}</Message
      >

      <Button label="Update" icon="pi pi-check" @click="updateDepartment" />
    </Form>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useDepartmentStore } from "~/stores/department.service";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

useHead({
  title: "Department Management - Booking Care Admin",
});

const deleteDialogVisible = ref(false);
const selectedDepartmentId = ref("");

const departmentStore = useDepartmentStore();
const search = ref("");
onMounted(() => {
  departmentStore.fetchDepartments();
});

const confirmDelete = (id: string) => {
  deleteDialogVisible.value = true;
  selectedDepartmentId.value = id;
};

const deleteDepartment = async () => {
  try {
    await departmentStore.deleteDepartment(selectedDepartmentId.value);
    deleteDialogVisible.value = false;
    departmentStore.fetchDepartments();
  } catch (error) {
    console.error("Error deleting department:", error);
  }
};

// Use computed to unwrap Pinia getters for reactivity/type
const records = computed(() => departmentStore.getRecords);

const handleSearch = () => {
  departmentStore.fetchDepartments(1, 10, search.value);
};
//Create Department
const createDepartmentDialogVisible = ref(false);
const newDepartment = ref({
  name: "",
  description: "",
  code: "",
});
const createDepartment = async () => {
  await departmentStore.createDepartment(newDepartment.value as any);
  createDepartmentDialogVisible.value = false;
  departmentStore.fetchDepartments();
};

//Resolver
const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(1, { message: "Tên khoa là bắt buộc" }),
      description: z.string().optional().nullable().optional(),
      code: z.string().optional().nullable().optional(),
    })
  )
);

//Update Department
const updateDepartmentDataVisible = ref(false);
const updateDepartmentData = ref({
  id: "",
  name: "",
  description: "",
  code: "",
});
const openUpdateDepartmentDialog = (id: string) => {
  updateDepartmentDataVisible.value = true;
  departmentStore.getDepartmentById(id).then((response) => {
    updateDepartmentData.value = response as any;
  });
};

const updateDepartment = async () => {
  await departmentStore.updateDepartment(updateDepartmentData.value as any);
  updateDepartmentDataVisible.value = false;
  departmentStore.fetchDepartments();
};
</script>

<style scoped>
.department-page {
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
