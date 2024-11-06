import { apiUrl } from "@/app/shared/constants";
import axios from "axios";

export async function ECGUpload(form: FormData) {
  try {
    const response = await axios.post(`${apiUrl}/api/temp_route`, form, {
      withCredentials: true,
    });
    return { message: null };
  } catch (error) {
    console.error("Upload failed. Please try again.", error);
    return { message: "O upload falhou. Tente novamente." };
  }
}
