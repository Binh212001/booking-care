<template>
  <div>
    <div class="service-edit-page">
      <Toast />
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Chỉnh sửa dịch vụ</h1>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-8">
        <ProgressSpinner />
      </div>

      <Form
        v-else
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="w-full"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col pb-2 gap-1 w-full">
            <label for="name"
              >Tên dịch vụ <span class="text-red-500">*</span></label
            >
            <InputText
              id="name"
              name="name"
              type="text"
              placeholder="Tên dịch vụ"
              fluid
            />
            <Message
              v-if="$form.name?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.name?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="code">Mã dịch vụ</label>
            <InputText
              id="code"
              name="code"
              type="text"
              placeholder="Mã dịch vụ"
              fluid
            />
            <Message
              v-if="$form.code?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.code?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1 md:col-span-2">
            <label for="description">Mô tả</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Mô tả dịch vụ"
              :rows="3"
              fluid
            />
            <Message
              v-if="$form.description?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.description?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="price"
              >Giá dịch vụ (VND) <span class="text-red-500">*</span></label
            >
            <InputNumber
              id="price"
              name="price"
              placeholder="Giá dịch vụ"
              :min="0"
              :maxFractionDigits="2"
              mode="decimal"
              fluid
            />
            <Message
              v-if="$form.price?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.price?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="unit">Đơn vị tính</label>
            <InputText
              id="unit"
              name="unit"
              type="text"
              placeholder="Ví dụ: lần, mắt, buổi"
              fluid
            />
            <Message
              v-if="$form.unit?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.unit?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="duration">Thời gian (phút)</label>
            <InputNumber
              id="duration"
              name="duration"
              placeholder="Thời gian"
              :min="1"
              :maxFractionDigits="0"
              mode="decimal"
              fluid
            />
            <Message
              v-if="$form.duration?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.duration?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="type"
              >Loại dịch vụ <span class="text-red-500">*</span></label
            >
            <Dropdown
              id="type"
              name="type"
              :options="serviceTypes"
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn loại dịch vụ"
              fluid
              @update:modelValue="handleTypeChange"
            />
            <Message
              v-if="$form.type?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.type?.error?.message }}</Message
            >
          </div>

          <div v-if="showEyeServiceType" class="flex flex-col pb-2 gap-1">
            <label for="eyeServiceType">Loại dịch vụ mắt</label>
            <Dropdown
              id="eyeServiceType"
              name="eyeServiceType"
              :options="eyeServiceTypes"
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn loại dịch vụ mắt"
              fluid
              showClear
            />
            <Message
              v-if="$form.eyeServiceType?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.eyeServiceType?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="isActive">Trạng thái</label>
            <div class="flex items-center gap-2">
              <InputSwitch id="isActive" name="isActive" />
              <span>{{
                $form.isActive?.value ? "Hoạt động" : "Không hoạt động"
              }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <Button
            type="submit"
            severity="secondary"
            label="Cập nhật"
            :loading="submitting"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import InputText from "primevue/inputtext";
import { ref, computed, onMounted } from "vue";
import { z } from "zod";
import { useServiceStore } from "~/stores/service.service";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id as string;

const serviceStore = useServiceStore();
const loading = ref(false);
const submitting = ref(false);
const selectedType = ref("");

const serviceTypes = [
  { label: "Khám bệnh", value: "examination" },
  { label: "Phẫu thuật", value: "surgery" },
  { label: "Xét nghiệm", value: "test" },
  { label: "Tư vấn", value: "consultation" },
  { label: "Khác", value: "other" },
];

const eyeServiceTypes = [
  { label: "Khám tổng quát mắt", value: "general_eye_exam" },
  { label: "Đo khúc xạ", value: "refraction" },
  { label: "Khám khe đèn", value: "slit_lamp" },
  { label: "Khám đáy mắt", value: "fundus_exam" },
  { label: "Đo nhãn áp", value: "tonometry" },
  { label: "Thị trường", value: "visual_field" },
  { label: "Phẫu thuật đục thủy tinh thể", value: "cataract_surgery" },
  { label: "LASIK", value: "lasik" },
  { label: "PRK", value: "prk" },
  { label: "Điều trị glocom", value: "glaucoma_treatment" },
  { label: "Phẫu thuật võng mạc", value: "retinal_surgery" },
  { label: "Ghép giác mạc", value: "corneal_transplant" },
  { label: "Khác", value: "other" },
];

const showEyeServiceType = computed(() => {
  return selectedType.value === "examination";
});

const handleTypeChange = (value: string | null) => {
  selectedType.value = value || "";
};

const initialValues = ref<{
  name: string;
  code: string;
  description: string;
  price: number | null;
  unit: string;
  duration: number | null;
  type: string;
  eyeServiceType: string;
  isActive: boolean;
}>({
  name: "",
  code: "",
  description: "",
  price: null,
  unit: "",
  duration: null,
  type: "",
  eyeServiceType: "",
  isActive: true,
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z
        .string()
        .min(1, { message: "Tên dịch vụ là bắt buộc." })
        .max(255, { message: "Tên dịch vụ không được vượt quá 255 ký tự." }),
      code: z
        .string()
        .max(50, { message: "Mã dịch vụ không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      description: z.string().optional().or(z.literal("")),
      price: z
        .number({
          required_error: "Giá dịch vụ là bắt buộc.",
          invalid_type_error: "Giá dịch vụ phải là số.",
        })
        .min(0, { message: "Giá dịch vụ phải lớn hơn hoặc bằng 0." }),
      unit: z
        .string()
        .max(50, { message: "Đơn vị tính không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      duration: z
        .number({
          invalid_type_error: "Thời gian phải là số.",
        })
        .min(1, { message: "Thời gian phải lớn hơn 0." })
        .optional()
        .nullable(),
      type: z.enum(
        ["examination", "surgery", "test", "consultation", "other"],
        {
          required_error: "Vui lòng chọn loại dịch vụ.",
        }
      ),
      eyeServiceType: z
        .enum(
          [
            "general_eye_exam",
            "refraction",
            "slit_lamp",
            "fundus_exam",
            "tonometry",
            "visual_field",
            "cataract_surgery",
            "lasik",
            "prk",
            "glaucoma_treatment",
            "retinal_surgery",
            "corneal_transplant",
            "other",
          ],
          {
            errorMap: () => ({ message: "Loại dịch vụ mắt không hợp lệ." }),
          }
        )
        .optional()
        .or(z.literal("")),
      isActive: z.boolean().default(true),
    })
  )
);

onMounted(async () => {
  try {
    loading.value = true;
    const service = await serviceStore.fetchServiceById(id);
    if (service) {
      initialValues.value = {
        name: service.name || "",
        code: service.code || "",
        description: service.description || "",
        price: service.price ?? null,
        unit: service.unit || "",
        duration: service.duration ?? null,
        type: service.type || "",
        eyeServiceType: service.eyeServiceType || "",
        isActive: service.isActive ?? true,
      };
      selectedType.value = service.type || "";
    }
  } catch (error) {
    console.error("Error loading service:", error);
  } finally {
    loading.value = false;
  }
});

const onFormSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: any;
}) => {
  try {
    if (valid) {
      submitting.value = true;
      // Prepare submit data
      const submitData = {
        name: values.name,
        code: values.code?.trim() || undefined,
        description: values.description?.trim() || undefined,
        price: Number(values.price),
        unit: values.unit?.trim() || undefined,
        duration:
          values.duration !== null && values.duration !== undefined
            ? Number(values.duration)
            : undefined,
        type: values.type,
        eyeServiceType:
          values.type === "examination" && values.eyeServiceType
            ? values.eyeServiceType
            : undefined,
        isActive: values.isActive ?? true,
      };

      await serviceStore.updateService(id, submitData as any);
      navigateTo("/service");
    }
  } catch (error) {
    console.error("Error updating service:", error);
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.service-edit-page {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
