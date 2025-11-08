<template>
  <div class="patient-create-page">
    <Toast />
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Create Patient</h1>
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
          <Message
            v-if="$form.gender?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.gender?.error?.message }}</Message
          >
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
          <label for="identityCard">Identity Card (CMND/CCCD)</label>
          <InputText
            id="identityCard"
            name="identityCard"
            type="text"
            placeholder="Identity Card"
            fluid
          />
          <Message
            v-if="$form.identityCard?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.identityCard?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1 md:col-span-2">
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
          <label for="bloodType">Blood Type</label>
          <InputText
            id="bloodType"
            name="bloodType"
            type="text"
            placeholder="Blood Type (e.g., O+)"
            fluid
          />
          <Message
            v-if="$form.bloodType?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.bloodType?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1 md:col-span-2">
          <label for="medicalHistory">Medical History</label>
          <Textarea
            id="medicalHistory"
            name="medicalHistory"
            placeholder="Medical History"
            :rows="3"
            fluid
          />
          <Message
            v-if="$form.medicalHistory?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.medicalHistory?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1 md:col-span-2">
          <label for="allergy">Allergy</label>
          <Textarea
            id="allergy"
            name="allergy"
            placeholder="Allergy"
            :rows="3"
            fluid
          />
          <Message
            v-if="$form.allergy?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.allergy?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1 md:col-span-2">
          <label for="eyeHistory">Eye History</label>
          <Textarea
            id="eyeHistory"
            name="eyeHistory"
            placeholder="Eye History"
            :rows="3"
            fluid
          />
          <Message
            v-if="$form.eyeHistory?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.eyeHistory?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="wearsGlasses">Wears Glasses</label>
          <div class="flex items-center gap-2">
            <InputSwitch id="wearsGlasses" name="wearsGlasses" />
            <span>{{ $form.wearsGlasses?.value ? "Yes" : "No" }}</span>
          </div>
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="wearsContactLens">Wears Contact Lens</label>
          <div class="flex items-center gap-2">
            <InputSwitch id="wearsContactLens" name="wearsContactLens" />
            <span>{{ $form.wearsContactLens?.value ? "Yes" : "No" }}</span>
          </div>
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="rightEyePower">Right Eye Power</label>
          <InputText
            id="rightEyePower"
            name="rightEyePower"
            type="text"
            placeholder="Right Eye Power (e.g., -2.5D)"
            fluid
          />
          <Message
            v-if="$form.rightEyePower?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.rightEyePower?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="leftEyePower">Left Eye Power</label>
          <InputText
            id="leftEyePower"
            name="leftEyePower"
            type="text"
            placeholder="Left Eye Power (e.g., -2.0D)"
            fluid
          />
          <Message
            v-if="$form.leftEyePower?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.leftEyePower?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="emergencyContact">Emergency Contact</label>
          <InputText
            id="emergencyContact"
            name="emergencyContact"
            type="text"
            placeholder="Emergency Contact Name"
            fluid
          />
          <Message
            v-if="$form.emergencyContact?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.emergencyContact?.error?.message }}</Message
          >
        </div>
        <div class="flex flex-col pb-2 gap-1">
          <label for="emergencyPhone">Emergency Phone</label>
          <InputText
            id="emergencyPhone"
            name="emergencyPhone"
            type="text"
            placeholder="Emergency Phone"
            fluid
          />
          <Message
            v-if="$form.emergencyPhone?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.emergencyPhone?.error?.message }}</Message
          >
        </div>

      </div>
      <div class="flex justify-end mt-6">
        <Button type="submit" severity="secondary" label="Submit" />
      </div>
    </Form>
  </div>
</template>

<script setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { ref } from "vue";
import { z } from "zod";
import axiosInstance from "~/api/axiosInstance";

const initialValues = ref({
  fullName: "",
  phone: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  identityCard: "",
  address: "",
  bloodType: "",
  medicalHistory: "",
  allergy: "",
  eyeHistory: "",
  wearsGlasses: false,
  wearsContactLens: false,
  rightEyePower: "",
  leftEyePower: "",
  emergencyContact: "",
  emergencyPhone: "",
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
        .max(255, { message: "Email không được vượt quá 255 ký tự." })
        .optional()
        .or(z.literal("")),
      gender: z.enum(["male", "female", "other"], {
        required_error: "Giới tính là bắt buộc.",
      }),
      dateOfBirth: z
        .string()
        .min(1, { message: "Ngày sinh là bắt buộc." })
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: "Ngày sinh phải đúng định dạng yyyy-mm-dd.",
        }),
      identityCard: z
        .string()
        .max(20, { message: "CMND/CCCD không được vượt quá 20 ký tự." })
        .optional()
        .or(z.literal("")),
      address: z.string().optional().or(z.literal("")),
      bloodType: z
        .string()
        .max(50, { message: "Nhóm máu không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      medicalHistory: z.string().optional().or(z.literal("")),
      allergy: z.string().optional().or(z.literal("")),
      eyeHistory: z.string().optional().or(z.literal("")),
      wearsGlasses: z.boolean().optional().default(false),
      wearsContactLens: z.boolean().optional().default(false),
      rightEyePower: z
        .string()
        .max(50, { message: "Độ kính mắt phải không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      leftEyePower: z
        .string()
        .max(50, { message: "Độ kính mắt trái không được vượt quá 50 ký tự." })
        .optional()
        .or(z.literal("")),
      emergencyContact: z
        .string()
        .max(255, {
          message: "Người liên hệ khẩn cấp không được vượt quá 255 ký tự.",
        })
        .optional()
        .or(z.literal("")),
      emergencyPhone: z
        .string()
        .max(20, {
          message: "Số điện thoại người liên hệ không được vượt quá 20 ký tự.",
        })
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

const onFormSubmit = async ({ valid, values }) => {
  try {
    if (valid) {
      // Prepare submit data
      const submitData = {
        fullName: values.fullName,
        phone: values.phone,
        email: values.email?.trim() || undefined,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth,
        identityCard: values.identityCard?.trim() || undefined,
        address: values.address?.trim() || undefined,
        bloodType: values.bloodType?.trim() || undefined,
        medicalHistory: values.medicalHistory?.trim() || undefined,
        allergy: values.allergy?.trim() || undefined,
        eyeHistory: values.eyeHistory?.trim() || undefined,
        wearsGlasses: values.wearsGlasses ?? false,
        wearsContactLens: values.wearsContactLens ?? false,
        rightEyePower: values.rightEyePower?.trim() || undefined,
        leftEyePower: values.leftEyePower?.trim() || undefined,
        emergencyContact: values.emergencyContact?.trim() || undefined,
        emergencyPhone: values.emergencyPhone?.trim() || undefined,
        userId: values.userId?.trim() || undefined,
      };

      // Call api create patient
      await axiosInstance.post("/patients", submitData);
      navigateTo("/patient");
    }
  } catch (error) {
    console.error("🚀 ~ onFormSubmit ~ error:", error.message);
  }
};
</script>

