// User store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the user records for proper typing
export interface UserRecord {
  id: number | string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  records: UserRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
  }),
  actions: {
    async fetchUsers(page: number = 1, limit: number = 10, q: string = "") {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/users", {
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
        console.error("Error fetching users:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(id: string) {
      try {
        return await axiosInstance.delete(`/users/${id}`);
      } catch (error) {
        console.error("Error deleting user:", error);
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

