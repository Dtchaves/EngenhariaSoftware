'use server';
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { EditDoctorData, ErrorResponse } from "@/app/shared/utils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function editDoctorProfile(
  currentState: any,
  formData: FormData,
) {
  let shouldRedirect = false;
  try {
    const doctorData: EditDoctorData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      specialization: formData.get("specialization") as string,
    };
      
    const cookieHeader = await cookies();
    const response = await axios.put<ErrorResponse>(`${apiUrl}/api/doctor/profile`, doctorData, {
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
    console.error("Erro ao editar dados do médico:", err);
  }finally {
    if (!shouldRedirect){
      return { message: "Erro ao editar dados do médico." };
    }
    redirect("/doctor/profile");
  }
}
