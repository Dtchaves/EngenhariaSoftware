"use server";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    await axios.get(`${apiUrl}/api/logout`, { withCredentials: true });
  } catch (error) {
    console.error("Logout failed. Please try again.", error);
  } finally {
    redirect("/login");
  }
}
