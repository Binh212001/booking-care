import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

export interface DepartmentRecord {
  id: number | string;
  name: string;
  description: string;
  code: string;
  isActive: boolean;
}

export interface DepartmentResponse {
  records: DepartmentRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
}

export const useDepartmentStore = defineStore("department", {
  state: (): DepartmentResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
  }),
  actions: {
    async fetchDepartments(
      page: number = 1,
      limit: number = 10,
      q: string = ""
    ) {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/departments", {
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
        console.error("Error fetching departments:", error);
      } finally {
        this.loading = false;
      }
    },

    async createDepartment(department: Omit<DepartmentRecord, "id">) {
      try {
        return await axiosInstance.post("/departments", department);
      } catch (error) {
        console.error("Error creating department:", error);
      }
    },

    async updateDepartment(department: DepartmentRecord) {
      try {
        return await axiosInstance.patch(`/departments/${department.id}`, {
          name: department.name,
          description: department.description,
        });
      } catch (error) {
        console.error("Error updating department:", error);
      }
    },

    async deleteDepartment(id: string) {
      try {
        return await axiosInstance.delete(`/departments/${id}`);
      } catch (error) {
        console.error("Error deleting department:", error);
      }
    },

    async getDepartmentById(id: string) {
      try {
        return await axiosInstance.get(`/departments/${id}`);
      } catch (error) {
        console.error("Error getting department by id:", error);
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
