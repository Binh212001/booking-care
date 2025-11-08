// Treatment store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the treatment records for proper typing
export interface TreatmentRecord {
  id: number | string;
  medicalRecordId: string;
  doctorId: string;
  name: string;
  description?: string;
  startDate: string | Date;
  endDate?: string | Date;
  status: string;
  treatmentType?: string;
  result?: string;
  notes?: string;
  medicalRecord?: any;
  doctor?: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface TreatmentResponse {
  records: TreatmentRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  currentTreatment: TreatmentRecord | null;
}

export const useTreatmentStore = defineStore("treatment", {
  state: (): TreatmentResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    currentTreatment: null,
  }),
  actions: {
    async fetchTreatments(
      page: number = 1,
      limit: number = 10,
      q: string = "",
      medicalRecordId?: string
    ) {
      this.loading = true;
      try {
        const params: any = {
          page,
          limit,
        };
        if (q) params.q = q;
        if (medicalRecordId) params.medicalRecordId = medicalRecordId;

        const response: any = await axiosInstance.get("/treatments", {
          params,
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
        console.error("Error fetching treatments:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTreatmentById(id: string) {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get(`/treatments/${id}`);
        this.currentTreatment = response.data ?? response;
        return this.currentTreatment;
      } catch (error) {
        console.error("Error fetching treatment:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteTreatment(id: string) {
      try {
        return await axiosInstance.delete(`/treatments/${id}`);
      } catch (error) {
        console.error("Error deleting treatment:", error);
      }
    },
  },
  getters: {
    getRecords: (state) => state.records,
    getTotal: (state) => state.total,
    getPage: (state) => state.page,
    getLimit: (state) => state.limit,
    isLoading: (state) => state.loading,
    getCurrentTreatment: (state) => state.currentTreatment,
  },
});

