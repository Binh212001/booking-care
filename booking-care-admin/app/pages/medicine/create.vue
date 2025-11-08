<template>
  <div>
    <div class="medicine-create-page">
      <Toast />
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Tạo mới thuốc</h1>
      </div>

      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="w-full"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col pb-2 gap-1 w-full">
            <label for="name"
              >Tên thuốc <span class="text-red-500">*</span></label
            >
            <InputText
              id="name"
              name="name"
              type="text"
              placeholder="Tên thuốc"
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
            <label for="code">Mã thuốc</label>
            <InputText
              id="code"
              name="code"
              type="text"
              placeholder="Mã thuốc"
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

          <div class="flex flex-col pb-2 gap-1">
            <label for="activeIngredient">Hoạt chất</label>
            <InputText
              id="activeIngredient"
              name="activeIngredient"
              type="text"
              placeholder="Hoạt chất"
              fluid
            />
            <Message
              v-if="$form.activeIngredient?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.activeIngredient?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="dosage">Liều lượng</label>
            <InputText
              id="dosage"
              name="dosage"
              type="text"
              placeholder="Ví dụ: 0.3%"
              fluid
            />
            <Message
              v-if="$form.dosage?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.dosage?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="unit">Đơn vị</label>
            <InputText
              id="unit"
              name="unit"
              type="text"
              placeholder="Ví dụ: ml, viên"
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
            <label for="form">Dạng thuốc</label>
            <Dropdown
              id="form"
              name="form"
              :options="formTypes"
              optionLabel="label"
              optionValue="value"
              placeholder="Chọn dạng thuốc"
              fluid
              showClear
            />
            <Message
              v-if="$form.form?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.form?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="manufacturer">Nhà sản xuất</label>
            <InputText
              id="manufacturer"
              name="manufacturer"
              type="text"
              placeholder="Nhà sản xuất"
              fluid
            />
            <Message
              v-if="$form.manufacturer?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.manufacturer?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="country">Nước sản xuất</label>
            <InputText
              id="country"
              name="country"
              type="text"
              placeholder="Nước sản xuất"
              fluid
            />
            <Message
              v-if="$form.country?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.country?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="price">Giá thuốc (VND)</label>
            <InputNumber
              id="price"
              name="price"
              placeholder="Giá thuốc"
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
            <label for="stock">Tồn kho</label>
            <InputNumber
              id="stock"
              name="stock"
              placeholder="Tồn kho"
              :min="0"
              :maxFractionDigits="0"
              mode="decimal"
              fluid
            />
            <Message
              v-if="$form.stock?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.stock?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1 md:col-span-2">
            <label for="indication">Chỉ định</label>
            <Textarea
              id="indication"
              name="indication"
              placeholder="Chỉ định"
              :rows="3"
              fluid
            />
            <Message
              v-if="$form.indication?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.indication?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1 md:col-span-2">
            <label for="contraindication">Chống chỉ định</label>
            <Textarea
              id="contraindication"
              name="contraindication"
              placeholder="Chống chỉ định"
              :rows="3"
              fluid
            />
            <Message
              v-if="$form.contraindication?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.contraindication?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1 md:col-span-2">
            <label for="sideEffects">Tác dụng phụ</label>
            <Textarea
              id="sideEffects"
              name="sideEffects"
              placeholder="Tác dụng phụ"
              :rows="3"
              fluid
            />
            <Message
              v-if="$form.sideEffects?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.sideEffects?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1 md:col-span-2">
            <label for="usage">Cách dùng</label>
            <Textarea
              id="usage"
              name="usage"
              placeholder="Cách dùng"
              :rows="3"
              fluid
            />
            <Message
              v-if="$form.usage?.invalid"
              severity="error"
              size="small"
              variant="simple"
              >{{ $form.usage?.error?.message }}</Message
            >
          </div>

          <div class="flex flex-col pb-2 gap-1">
            <label for="isEyeMedication">Thuốc mắt</label>
            <div class="flex items-center gap-2">
              <InputSwitch id="isEyeMedication" name="isEyeMedication" />
              <span>{{
                $form.isEyeMedication?.value ? "Có" : "Không"
              }}</span>
            </div>
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
            label="Tạo mới"
            :loading="loading"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { zodResolver } from "@primevue/forms/resolvers/zod";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { z } from "zod";
