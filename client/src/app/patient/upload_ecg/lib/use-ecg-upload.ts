'use server';
import { apiUrl } from "@/app/shared/constants";
import axios from "axios";
import { cookies } from "next/headers";

export async function ECGUpload(currentState: any, formData: FormData) {
  try {
    const cookieHeader = await cookies();
    
    const response = await axios.post(`${apiUrl}/api/patient/upload_ecg`, formData, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
        "Content-Type": "multipart/form-data", // Importante para enviar como formData
      },
    });

    return {
      imageData: response.data.image,
      message: response.data.message,
    };
  } catch (error) {
    console.error("Upload failed. Please try again.", error);
    return { imageData: null, message: "O upload falhou. Tente novamente." };
  }
}
