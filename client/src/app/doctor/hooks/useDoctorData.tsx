// app/doctor/hooks/useDoctorData.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "@/app/shared/constants";

interface DoctorData {
  name: string;
  email: string;
  specialty: string;
  crm: string;
}

export const useDoctorData = () => {
  const [data, setData] = useState<DoctorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/check`, {
          withCredentials: true, // Garante que cookies de autenticação sejam enviados
        });
        setData(response.data); // Assegure-se de que a resposta da API está no formato esperado
      } catch (err) {
        console.error("Erro ao buscar dados do médico:", err);
        setError("Erro ao buscar dados do médico");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  return { data, loading, error };
};
