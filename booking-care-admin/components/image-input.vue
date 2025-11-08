<template>
  <span
    class="h-[100px] w-[100px] relative flex items-center justify-center border rounded overflow-hidden"
  >
    <div v-if="modelValue" class="w-full h-full">
      <img :src="modelValue" alt="Image" class="w-full h-full object-cover" />
      <button
        type="button"
        class="absolute top-1 right-1 p-1 rounded-full bg-gray-800 bg-opacity-50 text-white text-xs hover:bg-opacity-80 z-10"
        @click.prevent="removeImage"
        aria-label="Remove Image"
      >
        ×
      </button>
    </div>
    <label
      v-else
      class="flex flex-col items-center justify-center w-full h-full cursor-pointer"
    >
      <input
        type="file"
        accept="image/*"
        @change="handleFileChange($event)"
        class="hidden"
        :name="name"
      />
      <span class="text-gray-400 text-xs">Click to upload</span>
    </label>
  </span>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string;
  name?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const objectUrl = ref<string | null>(null);

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value); // Clean up previous objectURL
    }
    objectUrl.value = URL.createObjectURL(file);
    emit("update:modelValue", objectUrl.value);
  }
};

const removeImage = () => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = null;
  }
  emit("update:modelValue", "");
};
</script>
