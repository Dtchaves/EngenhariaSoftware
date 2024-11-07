import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { PatientData, EditPatientData } from "@/app/shared/utils";
import { redirect } from "next/navigation";

export async function editPatientProfile(
  patientData: EditPatientData,
  setError: (error: string) => void
) {
  try {
    console.log("patientData: ", patientData);
    await axios.put<PatientData>(`${apiUrl}/api/patient/profile`, patientData, {
      withCredentials: true,
    });
    redirect("/patient/");
  } catch (err) {
    console.error("Erro ao editar dados do paciente:", err);
    setError("Erro ao editar dados do paciente");
  }finally {
    console.log("Dados do paciente editados com sucesso");
    redirect("/patient/profile");
  }
}
