// app/medico/hooks/usePatientData.ts
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { DoctorData, ErrorResponse, PatientDataAndExams } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getDoctorDataForPatient(){
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<DoctorData | ErrorResponse>(
      `${apiUrl}/api/patient/doctor`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookieHeader.toString(),
        },
      }
    );
    return response.data;
  } catch (err) {
    return { message: "Não foi possível buscar os dados do médico. Verifique sua conexão e tente novamente." };
  }
}