import { useMedicineStore } from "~/stores/medicine.service";

const medicineStore = useMedicineStore();
const loading = ref(false);

const formTypes = [
  { label: "Viên nén", value: "tablet" },
  { label: "Viên nang", value: "capsule" },
  { label: "Thuốc nhỏ mắt", value: "eye_drops" },
  { label: "Thuốc mỡ", value: "ointment" },
  { label: "Tiêm", value: "injection" },
  { label: "Khác", value: "other" },
];

const initialValues = ref({
  name: "",
  code: "",
  activeIngredient: "",
  dosage: "",
  unit: "",
  form: "",
  manufacturer: "",
  country: "",
  price: null,
  stock: null,
  indication: "",
  contraindication: "",
  sideEffects: "",
  usage: "",
  isEyeMedication: false,
  isActive: true,
});

const resolver = ref(
  zodResolver(
    z.object({
      name: z
        .string()
        .min(1, { message: "Tên thuốc là bắt buộc." })
        .max(255, { message: "Tên thuốc không được vượt quá 255 ký tự." }),
      code: z
        .string()
        .max(50, { message: "Mã thuốc không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      activeIngredient: z
        .string()
        .max(100, { message: "Hoạt chất không được vượt quá 100 ký tự." })
        .optional()
        .or(z.literal("")),
      dosage: z
        .string()
        .max(50, { message: "Liều lượng không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      unit: z
        .string()
        .max(50, { message: "Đơn vị không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      form: z
        .enum(["tablet", "capsule", "eye_drops", "ointment", "injection", "other"], {
          errorMap: () => ({ message: "Dạng thuốc không hợp lệ." }),
        })
        .optional()
        .or(z.literal("")),
      manufacturer: z
        .string()
        .max(100, { message: "Nhà sản xuất không được vượt quá 100 ký tự." })
        .optional()
        .or(z.literal("")),
      country: z
        .string()
        .max(50, { message: "Nước sản xuất không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      price: z
        .number({
          invalid_type_error: "Giá thuốc phải là số.",
        })
        .min(0, { message: "Giá thuốc phải lớn hơn hoặc bằng 0." })
        .optional()
        .nullable(),
      stock: z
        .number({
          invalid_type_error: "Tồn kho phải là số.",
        })
        .min(0, { message: "Tồn kho phải lớn hơn hoặc bằng 0." })
        .optional()
        .nullable(),
      indication: z.string().optional().or(z.literal("")),
      contraindication: z.string().optional().or(z.literal("")),
      sideEffects: z.string().optional().or(z.literal("")),
      usage: z.string().optional().or(z.literal("")),
      isEyeMedication: z.boolean().default(false),
      isActive: z.boolean().default(true),
    })
  )
);

const onFormSubmit = async ({
  valid,
  values,
}: {
  valid: boolean;
  values: any;
}) => {
  try {
    if (valid) {
      loading.value = true;
      // Prepare submit data
      const submitData = {
        name: values.name,
        code: values.code?.trim() || undefined,
        activeIngredient: values.activeIngredient?.trim() || undefined,
        dosage: values.dosage?.trim() || undefined,
        unit: values.unit?.trim() || undefined,
        form: values.form || undefined,
        manufacturer: values.manufacturer?.trim() || undefined,
        country: values.country?.trim() || undefined,
        price:
          values.price !== null && values.price !== undefined
            ? Number(values.price)
            : undefined,
        stock:
          values.stock !== null && values.stock !== undefined
            ? Number(values.stock)
            : undefined,
        indication: values.indication?.trim() || undefined,
        contraindication: values.contraindication?.trim() || undefined,
        sideEffects: values.sideEffects?.trim() || undefined,
        usage: values.usage?.trim() || undefined,
        isEyeMedication: values.isEyeMedication ?? false,
        isActive: values.isActive ?? true,
      };

      await medicineStore.createMedicine(submitData as any);
      navigateTo("/medicine");
    }
  } catch (error) {
    console.error("Error creating medicine:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.medicine-create-page {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

