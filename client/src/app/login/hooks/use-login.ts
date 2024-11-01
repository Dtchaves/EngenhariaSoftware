'use client'
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";
import { Doctor, LoginCredentials, Patient } from "@/app/shared/utils";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [user, setUser] = useState<Doctor | Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/auth/status`);
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error("Not authenticated: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log("credentials: ", credentials);
      const response = await axios.post(
        `${apiUrl}/api/login`,
        credentials,
        { withCredentials: true }
      );
      console.log("response: ", response);
      setUser(response.data.user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }

    console.log("response: ");
  };

  const logout = async () => {
    try {
      await axios.get(`${apiUrl}/api/auth/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
    }
  };

  return {
    user,
    error,
    setError,
    login,
    logout,
    isAuthenticated: !!user,
  };
};