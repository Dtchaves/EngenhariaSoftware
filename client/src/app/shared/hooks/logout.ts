"use client";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    await axios.post(`${apiUrl}/api/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed. Please try again.", error);
  } finally {
    console.log('agora, ir pro login');
    redirect("/login");
  }
}
