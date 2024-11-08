"use server";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function deleteProfile(currentState: any, userRole: string) {
  const endpoint = userRole === "patient" ? "patient" : "doctor";
  let shouldRedirect = false;
  try {
    const cookieHeader = await cookies();
    const response = await axios.delete(`${apiUrl}/api/${endpoint}/profile`, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader.toString(),
      },
    });

    cookieHeader.delete("session");

    if (response.status !== 200) {
      console.error("Erro ao deletar perfil do médico:", response.data);
      return response.data;
    }

    shouldRedirect = true;
  } catch (err) {
    console.error("Erro ao deletar perfil do médico:", err);
  } finally {
    if (!shouldRedirect) {
      return { message: "Erro ao deletar perfil do médico." };
    }
    redirect("/login");
  }
}
