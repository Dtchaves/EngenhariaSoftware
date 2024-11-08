import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { ErrorResponse, PatientExam } from "@/app/shared/utils";
import { cookies } from "next/headers";

export async function getPatientExams() {
  try {
    const cookieHeader = await cookies();
    const response = await axios.get<PatientExam[] | ErrorResponse>(
      `${apiUrl}/api/patient/exams`,
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
      message: "Erro ao carregar os exames dos pacientes.",
    };
  }
}
