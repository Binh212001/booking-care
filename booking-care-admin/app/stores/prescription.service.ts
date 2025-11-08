// Prescription store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the prescription records for proper typing
export interface PrescriptionRecord {
  id: number | string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  prescriptionNumber?: string;
  diagnosis?: string;
  notes?: string;
  status: string;
  filledAt?: string;
  patient?: {
    id: string;
    fullName: string;
    code: string;
  };
  doctor?: {
    id: string;
    fullName: string;
    code: string;
  };
  appointment?: {
    id: string;
  };
  prescriptionMedicines?: any[];
}

export interface PrescriptionResponse {
  records: PrescriptionRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
}

export const usePrescriptionStore = defineStore("prescription", {
  state: (): PrescriptionResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
  }),
  actions: {
    async fetchPrescriptions(page: number = 1, limit: number = 10, q: string = "") {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/prescriptions", {
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
        console.error("Error fetching prescriptions:", error);
      } finally {
        this.loading = false;
      }
    },

    async deletePrescription(id: string) {
      try {
        return await axiosInstance.delete(`/prescriptions/${id}`);
      } catch (error) {
        console.error("Error deleting prescription:", error);
      }
    },
  },
  getters: {
    getRecords: (state) => state.records,
    getTotal: (state) => state.total,
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    isLoading: (state) => state.loading,
  },
});

