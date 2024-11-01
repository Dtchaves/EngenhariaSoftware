import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { apiUrl } from "@/app/shared/constants";
import { Doctor, RegisterCredentials, Patient } from "@/app/shared/utils";

export function useRegister() {
  const [user, setUser] = useState<Doctor | Patient | null>(null);
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

  const register = async (credentials: RegisterCredentials) => {
    try {
      const role = credentials.role;
      const suffixes: { [key: string]: string } = {
        Doctor: "doctors",
        Patient: "patients",
      };
      const response = await axios.post(
        `${apiUrl}/api/${suffixes[role]}`,
        credentials
      );
      setUser(response.data.user);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };


  return {
    register,
    isAuthenticated: !!user,
  };
};