import axios from "axios";
import { apiUrl } from "../constants";

export async function ECGUpload(form: FormData) {
  try {
    const response = await axios.post(`${apiUrl}/api/temp_route`, form, {
      withCredentials: true,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Upload failed. Please try again.", error);
  }
}
