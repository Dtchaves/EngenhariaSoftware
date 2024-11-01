import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/app/shared/constants";
import { Doctor, RegisterCredentials, Patient } from "@/app/shared/utils";

export function useRegister() {
  const [user, setUser] = useState<Doctor | Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const role = credentials.role;
      console.log("credentials: ", credentials);
      const suffixes: Record<string, string> = {
        Doctor: "doctors",
        Patient: "patients",
      };

      if (!suffixes[role]) {
        throw new Error("Invalid role specified");
      }

      const response = await axios.post(
        `${apiUrl}/api/${suffixes[role]}`,
        credentials
      );

      setUser(response.data.user);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    isAuthenticated: !!user,
    loading,
    error,
    setError,
  };
}