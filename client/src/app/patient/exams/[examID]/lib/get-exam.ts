import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { ErrorResponse, PatientExam } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getExam(examId: number){
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<PatientExam | ErrorResponse>(
      `${apiUrl}/api/patient/exams/${examId}`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookieHeader.toString(),
        },
      }
    );
    return response.data;
  } catch (err) {
    return {
      message: "Erro de conexão. Verifique sua internet e tente novamente.",
    };
  }
}
