// types.ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Patient extends User {
    email: string;
    age: number;
    doctor_id: number;
}

export interface Doctor extends User {
    specialization: string;
    crm: string;
}

export interface Admin extends User {
    username: string;
}

export enum UserRole {
    Doctor = "Doctor",
    Patient = "Patient",
    Admin = "Admin",
}

export const UserColor = {
    Doctor: {
        bg: "bg-green-500",
        button: "text-green-800",
    },
    Patient: {
        bg: "bg-red-500",
        button: "text-red-800",
    },
    Admin: {
        bg: "bg-blue-500",
        button: "text-blue-800",
    },
};