"use server";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { PatientsExamsRowData, ErrorResponse } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getPatientsTableData(): Promise<PatientsExamsRowData[] | ErrorResponse> {
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<PatientsExamsRowData[] | ErrorResponse>(`${apiUrl}/api/doctor/patients`, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados dos pacientes:", error);
    return { message: "Erro ao buscar dados dos pacientes. Verifique sua conexão ou tente novamente." };
  }
}