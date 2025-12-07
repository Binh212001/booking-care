<template>
  <div class="doctor-create-page">
    <Toast />
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Create Doctor</h1>
    </div>

    <Form
      v-slot="$form"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="w-full"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex flex-col pb-2 gap-1">
          <label for="fullName">Full Name</label>
          <InputText
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Full Name"
            fluid
          />
          <Message
            v-if="$form.fullName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.fullName?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="phone">Phone</label>
          <InputText
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone"
            fluid
          />
          <Message
            v-if="$form.phone?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.phone?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="email">Email</label>
          <InputText
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            fluid
          />
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.email?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="licenseNumber">License Number</label>
          <InputText
            id="licenseNumber"
            name="licenseNumber"
            type="text"
            placeholder="License Number"
            fluid
          />
          <Message
            v-if="$form.licenseNumber?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.licenseNumber?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="specialization">Specialization</label>
          <InputText
            id="specialization"
            name="specialization"
            type="text"
            placeholder="Specialization"
            fluid
          />
          <Message
            v-if="$form.specialization?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.specialization?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="degree">Degree</label>
          <InputText
            id="degree"
            name="degree"
            type="text"
            placeholder="Degree"
            fluid
          />
          <Message
            v-if="$form.degree?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.degree?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="experience">Experience</label>
          <InputText
            id="experience"
            name="experience"
            type="text"
            placeholder="Experience"
            fluid
          />
          <Message
            v-if="$form.experience?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.experience?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="gender">Gender</label>
          <Dropdown
            id="gender"
            name="gender"
            :options="[
              { label: 'Nam', value: 'male' },
              { label: 'Nữ', value: 'female' },
              { label: 'Khác', value: 'other' },
            ]"
            optionLabel="label"
            optionValue="value"
            placeholder="Gender"
            fluid
            showClear
          />
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="dateOfBirth">Date of Birth</label>
          <InputText
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            fluid
          />
          <Message
            v-if="$form.dateOfBirth?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.dateOfBirth?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="address">Address</label>
          <InputText
            id="address"
            name="address"
            type="text"
            placeholder="Address"
            fluid
          />
          <Message
            v-if="$form.address?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.address?.error?.message }}</Message
          >
        </div>

        <div class="flex flex-col pb-2 gap-1">
          <label for="departmentId">Department</label>
          <Dropdown
            id="departmentId"
            name="departmentId"
            :options="departments"
            optionLabel="name"
            optionValue="id"
            placeholder="Department"
            fluid
            showClear
          />
        </div>

        <div class="flex flex-col pb-2 gap-1"></div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="avatar">Avatar URL</label>
          <div>
            <ClientOnly>
              <ImageInput
                :modelValue="initialValues.avatar"
                name="avatar"
                @update:modelValue="uploadS3"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <Button type="submit" severity="secondary" label="Submit" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import ImageInput from "@/components/image-input.vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { ref, computed, onMounted } from "vue";
import { z } from "zod";
import { getUploadUrl } from "~/stores/s3-upload.servcie";
import axiosInstance from "~/api/axiosInstance";
import { useDepartmentStore } from "~/stores/department.service";

// Define a type for the department records for proper typing

const departmentStore = useDepartmentStore();
onMounted(() => {
  departmentStore.fetchDepartments(1, 10, "");
});

// Use computed to unwrap Pinia getters for reactivity/type

const departments = computed(() => departmentStore.getRecords);
console.log("🚀 ~ departments:", departments);

const uploadUrl = ref("");
const uploadFile = ref(null);

const initialValues = ref({
  fullName: "",
  phone: "",
  email: "",
  licenseNumber: "",
  specialization: "",
  degree: "",
  experience: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  avatar: "",
  departmentId: "",
  userId: "",
});

const resolver = ref(
  zodResolver(
    z.object({
      fullName: z
        .string()
        .min(1, { message: "Họ và tên là bắt buộc." })
        .max(100, { message: "Họ và tên không được vượt quá 100 ký tự." }),
      phone: z
        .string()
        .min(1, { message: "Số điện thoại là bắt buộc." })
        .max(20, { message: "Số điện thoại không được vượt quá 20 ký tự." })
        .regex(/^[0-9]+$/, { message: "Số điện thoại chỉ được chứa chữ số." }),
      email: z
        .string()
        .email({ message: "Email không hợp lệ." })
        .max(255, { message: "Email không được vượt quá 255 ký tự." }),
      licenseNumber: z
        .string()
        .max(20, { message: "Số chứng chỉ không được vượt quá 20 ký tự." })
        .optional(),
      specialization: z
        .string()
        .max(100, { message: "Chuyên khoa không được vượt quá 100 ký tự." })
        .optional(),
      degree: z
        .string()
        .max(50, { message: "Học vị không được vượt quá 50 ký tự." })
        .optional(),
      experience: z.string().optional(),
      gender: z
        .enum(["male", "female", "other"], {
          required_error: "Giới tính là bắt buộc.",
        })
        .optional(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: "Ngày sinh phải đúng định dạng yyyy-mm-dd.",
        })
        .optional(),
      address: z.string().optional(),
      departmentId: z
        .string()
        .uuid({ message: "ID khoa không hợp lệ." })
        .optional(),
      userId: z
        .string()
        .uuid({ message: "ID người dùng không hợp lệ." })
        .optional(),
    })
  )
);

const uploadS3 = async (file) => {
  try {
    if (file) {
      const url = await getUploadUrl(file);
      uploadFile.value = file;
      uploadUrl.value = url;
    }
  } catch (error) {
    console.error("🚀 ~ uploadS3 ~ error:", error.message);
  }
};

const onFormSubmit = async ({ valid, values }) => {
  try {
    if (valid) {
      // Upload S3 file
      const s3Response = await uploadFileToS3(
        uploadFile.value,
        uploadUrl.value
      );

      // Call api create doctor

      await axiosInstance.post("/doctors", {
        ...values,
        avatar: uploadFile.value.name,
      });
      navigateTo("/doctor");
    }
  } catch (error) {
    console.error("🚀 ~ onFormSubmit ~ error:", error.message);
  }
};
</script>
