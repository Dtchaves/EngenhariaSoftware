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
  { label: "Meu perfil", href: "/doctor/profile" },
  { label: "Pacientes", href: "/doctor/patients" },
];

export const PatientOptions = [
  { label: "Meu perfil", href: "/patient/profile" },
  { label: "Médico", href: "/patient/doctor" },
  { label: "Meus exames", href: "/patient/exams" },
  { label: "Fazer upload de ECG", href: "/patient/upload_ecg" },
];

export interface DoctorData {
  id: number;
  name: string;
  specialization: string;
  crm: string;
  email: string;
}

export interface PatientDataResponse {
  id: number;
  name: string;
  age: number;
  email: string;
}

export interface EditDoctorData {
  name: string;
  specialization: string;
  email: string;
}

export interface EditPatientData {
  name: string;
  age: number;
  email: string;
}

export interface PatientsExamsRowData {
  id: number;
  name: string;
  age: number;
  email: string;
};

export interface PatientExamsTableRowData {
  id: number;
  name: string;
  date: string;
};

// Definir os dados de cada exame
export interface ExamResultResponse {
  id: number;
  patient_id: number;
  patient_name: string;
  doctor_id: number;
  exam_name: string;
  doctor_feedback?: string;
  result: any; // Especifique o tipo do JSON do resultado se souber, caso contrário, use `any`
  created_at: string; // Pode usar `Date` se os dados estiverem em formato de data JS
  updated_at: string; // Pode usar `Date` se os dados estiverem em formato de data JS
  doctor_email: string;
}

// Combinar os dados do paciente com a lista de exames
export interface PatientDataAndExams {
  patient: PatientDataResponse;
  exams: ExamResultResponse[];
}

export interface PatientExam {
  id: number;
  exam_name: string;
  ecg_image_base64?: string;
  created_at: string;
  doctor_name: string;
  doctor_email?: string;
  doctor_feedback?: string;
}

export interface ErrorResponse {
  message: string;
}

export function isErrorResponse(data: any): data is ErrorResponse {
  return 'message' in data && typeof data.message === 'string';
}