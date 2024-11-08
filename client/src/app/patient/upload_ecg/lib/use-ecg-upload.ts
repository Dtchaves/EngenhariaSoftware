"use server";
import { apiUrl } from "@/app/shared/constants";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function ECGUpload(currentState: any, formData: FormData) {
  let redirectPath = "/patient/upload_ecg";
  try {
    const cookieHeader = await cookies();

    const response = await axios.post(
      `${apiUrl}/api/patient/upload_ecg`,
      formData,
      {
        withCredentials: true,
        headers: {
          Cookie: cookieHeader.toString(),
          "Content-Type": "multipart/form-data", // Importante para enviar como formData
        },
      }
    );

    if (response.status === 201) {
      console.log("Upload successful ", response.data);
      redirectPath = `/patient/exams/${response.data.examID}`;
    } else {
      console.error("Upload failed. Please try again.", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Upload failed. Please try again.", error);
    return { message: "O upload falhou. Tente novamente." };
  } finally {
    redirect(redirectPath);
  }
}
