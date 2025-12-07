<template>
  <div>
    <div class="doctor-edit-page">
      <Toast />
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Edit Doctor</h1>
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
            <Textarea
              id="experience"
              name="experience"
              placeholder="Experience"
              :rows="3"
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
          <Button
            type="submit"
            severity="secondary"
            label="Update"
            :loading="submitting"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageInput from "@/components/image-input.vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { ref, computed, onMounted } from "vue";
import { z } from "zod";
import { getUploadUrl, uploadFileToS3 } from "~/stores/s3-upload.servcie";
import { useRoute } from "vue-router";
import { useDoctorStore } from "~/stores/doctor.service";
import { useDepartmentStore } from "~/stores/department.service";

const route = useRoute();
const id = route.params.id as string;
const doctorStore = useDoctorStore();
const departmentStore = useDepartmentStore();
const submitting = ref(false);
const loading = ref(false);

const departments = computed(() => departmentStore.getRecords);

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
        .optional()
        .or(z.literal("")),
      specialization: z
        .string()
        .max(100, { message: "Chuyên khoa không được vượt quá 100 ký tự." })
        .optional()
        .or(z.literal("")),
      degree: z
        .string()
        .max(50, { message: "Học vị không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      experience: z.string().optional().or(z.literal("")),
      gender: z
        .enum(["male", "female", "other"], {
          required_error: "Giới tính là bắt buộc.",
        })
        .optional()
        .or(z.literal("")),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: "Ngày sinh phải đúng định dạng yyyy-mm-dd.",
        })
        .optional()
        .or(z.literal("")),
      address: z.string().optional().or(z.literal("")),
      departmentId: z
        .string()
        .uuid({ message: "ID khoa không hợp lệ." })
        .optional()
        .or(z.literal("")),
      userId: z
        .string()
        .uuid({ message: "ID người dùng không hợp lệ." })
        .optional()
        .or(z.literal("")),
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

onMounted(async () => {
  try {
    loading.value = true;
    // Fetch departments
    await departmentStore.fetchDepartments(1, 10, "");
    
    // Fetch doctor data
    const doctor = await doctorStore.fetchDoctorById(id);
    if (doctor) {
      // Format date for input field (YYYY-MM-DD)
      const formatDateForInput = (date?: string) => {
        if (!date) return "";
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      initialValues.value = {
        fullName: doctor.fullName || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        licenseNumber: doctor.licenseNumber || "",
        specialization: doctor.specialization || "",
        degree: doctor.degree || "",
        experience: doctor.experience || "",
        gender: doctor.gender || "",
        dateOfBirth: formatDateForInput(doctor.dateOfBirth),
        address: doctor.address || "",
        avatar: doctor.avatar || "",
        departmentId: doctor.departmentId?.toString() || "",
        userId: doctor.userId?.toString() || "",
      };
    }
  } catch (error) {
    console.error("Error loading doctor:", error);
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

      // Upload S3 file if new file is selected
      let avatarFileName = initialValues.value.avatar;
      if (uploadFile.value) {
        const s3Response = await uploadFileToS3(
          uploadFile.value,
          uploadUrl.value
        );
        avatarFileName = uploadFile.value.name;
      }

      // Prepare submit data
      const submitData = {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email?.trim() || undefined,
        licenseNumber: values.licenseNumber?.trim() || undefined,
        specialization: values.specialization?.trim() || undefined,
        degree: values.degree?.trim() || undefined,
        experience: values.experience?.trim() || undefined,
        gender: values.gender || undefined,
        dateOfBirth: values.dateOfBirth || undefined,
        address: values.address?.trim() || undefined,
        avatar: avatarFileName || undefined,
        departmentId: values.departmentId?.trim() || undefined,
        userId: values.userId?.trim() || undefined,
      };

      // Call api update doctor
      await doctorStore.updateDoctor(id, submitData);
      navigateTo(`/doctor/${id}`);
    }
  } catch (error: any) {
    console.error("🚀 ~ onFormSubmit ~ error:", error?.message || error);
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.doctor-edit-page {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>

