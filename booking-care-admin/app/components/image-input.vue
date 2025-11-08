<template>
  <div class="h-[100px] w-[100px] flex flex-col gap-1">
    <div v-if="previewUrl" class="relative w-full h-full">
      <img
        :src="previewUrl"
        alt="Image"
        class="w-full h-full object-cover rounded"
      />
      <button
        type="button"
        class="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 border shadow hover:bg-opacity-100"
        @click="removeImage"
        aria-label="Remove image"
      >
        &times;
      </button>
    </div>
    <input
      v-else
      type="file"
      accept="image/*"
      @change="handleFileChange"
      class="w-full h-full"
      :name="name"
    />
    <!-- Normally you would want to display errors about the image, not the value itself -->
    <!--
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
    -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

const props = defineProps<{
  modelValue: string;
  name: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: File | null): void;
}>();

const previewUrl = ref<string>(props.modelValue);

let fileObjectUrl: string | null = null;

watch(
  () => props.modelValue,
  (newVal) => {
    previewUrl.value = newVal;
    // We might want to revoke previously created object URL here,
    // if the modelValue is a blob url and was created in this component.
    if (
      fileObjectUrl &&
      previewUrl.value !== fileObjectUrl &&
      fileObjectUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(fileObjectUrl);
      fileObjectUrl = null;
    }
  }
);

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] as File;
  if (file) {
    if (fileObjectUrl) {
      URL.revokeObjectURL(fileObjectUrl);
    }
    fileObjectUrl = URL.createObjectURL(file);
    previewUrl.value = fileObjectUrl;
    emit("update:modelValue", file);
  }
};

const removeImage = () => {
  // Revoke blob url if set by this component
  if (fileObjectUrl) {
    URL.revokeObjectURL(fileObjectUrl);
    fileObjectUrl = null;
  }
  previewUrl.value = "";
  emit("update:modelValue", null);
};

onUnmounted(() => {
  if (fileObjectUrl) {
    URL.revokeObjectURL(fileObjectUrl);
  }
});
</script>
