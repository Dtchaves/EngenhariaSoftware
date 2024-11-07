"use server";
// app/paciente/hooks/usePatientProfile.ts
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { PatientData } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getPatientProfile() {
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<PatientData>(`${apiUrl}/api/patient/profile`, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
      },
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar dados do paciente:", err);
    return null;
  }
}
