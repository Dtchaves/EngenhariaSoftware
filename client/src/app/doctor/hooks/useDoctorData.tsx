// app/medico/hooks/useDoctorData.ts
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
        const response = await axios.get(`${apiUrl}/api/doctor/profile`, {
          withCredentials: true,
        });
        setData(response.data); // Dados esperados na estrutura DoctorData
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
