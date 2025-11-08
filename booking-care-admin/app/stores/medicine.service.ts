// Medicine store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the medicine records for proper typing
export interface MedicineRecord {
  id: number | string;
  name: string;
  code?: string;
  activeIngredient?: string;
  dosage?: string;
  unit?: string;
  form?: string;
  isEyeMedication?: boolean;
  manufacturer?: string;
  country?: string;
  price?: number;
  indication?: string;
  contraindication?: string;
  sideEffects?: string;
  usage?: string;
  stock?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MedicineResponse {
  records: MedicineRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  currentMedicine: MedicineRecord | null;
}

export const useMedicineStore = defineStore("medicine", {
  state: (): MedicineResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    currentMedicine: null,
  }),
  actions: {
    async fetchMedicines(page: number = 1, limit: number = 10, q: string = "") {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/medicines", {
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
        console.error("Error fetching medicines:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteMedicine(id: string) {
      try {
        return await axiosInstance.delete(`/medicines/${id}`);
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    },

    async fetchMedicineById(id: string) {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get(`/medicines/${id}`);
        this.currentMedicine = response.data ?? response;
        return this.currentMedicine;
      } catch (error) {
        console.error("Error fetching medicine:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createMedicine(medicine: Partial<MedicineRecord>) {
      try {
        return await axiosInstance.post("/medicines", medicine);
      } catch (error) {
        console.error("Error creating medicine:", error);
        throw error;
      }
    },

    async updateMedicine(id: string, medicine: Partial<MedicineRecord>) {
      try {
        return await axiosInstance.patch(`/medicines/${id}`, medicine);
      } catch (error) {
        console.error("Error updating medicine:", error);
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
  },
});

