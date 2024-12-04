'use server';
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { EditPatientData, ErrorResponse } from "@/app/shared/utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function editPatientProfile(
  currentState: any,
  formData: FormData,
) {
  let shouldRedirect = false;
  try {
    const patientData: EditPatientData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      age: parseInt(formData.get("age") as string),
    };
      
    console.log("patientData: ", patientData);
    const cookieHeader = await cookies();
    const response = await axios.put<ErrorResponse>(`${apiUrl}/api/patient/profile`, patientData, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
      },
    });
    
    if (response.status !== 200) {
      return response.data;
    }

    shouldRedirect = true;
  } catch (err) {
    console.error("Erro ao editar dados do paciente:", err);
  }finally {
    if (!shouldRedirect){
      return { message: "Erro ao editar dados do paciente." };
    }
    redirect("/patient/profile");
  }
}