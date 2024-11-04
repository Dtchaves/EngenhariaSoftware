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
    text: "text-blue-800",
  },
  Patient: {
    bg: "bg-red-500",
    text: "text-red-800",
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

export const DoctorOptions = [
  { label: "Home", href: "/doctor" },
  { label: "My Profile", href: "/doctor/my_profile" },
  { label: "Patients", href: "/doctor/patients" },
];

export const PatientOptions = [
  { label: "My Profile", href: "/patient/my_profile" },
  { label: "Doctors", href: "/patient/doctors" },
  { label: "Upload ECG", href: "/patient/upload_ecg" },
];
