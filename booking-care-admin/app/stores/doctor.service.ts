// Doctor store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the doctor records for proper typing
export interface DoctorRecord {
  id: number | string;
  code: string;
  fullName: string;
  phone: string;
  email: string;
  licenseNumber: string;
  specialization: string;
  degree: string;
  experience: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  avatar: string;
  isActive: boolean;
  departmentId: number | string;
  userId: number | string;
}

export interface DoctorResponse {
  records: DoctorRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  currentDoctor: DoctorRecord | null;
}

export const useDoctorStore = defineStore("doctor", {
  state: (): DoctorResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    currentDoctor: null,
  }),
  actions: {
    async fetchDoctors(page: number = 1, limit: number = 10, q: string = "") {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/doctors", {
          params: {
            page,
            limit,
            q,
          },
        });
        // Handle both possible response structures
        // If response has pagination object (standard structure)
        if (response.pagination) {
          this.records = response.data ?? [];
          this.total = response.pagination.totalRecords ?? 0;
          this.page = response.pagination.currentPage ?? 1;
          this.limit = response.pagination.limit ?? 10;
        } else {
          // Fallback for flattened structure
          this.records = response.data ?? [];
          this.total = response.total ?? 0;
          this.page = response.page ?? 1;
          this.limit = response.limit ?? 10;
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteDoctor(id: string) {
      try {
        return await axiosInstance.delete(`/doctors/${id}`);
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    },

    async fetchDoctorById(id: string) {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get(`/doctors/${id}`);
        this.currentDoctor = response.data ?? response;
        return this.currentDoctor;
      } catch (error) {
        console.error("Error fetching doctor:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateDoctor(id: string, doctor: Partial<DoctorRecord>) {
      try {
        return await axiosInstance.patch(`/doctors/${id}`, doctor);
      } catch (error) {
        console.error("Error updating doctor:", error);
        throw error;
      }
    },
  },
  getters: {
    getRecords: (state) => state.records,
    getTotal: (state) => state.total,
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    isLoading: (state) => state.loading,
    getCurrentDoctor: (state) => state.currentDoctor,
  },
});
