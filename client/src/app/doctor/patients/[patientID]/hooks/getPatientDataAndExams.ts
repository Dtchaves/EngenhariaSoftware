// app/medico/hooks/usePatientData.ts
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { ErrorResponse, PatientDataAndExams } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getPatientDataAndExams(patientId: number){
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<PatientDataAndExams | ErrorResponse>(
      `${apiUrl}/api/doctor/patient/${patientId}`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookieHeader.toString(),
        },
      }
    );
    return response.data;
  } catch (err) {
    return { message: "Erro de conexão. Verifique sua internet e tente novamente." };
    // if (axios.isAxiosError(err) && err.response) {
    //   // Passando a mensagem de erro diretamente do backend
    //   return err.response.data;
    // } else {
    //   // Erro genérico de conexão
    //   console.error("Erro ao buscar dados do paciente:", err);
    // }
  }
}
