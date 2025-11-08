<template>
  <div class="treatment-page">
    <div class="page-header">
      <div>
        <h2 class="page-title">Appointment Management</h2>
        <p class="page-description">Manage appointment records</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const treatments = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditMode = ref(false);
const selectedTreatment = ref(null);
</script>
