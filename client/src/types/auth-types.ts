import { UserRole } from "./types";

// auth-types.ts
export interface LoginCredentials {
  email: string;
  crm?: string;
  password: string;
  role: UserRole;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  crm?: string;
  specialization?: string;
  age?: number;
  doctor_id?: number;
  role: UserRole;
}