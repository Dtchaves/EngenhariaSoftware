// types.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Patient extends User {
  age: number;
  doctor_id: number;
}

export interface Doctor extends User {
  specialization: string;
  crm: string;
}

export enum UserRole {
  Doctor = "Doctor",
  Patient = "Patient",
}

export const UserColor = {
  Doctor: {
    bg: "bg-blue-500",
    button: "text-blue-800",
  },
  Patient: {
    bg: "bg-red-500",
    button: "text-red-800",
  },
};

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
