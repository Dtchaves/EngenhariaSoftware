"use client";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    await axios.post(`${apiUrl}/api/logout`, {}, { withCredentials: true });
    // console.log(Cookies.get("session"));
    // Cookies.remove("session");
  } catch (error) {
    console.error("Logout failed. Please try again.", error);
  } finally {
    console.log('agora, ir pro login');
    redirect("/login");
  }
}
