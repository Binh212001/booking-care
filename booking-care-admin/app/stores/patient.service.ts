// Patient store using Pinia

import { defineStore } from "pinia";
import axiosInstance from "~/api/axiosInstance";

// Define a type for the patient records for proper typing
export interface PatientRecord {
  id: number | string;
  code: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  avatar?: string;
  isActive: boolean;
  userId?: number | string;
  identityCard?: string;
  bloodType?: string;
  medicalHistory?: string;
  allergy?: string;
  eyeHistory?: string;
  wearsGlasses?: boolean;
  wearsContactLens?: boolean;
  rightEyePower?: string;
  leftEyePower?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PatientResponse {
  records: PatientRecord[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  currentPatient: PatientRecord | null;
}

export const usePatientStore = defineStore("patient", {
  state: (): PatientResponse => ({
    records: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    currentPatient: null,
  }),
  actions: {
    async fetchPatients(page: number = 1, limit: number = 10, q: string = "") {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get("/patients", {
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
        console.error("Error fetching patients:", error);
      } finally {
        this.loading = false;
      }
    },

    async deletePatient(id: string) {
      try {
        return await axiosInstance.delete(`/patients/${id}`);
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    },

    async fetchPatientById(id: string) {
      this.loading = true;
      try {
        const response: any = await axiosInstance.get(`/patients/${id}`);
        this.currentPatient = response.data ?? response;
        return this.currentPatient;
      } catch (error) {
        console.error("Error fetching patient:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updatePatient(id: string, patient: Partial<PatientRecord>) {
      try {
        return await axiosInstance.patch(`/patients/${id}`, patient);
      } catch (error) {
        console.error("Error updating patient:", error);
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
    getCurrentPatient: (state) => state.currentPatient,
  },
});
