"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";

interface User {
  id: number;
  name: string;
  role: string;
}

interface AuthenticationResponse {
  authenticated: boolean;
  user: User;
}

export const useAuthentication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<AuthenticationResponse>(`${apiUrl}/api/check`, {
          withCredentials: true,
        });
        if (response.data.authenticated) {
          console.log("response.data: ", response.data);
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError("Erro ao autenticar usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { user, loading, error };
};
