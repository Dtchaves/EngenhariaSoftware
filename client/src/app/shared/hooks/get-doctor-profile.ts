"use server";
// app/paciente/hooks/usePatientProfile.ts
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { DoctorData, ErrorResponse, PatientData } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getDoctorProfile() {
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<DoctorData | ErrorResponse>(`${apiUrl}/api/doctor/profile`, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
      },
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar dados do médico:", err);
    return { message: "Erro ao buscar dados do médico." };
  }
}
