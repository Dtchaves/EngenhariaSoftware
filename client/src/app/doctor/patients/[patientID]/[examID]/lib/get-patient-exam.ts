import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { DoctorExam, ErrorResponse } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getPatientExam(patientID: number, examId: number){
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<DoctorExam | ErrorResponse>(
      `${apiUrl}/api/doctor/patient/${patientID}/${examId}`,
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
