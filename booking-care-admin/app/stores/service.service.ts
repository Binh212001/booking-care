// Service store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the service records for proper typing
export interface ServiceRecord {
  id: number | string;
  name: string;
  code?: string;
  description?: string;
  price: number;
  unit?: string;
  duration?: number;
  type: string;
  eyeServiceType?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceResponse {
  records: ServiceRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  currentService: ServiceRecord | null;
}

export const useServiceStore = defineStore("service", {
  state: (): ServiceResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    currentService: null,
  }),
  actions: {
    async fetchServices(page: number = 1, limit: number = 10, q: string = "") {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/services", {
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
        console.error("Error fetching services:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchServiceById(id: string) {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get(`/services/${id}`);
        this.currentService = response.data ?? response;
        return this.currentService;
      } catch (error) {
        console.error("Error fetching service:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteService(id: string) {
      try {
        return await axiosInstance.delete(`/services/${id}`);
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    },

    async createService(service: ServiceRecord) {
      try {
        return await axiosInstance.post("/services", service);
      } catch (error) {
        console.error("Error creating service:", error);
      }
    },

    async updateService(id: string, service: Partial<ServiceRecord>) {
      try {
        return await axiosInstance.patch(`/services/${id}`, service);
      } catch (error) {
        console.error("Error updating service:", error);
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
